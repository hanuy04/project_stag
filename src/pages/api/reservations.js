import prisma from "../../server/db/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { kategori } = req.query;
  console.log("api get the category: ", kategori);

  try {
    const today = new Date();
    const dayStart = new Date(today.setHours(0, 0, 0, 0));
    const dayEnd = new Date(today.setHours(23, 59, 59, 999));
    // console.log(dayStart, " - ", dayEnd);

    // Query the rooms along with their reservations
    const roomsData = await prisma.rooms.findMany({
      where: {
        room_name: {
          contains: `Ruang ${kategori}`,
        },
        room_status: "available",
      },
      select: {
        room_id: true,
        room_name: true,
        reservations: {
          where: {
            start_time: { gte: dayStart },
            end_time: { lte: dayEnd },
            status: "approved", // Ensure we're only getting approved reservations
          },
          select: {
            start_time: true,
            end_time: true,
            purpose: true,
            users: { select: { username: true, name: true } },
          },
          orderBy: {
            start_time: "asc", // Sort by start time for reservations
          },
        },
      },
    });

    if (!roomsData || roomsData.length === 0) {
      return res.status(404).json({ error: "No rooms found" });
    }

    // console.log("roomsData with reservations:", roomsData);

    // Pastikan tidak ada data yang null atau tidak sesuai
    const responseData = roomsData.map((room) => ({
      room_id: room.room_id,
      room_name: room.room_name,
      reservations: room.reservations.map((reservation) => ({
        start_time: reservation.start_time,
        end_time: reservation.end_time,
        users: reservation.users,
        purpose: reservation.purpose,
      })),
    }));

    // Kirimkan data sebagai objek JSON tanpa perlu stringify
    res.status(200).json({ rooms: responseData });
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({
      error: "Failed to fetch rooms",
      message: error.message,
      stack: error.stack,
    });
  }
}
