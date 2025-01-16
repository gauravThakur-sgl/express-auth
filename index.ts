const express = require("express");
import { Request, Response } from "express";
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const entriesRoute = require("./src/routes/entries.route").default;
const userRouter = require("./src/routes/userRoute").default;
const eventRouter = require("./src/routes/eventRoute").default;
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//connect database

const mongoUri = process.env.MONGODB_URI;

if (mongoUri) {
  mongoose.connect(mongoUri).catch((err: any) => console.log(err));
} else {
  console.error("MONGODB_URI is not defined in the environment variables");
}
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use("/entries", entriesRoute);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Connected to DB and app listening on port ${port}`);
});
