"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowRight } from "lucide-react";
import type { DiscussionEntry } from "@/lib/types";
import { getAgentColor, getAgentEmoji, relativeTime } from "@/lib/utils";

interface ActivityFeedProps {
  entries: DiscussionEntry[];
  loading: boolean;
}

function AgentAvatar({ name, size = 24 }: { name: string; size?: number }) {
  const agents = name.split(",")[0].trim();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `${getAgentColor(agents)}20`,
        border: `1.5px solid ${getAgentColor(agents)}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.5,
        flexShrink: 0,
      }}
    >
      {getAgentEmoji(agents)}
    </div>
  );
}

function FeedEntry({ entry, index }: { entry: DiscussionEntry; index: number }) {
  const fromColor = getAgentColor(entry.from);
  const toList = entry.to.split(",").map(t => t.trim());

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
      style={{
        display: "flex",
        gap: 10,
        padding: "12px 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Timeline dot + avatar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <AgentAvatar name={entry.from} size={28} />
        {index < 10 && (
          <div
            style={{
              width: 1,
              flexGrow: 1,
              background: "rgba(255,255,255,0.05)",
              marginTop: 6,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: fromColor, textTransform: "capitalize" }}>
            {entry.from}
          </span>
          <ArrowRight size={10} style={{ color: "#444" }} />
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {toList.map(t => (
              <span
                key={t}
                style={{
                  fontSize: 10,
                  color: getAgentColor(t),
                  fontWeight: 600,
                  textTransform: "capitalize",
                  background: `${getAgentColor(t)}15`,
                  padding: "1px 5px",
                  borderRadius: 4,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 10, color: "#444", marginLeft: "auto" }}>
            {relativeTime(entry.timestamp)}
          </span>
        </div>

        {/* Subject */}
        <div style={{ fontSize: 12, fontWeight: 600, color: "#ccc", marginBottom: 3 }}>
          {entry.subject}
        </div>

        {/* Content preview */}
        <div
          style={{
            fontSize: 11,
            color: "#666",
            lineHeight: 1.5,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {entry.content}
        </div>
      </div>
    </motion.div>
  );
}

function FeedSkeleton() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 10,
            padding: "12px 0",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.04)", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 12, background: "rgba(255,255,255,0.04)", borderRadius: 4, width: "60%", marginBottom: 6 }} />
            <div style={{ height: 10, background: "rgba(255,255,255,0.03)", borderRadius: 4, width: "80%", marginBottom: 4 }} />
            <div style={{ height: 10, background: "rgba(255,255,255,0.02)", borderRadius: 4, width: "40%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ActivityFeed({ entries, loading }: ActivityFeedProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f5f5f5", display: "flex", alignItems: "center", gap: 6 }}>
          <MessageSquare size={15} style={{ color: "#E8601C" }} />
          Activité
        </h2>
        <span style={{ fontSize: 11, color: "#444" }}>
          {entries.length} messages
        </span>
      </div>

      <div style={{ overflowY: "auto", flex: 1 }}>
        {loading && entries.length === 0 ? (
          <FeedSkeleton />
        ) : entries.length === 0 ? (
          <div style={{ textAlign: "center", color: "#333", fontSize: 12, padding: "40px 0" }}>
            Aucune activité récente
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {entries.map((entry, i) => (
              <FeedEntry key={entry.id} entry={entry} index={i} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
