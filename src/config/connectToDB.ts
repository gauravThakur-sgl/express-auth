const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in the environment variables");
    }
    mongoose.connect(MONGODB_URI).catch((err: any) => console.log(err));
    console.log("Connected to the database");
  } catch (err: any) {
    console.error("MONGODB_URI is not defined in the environment variables");
  }
};

module.exports = connectToDB;
