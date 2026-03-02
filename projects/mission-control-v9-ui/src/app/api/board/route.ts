import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface Task {
  id: string;
  agent: string;
  description: string;
  status: "backlog" | "inprogress" | "inreview" | "done";
  date?: string;
  output?: string;
  raw: string;
}

export interface BoardData {
  tasks: Task[];
  lastUpdated: string;
  counts: {
    backlog: number;
    inprogress: number;
    inreview: number;
    done: number;
    total: number;
  };
}

function parseBoard(content: string): Task[] {
  const tasks: Task[] = [];
  const lines = content.split("\n");
  
  let currentSection: "backlog" | "inprogress" | "inreview" | "done" | null = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Detect section headers
    if (trimmed.includes("BACKLOG") || trimmed.includes("backlog")) {
      currentSection = "backlog";
    } else if (trimmed.includes("IN PROGRESS") || trimmed.includes("in progress") || trimmed.includes("IN_PROGRESS")) {
      currentSection = "inprogress";
    } else if (trimmed.includes("IN REVIEW") || trimmed.includes("in review") || trimmed.includes("REVIEW")) {
      currentSection = "inreview";
    } else if (trimmed.match(/^#{1,3}\s*DONE/i) || trimmed.match(/^#{1,3}\s*✅/)) {
      currentSection = "done";
    } else if (trimmed.match(/^#{1,3}\s*SPRINT/i) || trimmed.match(/^#{1,3}\s*PRIORITÉ/i)) {
      currentSection = "backlog";
    }
    
    // Parse task lines
    const taskMatch = trimmed.match(/^-\s+\[([x ])\]\s+(.*)/i);
    if (taskMatch && currentSection) {
      const isDone = taskMatch[1].toLowerCase() === "x";
      const taskContent = taskMatch[2];
      
      // Extract task ID
      const idMatch = taskContent.match(/#([A-Z0-9-]+)/);
      const id = idMatch ? idMatch[1] : `T${Math.random().toString(36).substr(2, 6)}`;
      
      // Extract agent
      const agentMatch = taskContent.match(/@(\w+)/g);
      const agent = agentMatch ? agentMatch.map(a => a.replace("@", "")).join(", ") : "unknown";
      
      // Extract date
      const dateMatch = taskContent.match(/\[(\d{4}-\d{2}-\d{2})\]/);
      const date = dateMatch ? dateMatch[1] : undefined;
      
      // Extract output path
      const outputMatch = taskContent.match(/→\s+`([^`]+)`/);
      const output = outputMatch ? outputMatch[1] : undefined;
      
      // Clean description
      let description = taskContent
        .replace(/#[A-Z0-9-]+\s*/g, "")
        .replace(/@\w+\s*/g, "")
        .replace(/\[\d{4}-\d{2}-\d{2}\]/g, "")
        .replace(/→.*$/g, "")
        .replace(/—.*$/g, "")
        .replace(/✅/g, "")
        .trim();
      
      const status = isDone ? "done" : currentSection;
      
      tasks.push({
        id,
        agent,
        description,
        status,
        date,
        output,
        raw: taskContent,
      });
    }
  }
  
  return tasks;
}

export async function GET() {
  try {
    const boardPath = "/Users/alexis/.openclaw/shared/tasks/board.md";
    
    if (!fs.existsSync(boardPath)) {
      // Return mock data if file doesn't exist
      return NextResponse.json(getMockBoard());
    }
    
    const content = fs.readFileSync(boardPath, "utf-8");
    
    // Extract last updated
    const updatedMatch = content.match(/Mis à jour[^:]*:\s*([^\n_]+)/);
    const lastUpdated = updatedMatch ? updatedMatch[1].trim() : new Date().toISOString();
    
    const tasks = parseBoard(content);
    
    const counts = {
      backlog: tasks.filter(t => t.status === "backlog").length,
      inprogress: tasks.filter(t => t.status === "inprogress").length,
      inreview: tasks.filter(t => t.status === "inreview").length,
      done: tasks.filter(t => t.status === "done").length,
      total: tasks.length,
    };
    
    return NextResponse.json({ tasks, lastUpdated, counts });
  } catch (error) {
    console.error("Board API error:", error);
    return NextResponse.json(getMockBoard());
  }
}

function getMockBoard(): BoardData {
  return {
    tasks: [
      { id: "FIA-016", agent: "anna", description: "Plan contenu 3x/semaine LinkedIn + Substack", status: "backlog", date: "2026-03-04", raw: "" },
      { id: "FIA-020", agent: "john", description: "Commander voiture: shortlist 3 options + coût total", status: "backlog", date: "2026-03-05", raw: "" },
      { id: "FIA-026", agent: "jimmy", description: "Mission Control V9 UI: première version testable", status: "inprogress", date: "2026-03-04", raw: "" },
      { id: "FIA-005", agent: "jimmy", description: "Déployer forgeia.fr", status: "inprogress", raw: "" },
      { id: "FIA-001", agent: "anna", description: "Landing page Forge IA", status: "inreview", output: "outputs/anna/landing-forgeia.md", raw: "" },
      { id: "FIA-003", agent: "franck", description: "Business Plan 3 ans", status: "inreview", output: "outputs/franck/bp-forgeia-3ans.md", raw: "" },
      { id: "FIA-012", agent: "anna", description: "Exporter docs Forge IA en PDF/PPTX", status: "done", raw: "" },
      { id: "FIA-013", agent: "franck", description: "Créer Excel financier 3 ans + PDF résumé", status: "done", raw: "" },
    ],
    lastUpdated: "02/03/2026 19:40",
    counts: { backlog: 2, inprogress: 2, inreview: 2, done: 2, total: 8 },
  };
}
