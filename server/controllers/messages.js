import { MessageModel } from "../models/messageModel.js";
import { ChatModel } from "../models/chatModel.js";

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

    // Cập nhật lastMessage trong ChatModel
    await ChatModel.findByIdAndUpdate(savedMessage.chatId, {
      lastMessage: {
        senderId: savedMessage.senderId,
        message: savedMessage.message,
        createdAt: savedMessage.createdAt,
      },
    });

    res.status(200).json(savedMessage);
  } catch (err) {
    console.error("Lỗi khi tạo tin nhắn:", err);
    res.status(500).json(err);
  }
};

export const markLastSentMessageAsSeen = async (req, res) => {
  try {
    const { chatId, viewerId } = req.body;

    // Tìm tin nhắn mới nhất trong đoạn chat
    const lastMessage = await MessageModel.findOne({ chatId })
      .sort({ createdAt: -1 })
      .exec();

    if (!lastMessage) {
      return res.status(200).json("Message not found");
    }

    // Nếu viewer chính là người gửi thì không cần cập nhật
    if (lastMessage.senderId === viewerId) {
      return res.status(200).json("SenderId and ViewerId is same");
    }

    // Nếu chưa được đánh dấu đã xem thì cập nhật
    if (!lastMessage.isSeen) {
      lastMessage.isSeen = true;
      await lastMessage.save();
    }

    return res.status(200).json(lastMessage);
  } catch (err) {
    return res.status(500).json(err);
  }
};
