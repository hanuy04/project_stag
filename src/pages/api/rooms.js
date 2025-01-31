import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function untuk menghasilkan room_id unik (5 karakter)
function generateRoomId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { room_category, is_class } = req.query;

      const whereCondition = {};
      if (is_class) whereCondition.is_class = is_class === "true";

      const rooms = await prisma.rooms.findMany({
        where: whereCondition,
        orderBy: { room_name: "asc" },
      });
      // return res.json(whereCondition)

      console.log("rooms: ", rooms);

      res.status(200).json({ rooms: rooms });
    } catch (error) {
      console.error("GET /api/rooms error:", error?.message);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else if (req.method === "POST") {
    const { name, isLocked } = req.body;

    // Validasi input
    if (typeof name !== "string" || typeof isLocked !== "boolean") {
      return res.status(400).json({ error: "Invalid input data" });
    }

    try {
      // Generate room_id unik
      let room_id;
      let isUnique = false;

      while (!isUnique) {
        room_id = generateRoomId();
        const existingRoom = await prisma.rooms.findUnique({
          where: { room_id },
        });
        if (!existingRoom) {
          isUnique = true;
        }
      }

      // Tetapkan room_status berdasarkan isLocked
      const room_status = isLocked ? "locked" : "available";

      // Tetapkan room_capacity (misalnya default 20)
      const room_capacity = 20;

      const newRoom = await prisma.rooms.create({
        data: {
          room_id,
          room_name: name,
          room_capacity,
          room_status,
        },
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
