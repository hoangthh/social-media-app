import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
      default: "Anonymous",
    },
    content: {
      type: String,
      require: true,
    },
    attachment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Post", schema);
