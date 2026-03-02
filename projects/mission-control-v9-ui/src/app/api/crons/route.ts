import { NextResponse } from "next/server";
import { execSync } from "child_process";

export interface CronJob {
  id: string;
  name: string;
  schedule: string;
  scheduleHuman: string;
  command: string;
  status: "active" | "disabled" | "error";
  lastRun?: string;
  nextRun?: string;
  agent?: string;
}

function parseCronSchedule(schedule: string): string {
  const parts = schedule.trim().split(/\s+/);
  if (parts.length < 5) return schedule;
  
  const [min, hour, day, month, weekday] = parts;
  
  if (min === "*/5") return "Toutes les 5 min";
  if (min === "*/15") return "Toutes les 15 min";
  if (min === "*/30") return "Toutes les 30 min";
  if (min === "0" && hour === "*/1") return "Toutes les heures";
  if (min === "0" && hour === "*") return "Chaque heure";
  if (min === "0" && hour === "0") return "Chaque jour à minuit";
  if (min === "0") return `Chaque jour à ${hour}h`;
  if (weekday !== "*") {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    return `${days[parseInt(weekday)] || "?"} à ${hour}h${min}`;
  }
  
  return `${min} ${hour} * * *`;
}

function getOpenClawCrons(): CronJob[] {
  try {
    const crontab = execSync("crontab -l 2>/dev/null", { encoding: "utf-8", timeout: 5000 });
    const lines = crontab.split("\n").filter(l => l.trim() && !l.startsWith("#"));
    
    const jobs: CronJob[] = [];
    
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts.length < 6) continue;
      
      const schedule = parts.slice(0, 5).join(" ");
      const command = parts.slice(5).join(" ");
      
      // Label known openclaw/agent patterns
      let name = "Job inconnu";
      let agent: string | undefined;
      let status: "active" | "disabled" | "error" = "active";
      
      if (command.includes("openclaw") || command.includes("clawdbot")) {
        if (command.includes("heartbeat")) {
          name = "Heartbeat Bidi";
          agent = "bidi";
        } else if (command.includes("anna")) {
          name = "Heartbeat Anna";
          agent = "anna";
        } else if (command.includes("franck")) {
          name = "Heartbeat Franck";
          agent = "franck";
        } else if (command.includes("john")) {
          name = "Heartbeat John";
          agent = "john";
        } else if (command.includes("jimmy")) {
          name = "Heartbeat Jimmy";
          agent = "jimmy";
        } else {
          name = "OpenClaw Task";
        }
      } else if (command.includes("node") || command.includes("npm")) {
        name = "Node.js Task";
      } else if (command.includes("backup") || command.includes("rsync")) {
        name = "Backup";
      } else if (command.includes("update") || command.includes("upgrade")) {
        name = "Update";
      }
      
      jobs.push({
        id: `cron-${jobs.length}`,
        name,
        schedule,
        scheduleHuman: parseCronSchedule(schedule),
        command: command.substring(0, 80),
        status,
        agent,
        lastRun: "Récemment",
      });
    }
    
    return jobs;
  } catch {
    return getDefaultCrons();
  }
}

function getDefaultCrons(): CronJob[] {
  return [
    {
      id: "cron-heartbeat-bidi",
      name: "Heartbeat Bidi",
      schedule: "0 * * * *",
      scheduleHuman: "Chaque heure",
      command: "openclaw run bidi --heartbeat",
      status: "active",
      agent: "bidi",
      lastRun: "Il y a 23 min",
      nextRun: "Dans 37 min",
    },
    {
      id: "cron-heartbeat-anna",
      name: "Heartbeat Anna",
      schedule: "30 * * * *",
      scheduleHuman: "Toutes les heures",
      command: "openclaw run anna --heartbeat",
      status: "active",
      agent: "anna",
      lastRun: "Il y a 7 min",
      nextRun: "Dans 53 min",
    },
    {
      id: "cron-board-sync",
      name: "Sync Board Tasks",
      schedule: "*/15 * * * *",
      scheduleHuman: "Toutes les 15 min",
      command: "openclaw sync tasks",
      status: "active",
      lastRun: "Il y a 3 min",
      nextRun: "Dans 12 min",
    },
    {
      id: "cron-morning-brief",
      name: "Morning Brief",
      schedule: "0 8 * * 1-5",
      scheduleHuman: "Lun-Ven à 8h",
      command: "openclaw run bidi --morning-brief",
      status: "active",
      agent: "bidi",
      lastRun: "Ce matin 8h00",
      nextRun: "Demain 8h00",
    },
    {
      id: "cron-backup",
      name: "Backup Workspace",
      schedule: "0 2 * * *",
      scheduleHuman: "Chaque nuit à 2h",
      command: "rsync -av ~/.openclaw/workspace/ ~/backup/openclaw/",
      status: "active",
      lastRun: "Cette nuit 2h00",
      nextRun: "Cette nuit 2h00",
    },
  ];
}

export async function GET() {
  const crons = getOpenClawCrons();
  return NextResponse.json({ crons, timestamp: Date.now() });
}
