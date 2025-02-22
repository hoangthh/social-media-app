import { PostModel } from "../models/postModel.js";
import { ReactionModel } from "../models/reactionModel.js";

export const getPosts = async (req, res) => {
  try {
    // 1. Lấy danh sách tất cả bài post từ PostModel
    const posts = await PostModel.find();

    // 2. Tạo danh sách bài post với thông tin liên quan
    const postsWithReactions = await Promise.all(
      posts.map(async (post) => {
        // Lấy thông tin reaction từ ReactionModel
        const reactionsData = await ReactionModel.findOne({ postId: post._id })
          .populate("reactions.like.users", "id name") // Chỉ lấy id và name của user
          .populate("reactions.favourite.users", "id name")
          .populate("reactions.haha.users", "id name")
          .populate("reactions.wow.users", "id name")
          .populate("reactions.sad.users", "id name")
          .populate("reactions.angry.users", "id name");

        const likeCount = reactionsData?.reactions.like.users.length;
        const favouriteCount = reactionsData?.reactions.favourite.users.length;
        const hahaCount = reactionsData?.reactions.haha.users.length;
        const wowCount = reactionsData?.reactions.wow.users.length;
        const sadCount = reactionsData?.reactions.sad.users.length;
        const angryCount = reactionsData?.reactions.angry.users.length;

        const likeUsers = reactionsData?.reactions.like.users || [];
        const favouriteUsers = reactionsData?.reactions.favourite.users || [];
        const hahaUsers = reactionsData?.reactions.haha.users || [];
        const wowUsers = reactionsData?.reactions.wow.users || [];
        const sadUsers = reactionsData?.reactions.sad.users || [];
        const angryUsers = reactionsData?.reactions.angry.users || [];

        const reactionCount =
          likeCount +
            favouriteCount +
            hahaCount +
            wowCount +
            sadCount +
            angryCount || 0;

        // Gộp thông tin bài post và reactions
        return {
          _id: post._id,
          content: post.content,
          author: post.author,
          attachment: post.attachment,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          reactionCount: reactionCount,
          reactionUsers: [
            ...likeUsers,
            ...favouriteUsers,
            ...hahaUsers,
            ...wowUsers,
            ...sadUsers,
            ...angryUsers,
          ].splice(0, 10),
          like: {
            count: likeCount,
            users: reactionsData?.reactions.like.users || [],
          },
          favourite: {
            count: favouriteCount,
            users: reactionsData?.reactions.favourite.users || [],
          },
          haha: {
            count: hahaCount,
            users: reactionsData?.reactions.haha.users || [],
          },
          wow: {
            count: wowCount,
            users: reactionsData?.reactions.wow.users || [],
          },
          sad: {
            count: sadCount,
            users: reactionsData?.reactions.sad.users || [],
          },
          angry: {
            count: angryCount,
            users: reactionsData?.reactions.angry.users || [],
          },
        };
      })
    );

    // 3. Trả về danh sách bài post
    res.status(200).json(postsWithReactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { body, file } = req;
    const content = body.content;
    const filename = file.filename;

    // Tạo bài post mới với attachment
    const newPost = await PostModel.create({
      content: content,
      author: body.author,
      attachment: filename,
    });

    res.status(200).send(newPost);
  } catch (err) {
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
