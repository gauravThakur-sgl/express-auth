import { Request, Response } from "express";
import app from "./api";
const connectToDB = require("./src/config/connectToDb");

const port = process.env.PORT || 3001;
// Connect to database
connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 8081`);
});
