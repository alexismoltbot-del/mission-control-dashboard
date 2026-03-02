import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface AgentStatus {
  id: string;
  name: string;
  displayName: string;
  role: string;
  status: "online" | "busy" | "idle";
  lastActivity: string;
  tasksActive: number;
  tasksDone: number;
  color: string;
  emoji: string;
  currentTask?: string;
}

function getAgentStatusFromBoard(boardContent: string): Map<string, { active: number; done: number; currentTask?: string }> {
  const agentStats = new Map<string, { active: number; done: number; currentTask?: string }>();
  const agents = ["bidi", "anna", "franck", "john", "jimmy"];
  
  for (const agent of agents) {
    agentStats.set(agent, { active: 0, done: 0 });
  }
  
  const lines = boardContent.split("\n");
  let currentSection = "";
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith("#")) {
      currentSection = trimmed.toLowerCase();
    }
    
    const taskMatch = trimmed.match(/^-\s+\[([x ])\]\s+(.*)/i);
    if (taskMatch) {
      const isDone = taskMatch[1].toLowerCase() === "x";
      const content = taskMatch[2];
      const agentMatches = content.match(/@(\w+)/g);
      
      if (agentMatches) {
        for (const agentTag of agentMatches) {
          const agent = agentTag.replace("@", "").toLowerCase();
          const stats = agentStats.get(agent) || { active: 0, done: 0 };
          
          if (isDone) {
            stats.done++;
          } else {
            stats.active++;
            if (!stats.currentTask) {
              // Extract task description
              const desc = content
                .replace(/#[A-Z0-9-]+\s*/g, "")
                .replace(/@\w+\s*/g, "")
                .replace(/\[\d{4}-\d{2}-\d{2}\]/g, "")
                .replace(/→.*$/g, "")
                .trim()
                .substring(0, 60);
              stats.currentTask = desc;
            }
          }
          
          agentStats.set(agent, stats);
        }
      }
    }
  }
  
  return agentStats;
}

function getLastActivityFromDiscussions(discussionsDir: string, agentId: string): string {
  try {
    const files = fs.readdirSync(discussionsDir)
      .filter(f => f.endsWith(".md"))
      .sort()
      .reverse();
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(discussionsDir, file), "utf-8");
      const regex = new RegExp(`(\\d{2}:\\d{2})\\s*[—-]\\s*${agentId}`, "i");
      const match = content.match(regex);
      if (match) {
        const dateStr = file.replace(".md", "");
        return `${dateStr} ${match[1]}`;
      }
    }
  } catch {}
  return "Inconnu";
}

export async function GET() {
  const boardPath = "/Users/alexis/.openclaw/shared/tasks/board.md";
  const discussionsDir = "/Users/alexis/.openclaw/shared/discussions";
  
  let agentStats = new Map<string, { active: number; done: number; currentTask?: string }>();
  
  try {
    if (fs.existsSync(boardPath)) {
      const boardContent = fs.readFileSync(boardPath, "utf-8");
      agentStats = getAgentStatusFromBoard(boardContent);
    }
  } catch {}
  
  const agentsConfig = [
    {
      id: "bidi",
      displayName: "Bidi",
      role: "Coordinateur Général",
      color: "#E8601C",
      emoji: "🧠",
    },
    {
      id: "anna",
      displayName: "Anna",
      role: "Dir. Marketing",
      color: "#a855f7",
      emoji: "📣",
    },
    {
      id: "franck",
      displayName: "Franck",
      role: "Dir. Financier",
      color: "#22c55e",
      emoji: "💰",
    },
    {
      id: "john",
      displayName: "John",
      role: "Opérations",
      color: "#3b82f6",
      emoji: "⚙️",
    },
    {
      id: "jimmy",
      displayName: "Jimmy",
      role: "Développeur",
      color: "#f59e0b",
      emoji: "💻",
    },
  ];
  
  const agents: AgentStatus[] = agentsConfig.map(config => {
    const stats = agentStats.get(config.id) || { active: 0, done: 0 };
    
    let lastActivity = "Aujourd'hui";
    try {
      if (fs.existsSync(discussionsDir)) {
        const la = getLastActivityFromDiscussions(discussionsDir, config.id);
        if (la !== "Inconnu") lastActivity = la;
      }
    } catch {}
    
    // Determine status
    let status: "online" | "busy" | "idle" = "idle";
    if (stats.active > 0) {
      status = stats.active > 2 ? "busy" : "online";
    }
    // Bidi is always online
    if (config.id === "bidi") status = "online";
    
    return {
      ...config,
      name: config.id,
      status,
      lastActivity,
      tasksActive: stats.active,
      tasksDone: stats.done,
      currentTask: stats.currentTask,
    };
  });
  
  return NextResponse.json({ agents, timestamp: Date.now() });
}
