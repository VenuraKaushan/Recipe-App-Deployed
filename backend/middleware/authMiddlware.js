import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const userCookie = req.cookies.assess_token;
    
  try {
    if (!userCookie) throw new Error("Unauthorized");

    jwt.verify(userCookie, process.env.SECRET_KEY, (error, user) => {
      if (error) throw new Error("Unauthorized");

      req.user = user.id;

      next();
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default authMiddleware;
