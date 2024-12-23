import prisma from "../db/prisma";

export default {
  login: async (loginData) => {
    const { username, password } = loginData;
    console.log(loginData);

    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
      include: {
        roles: true,
      },
    });

    console.log(user);

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

  register: async (data) => {
    const user = await prisma.users.findFirst({
      where: {
        username: data.username,
      },
    });

    if (user)
      return {
        success: false,
        status: 500,
        message: "Username telah terdaftar, harap login",
      };
    else {
      await prisma.users.create({
        name: data.name,
        username: data.username,
        password: data.password,
        role_id: data.role_id,
        status: 0,
      });
    }
  },
};
