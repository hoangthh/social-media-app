import { ChatModel } from "../models/chatModel.js";
import { MessageModel } from "../models/messageModel.js";

export const getChatsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const chats = await ChatModel.find({ members: userId }).sort({
      "lastMessage.createdAt": -1,
    });

    res.json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createChat = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const existingChat = await ChatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingChat) return res.status(200).json(existingChat);

    const newChat = new ChatModel({
      members: [senderId, receiverId],
    });

    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateIsReadLastMessage = async (req, res) => {
  try {
    const { chatId } = req.params;

    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      { "lastMessage.isRead": true },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(updatedChat);
  } catch (err) {
    res.status(500).json(err);
  }
};
