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

const connectToDB = require("../src/config/connectToDb");

const port = process.env.PORT || 3001;
// Connect to database
connectToDB();

// Use routes
app.use("/api/entries", entriesRoute);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

app.get("/", (req, res) => {
  res.json("Welcome to the API");
});

app.listen(port, () => {
  console.log(`Server is running on port 8081`);
});

export default app;
