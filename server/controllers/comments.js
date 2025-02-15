import { CommentModel } from "../models/commentModel.js";
import { UserModel } from "../models/userModel.js";

export const createComment = async (req, res) => {
  try {
    const { postId, userId, comment } = req.body;

    // Tạo comment mới
    const newComment = await CommentModel.create({
      postId,
      userId,
      comment,
    });

    res.status(200).json(newComment);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Lấy comments bằng postId
    const comments = await CommentModel.find({ postId });

    if (!comments) {
      return res.status(404).json("Comments not found");
    }

    // Trả về thông tin người dùng và token (nếu cần)
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};
