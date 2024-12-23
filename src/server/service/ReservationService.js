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
    const peminjaman = await prisma.rooms.findMany({
      where: {
        reservations: {
          some: {
            status: "pending",
          },
        },
      },
      include: {
        reservations: {
          where: {
            status: "pending",
          },
          include:{
            users: {
              include :{
                students : true
              }
            }
          }
        },
      },
    });

    return peminjaman;
  },
};
