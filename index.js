const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/notesRoutes");
const dotenv = require("dotenv").config();
const redisClient = require("./redis");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongo_URL);
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
