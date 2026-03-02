import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface DiscussionEntry {
  id: string;
  time: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  date: string;
  timestamp: number;
}

function parseDiscussionFile(content: string, dateStr: string): DiscussionEntry[] {
  const entries: DiscussionEntry[] = [];
  const blocks = content.split(/\n## /);
  
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    
    // Match: "HH:MM — From → To"
    const headerMatch = trimmed.match(/^(\d{2}:\d{2})\s*[—-]\s*(\w+)\s*→\s*([^\n]+)/);
    if (!headerMatch) continue;
    
    const time = headerMatch[1];
    const from = headerMatch[2].trim();
    const toRaw = headerMatch[3].trim();
    
    // Extract subject from "Re: ..." or next line
    const reMatch = trimmed.match(/Re:\s*([^\n]+)/);
    const subject = reMatch ? reMatch[1].trim() : "Note";
    
    // Extract content (after first blank line, skip "Re:" line)
    const lines = trimmed.split("\n");
    const contentLines: string[] = [];
    let pastHeader = false;
    let pastSubject = false;
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!pastHeader && line.trim() === "") {
        pastHeader = true;
        continue;
      }
      if (pastHeader) {
        if (line.startsWith("Re:") && !pastSubject) {
          pastSubject = true;
          continue;
        }
        if (line.startsWith(">")) {
          contentLines.push(line.replace(/^>\s*/, ""));
        } else if (line.trim() && pastSubject) {
          contentLines.push(line);
        }
      }
    }
    
    const content_text = contentLines.join(" ").trim() || subject;
    
    // Parse timestamp
    const [hours, minutes] = time.split(":").map(Number);
    const [year, month, day] = dateStr.split("-").map(Number);
    const timestamp = new Date(year, month - 1, day, hours, minutes).getTime();
    
    entries.push({
      id: `${dateStr}-${time}-${from}`,
      time,
      from: from.toLowerCase(),
      to: toRaw.toLowerCase().replace(/\s*\+\s*/g, ", "),
      subject,
      content: content_text.substring(0, 200),
      date: dateStr,
      timestamp,
    });
  }
  
  return entries;
}

export async function GET() {
  try {
    const discussionsDir = "/Users/alexis/.openclaw/shared/discussions";
    
    if (!fs.existsSync(discussionsDir)) {
      return NextResponse.json({ entries: getMockDiscussions() });
    }
    
    const files = fs.readdirSync(discussionsDir)
      .filter(f => f.endsWith(".md"))
      .sort()
      .reverse()
      .slice(0, 5); // Last 5 days
    
    const allEntries: DiscussionEntry[] = [];
    
    for (const file of files) {
      const dateStr = file.replace(".md", "");
      const filePath = path.join(discussionsDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const entries = parseDiscussionFile(content, dateStr);
      allEntries.push(...entries);
    }
    
    // Sort by timestamp descending
    allEntries.sort((a, b) => b.timestamp - a.timestamp);
    
    return NextResponse.json({ entries: allEntries.slice(0, 30) });
  } catch (error) {
    console.error("Discussions API error:", error);
    return NextResponse.json({ entries: getMockDiscussions() });
  }
}

function getMockDiscussions(): DiscussionEntry[] {
  return [
    {
      id: "2026-03-02-20:06-bidi",
      time: "20:06",
      from: "bidi",
      to: "anna, jimmy",
      subject: "Refaire la landing page Forge IA",
      content: "La landing actuelle ne fonctionne pas. Alexis veut repartir de zéro. Référence: notion.com/fr-fr/product/ai",
      date: "2026-03-02",
      timestamp: Date.now() - 3600000,
    },
    {
      id: "2026-03-02-19:56-bidi",
      time: "19:56",
      from: "bidi",
      to: "john, anna",
      subject: "Demandes entrantes 5 prospects",
      content: "Adrien B, Johanna, Alexandre de M, Hugo K, Théo V. John: qualification + relance. Anna: angle valeur + hook.",
      date: "2026-03-02",
      timestamp: Date.now() - 7200000,
    },
    {
      id: "2026-03-02-19:44-bidi",
      time: "19:44",
      from: "bidi",
      to: "jimmy, franck",
      subject: "Forge IA V0 à shipper vite",
      content: "Priorité absolue: V0 contenu LinkedIn + blog pour 3 clients pilotes sous 72h. Reco architecture tranchée.",
      date: "2026-03-02",
      timestamp: Date.now() - 10800000,
    },
    {
      id: "2026-03-02-19:40-bidi",
      time: "19:40",
      from: "bidi",
      to: "jimmy",
      subject: "Sprint produit Forge IA + simplification OpenClaw",
      content: "3 semaines: simplifier setup OpenClaw non-tech, finaliser parcours Forge IA v1, livrer Mission Control UI.",
      date: "2026-03-02",
      timestamp: Date.now() - 14400000,
    },
    {
      id: "2026-03-02-17:18-bidi",
      time: "17:18",
      from: "bidi",
      to: "jimmy",
      subject: "Mission Control V9 UI",
      content: "Je lance Claude Code en parallèle pour builder une UI monitoring premium. Tu prendras le relais pour QA.",
      date: "2026-03-02",
      timestamp: Date.now() - 18000000,
    },
  ];
}
