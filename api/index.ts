import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const entriesRoute = require("../src/routes/entries.route").default;
const userRouter = require("../src/routes/userRoute").default;
const eventRouter = require("../src/routes/eventRoute").default;

dotenv.config();
const app = express();

const port = process.env.PORT || 3001;
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToDB = require("../src/config/connectToDb").default;

// Connect to database
connectToDB();

app.get("/", (req: Request, res: Response) => {
  res.json("Welcome to the API");
});

// Use routes
app.use("/api/entries", entriesRoute);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

app.listen(port, () => {
  console.log(`Server is running on port 8081`);
});

export default app;
