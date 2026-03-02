export function getAgentColor(agent: string): string {
  const colors: Record<string, string> = {
    bidi: "#E8601C",
    anna: "#a855f7",
    franck: "#22c55e",
    john: "#3b82f6",
    jimmy: "#f59e0b",
  };
  return colors[agent.toLowerCase()] || "#888888";
}

export function getAgentEmoji(agent: string): string {
  const emojis: Record<string, string> = {
    bidi: "🧠",
    anna: "📣",
    franck: "💰",
    john: "⚙️",
    jimmy: "💻",
  };
  return emojis[agent.toLowerCase()] || "🤖";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    backlog: "Backlog",
    inprogress: "En cours",
    inreview: "En revue",
    done: "Terminé",
  };
  return labels[status] || status;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const months = ["jan", "fév", "mar", "avr", "mai", "jun", "jul", "aoû", "sep", "oct", "nov", "déc"];
  return `${parseInt(day)} ${months[parseInt(month) - 1]}`;
}

export function relativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (mins < 2) return "À l'instant";
  if (mins < 60) return `Il y a ${mins} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  return `Il y a ${days}j`;
}
