"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import MetricsBar from "@/components/MetricsBar";
import KanbanBoard from "@/components/KanbanBoard";
import AgentsPanel from "@/components/AgentsPanel";
import ActivityFeed from "@/components/ActivityFeed";
import CronPanel from "@/components/CronPanel";
import type { BoardData, AgentStatus, DiscussionEntry, CronJob } from "@/lib/types";

const POLL_INTERVAL = 5000; // 5 seconds

export default function Home() {
  const [board, setBoard] = useState<BoardData | null>(null);
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [discussions, setDiscussions] = useState<DiscussionEntry[]>([]);
  const [crons, setCrons] = useState<CronJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchAll = useCallback(async () => {
    try {
      const [boardRes, agentsRes, discussionsRes, cronsRes] = await Promise.all([
        fetch("/api/board"),
        fetch("/api/agents"),
        fetch("/api/discussions"),
        fetch("/api/crons"),
      ]);

      if (boardRes.ok) {
        const data = await boardRes.json();
        setBoard(data);
      }
      if (agentsRes.ok) {
        const data = await agentsRes.json();
        setAgents(data.agents);
      }
      if (discussionsRes.ok) {
        const data = await discussionsRes.json();
        setDiscussions(data.entries);
      }
      if (cronsRes.ok) {
        const data = await cronsRes.json();
        setCrons(data.crons);
      }

      setLastRefresh(new Date());
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchAll]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
      }}
      className="grid-bg"
    >
      {/* Ambient glow top */}
      <div
        style={{
          position: "fixed",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(ellipse, rgba(232,96,28,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header / Metrics Bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
        <MetricsBar board={board} agents={agents} lastRefresh={lastRefresh} />
      </div>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: "20px 16px",
          maxWidth: "1920px",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 20,
          }}
        >
          {/* === ROW 1: Kanban (full width) === */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16,
              padding: "20px",
            }}
          >
            <KanbanBoard board={board} loading={loading} />
          </motion.section>

          {/* === ROW 2: Agents + Activity + Crons === */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr 280px",
              gap: 20,
            }}
            className="responsive-grid"
          >
            {/* Agents Panel */}
            <motion.section
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "20px",
              }}
            >
              <AgentsPanel agents={agents} loading={loading} />
            </motion.section>

            {/* Activity Feed */}
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "20px",
                maxHeight: 520,
                overflowY: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ActivityFeed entries={discussions} loading={loading} />
            </motion.section>

            {/* Cron Jobs */}
            <motion.section
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "20px",
              }}
            >
              <CronPanel crons={crons} loading={loading} />
            </motion.section>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            textAlign: "center",
            marginTop: 32,
            paddingBottom: 16,
            color: "#2a2a2a",
            fontSize: 11,
            letterSpacing: "0.5px",
          }}
        >
          MISSION CONTROL V9 · FORGE IA · POLLING {POLL_INTERVAL / 1000}S
        </motion.div>
      </main>

      <style>{`
        @media (max-width: 1100px) {
          .responsive-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          main {
            padding: 10px 6px !important;
          }
        }
        @media (max-width: 480px) {
          main {
            padding: 8px 4px !important;
          }
        }
      `}</style>
    </div>
  );
}
