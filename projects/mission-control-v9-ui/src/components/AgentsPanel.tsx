"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Activity, ChevronRight } from "lucide-react";
import type { AgentStatus } from "@/lib/types";

interface AgentsPanelProps {
  agents: AgentStatus[];
  loading: boolean;
}

function StatusDot({ status, color }: { status: AgentStatus["status"]; color: string }) {
  const dotColor = status === "idle" ? "#333" : color;
  return (
    <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: dotColor, position: "absolute" }} />
      {status !== "idle" && (
        <div
          style={{
            width: 10, height: 10, borderRadius: "50%", background: dotColor,
            position: "absolute", opacity: 0.4,
            animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
          }}
        />
      )}
    </div>
  );
}

function SubAgentCard({ agent, index }: { agent: AgentStatus; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.06, duration: 0.25 }}
      whileHover={{ background: "rgba(255,255,255,0.04)", borderColor: `${agent.color}30`, y: -1 }}
      style={{
        background: "rgba(255,255,255,0.015)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: "10px 12px",
        minWidth: 180,
        flex: "1 1 180px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
    >
      {/* Top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: agent.status === "idle" ? "rgba(255,255,255,0.03)" : agent.color, borderRadius: "10px 10px 0 0" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 18, filter: agent.status === "idle" ? "grayscale(1) opacity(0.4)" : "none" }}>{agent.emoji}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f5f5f5", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{agent.displayName}</div>
          <div style={{ fontSize: 10, color: "#555" }}>{agent.role}</div>
        </div>
        <StatusDot status={agent.status} color={agent.color} />
      </div>

      {agent.currentTask && agent.status !== "idle" && (
        <div style={{ fontSize: 10, color: "#999", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 5, padding: "3px 6px", marginBottom: 6, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {agent.currentTask}
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Activity size={9} style={{ color: agent.color }} />
          <span style={{ fontSize: 10, color: "#666" }}><span style={{ color: agent.color, fontWeight: 600 }}>{agent.tasksActive}</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <CheckCircle2 size={9} style={{ color: "#22c55e" }} />
          <span style={{ fontSize: 10, color: "#666" }}><span style={{ color: "#22c55e", fontWeight: 600 }}>{agent.tasksDone}</span></span>
        </div>
      </div>
    </motion.div>
  );
}

function AgentSkeleton() {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ height: 90, flex: "1 1 180px", borderRadius: 10, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", animation: "pulse 2s ease-in-out infinite" }} />
      ))}
    </div>
  );
}

export default function AgentsPanel({ agents, loading }: AgentsPanelProps) {
  const bidi = agents.find(a => a.id === "bidi");
  const subAgents = agents.filter(a => a.id !== "bidi");
  const onlineCount = agents.filter(a => a.status !== "idle").length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f5f5f5" }}>Équipe</h2>
        <span style={{ fontSize: 11, color: "#E8601C", background: "rgba(232,96,28,0.1)", padding: "2px 8px", borderRadius: 8, fontWeight: 600 }}>
          {onlineCount}/{agents.length} actifs
        </span>
      </div>

      {loading && agents.length === 0 ? (
        <AgentSkeleton />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Bidi — coordinateur (top level) */}
          {bidi && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "rgba(232,96,28,0.06)",
                border: "1px solid rgba(232,96,28,0.2)",
                borderRadius: 12,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 26 }}>{bidi.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#f5f5f5" }}>{bidi.displayName}</span>
                  <span style={{ fontSize: 10, color: "#E8601C", background: "rgba(232,96,28,0.15)", padding: "1px 7px", borderRadius: 6, fontWeight: 700, letterSpacing: 0.5 }}>COORDINATEUR</span>
                  <StatusDot status={bidi.status} color={bidi.color} />
                </div>
                <div style={{ fontSize: 11, color: "#777", marginTop: 2 }}>{bidi.role}</div>
                {bidi.currentTask && bidi.status !== "idle" && (
                  <div style={{ fontSize: 10, color: "#aaa", marginTop: 4 }}>{bidi.currentTask}</div>
                )}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#E8601C" }}>{bidi.tasksActive}</div>
                  <div style={{ fontSize: 9, color: "#555" }}>actives</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#22c55e" }}>{bidi.tasksDone}</div>
                  <div style={{ fontSize: 9, color: "#555" }}>faites</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Connection line */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "0 0 2px 0" }}>
            <div style={{ width: 1, height: 12, background: "rgba(232,96,28,0.3)" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 2 }}>
            <div style={{ height: 1, flex: 1, background: "rgba(232,96,28,0.15)" }} />
            <ChevronRight size={10} style={{ color: "rgba(232,96,28,0.4)" }} />
            <span style={{ fontSize: 9, color: "#555", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>délègue à</span>
            <ChevronRight size={10} style={{ color: "rgba(232,96,28,0.4)" }} />
            <div style={{ height: 1, flex: 1, background: "rgba(232,96,28,0.15)" }} />
          </div>

          {/* Sub-agents — horizontal row */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {subAgents.map((agent, i) => (
              <SubAgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
