import { NotificationModel } from "../models/notificationModel.js";

export const notificationMessage = {
  createPost: "vừa đăng 1 bài viết mới",
  reaction: "đã bày tỏ cảm xúc đối với bài viết của bạn",
  comment: "đã bình luận lên bài viết của bạn",
  share: "đã chia sẻ bài viết của bạn",
};

export const findExistingNotification = async (
  senderId,
  receiverId,
  type,
  message
) => {
  const existingNotification = await NotificationModel.findOne({
    senderId,
    receiverId,
    type,
    message,
  });

  if (existingNotification) return existingNotification;

  return null;
};

export const createNewNotification = async (
  senderId,
  receiverId,
  type,
  message
) => {
  const newNotification = await NotificationModel.create({
    senderId,
    receiverId,
    type,
    message,
  });

  return newNotification;
};

export const findAndCreateNotification = async (
  senderId,
  receiverId,
  type,
  message
) => {
  if (senderId === receiverId) return null;

  const existingNotification = await findExistingNotification(
    senderId,
    receiverId,
    type,
    message
  );

  if (existingNotification) return existingNotification;

  const newNotification = await createNewNotification(
    senderId,
    receiverId,
    type,
    message
  );

  return newNotification;
};

export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await NotificationModel.find({
      receiverId: userId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createNotification = async (req, res) => {
  try {
    const { senderId, receiverId, type, message } = req.body;

    const existingNotification = await findExistingNotification(
      senderId,
      receiverId,
      type,
      message
    );

    if (existingNotification) return res.json("Existing Notification");

    const newNotification = await createNewNotification(
      senderId,
      receiverId,
      type,
      message
    );

    res.status(200).json(newNotification);
  } catch (err) {
    res.status(500).json(err);
  }
};
