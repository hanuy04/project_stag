import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const rooms = await prisma.room.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(rooms);
    } catch (error) {
      console.error("GET /api/rooms error:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else if (req.method === "POST") {
    const { name, isLocked } = req.body;

    // Validasi input
    if (typeof name !== "string" || typeof isLocked !== "boolean") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    try {
      const newRoom = await prisma.room.create({
        data: { name, isLocked },
      });
      res.status(201).json(newRoom);
    } catch (error) {
      console.error("POST /api/rooms error:", error);
      res.status(500).json({ error: "Failed to create room" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
