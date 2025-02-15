import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    postId: {
      type: String,
      require: true,
    },
    userId: {
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
