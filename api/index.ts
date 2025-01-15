import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import entriesRoute from "../src/routes/entries.route";
import userRouter from "../src/routes/userRoute";
import eventRouter from "../src/routes/eventRoute";

// Use routes
app.use("/entries", entriesRoute);
app.use("/users", userRouter);
app.use("/events", eventRouter);

app.get("/", (req, res) => {
  res.json("Welcome to the API");
});

export default app;
