"use client";
import { generateName } from "@/lib/randomNames";
import { useRoomStore } from "@/store/room";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Dashboard } from "./dashboard/Dashboard";
import { WebSocketManager } from "./room/WebSocketManager";

interface NewSyncerProps {
  roomId: string;
}

// Main component has been refactored into smaller components
export const NewSyncer = ({ roomId }: NewSyncerProps) => {
  const setUsername = useRoomStore((state) => state.setUsername);
  const setRoomId = useRoomStore((state) => state.setRoomId);
  const username = useRoomStore((state) => state.username);

  // Generate a new random username when the component mounts
  useEffect(() => {
    setRoomId(roomId);
    if (!username) {
      setUsername(generateName());
    }
  }, [setUsername, username, roomId, setRoomId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* WebSocket connection manager (non-visual component) */}
      <WebSocketManager roomId={roomId} username={username} />

      {/* Spatial audio background effects */}
      {/* <SpatialAudioBackground /> */}

      <Dashboard roomId={roomId} />
    </motion.div>
  );
};
