import prisma from "../../server/db/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Query complaints dengan status "unresolved" atau "still resolving"
    const complains = await prisma.complains.findMany({
      where: {
        status: {
          in: ["unresolved", "still_resolving"], // Perbaikan: enum sesuai mapping
        },
      },
      select: {
        created_at: true,
        description: true,
        status: true,
        room_facilities: {
          // Nama relasi sesuai dengan schema
          select: {
            facilities: {
              select: { facility_name: true },
            },
            rooms: {
              select: { room_name: true },
            },
          },
        },
      },
    });

    console.log("Complaints fetched:", complains);

    // Periksa apakah data ditemukan
    if (!complains.length) {
      return res.status(404).json({ error: "No complaints found" });
    }

    // Buat response data
    const responseData = complains.map((com) => {
      const statusParts = com.status.split("_");
      const status1 = statusParts[0];
      const status2 = statusParts[1];

      return {
        date: com.created_at,
        fasilitas: com.room_facilities.facilities.facility_name,
        ruangan: com.room_facilities.rooms.room_name,
        description: com.description,
        status: { status1, status2 },
      };
    });

    // Response dengan data complaints
    res.status(200).json({ complaints: responseData });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({
      error: "Failed to fetch complaints",
      message: error.message,
      stack: error.stack,
    });
  }
}
