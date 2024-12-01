import { validateLogin } from "@/utils/validation/authSchema";
import AuthService from "../service/AuthService";
import jwt from "jsonwebtoken";

export default {
  login: async (req, res) => {
    const { username, password } = req.body;
    const loginData = { username, password };

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
        username,
        name: result.user.username,
        role_id: result.user.role_id,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "3h" });

      return res.status(200).json({
        message: "Login berhasil",
        user: result.user,
        token: token,
      });
    } else {
      return res.status(401).json({
        error: result.error,
      });
    }
  },
};
