"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2, XCircle, AlertCircle, Terminal } from "lucide-react";
import type { CronJob } from "@/lib/types";
import { getAgentColor, getAgentEmoji } from "@/lib/utils";

interface CronPanelProps {
  crons: CronJob[];
  loading: boolean;
}

function StatusBadge({ status }: { status: CronJob["status"] }) {
  const config = {
    active: { color: "#22c55e", label: "Actif", icon: CheckCircle2 },
    disabled: { color: "#444", label: "Désactivé", icon: XCircle },
    error: { color: "#ef4444", label: "Erreur", icon: AlertCircle },
  }[status];

  const Icon = config.icon;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <Icon size={10} style={{ color: config.color }} />
      <span style={{ fontSize: 10, color: config.color, fontWeight: 500 }}>{config.label}</span>
    </div>
  );
}

function CronCard({ job, index }: { job: CronJob; index: number }) {
  const agentColor = job.agent ? getAgentColor(job.agent) : "#888";
  const agentEmoji = job.agent ? getAgentEmoji(job.agent) : "⏰";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25 }}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 10,
        padding: "12px",
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
      whileHover={{
        background: "rgba(255,255,255,0.04)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {/* Left accent */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: job.status === "active" ? "#22c55e" : job.status === "error" ? "#ef4444" : "#333",
          borderRadius: "10px 0 0 10px",
        }}
      />
      <div style={{ paddingLeft: 6 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14 }}>{agentEmoji}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#e5e5e5" }}>{job.name}</span>
          </div>
          <StatusBadge status={job.status} />
        </div>

        {/* Schedule badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
          <Clock size={10} style={{ color: "#E8601C" }} />
          <span
            style={{
              fontSize: 11,
              color: "#E8601C",
              background: "rgba(232,96,28,0.1)",
              padding: "1px 6px",
              borderRadius: 4,
              fontWeight: 500,
            }}
          >
            {job.scheduleHuman}
          </span>
          {job.agent && (
            <span
              style={{
                fontSize: 10,
                color: agentColor,
                background: `${agentColor}15`,
                padding: "1px 5px",
                borderRadius: 4,
                textTransform: "capitalize",
              }}
            >
              {job.agent}
            </span>
          )}
        </div>

        {/* Command */}
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            color: "#555",
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.04)",
            borderRadius: 6,
            padding: "4px 8px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Terminal size={9} style={{ color: "#444", flexShrink: 0 }} />
          {job.command}
        </div>

        {/* Timing */}
        {(job.lastRun || job.nextRun) && (
          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            {job.lastRun && (
              <span style={{ fontSize: 10, color: "#444" }}>
                <span style={{ color: "#555" }}>Dernier: </span>{job.lastRun}
              </span>
            )}
            {job.nextRun && (
              <span style={{ fontSize: 10, color: "#444" }}>
                <span style={{ color: "#555" }}>Prochain: </span>{job.nextRun}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CronSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {[1, 2, 3].map(i => (
        <div
          key={i}
          style={{
            height: 80,
            borderRadius: 10,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />
      ))}
    </div>
  );
}

export default function CronPanel({ crons, loading }: CronPanelProps) {
  const activeCount = crons.filter(c => c.status === "active").length;
  const errorCount = crons.filter(c => c.status === "error").length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f5f5f5", display: "flex", alignItems: "center", gap: 6 }}>
          <Clock size={15} style={{ color: "#E8601C" }} />
          Cron Jobs
        </h2>
        <div style={{ display: "flex", gap: 6 }}>
          {errorCount > 0 && (
            <span style={{ fontSize: 11, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "2px 7px", borderRadius: 8 }}>
              {errorCount} erreur{errorCount > 1 ? "s" : ""}
            </span>
          )}
          <span style={{ fontSize: 11, color: "#22c55e", background: "rgba(34,197,94,0.1)", padding: "2px 7px", borderRadius: 8 }}>
            {activeCount} actif{activeCount > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {loading && crons.length === 0 ? (
        <CronSkeleton />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {crons.map((job, i) => (
            <CronCard key={job.id} job={job} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
