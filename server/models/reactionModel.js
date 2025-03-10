import mongoose from "mongoose";

const schema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true, // Tham chiếu đến bài post
  },
  reaction: {
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã like
    favourite: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã favourite
    haha: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã haha
    wow: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã wow
    sad: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã sad
    angry: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã angry
  },
});

export const ReactionModel = mongoose.model("Reaction", schema);
