// pages/api/facilities/index.js

import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// Fungsi validasi koneksi database
async function validateDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connection successful");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

export default async function handler(req, res) {
  const { method } = req;

  // Tambahkan logging untuk environment
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log(
    "DATABASE_URL:",
    process.env.DATABASE_URL?.substring(0, 20) + "..."
  ); // Hanya tampilkan awal URL untuk keamanan

  // Cek koneksi database dengan try-catch yang lebih detail
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });
    return res.status(500).json({
      success: false,
      error: "Database connection failed",
      details: error.message,
    });
  }

  switch (method) {
    case "GET":
      try {
        // Log setiap langkah
        console.log("Starting GET request...");

        // Coba query sederhana dulu
        const count = await prisma.facilities.count();
        console.log("Facility count:", count);

        // Jika berhasil, lanjut dengan query utama
        const facilities = await prisma.facilities.findMany({
          orderBy: { facility_name: "asc" },
        });

        console.log("Query successful, facility count:", facilities.length);

        const responseData = facilities.map((facility) => ({
          id: facility.facility_id,
          name: facility.facility_name,
          description: facility.facility_description,
          quantity: facility.facility_qty,
          roomId: facility.room_id,
        }));

        return res.status(200).json({ success: true, data: responseData });
      } catch (error) {
        console.error("GET request error:", {
          name: error.name,
          message: error.message,
          code: error.code,
          stack: error.stack,
        });

        return res.status(500).json({
          success: false,
          error: "Database query failed",
          details: error.message,
        });
      }
      break;

    case "POST":
      try {
        console.log("Starting facility creation...");
        const { name, description, quantity, roomId } = req.body;
        console.log("Received creation data:", {
          name,
          description,
          quantity,
          roomId,
        });

        if (!name || !description || !quantity || !roomId) {
          console.warn("Validation failed: Missing required fields");
          return res.status(400).json({
            success: false,
            error: "Name, description, quantity, roomId are required.",
          });
        }

        const newFacility = await prisma.facilities.create({
          data: {
            facility_id: generateFacilityId(),
            facility_name: name,
            facility_description: description,
            facility_qty: quantity,
            room_id: roomId,
          },
        });

        console.log("Created facility:", newFacility);

        const mappedFacility = {
          id: newFacility.facility_id,
          name: newFacility.facility_name,
          description: newFacility.facility_description,
          quantity: newFacility.facility_qty,
          roomId: newFacility.room_id,
        };

        console.log("Mapped new facility data:", mappedFacility);

        res.status(201).json({ success: true, data: mappedFacility });
      } catch (error) {
        console.error("Detailed error in POST:", error);
        res.status(500).json({
          success: false,
          error: "Internal Server Error",
          details: error.message,
        });
      }
      break;

    default:
      console.warn(`Method ${method} not allowed`);
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function generateFacilityId() {
  const randomNumber = Math.floor(100 + Math.random() * 900);
  return `F${randomNumber}`;
}
