import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    chatId: { type: String },
    senderId: { type: String, required: true }, // ID người gửi
    message: { type: String, required: true }, // Nội dung tin nhắn
    isSeen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("Message", schema);
