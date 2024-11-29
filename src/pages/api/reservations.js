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

    // Query the rooms along with their reservations
    const roomsData = await prisma.room.findMany({
      where: {
        name: {
          contains: `Ruang ${kategori}`,
        },
      },
      select: {
        id: true,
        name: true,
        reservations: {
          where: {
            startTime: { gte: dayStart },
            endTime: { lte: dayEnd },
            status: "approved", // Ensure we're only getting approved reservations
          },
          select: {
            startTime: true,
            endTime: true,
            purpose: true,
            user: { select: { username: true } },
          },
          orderBy: {
            startTime: "asc", // Sort by start time for reservations
          },
        },
      },
    });

    if (!roomsData || roomsData.length === 0) {
      return res.status(404).json({ error: "No rooms found" });
    }

    // Pastikan tidak ada data yang null atau tidak sesuai
    const responseData = roomsData.map((room) => ({
      id: room.id,
      name: room.name,
      class: room.class,
      reservations: room.reservations.map((reservation) => ({
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        user: reservation.user,
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
