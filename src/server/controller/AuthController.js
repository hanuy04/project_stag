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
        usename: result.user.username,
        name: result.user.name,
        role: result.user.roles.role_name,
        status: result.user.status,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "3h" });

      return res.status(200).json({
        message: "Login berhasil",
        user: payload,
        token: token,
      });
    } else {
      return res.status(401).json({
        error: result.error,
      });
    }
  },

  register: async (req, res) => {
    const data = req.body;

    //JOI VALIDATION
    try {
      await validateRegister(data);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    const result = await AuthService.register(data);

    if (result.success) {
      return res.status(200).json({
        message: "Register berhasil",
        // user: {
        //   usename: result.user.username,
        //   name: result.user.name,
        //   role: result.user.roles.role_name,
        //   status: result.user.status,
        // },
      });

    } else {
      return res.status(result.status).json({
        error: result.error,
      });
    }
  },
};
