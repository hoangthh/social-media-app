import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import posts from "./routers/posts.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

const URI =
  "mongodb+srv://tranhoang202204:udqWWfDESrv8D7zb@cluster0.yiarj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", posts);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.listen(PORT, () => {
  console.log("Server is running");
});
