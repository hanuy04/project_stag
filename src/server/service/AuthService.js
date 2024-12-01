import prisma from "../db/prisma";

export default {
  login: async (loginData) => {
    const {username, password} = loginData

    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (user) {
      if (user.password != password) {
        return {
          success: false,
          error: "Password salah",
        };
      }

      return {
        success: true,
        user: user,
      };
    }

    return {
      success: false,
      error: "Username tidak ditemukan",
    };
  },
};
