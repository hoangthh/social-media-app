import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    members: {
      type: [String],
      required: true,
    },
    lastMessage: {
      senderId: { type: String },
      message: { type: String },
      createdAt: { type: Date },
      isRead: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export const ChatModel = mongoose.model("Chat", schema);
