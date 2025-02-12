import { ChatModel } from "../models/chatModel.js";

export const createChat = async (req, res) => {
  try {
    const newChat = new ChatModel({
      members: [req.body.senderId, req.body.receiverId],
    });

    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getChatsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await ChatModel.find({ members: { $in: [userId] } });

    res.json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
};
