// pages/api.rooms.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function untuk menghasilkan room_id unik (3 digit setelah 'R')
async function generateSequentialRoomId() {
  const lastRoom = await prisma.rooms.findFirst({
    orderBy: {
      room_id: 'desc',
    },
  });

  let newIdNumber = 1;
  if (lastRoom) {
    const lastIdNumber = parseInt(lastRoom.room_id.slice(1), 10);
    newIdNumber = lastIdNumber + 1;
  }

  return `R${newIdNumber.toString().padStart(3, '0')}`;
}

export default async function handler(req, res) {
  const { method, url } = req;
  
  // Parsing URL untuk mendapatkan room_id jika ada
  const urlParts = url.split('/');
  const roomId = urlParts.length > 3 ? urlParts[3] : null; // Asumsi /api/rooms/{room_id}

  if (url.startsWith('/api/rooms') && !roomId) {
    // Handle /api/rooms
    if (method === "GET") {
      try {
        const rooms = await prisma.rooms.findMany({
          orderBy: { room_name: "asc" },
        });

        // const responseData = rooms.map((room) => ({
        //   room_id: room.room_id,
        //   room_name: room.room_name,
        //   room_capacity: room.room_capacity,
        //   room_status: room.room_status,
        // }));
        

        console.log("rooms: ", rooms);

        res.status(200).json({ rooms: rooms});
        
      } catch (error) {
        console.error("GET /api/rooms error:", error.message);
        res.status(500).json({ error: "Failed to fetch data" });
      }
    } else if (method === "POST") {
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
          room_id = await generateSequentialRoomId();
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
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else if (url.startsWith('/api/rooms') && roomId) {
    // Handle /api/rooms/{room_id}
    if (method === "PUT") {
      const { name, isLocked } = req.body;

      // Validasi input
      if (typeof name !== "string" || typeof isLocked !== "boolean") {
        return res.status(400).json({ error: "Invalid input data" });
      }

      try {
        // Temukan ruangan yang akan diperbarui
        const existingRoom = await prisma.rooms.findUnique({
          where: { room_id: roomId },
        });

        if (!existingRoom) {
          return res.status(404).json({ error: "Room not found" });
        }

        // Tentukan status ruangan berdasarkan isLocked
        const room_status = isLocked ? "locked" : "available";

        // Perbarui data ruangan
        const updatedRoom = await prisma.rooms.update({
          where: { room_id: roomId },
          data: {
            room_name: name.trim(),
            room_status,
          },
        });

        res.status(200).json(updatedRoom);
      } catch (error) {
        console.error(`PUT /api/rooms/${roomId} error:`, error);
        res.status(500).json({ error: "Failed to update room" });
      }
    } else if (method === "GET") {
      // Opsional: Implementasikan GET spesifik untuk room_id jika diperlukan
      try {
        const room = await prisma.rooms.findUnique({
          where: { room_id: roomId },
        });

        if (!room) {
          return res.status(404).json({ error: "Room not found" });
        }

        res.status(200).json(room);
      } catch (error) {
        console.error(`GET /api/rooms/${roomId} error:`, error);
        res.status(500).json({ error: "Failed to fetch room" });
      }
    } else {
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(404).json({ error: "Not Found" });
  }
}
