import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import entriesRoute from "../src/routes/entries.route";
import userRouter from "../src/routes/userRoute";
import eventRouter from "../src/routes/eventRoute";

// Connect to database
const connectToDB = require("./src/config/connectToDb");
connectToDB();
// Use routes
app.use("/entries", entriesRoute);
app.use("/users", userRouter);
app.use("/events", eventRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
