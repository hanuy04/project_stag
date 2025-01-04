import prisma from "../../server/db/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { kategori } = req.query;
  console.log("API: Mendapatkan kategori ruangan: ", kategori);

  try {
    const today = new Date();
    const dayStart = new Date(today.setHours(14, 0, 0, 0));
    const dayEnd = new Date(today.setHours(23, 59, 59, 999));
    console.log("Date range:", dayStart, dayEnd);

    // console.log("sini");

    // console.log("Kategori:", kategori);
    // console.log("Querying rooms with conditions:", {
    //   room_name: `Ruang ${kategori}`,
    //   room_status: "available",
    // });

    // Query rooms berdasarkan kategori dan status "available"
    const roomsData = await prisma.rooms.findMany({
      where: {
        room_name: { contains: `Ruang ${kategori}` },
        room_status: "available",
      },
      select: {
        room_id: true,
        room_name: true,
        reservations: {
          where: {
            start_time: { gte: dayStart },
            end_time: { lte: dayEnd },
            status_sarpras: "approved",
          },
          select: {
            start_time: true,
            end_time: true,
            purpose: true,
            users: { select: { username: true, name: true } },
          },
        },
      },
    });

    console.log(roomsData);

    if (!roomsData || roomsData.length === 0) {
      return res.status(404).json({ error: "No rooms found" });
    }

    // Format data untuk dikirimkan ke frontend
    const responseData = roomsData.map((room) => ({
      room_id: room.room_id,
      room_name: room.room_name,
      reservations: room.reservations.map((reservation) => ({
        start_time: reservation.start_time,
        end_time: reservation.end_time,
        purpose: reservation.purpose,
        users: reservation.users,
      })),
    }));

    // Kirimkan response dengan data ruangan dan reservasi
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
