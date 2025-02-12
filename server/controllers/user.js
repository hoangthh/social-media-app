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

export const getUserByName = async (req, res) => {
  try {
    const { name } = req.query; // Lấy tên từ query thay vì params

    if (!name) {
      return res.status(400).json({ message: "Vui lòng nhập tên để tìm kiếm" });
    }

    const regex = new RegExp(name, "i"); // Tìm kiếm không phân biệt hoa thường
    const users = await UserModel.find({ name: { $regex: regex } });

    if (users.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    // Lấy userId từ params
    const { userId } = req.params;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Trả về thông tin người dùng và token (nếu cần)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};
