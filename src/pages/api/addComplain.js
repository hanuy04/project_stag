import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js bodyParser so we can use formidable
  },
};

const prisma = new PrismaClient();

// Function to generate complaint ID
function generateComplaintId(latestComplaint) {
  return latestComplaint
    ? `C${(parseInt(latestComplaint.complain_id.replace("C", "")) + 1)
        .toString()
        .padStart(3, "0")}`
    : "C001";
}

export default async function handler(req, res) {
  // Handle only POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Create a new instance of formidable to parse the form data
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public/uploads/complaints");
  form.keepExtensions = true;
  form.maxFileSize = 5 * 1024 * 1024; // 5 MB limit for file uploads

  // Ensure the upload directory exists
  const uploadDir = path.join(process.cwd(), "public/uploads/complaints");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Parse the form data
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(400).json({ error: "Failed to upload file." });
    }

    const { ruangan, fasilitas, keluhan, deskripsi } = fields;
    const photo = files.photo;

    // Check if all required fields are provided
    if (!ruangan || !fasilitas || !keluhan || !deskripsi || !photo) {
      return res.status(400).json({ error: "All fields are required." });
    }

    console.log("a");

    try {
      // Ensure room_facility exists
      const classroomFacility = await prisma.room_facilities.findFirst({
        where: { room_id: ruangan, facility_id: fasilitas },
      });

      if (!classroomFacility) {
        return res.status(404).json({ error: "Room facility not found." });
      }

      console.log("b");

      // Generate the next complain ID
      const latestComplaint = await prisma.complains.findFirst({
        orderBy: { complain_id: "desc" },
      });

      const nextComplaintId = generateComplaintId(latestComplaint);

      // Move the uploaded file to the specified directory
      const oldPath = photo.filepath;
      const newPath = path.join(
        uploadDir,
        path.basename(photo.originalFilename)
      );

      fs.renameSync(oldPath, newPath); // Move the file to the new path

      console.log("c");

      // Save complaint data
      const lampiran = `/uploads/complaints/${path.basename(
        photo.originalFilename
      )}`;

      console.log(lampiran);

      const newComplaint = await prisma.complains.create({
        data: {
          complain_id: nextComplaintId,
          username: "MR003", // Dynamic if needed
          classroom_facilities_id: classroomFacility.room_facilities_id,
          complaint: keluhan,
          description: deskripsi,
          created_at: new Date(),
          status: "unresolved",
          lampiran: lampiran,
        },
      });

      console.log("d");

      return res.status(201).json(newComplaint);
    } catch (error) {
      console.error("Error creating complaint:", error.message);
      return res.status(500).json({ error: "Failed to create complaint." });
    }
  });
}
