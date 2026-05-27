import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { prisma } from "../lib/prisma.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  next();
});

export default protect;