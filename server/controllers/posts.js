import { PostModel } from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createPost = async (req, res) => {
  try {
    const userId = req.body.userId;
    const content = req.body.content;
    const filename = req.file?.filename || "";

    // Tạo bài post mới với attachment
    const newPost = await PostModel.create({
      userId: userId,
      content: content,
      attachment: filename,
    });

    res.status(200).send(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatePost = req.body;

    const post = await PostModel.findOneAndUpdate(
      { _id: updatePost._id },
      updatePost,
      { new: true }
    );

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};
