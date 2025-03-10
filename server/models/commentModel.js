import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    postId: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", schema);
