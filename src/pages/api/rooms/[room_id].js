// pages/api/rooms/[room_id].js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { room_id },
    method,
  } = req;

  if (!room_id) {
    return res.status(400).json({ error: "Room ID is required" });
  }

  if (method === "GET") {
    // Optional: Implement GET specific room if needed
    try {
      const room = await prisma.rooms.findUnique({
        where: { room_id },
      });

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      res.status(200).json(room);
    } catch (error) {
      console.error(`GET /api/rooms/${room_id} error:`, error);
      res.status(500).json({ error: "Failed to fetch room" });
    }
  } else if (method === "PUT") {
    const { name, isLocked } = req.body;

    // Input validation
    if (typeof name !== "string" || typeof isLocked !== "boolean") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    try {
      // Find the room to update
      const existingRoom = await prisma.rooms.findUnique({
        where: { room_id },
      });

      if (!existingRoom) {
        return res.status(404).json({ error: "Room not found" });
      }

      // Determine room_status based on isLocked
      const room_status = isLocked ? "locked" : "available";

      // Update room data
      const updatedRoom = await prisma.rooms.update({
        where: { room_id },
        data: {
          room_name: name.trim(),
          room_status,
        },
      });

      res.status(200).json(updatedRoom);
    } catch (error) {
      console.error(`PUT /api/rooms/${room_id} error:`, error);
      res.status(500).json({ error: "Failed to update room" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
