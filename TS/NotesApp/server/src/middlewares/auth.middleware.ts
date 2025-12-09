import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized — Login required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // attach user to request object
    (req as any).user = user;
    next();

  } catch(error) {
    console.log("Auth Middleware Error: ", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
