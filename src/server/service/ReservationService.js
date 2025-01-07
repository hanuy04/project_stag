import prisma from "../db/prisma";

export default {
  getUserReservations: async (username, limit, offset) => {
    const peminjaman = await prisma.reservations.findMany({
      where: {
        username: username,
      },
    });

    return peminjaman;
  },

  getReservationGroupByRoom: async () => {
    try {
      const peminjaman = await prisma.rooms.findMany({
        where: {
          reservations: {
            some: {
              status_sarpras: "pending",
            },
          },
        },
        include: {
          reservations: {
            where: {
              status_sarpras: "pending",
            },
            include: {
              users: {
                include: {
                  rooms: true,
                },
              },
            },
          },
        },
      });

      return peminjaman;
    } catch (error) {
      console.log(error.message);
    }
  },

  createReservation: async (data) => {
    try {
      const newReservation = {
        username: data.username,
        room_id: data.room_id,
        start_time: data.start_time,
        end_time: data.end_time,
        purpose: data.purpose,
        status_sarpras: "approved",
      };

      await prisma.reservations.create({
        data: newReservation,
      });
    } catch (e) {}
  },
};
