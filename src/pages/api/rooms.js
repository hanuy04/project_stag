import prisma from "../../server/db/prisma";

export default async function handler(req, res) {
  try {
    const today = new Date();
    const dayStart = new Date(today.setHours(0, 0, 0, 0)); // Start of the day
    const dayEnd = new Date(today.setHours(23, 59, 59, 999)); // End of the day

    // Query the rooms along with their reservations
    const roomsData = await prisma.room.findMany({
      include: {
        reservations: {
          where: {
            startTime: { gte: dayStart },
            endTime: { lte: dayEnd },
            status: "approved", // Only approved reservations
          },
          include: {
            user: { select: { username: true, name: true } },
          },
          orderBy: {
            startTime: "asc",
          },
        },
      },
    });

    if (rooms.length === 0) {
      return <div>No rooms available for today.</div>;
    }

    // Send the rooms data with reservations for today
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
