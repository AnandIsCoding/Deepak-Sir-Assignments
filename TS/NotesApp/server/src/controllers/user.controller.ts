import {type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import chalk from "chalk";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";



// signup handler

export const signupController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;
    

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in prod
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (error) {
    console.log(chalk.bgRed.white.bold("Error in signupController ---> "), error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



//  login handler


export const loginController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (error) {
    console.log(chalk.bgRed.white("Error in loginController → "), error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// logout handler

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logged out successfully" });
};


// get profile handler

export const getProfileController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = (req as any).user?.id; // ID added from auth middleware

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized. Token missing or invalid" });
    }

    // Fetch user from DB without password
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });

  } catch (error) {
    console.error("Error in getProfileController → ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};


