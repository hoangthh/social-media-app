import { PostModel } from "../models/postModel.js";
import { UserModel } from "../models/userModel.js";
import { ReactionModel } from "../models/reactionModel.js";

export const getReactionPost = async (req, res) => {
  try {
    const reaction = await ReactionModel.findOne({ postId: req.params.postId });
    if (!reaction) {
      return res.status(404).json({ message: "No reactions found" });
    }
    res.status(200).json(reaction.reactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reactions", error });
  }
};

export const reactPost = async (req, res) => {
  const { userId, postId, reactionType } = req.body;

  try {
    // Kiểm tra xem reactionType có hợp lệ không
    const validReactions = [
      "default",
      "like",
      "favourite",
      "haha",
      "wow",
      "sad",
      "angry",
    ];
    if (!validReactions.includes(reactionType)) {
      return res.status(400).json({ message: "Invalid reaction type" });
    }

    // Tìm bài post bằng postId
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Tìm user bằng userId
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Tìm reactions của bài post
    let reactionsData = await ReactionModel.findOne({ postId });

    // Nếu chưa có reactions cho bài post, tạo mới
    if (!reactionsData) {
      reactionsData = new ReactionModel({
        postId,
        reactions: {},
      });
    }

    // Loại bỏ reaction cũ của người dùng (nếu có)
    for (const type of validReactions) {
      const reaction = reactionsData.reactions[type];
      if (reaction && reaction.users.includes(userId)) {
        // Xóa user khỏi reaction cũ
        reaction.users = reaction.users.filter(
          (id) => id.toString() !== userId.toString()
        );
        if (reaction.users.length === 0) {
          delete reactionsData.reactions[type]; // Xóa hoàn toàn nếu không còn user
        }
      }
    }

    if (reactionType != "default") {
      // Thêm user vào reaction mới
      if (!reactionsData.reactions[reactionType]) {
        reactionsData.reactions[reactionType] = { users: [] };
      }
      reactionsData.reactions[reactionType].users.push(userId);
    }

    // Lưu lại dữ liệu
    await reactionsData.save();

    res.status(200).json({ message: "Reaction updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
