import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword =  await bcrypt.hash(password, 10);

  // Create the user
  const user =  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "User registered successfully"});
});

// Check if user already exists
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  // check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  // TODO: Generate JWT token and send it in response
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
     httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
  res.json({ message: "Login successful" });
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.user });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});
