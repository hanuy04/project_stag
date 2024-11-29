import prisma from "../../server/db/prisma";

export default async function handler(req, res) {
  try {
    const today = new Date();
    const dayStart = new Date(today.setHours(0, 0, 0, 0)); // Start of the day
    const dayEnd = new Date(today.setHours(23, 59, 59, 999)); // End of the day

    // Query the rooms along with their reservations
    const roomsData = await prisma.room.findMany({
      where: {
        name: {
          in: [
            "Ruang X-1",
            "Ruang X-2",
            "Ruang X-3",
            "Ruang X-4",
            "Ruang X-5",
            "Ruang X-6",
          ],
        },
      },
      select: {
        id: true,
        name: true, // Field `room_name` diakses menggunakan alias Prisma `name`
        reservations: {
          where: {
            startTime: { gte: dayStart },
            endTime: { lte: dayEnd },
            status: "approved", // Hanya reservasi yang disetujui
          },
          select: {
            startTime: true,
            endTime: true,
            user: { select: { username: true, name: true } },
          },
          orderBy: {
            startTime: "asc",
          },
        },
      },
    });

    // Kirim data rooms dengan reservations
    res.status(200).json(roomsData);
  } catch (error) {
    console.error("Error fetching rooms data:", error);
    res.status(500).json({
      error: "Failed to fetch rooms",
      message: error.message,
      stack: error.stack,
    });
  }
}
