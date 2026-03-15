const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dashboardDir = path.join(root, 'dashboard');
const jobsPath = path.join(process.env.HOME || '', '.openclaw', 'cron', 'jobs.json');

function read(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function parseMarkdownSections(md) {
  const sections = {};
  let currentSection = null;
  let currentSubSection = null;

  for (const rawLine of md.split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    if (line.startsWith('## ')) {
      currentSection = line.slice(3).trim();
      currentSubSection = null;
      sections[currentSection] = sections[currentSection] || { lines: [], sub: {} };
      continue;
    }
    if (line.startsWith('### ')) {
      if (!currentSection) continue;
      currentSubSection = line.slice(4).trim();
      sections[currentSection].sub[currentSubSection] =
        sections[currentSection].sub[currentSubSection] || [];
      continue;
    }
    if (!currentSection) {
      continue;
    }
    if (currentSubSection) {
      sections[currentSection].sub[currentSubSection].push(line);
    } else {
      sections[currentSection].lines.push(line);
    }
  }

  return sections;
}

function parseBullets(block) {
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim());
}

function parseTasks(md) {
  const result = { NOW: [], 'IN REVIEW': [], NEXT: [] };
  let current = null;

  for (const rawLine of md.split('\n')) {
    const line = rawLine.trim();
    if (line === '## NOW') {
      current = 'NOW';
      continue;
    }
    if (line === '## IN REVIEW') {
      current = 'IN REVIEW';
      continue;
    }
    if (line === '## NEXT') {
      current = 'NEXT';
      continue;
    }
    if (!current || !line.startsWith('- ')) {
      continue;
    }
    result[current].push(line.slice(2).replace(/^\[[ x]\]\s*/i, '').trim());
  }
  return result;
}

function parseMarkdownTable(md, heading) {
  const sections = parseMarkdownSections(md);
  const lines = ((sections[heading] && sections[heading].lines) || [])
    .map((line) => line.trim())
    .filter(Boolean);

  const tableStart = lines.findIndex((line) => line.startsWith('|'));
  if (tableStart === -1 || lines.length < tableStart + 3) {
    return [];
  }

  const header = lines[tableStart]
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean);

  const rows = [];
  for (const line of lines.slice(tableStart + 2)) {
    if (!line.startsWith('|')) {
      break;
    }
    const values = line
      .split('|')
      .map((part) => part.trim())
      .filter(Boolean);
    if (values.length !== header.length) {
      continue;
    }
    const row = {};
    header.forEach((key, index) => {
      row[key] = values[index];
    });
    rows.push(row);
  }
  return rows;
}

function parseSummary(md) {
  const sections = parseMarkdownSections(md);
  return {
    snapshot: parseBullets(((sections['Snapshot'] && sections['Snapshot'].lines) || []).join('\n')),
    alerts: parseBullets(((sections['Alerts'] && sections['Alerts'].lines) || []).join('\n')),
    nextActions: parseBullets(((sections['Next Actions'] && sections['Next Actions'].lines) || []).join('\n')),
    dashboard: parseBullets(((sections['Dashboard'] && sections['Dashboard'].lines) || []).join('\n')),
  };
}

function parseActivity(md) {
  return md
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .slice(-12)
    .reverse();
}

function parseCronJobs(raw, jadeJobNames) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }

  return (parsed.jobs || [])
    .filter((job) => job.agentId === 'jade' || jadeJobNames.includes(job.name))
    .map((job) => ({
      id: job.id,
      name: job.name,
      schedule:
        job.schedule?.kind === 'cron'
          ? `${job.schedule.expr} @ ${job.schedule.tz}`
          : `${job.schedule?.kind || 'unknown'}`,
      delivery: job.delivery?.mode || 'none',
      channel: job.delivery?.channel || '',
      nextRunAtMs: job.state?.nextRunAtMs || null,
      lastRunAtMs: job.state?.lastRunAtMs || null,
      lastStatus: job.state?.lastStatus || 'unknown',
    }));
}

function parseFiat(md) {
  const sections = parseMarkdownSections(md);
  const vehicle = (sections['Vehicule'] && sections['Vehicule'].lines) || [];
  const objective = (sections['Objectif'] && sections['Objectif'].lines) || [];
  const suivi = sections['Suivi'] || { sub: {} };
  return {
    vehicle: parseBullets(vehicle.join('\n')),
    objective: parseBullets(objective.join('\n')),
    estimations: parseBullets(((suivi.sub['Estimations']) || []).join('\n')),
    offers: parseBullets(((suivi.sub['Offres recues']) || []).join('\n')),
    relances: parseBullets(((suivi.sub['Relances']) || []).join('\n')),
  };
}

function countFilledRows(rows) {
  return rows.filter((row) =>
    Object.values(row).some((value) => value && !/^a completer$/i.test(value))
  ).length;
}

const boardMd = read(path.join(root, 'shared', 'tasks', 'board.md'));
const summaryMd = read(path.join(root, 'shared', 'state', 'summary.md'));
const rulesMd = read(path.join(root, 'shared', 'context', 'decision-rules.md'));
const fiatMd = read(path.join(root, 'shared', 'context', 'vente-fiat-500x.md'));
const carsMd = read(path.join(root, 'shared', 'context', 'voiture-comparatif.md'));
const parkingMd = read(path.join(root, 'shared', 'context', 'parking-recherche.md'));
const activityMd = read(path.join(root, 'shared', 'logs', 'activity-log.md'));
const jobsRaw = read(jobsPath);

const topCars = parseMarkdownTable(carsMd, 'Top offres');
const parkingOptions = parseMarkdownTable(parkingMd, 'Options suivies');

const data = {
  generatedAt: new Date().toISOString(),
  root,
  summary: parseSummary(summaryMd),
  tasks: parseTasks(boardMd),
  fiat: parseFiat(fiatMd),
  topCars,
  parkingOptions,
  counts: {
    topCars: countFilledRows(topCars),
    parkingOptions: countFilledRows(parkingOptions),
  },
  cronJobs: parseCronJobs(jobsRaw, [
    '🚗 Jade — Voiture',
    '🚗 Jade — Scan Achat & Parking',
    '🚗 Jade — Vente Fiat & Relances',
    '🚗 Jade — Digest Decisionnel',
  ]),
  activity: parseActivity(activityMd),
  rules: {
    general: parseBullets((((parseMarkdownSections(rulesMd)['Principe general']) || { lines: [] }).lines || []).join('\n')),
    fiat: parseBullets((((parseMarkdownSections(rulesMd)['Vente Fiat 500X']) || { sub: {} }).sub['Remontee a Alexis'] || []).join('\n')),
  },
  sources: [
    'shared/state/summary.md',
    'shared/context/vente-fiat-500x.md',
    'shared/context/voiture-comparatif.md',
    'shared/context/parking-recherche.md',
    'shared/tasks/board.md',
    'shared/logs/activity-log.md',
  ],
};

ensureDir(dashboardDir);
fs.writeFileSync(
  path.join(dashboardDir, 'data.js'),
  `window.JADE_DASHBOARD_DATA = ${JSON.stringify(data, null, 2)};\n`,
  'utf8'
);

console.log(`Jade dashboard data updated: ${path.join(dashboardDir, 'data.js')}`);
