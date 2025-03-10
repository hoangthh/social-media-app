import { PostModel } from "../models/postModel.js";
import { UserModel } from "../models/userModel.js";
import { ReactionModel } from "../models/reactionModel.js";
import {
  notificationMessage,
  findAndCreateNotification,
} from "./notifications.js";

export const getReactionPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const reaction = await ReactionModel.findOne({ postId });
    if (!reaction) {
      return res.status(404).json("Reaction not found");
    }
    res.status(200).json(reaction);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createReactionPost = async (req, res) => {
  const { userId, postId, reactionType } = req.body;

  try {
    const validReactionTypes = [
      "like",
      "favourite",
      "haha",
      "wow",
      "sad",
      "angry",
    ];

    if (
      !validReactionTypes.includes(reactionType) &&
      reactionType !== "default"
    ) {
      return res.status(400).json("Invalid reaction type");
    }

    // Kiểm tra user
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json("User not found");

    // Kiểm tra bài post
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json("Post not found");

    // Tìm reaction của bài post
    let reactionData = await ReactionModel.findOne({ postId });

    // Nếu chưa có, tạo mới
    if (!reactionData) {
      reactionData = new ReactionModel({ postId, reaction: {} });
    }

    // Loại bỏ user khỏi tất cả các reaction cũ
    for (const type of validReactionTypes) {
      if (reactionData.reaction[type]) {
        reactionData.reaction[type] = reactionData.reaction[type].filter(
          (id) => id.toString() !== userId.toString()
        );
      }
    }

    // Nếu reactionType khác "default", thêm user vào danh sách mới
    if (reactionType !== "default") {
      if (!reactionData.reaction[reactionType]) {
        reactionData.reaction[reactionType] = [];
      }
      reactionData.reaction[reactionType].push(userId);
    }

    // Lưu dữ liệu
    await reactionData.save();

    await findAndCreateNotification(
      userId,
      post.userId,
      "reaction",
      notificationMessage.reaction
    );

    return res.status(200).json(reactionData);
  } catch (err) {
    res.status(500).json(err);
  }
};
