import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log("a");
      // Mengambil semua fasilitas yang ada
      const facilities = await prisma.facilities.findMany();

      // Jika tidak ada fasilitas ditemukan, kirimkan error 404
      if (facilities.length === 0) {
        return res.status(404).json({ error: "No facilities found" });
      }

      const responseData = facilities.map((fas) => ({
        facility_id: fas.facility_id,
        facility_name: fas.facility_name,
        room_id: fas.room_id,
      }));

      console.log(responseData);

      res.status(200).json({ facilities: responseData });
    } catch (error) {
      console.error("GET /api/facilities error:", error?.message);
      res.status(500).json({ error: "Failed to fetch facilities" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
