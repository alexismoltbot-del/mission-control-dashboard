"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, Eye, ListTodo, Calendar, FileText, ChevronRight } from "lucide-react";
import type { Task, BoardData } from "@/lib/types";
import { getAgentColor, getAgentEmoji, formatDate } from "@/lib/utils";

interface KanbanBoardProps {
  board: BoardData | null;
  loading: boolean;
}

const COLUMNS = [
  {
    id: "backlog",
    label: "Backlog",
    icon: ListTodo,
    colorClass: "col-backlog",
    borderColor: "#444",
    bgColor: "rgba(68,68,68,0.08)",
  },
  {
    id: "inprogress",
    label: "En cours",
    icon: Clock,
    colorClass: "col-inprogress",
    borderColor: "#3b82f6",
    bgColor: "rgba(59,130,246,0.06)",
  },
  {
    id: "inreview",
    label: "En revue",
    icon: Eye,
    colorClass: "col-inreview",
    borderColor: "#f59e0b",
    bgColor: "rgba(245,158,11,0.06)",
  },
  {
    id: "done",
    label: "Terminé",
    icon: CheckCircle2,
    colorClass: "col-done",
    borderColor: "#22c55e",
    bgColor: "rgba(34,197,94,0.06)",
  },
] as const;

function AgentBadge({ agent }: { agent: string }) {
  const agents = agent.split(",").map(a => a.trim());
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {agents.slice(0, 2).map(a => (
        <span
          key={a}
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: getAgentColor(a),
            background: `${getAgentColor(a)}18`,
            border: `1px solid ${getAgentColor(a)}30`,
            padding: "1px 6px",
            borderRadius: 4,
            letterSpacing: "0.3px",
            textTransform: "capitalize",
          }}
        >
          {getAgentEmoji(a)} {a}
        </span>
      ))}
    </div>
  );
}

function TaskCard({ task, index }: { task: Task; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: "12px",
        cursor: "default",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
      whileHover={{
        background: "rgba(255,255,255,0.05)",
        borderColor: "rgba(255,255,255,0.1)",
        y: -1,
      }}
      className="card-shine"
    >
      {/* ID badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#E8601C",
            background: "rgba(232,96,28,0.1)",
            padding: "2px 6px",
            borderRadius: 4,
            letterSpacing: "0.5px",
          }}
        >
          #{task.id}
        </span>
        {task.status === "done" && (
          <CheckCircle2 size={14} style={{ color: "#22c55e" }} />
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: task.status === "done" ? "#666" : "#e5e5e5",
          lineHeight: 1.4,
          marginBottom: 10,
          textDecoration: task.status === "done" ? "line-through" : "none",
        }}
      >
        {task.description}
      </p>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AgentBadge agent={task.agent} />
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {task.date && (
            <span style={{ fontSize: 10, color: "#555", display: "flex", alignItems: "center", gap: 2 }}>
              <Calendar size={9} />
              {formatDate(task.date)}
            </span>
          )}
          {task.output && (
            <span style={{ fontSize: 10, color: "#22c55e", display: "flex", alignItems: "center", gap: 2 }}>
              <FileText size={9} />
              livré
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function KanbanSkeleton() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      {COLUMNS.map(col => (
        <div key={col.id} style={{ flex: 1, minWidth: 0 }}>
          <div style={{ height: 4, borderRadius: 2, background: col.borderColor, opacity: 0.3, marginBottom: 12 }} />
          {[1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                height: 80,
                borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                marginBottom: 8,
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function KanbanBoard({ board, loading }: KanbanBoardProps) {
  if (loading && !board) {
    return (
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#f5f5f5", marginBottom: 16 }}>
          Tableau de bord
        </h2>
        <KanbanSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#f5f5f5" }}>
          Tableau Kanban
        </h2>
        {board?.lastUpdated && (
          <span style={{ fontSize: 11, color: "#444" }}>
            Màj {board.lastUpdated}
          </span>
        )}
      </div>

      {/* Scrollable kanban columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 8,
        }}
      >
        {COLUMNS.map((col) => {
          const tasks = board?.tasks.filter(t => t.status === col.id) || [];
          const ColIcon = col.icon;

          return (
            <div key={col.id} style={{ minWidth: 200 }}>
              {/* Column header */}
              <div
                style={{
                  borderTop: `2px solid ${col.borderColor}`,
                  background: col.bgColor,
                  borderRadius: "0 0 8px 8px",
                  padding: "10px 12px",
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <ColIcon size={13} style={{ color: col.borderColor }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: col.borderColor }}>
                    {col.label}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: col.borderColor,
                    background: `${col.borderColor}20`,
                    padding: "1px 7px",
                    borderRadius: 10,
                  }}
                >
                  {tasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <AnimatePresence mode="popLayout">
                  {tasks.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        padding: "24px 12px",
                        textAlign: "center",
                        color: "#333",
                        fontSize: 12,
                        border: "1px dashed rgba(255,255,255,0.05)",
                        borderRadius: 10,
                      }}
                    >
                      Vide
                    </motion.div>
                  ) : (
                    tasks.map((task, i) => (
                      <TaskCard key={task.id} task={task} index={i} />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
