import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const ChatModel = mongoose.model("Chat", schema);
