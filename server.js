import express from "express";
import { connectDB } from "./lib/prisma.js";


const app = express();
connectDB();



app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});