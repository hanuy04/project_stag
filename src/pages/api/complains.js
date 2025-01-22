import prisma from "../../server/db/prisma";

export default async function handler(req, res) {
    if (req.method !== "GET")
        return res.status(405).json({ error: "Method not allowed" });

    const { username } = req.query;

    try {
        const complains = await prisma.complains.findMany({
            where: {
                username: username,
            },
            include: {
                users: true,
                room_facilities: {
                    include: {
                        rooms: true,
                        facilities: true
                    }
                }
            },
            take: 3,
            orderBy: {
                created_at: "desc"
            }

        });


        res.status(200).json(complains);
    } catch (error) {
        console.error("Error fetching complaints:", error.message);
        res.status(500).json({ error: "Failed to fetch complaints" });
    }
}
