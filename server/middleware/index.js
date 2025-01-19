import jwt from "jsonwebtoken";

const middleware = {
  // Middleware kiểm tra token
  authenticateToken: (req, res, next) => {
    const token =
      req.cookies.token || req.headers["authorization"]?.split(" ")[1]; // Lấy token từ cookie hoặc header Authorization

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    // Kiểm tra và giải mã token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token." });
      }
      // Lưu thông tin người dùng vào request
      req.user = decoded;
      next();
    });
  },
};

export default middleware;
