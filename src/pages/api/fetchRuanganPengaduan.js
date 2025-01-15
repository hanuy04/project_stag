import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Mengambil semua fasilitas yang ada
      const rooms = await prisma.rooms.findMany({
        where: {
          room_status: "available",
        },
      });

      // Jika tidak ada fasilitas ditemukan, kirimkan error 404
      if (rooms.length === 0) {
        return res.status(404).json({ error: "No rooms found" });
      }

      const responseData = rooms.map((room) => ({
        room_id: room.room_id,
        room_name: room.room_name,
        room_capacity: room.room_capacity,
        room_category: room.room_category,
        room_status: room.room_status,
      }));

      console.log(responseData);

      res.status(200).json({ rooms: responseData });
    } catch (error) {
      console.error("GET /api/rooms error:", error?.message);
      res.status(500).json({ error: "Failed to fetch rooms" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
