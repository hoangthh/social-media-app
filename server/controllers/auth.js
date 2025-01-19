import passport from "../passport.js";
import jwt from "jsonwebtoken";

export const loginGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const loginGoogleCallback = (req, res) => {
  // Xử lý sau khi Google trả về
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    (err, user) => {
      if (err || !user) {
        return res.status(500).json({ error: "Authentication failed" });
      }

      // Tạo JWT token sau khi đăng nhập thành công
      const token = jwt.sign(
        { userId: user.id }, // Lấy ID người dùng từ passport (user)
        process.env.JWT_SECRET_KEY, // Key bảo mật cho JWT
        { expiresIn: "1h" } // Token hết hạn sau 1 giờ
      );

      // Lưu token vào cookie
      res.cookie("token", token, {
        httpOnly: true, // Cookie không thể truy cập từ JS
        secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS trong môi trường production
      });

      // Redirect về frontend sau khi đăng nhập thành công
      res.redirect(`${process.env.FRONTEND_URL}/`); // Đảm bảo rằng FRONTEND_URL đã được cấu hình đúng trong .env
    }
  )(req, res);
};
