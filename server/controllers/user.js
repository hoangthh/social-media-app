import { UserModel } from "../models/userModel.js";

export const getUser = async (req, res) => {
  try {
    // Lấy thông tin người dùng từ database bằng userId trong token
    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Trả về thông tin người dùng và token (nếu cần)
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      token: req.cookies.token, // Trả lại token (nếu cần)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
};
