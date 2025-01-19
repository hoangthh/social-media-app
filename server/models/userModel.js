import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true, // Đảm bảo mỗi googleId là duy nhất
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Đảm bảo mỗi email chỉ lưu một lần
    },
    avatar: {
      type: String,
      default: "", // URL của ảnh đại diện (nếu có)
    },
    createdAt: {
      type: Date,
      default: Date.now, // Thời gian tạo tài khoản
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", schema);
