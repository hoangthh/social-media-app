import { MessageModel } from "../models/messageModel.js";

export const getMessagesByChatId = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await MessageModel.find({
      chatId,
    });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createMessage = async (req, res) => {
  try {
    const newMessage = new MessageModel(req.body);

    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};
