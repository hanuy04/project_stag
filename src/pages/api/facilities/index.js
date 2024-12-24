import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function untuk menghasilkan room_id unik (5 karakter)
// function generateRoomId() {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let result = "";
//   for (let i = 0; i < 5; i++) {
//     result += chars.charAt(Math.floor(Math.random() * chars.length));
//   }
//   return result;
// }

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const facilities = await prisma.facilities.findMany({
        orderBy: { facility_name: "asc" },
      });

      const responseData = facilities.map((facility) => ({
        facility_id: facility.facility_id,
        facility_name: facility.facility_name,
        facility_description: facility.facility_description,
        facility_qty: facility.facility_qty,
        room_id: facility.room_id,
      }));

      console.log("facilities: ", responseData);

      res.status(200).json({ facilities: responseData });
    } catch (error) {
      console.error("GET /api/facilities error:", error);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  }
  //   else if (req.method === "POST") {
  //     const { name, isLocked } = req.body;

  //     // Validasi input
  //     if (typeof name !== "string" || typeof isLocked !== "boolean") {
  //       return res.status(400).json({ error: "Invalid input data" });
  //     }

  //     try {
  //       // Generate room_id unik
  //       let room_id;
  //       let isUnique = false;

  //       while (!isUnique) {
  //         room_id = generateRoomId();
  //         const existingRoom = await prisma.rooms.findUnique({
  //           where: { room_id },
  //         });
  //         if (!existingRoom) {
  //           isUnique = true;
  //         }
  //       }

  //       // Tetapkan room_status berdasarkan isLocked
  //       const room_status = isLocked ? "locked" : "available";

  //       // Tetapkan room_capacity (misalnya default 20)
  //       const room_capacity = 20;

  //       const newRoom = await prisma.rooms.create({
  //         data: {
  //           room_id,
  //           room_name: name,
  //           room_capacity,
  //           room_status,
  //         },
  //       });
  //       res.status(201).json(newRoom);
  //     } catch (error) {
  //       console.error("POST /api/rooms error:", error);
  //       res.status(500).json({ error: "Failed to create room" });
  //     }
  //   } else {
  //     res.setHeader("Allow", ["GET", "POST"]);
  //     res.status(405).end(`Method ${req.method} Not Allowed`);
  //   }

  //ini bagian jopi

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const facilities = await prisma.facility.findMany({
          orderBy: { createdAt: 'desc' },
        });
        res.status(200).json({ success: true, data: facilities });
      } catch (error) {
        console.error('Error fetching facilities:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
      break;
    case 'POST':
      try {
        const { name, category } = req.body;
        if (!name || !category) {
          return res.status(400).json({ success: false, error: 'Name and category are required.' });
        }

        const newFacility = await prisma.facility.create({
          data: { name, category },
        });

        res.status(201).json({ success: true, data: newFacility });
      } catch (error) {
        console.error('Error adding facility:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
