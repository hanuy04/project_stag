import prisma from "../db/prisma";

export default {
  getRooms: async () => {
    try {
      const rooms = await prisma.rooms.findMany();
      return {
        success: true,
        rooms,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  },
  getRoomsGroupByCategory: async () => {
    try {
      const categories = await prisma.room_categories.findMany({
        include: {
          rooms: true,
        },
      });
      return {
        success: true,
        categories,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  },
};
