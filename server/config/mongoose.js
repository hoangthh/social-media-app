import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI;

export const mongooseConnection = () => {
  mongoose
    .connect(URI)
    .then(() => {
      console.log("Connected to Mongo DB");
    })
    .catch((err) => {
      console.log("err", err);
    });
};
