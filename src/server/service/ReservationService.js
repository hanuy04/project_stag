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
              users: true
            },
          },
        },
      });

      return peminjaman;
    } catch (error) {
      console.log(error.message);
      
    }
  },
};
