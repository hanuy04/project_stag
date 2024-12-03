import prisma from "../../server/db/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { complain_id, status } = req.body;

    console.log("Received data:", { complain_id, status });

    if (!complain_id || !status) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    try {
      const result = await prisma.complains.update({
        where: { complain_id: complain_id },
        data: { status },
      });

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error("Error updating complaint:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
