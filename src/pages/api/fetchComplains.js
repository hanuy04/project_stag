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
        complain_id: true,
        created_at: true,
        description: true,
        status: true,
        // room_facilities: {
        //   select: {
        //     room_id: true, // Mengambil room_id dari room_facilities
        //     facility_id: true, // Mengambil facility_id dari room_facilities
        //     rooms: {
        //       select: { room_name: true }, // Mengambil room_name dari rooms
        //     },
        //     facilities: {
        //       select: { facility_name: true }, // Mengambil facility_name dari facilities
        //     },
        //   },
        // },
      },
    });

    // console.log("Complaints fetched:", complains);

    // Check if complains is null or empty
    if (!complains || complains.length === 0) {
      return res.status(404).json({ error: "No complaints found" });
    }

    // Map the complaints to the response format
    const responseData = complains.map((com) => {
      // const statusParts = com.status.split("_");
      // const status1 = statusParts[0]; // Always exists
      // const status2 = statusParts.length > 1 ? statusParts[1] : ""; // Handle cases where there's only one word

      return {
        complain_id: com.complain_id,
        date: com.created_at,
        // fasilitas: com.room_facilities.facilities.facility_name,
        // ruangan: com.room_facilities.rooms.room_name,
        description: com.description,
        status: com.status,
      };
    });

    // Return the response with the data
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
