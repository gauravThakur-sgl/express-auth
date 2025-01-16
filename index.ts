const express = require("express");
import { Request, Response } from "express";
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const entriesRoute = require("./src/routes/entries.route").default;
const userRouter = require("./src/routes/userRoute").default;
const eventRouter = require("./src/routes/eventRoute").default;
const connectToDB = require('./src/config/connectToDB').default;
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
connectToDB()


app.use("/entries", entriesRoute);
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Connected to DB and app listening on port ${port}`);
});
