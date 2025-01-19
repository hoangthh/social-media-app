import mongoose from "mongoose";

const schema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true, // Tham chiếu đến bài post
  },
  reactions: {
    like: {
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã like
    },
    favourite: {
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã like
    },
    haha: {
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã haha
    },
    wow: {
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã wow
    },
    sad: {
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã sad
    },
    angry: {
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Người dùng đã angry
    },
  },
});

export const ReactionModel = mongoose.model("Reaction", schema);
