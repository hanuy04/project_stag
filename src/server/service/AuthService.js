import prisma from "../db/prisma";
import bcrypt from "bcrypt";

export default {
  login: async (loginData) => {
    const { username, password } = loginData;
    // console.log(loginData);

    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
      include: {
        roles: true,
      },
    });

    // console.log(user);

    if (user) {
      if (user.password != password) {
        return {
          success: false,
          error: "Password salah",
        };
      }

      if (user.status == "0") {
        return {
          success: false,
          error: "Akun Anda tidak aktif",
        };
      }

      if (user.status == "2") {
        return {
          success: false,
          error: "Akun Anda belum aktif, harap tunggu petugas sarpras",
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
    try {
      // Check for existing user
      const existingUser = await prisma.users.findFirst({
        where: {
          username: data.username,
        },
      });

      if (existingUser) {
        return {
          success: false,
          status: 409,
          message: "Username telah terdaftar, harap login",
        };
      }

      // Hash password before storing
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser = {
        username: data.username,
        name: data.name,
        password: data.password,
        role_id: data.role_id,
        status: "2",
      };

      if (data.kelas) newUser.kelas = data.kelas;
      if (data.no_absen) newUser.no_absen = parseInt(data.no_absen);

      // Create new user
      const user = await prisma.users.create({
        data: newUser,
        include: {
          roles: true,
        },
      });

      return {
        success: true,
        status: 201,
        message: "Berhasil register",
        user: user,
      };
    } catch (error) {
      console.error("Registration error:", error.message);
      return {
        success: false,
        status: 500,
        message: "Terjadi kesalahan saat registrasi",
        error: error.message,
      };
    }
  },
};
