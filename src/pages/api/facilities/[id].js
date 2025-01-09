// pages/api/facilities/[id].js

import { PrismaClient } from "@prisma/client";

let prisma;

// Inisialisasi PrismaClient dengan pola singleton
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
  const { id } = req.query;

  console.log(`Received ${method} request at /api/facilities/${id}`);
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Database URL exists:", !!process.env.DATABASE_URL);

  const facilityId = id;

  if (!facilityId || typeof facilityId !== "string") {
    console.warn("Invalid facility ID provided");
    return res
      .status(400)
      .json({ success: false, error: "Invalid facility ID." });
  }

  // Validasi koneksi database sebelum operasi
  if (!(await validateDatabaseConnection())) {
    return res.status(500).json({
      success: false,
      error: "Database connection failed",
    });
  }

  switch (method) {
    case "GET":
      try {
        console.log(`Fetching facility with ID: ${facilityId}`);
        const facility = await prisma.facilities.findUnique({
          where: { facility_id: facilityId },
        });

        console.log("Raw facility data:", facility);

        if (!facility) {
          console.warn(`Facility not found with ID: ${facilityId}`);
          return res
            .status(404)
            .json({ success: false, error: "Facility not found." });
        }

        const responseData = {
          id: facility.facility_id,
          name: facility.facility_name,
          description: facility.facility_description,
          quantity: facility.facility_qty,
          roomId: facility.room_id,
        };

        console.log("Mapped facility data:", responseData);

        res.status(200).json({ success: true, data: responseData });
      } catch (error) {
        console.error("Detailed error in GET:", error);
        res.status(500).json({
          success: false,
          error: "Internal Server Error",
          details: error.message,
        });
      }
      break;

    case "PUT":
      try {
        console.log(`Updating facility with ID: ${facilityId}`);
        const { name, description, quantity, roomId } = req.body;

        console.log("Received update data:", {
          name,
          description,
          quantity,
          roomId,
        });

        if (!name || !description || !quantity || !roomId) {
          console.warn("Validation failed: Missing required fields for update");
          return res.status(400).json({
            success: false,
            error: "Name, description, quantity, roomId are required.",
          });
        }

        const updatedFacility = await prisma.facilities.update({
          where: { facility_id: facilityId },
          data: {
            facility_name: name,
            facility_description: description,
            facility_qty: quantity,
            room_id: roomId,
          },
        });

        console.log("Updated facility data:", updatedFacility);

        const mappedFacility = {
          id: updatedFacility.facility_id,
          name: updatedFacility.facility_name,
          description: updatedFacility.facility_description,
          quantity: updatedFacility.facility_qty,
          roomId: updatedFacility.room_id,
        };

        res.status(200).json({ success: true, data: mappedFacility });
      } catch (error) {
        console.error("Detailed error in PUT:", error);
        if (error.code === "P2025") {
          console.warn(`Facility not found for update with ID: ${facilityId}`);
          return res
            .status(404)
            .json({ success: false, error: "Facility not found." });
        }
        res.status(500).json({
          success: false,
          error: "Internal Server Error",
          details: error.message,
        });
      }
      break;

    case "DELETE":
      try {
        console.log(`Attempting to delete facility with ID: ${facilityId}`);

        // Validasi ID
        if (!facilityId || typeof facilityId !== "string") {
          console.warn("Invalid facility ID provided");
          return res.status(400).json({
            success: false,
            error: "Invalid facility ID",
          });
        }

        // Cari fasilitas berdasarkan ID
        const facility = await prisma.facilities.findUnique({
          where: { facility_id: facilityId },
        });
        console.log("Facility found:", facility);

        if (!facility) {
          console.warn(`Facility with ID ${facilityId} not found`);
          return res.status(404).json({
            success: false,
            error: `Facility with ID ${facilityId} not found`,
          });
        }

        // Hapus fasilitas
        await prisma.facilities.delete({
          where: { facility_id: facilityId },
        });

        console.log(`Facility with ID ${facilityId} deleted successfully`);
        return res.status(200).json({
          success: true,
          message: `Facility with ID ${facilityId} deleted successfully`,
        });
      } catch (error) {
        console.error("Delete operation failed:", {
          message: error.message,
          code: error.code,
          meta: error.meta,
        });
      }
      
      break;

    default:
      console.warn(
        `Method ${method} not allowed on /api/facilities/${facilityId}`
      );
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return res
        .status(405)
        .json({ success: false, error: `Method ${method} not allowed` });
  }
}
