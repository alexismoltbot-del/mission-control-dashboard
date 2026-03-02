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
