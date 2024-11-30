import prisma from "../db/prisma";

export default {
  login: async (username, password) => {
    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (user) {
      if (user.password != password) {
        return {
          success: false,
          error: "Invalid credentials",
        };
      }

      return {
        success: true,
        user: user,
      };
    }

    return {
      success: false,
      error: "Invalid credentials",
    };
  },
};
