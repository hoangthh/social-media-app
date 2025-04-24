import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

// Middleware kiểm tra token
export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Lấy token từ cookies

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  // Kiểm tra và giải mã token
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    // Lưu thông tin người dùng vào request
    req.user = user;
    next();
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Lấy phần đuôi: .jpg, .png, v.v.
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage: storage });
