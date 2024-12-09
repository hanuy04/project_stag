import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const reservations = await prisma.reservations.findMany();
      res.status(200).json(reservations);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch data", details: error.message });
    }
  } else if (req.method === "POST") {
    const { tanggal, waktuMulai, waktuSelesai, ruangan, keperluan, teacher } =
      req.body;
    console.log(req.body);

    // Validate required fields
    if (!tanggal || !waktuMulai || !waktuSelesai || !ruangan || !keperluan) {
      return res
        .status(400)
        .json({ error: "All fields are required except teacher." });
    }

    // Find the room by ID
    const room = await prisma.rooms.findFirst({
      where: { room_name: ruangan },
    });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    console.log(room);
    let teacherData = null;
    if (teacher) {
      teacherData = await prisma.users.findUnique({
        where: { username: teacher },
      });
      if (!teacherData && teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
    }
    console.log(teacher);

    // Generate next reservation ID
    const latestReservation = await prisma.reservations.findFirst({
      orderBy: { reservation_id: "desc" },
    });
    const nextReservationId = latestReservation
      ? `RE${(parseInt(latestReservation.reservation_id.replace("RE", "")) + 1)
          .toString()
          .padStart(3, "0")}`
      : "RE001";

    console.log(nextReservationId);
    console.log(room.room_id);

    const newReservationData = {
      reservation_id: nextReservationId,
      username: "MR001", // Assuming this is dynamic in production
      room_id: room.room_id,
      start_time: new Date(`${tanggal}T${waktuMulai}:00`),
      end_time: new Date(`${tanggal}T${waktuSelesai}:00`),
      purpose: keperluan,
      status: "pending",
      teacher_assistant: teacher || null,
    };
    console.log(teacher);
    console.log("Payload for Prisma:", newReservationData);

    try {
      const newReservation = await prisma.reservations.create({
        data: newReservationData,
      });
      console.log(newReservation);

      return res.status(201).json(newReservation);
    } catch (error) {
      console.log("Error creating reservation:", error.message);
      res
        .status(500)
        .json({ error: "Failed to insert data", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
