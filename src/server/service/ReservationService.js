import prisma from "../db/prisma";

export default {
  getUserReservations: async (username, limit, offset) => {

    const peminjaman = await prisma.reservations.findMany({
        where :{
            username : username,
        }
    })

    return peminjaman

  },
};
