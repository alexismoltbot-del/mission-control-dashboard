"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Eye, ListTodo, Users, Zap, RefreshCw } from "lucide-react";
import type { BoardData, AgentStatus } from "@/lib/types";

interface MetricsBarProps {
  board: BoardData | null;
  agents: AgentStatus[];
  lastRefresh: Date;
}

export default function MetricsBar({ board, agents, lastRefresh }: MetricsBarProps) {
  const activeAgents = agents.filter(a => a.status !== "idle").length;
  const totalTasks = board?.counts.total || 0;
  const doneTasks = board?.counts.done || 0;
  const completion = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const metrics = [
    {
      label: "Total tâches",
      value: totalTasks,
      icon: ListTodo,
      color: "#888888",
      suffix: "",
    },
    {
      label: "En cours",
      value: board?.counts.inprogress || 0,
      icon: Clock,
      color: "#3b82f6",
      suffix: "",
    },
    {
      label: "En revue",
      value: board?.counts.inreview || 0,
      icon: Eye,
      color: "#f59e0b",
      suffix: "",
    },
    {
      label: "Terminées",
      value: doneTasks,
      icon: CheckCircle2,
      color: "#22c55e",
      suffix: "",
    },
    {
      label: "Agents actifs",
      value: activeAgents,
      icon: Users,
      color: "#E8601C",
      suffix: `/ ${agents.length}`,
    },
    {
      label: "Completion",
      value: completion,
      icon: Zap,
      color: "#a855f7",
      suffix: "%",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Top bar */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
        className="px-4 md:px-6 py-3"
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          {/* Logo / Title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              style={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg, #E8601C, #ff8c5a)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              🧠
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.3px" }}>
                Mission Control
              </div>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                V9 · Forge IA
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-1 md:gap-3 overflow-x-auto hide-scrollbar flex-1 justify-center">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  flexShrink: 0,
                }}
              >
                <metric.icon size={13} style={{ color: metric.color }} />
                <span style={{ fontSize: 18, fontWeight: 700, color: metric.color, lineHeight: 1 }}>
                  {metric.value}
                  <span style={{ fontSize: 12, fontWeight: 400, color: "#666" }}>{metric.suffix}</span>
                </span>
                <span style={{ fontSize: 10, color: "#555", display: "none" }} className="md:block">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Last refresh */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <RefreshCw size={10} style={{ color: "#444" }} />
            <span style={{ fontSize: 10, color: "#444" }}>
              {lastRefresh.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                boxShadow: "0 0 6px #22c55e",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completion}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #E8601C, #a855f7)",
            borderRadius: "0 2px 2px 0",
          }}
        />
      </div>
    </motion.div>
  );
}
