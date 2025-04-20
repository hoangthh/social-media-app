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
    async (err, user) => {
      if (err || !user) {
        return res.status(500).json({ error: "Authentication failed" });
      }

      // Tạo JWT token sau khi đăng nhập thành công
      const token = jwt.sign(
        { userId: user.id }, // Lấy ID người dùng từ passport (user)
        process.env.JWT_SECRET_KEY, // Key bảo mật cho JWT
        { expiresIn: "7d" } // Token hết hạn sau 1 giờ
      );

      // Lưu token vào cookie
      res.cookie("token", token, {
        httpOnly: true, // Cookie không thể truy cập từ JS
        secure: true, // BẮT BUỘC: khi dùng HTTPS (Render là HTTPS)
        sameSite: "None", // BẮT BUỘC: cho phép cross-site cookie
      });

      // Redirect về frontend sau khi đăng nhập thành công
      res.redirect(`${process.env.FRONTEND_URL}`);
    }
  )(req, res);
};

export const loginFacebook = passport.authenticate("facebook");

export const loginFacebookCallback = (req, res) => {
  // Xử lý sau khi Google trả về
  passport.authenticate(
    "facebook",
    { failureRedirect: "/login" },
    async (err, user) => {
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
        sameSite: "strict",
      });

      // Redirect về frontend sau khi đăng nhập thành công
      res.redirect(`${process.env.FRONTEND_URL}`);
    }
  )(req, res);
};

// Controllers sau khi phát triển login normal

// let refreshTokens = [];

// const createAccessToken = (user) => {
//   return jwt.sign(
//     { userId: user.id },
//     process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
//     { expiresIn: "15m" }
//   );
// };

// const createRefreshToken = (user) => {
//   return jwt.sign(
//     { userId: user.id },
//     process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
//     { expiresIn: "7d" }
//   );
// };

// export const loginUser = async (req, res) => {
//   try {
//     // Tạo Access Token (hết hạn trong 15 phút)
//     const accessToken = createAccessToken(user);

//     // Tạo Refresh Token (hết hạn trong 7 ngày)
//     const refreshToken = createRefreshToken(user);

//     // Lưu trữ refreshToken trên server
//     refreshTokens.push(refreshToken);

//     // Lưu refreshToken vào HTTP-only cookie
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// export const refreshToken = async (req, res) => {
//   // Lấy refreshToken từ cookies
//   const refreshToken = req.cookies.refreshToken;

//   if (!refreshToken) return res.status(401).json("You're not authenticated");

//   if (!refreshTokens.includes(refreshToken))
//     return res.status(403).json("Invalid refresh token");

//   // Verify refreshToken
//   jwt.verify(
//     refreshToken,
//     process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
//     (err, user) => {
//       if (err) {
//         console.log(err);
//       }
//       refreshTokens = refreshTokens.filter(
//         (refToken) => refToken !== refreshToken
//       );

//       // Tạo accessToken mới
//       const newAccessToken = createAccessToken(user);

//       // Tạo refreshToken mới
//       const newRefreshToken = createRefreshToken(user);

//       // Lưu trữ refreshToken trên server
//       refreshTokens.push(newRefreshToken);

//       // Lưu refreshToken vào HTTP-only cookie
//       res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       });

//       // Trả về accesToken mới
//       return res.status(200).json({ accessToken: newAccessToken });
//     }
//   );
// };
