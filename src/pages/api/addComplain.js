import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { ruangan, fasilitas, keluhan, deskripsi } = req.body;

    if (!ruangan || !fasilitas || !keluhan || !deskripsi) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      // const room = await prisma.rooms.findFirst({
      //   where: { room_name: ruangan },
      // });

      // if (!room) {
      //   return res.status(404).json({ error: "Room not found." });
      // }

      // const facility = await prisma.facilities.findFirst({
      //   where: { name: fasilitas },
      // });

      // if (!facility) {
      //   return res.status(404).json({ error: "Facility not found." });
      // }

      console.log("Input ruangan:", ruangan);
      console.log("Input fasilitas:", fasilitas);

      const classroom_facility = await prisma.room_facilities.findFirst({
        where: { room_id: ruangan, facility_id: fasilitas },
        select: {
          room_facilities_id: true,
        },
      });

      if (!classroom_facility) {
        return res.status(404).json({ error: "Room facility not found." });
      }

      const latestComplaint = await prisma.complains.findFirst({
        orderBy: { complain_id: "desc" },
      });

      const nextComplaintId = latestComplaint
        ? `C${(parseInt(latestComplaint.complain_id.replace("C", "")) + 1)
            .toString()
            .padStart(4, "0")}`
        : "C0001";

      const newComplaint = await prisma.complains.create({
        data: {
          complain_id: nextComplaintId,
          username: "MR003",
          classroom_facilities_id: classroom_facility.room_facilities_id,
          complaint: keluhan,
          description: deskripsi,
          created_at: new Date(),
          status: "unresolved",
        },
      });

      console.log("New complaint created:", newComplaint);
      return res.status(201).json(newComplaint);
    } catch (error) {
      console.error("Error creating complaint:", error.message);
      return res
        .status(500)
        .json({ error: "Failed to create complaint", details: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
