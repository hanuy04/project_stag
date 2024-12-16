import { validateLogin } from "@/utils/validation/authSchema";
import AuthService from "../service/AuthService";
import jwt, { verify } from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { login } from "@/store/persistSlices/authSlice";
// import { verifyToken } from "@/utils/verifyUser";

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
        usename: result.user.username,
        name: result.user.name,
        role: result.user.roles.role_name,
        status : result.user.status
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
  verifyToken: async (req, res) => {},
};
