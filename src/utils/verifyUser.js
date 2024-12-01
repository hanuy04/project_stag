import jwt from "jsonwebtoken";

// import dotenv from 'dotenv';
// dotenv.config();


export const verifyToken = (token) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    console.log(jwtSecret)

    // Pastikan jwtSecret terdefinisi
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Verifikasi token
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    // Tangani error dan beri pesan yang deskriptif
    console.error('Error verifying token:', error.message);
    throw new Error('Invalid token or verification failed : ' + error.message);
  }
};

export function getTokenFromLocalStorage() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}
