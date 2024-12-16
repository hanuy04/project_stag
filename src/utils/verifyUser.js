import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "nasiayam";

// cek token valid
// frontend middleware
export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return {
      success: true,
      message: "Token is valid",
      user: decoded,
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid token: " + error.message,
    };
  }
};

// backend middleware
const middleware = (handler, roles = []) => {
  return async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized : No token provided" });

    const verified = await verifyToken(token);

    if (verified.success) {
      // console.log(JSON.stringify(verified.user))
      if (roles.length > 0 && !roles.includes(verified.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = verified.user;
      return handler(req, res);
    } else {
      return res.status(401).json({ message: "Unauthorized : Invalid token" });
    }
  };
};

export default middleware;
