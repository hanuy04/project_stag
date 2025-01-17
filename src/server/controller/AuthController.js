import { validateLogin, validateRegister } from "@/utils/validation/authSchema";
import AuthService from "../service/AuthService";
import jwt from "jsonwebtoken";

export default {
  login: async (req, res) => {
    const loginData = req.body;

    // JOI VALIDATION
    try {
      await validateLogin(loginData);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    // fetch database
    const result = await AuthService.login(loginData);

    if (result.success) {
      // bikin token
      const jwtSecret = process.env.JWT_SECRET;
      const payload = {
        username: result.user.username,
        name: result.user.name,
        role: result.user.roles.role_name,
        status: result.user.status,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "12h" });

      return res.status(200).json({
        message: "Login berhasil",
        user: payload,
        token: token,
      });
    } else {
      return res.status(401).json({
        error: "Username tidak ditemukan",
      });
    }
  },

  register: async (req, res) => {
    try {
      const data = req.body;

      // Validate input
      try {
        await validateRegister(data);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Validasi gagal",
          error: error.message,
        });
      }

      // Register user
      const result = await AuthService.register(data);

      if (result.success) {
        return res.status(result.status).json({
          success: true,
          message: result.message,
          user: {
            username: result.user.username,
            name: result.user.name,
            role: result.user.roles.role_name,
            status: result.user.status,
          },
        });
      } else {
        return res.status(result.status).json({
          success: false,
          message: result.message,
          error: result.error,
        });
      }
    } catch (error) {
      console.error("Controller error:", error);
      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server",
        error: error.message,
      });
    }
  },
};
