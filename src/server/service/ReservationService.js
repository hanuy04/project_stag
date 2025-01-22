import prisma from "../db/prisma";

export default {
  getUserReservations: async (username = {}) => {
    try {
      const peminjaman = await prisma.reservations.findMany({
        where: {
          username: username
        },
        include: {
          users: true, 
          rooms: true, 
          reservation_teacher : true
        },
        orderBy: { reservation_id: "desc" },
        take: 3
      });
      return peminjaman;
    } catch (e) {
      return {
        message: e.message
      }
    }
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
    } catch (e) { }
  },
};
