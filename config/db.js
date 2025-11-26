import mongoose from "mongoose";
import { ENV } from "./index.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.mongo_db_url);

    console.log(`
=====================================
  MongoDB Connected Successfully
-------------------------------------
  Host: ${conn.connection.host}
  DB Name: ${conn.connection.name}
=====================================
    `);
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  console.error(" Database Connection Failed:");
  console.error(error.message);
  process.exit(1); // Exit the app if DB fails to connect
};
