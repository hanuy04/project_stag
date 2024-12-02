import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const reservations = await prisma.reservations.findMany();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else if (req.method === "POST") {
    try {
      const { tanggal, waktuMulai, waktuSelesai, ruangan, keperluan } =
        req.body;

      const room = await prisma.rooms.findFirst({
        where: { room_name: ruangan },
      });

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      const latestReservation = await prisma.reservations.findFirst({
        orderBy: { reservation_id: "desc" },
      });

      const nextReservationId = latestReservation
        ? `RE${(
            parseInt(latestReservation.reservation_id.replace("RE", "")) + 1
          )
            .toString()
            .padStart(3, "0")}`
        : "RE001";

      console.log(nextReservationId);

      const newReservation = await prisma.reservations.create({
        data: {
          username: "GR002",
          room_id: room.room_id,
          reservation_id: nextReservationId,
          start_time: new Date(`${tanggal}T${waktuMulai}:00`),
          end_time: new Date(`${tanggal}T${waktuSelesai}:00`),
          purpose: keperluan,
          status: "pending",
        },
      });

      res.status(201).json(newReservation);
    } catch (error) {
      res.status(500).json({ error: "Failed to insert data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
