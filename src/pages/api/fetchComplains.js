import prisma from "../../server/db/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const complains = await prisma.complains.findMany({
      where: {
        status: { in: ["unresolved", "still_resolving"] },
      },
      select: {
        complain_id: true,
        created_at: true,
        description: true,
        status: true,
        room_facilities: {
          select: {
            facilities: { select: { facility_name: true } },
            rooms: {
              select: { room_name: true },
            },
          },
        },
      },
    });

    if (!complains.length)
      return res.status(404).json({ error: "No complaints found" });

    const responseData = complains.map((com) => ({
      complain_id: com.complain_id,
      date: com.created_at,
      fasilitas: com.room_facilities.facilities.facility_name,
      ruangan: com.room_facilities.rooms.room_name,
      description: com.description,
      status: com.status,
    }));

    res.status(200).json({ complaints: responseData });
  } catch (error) {
    console.error("Error fetching complaints:", error.message);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
}
