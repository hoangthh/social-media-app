import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { mongooseConnection } from "./config/mongoose.js";
import routers from "./routers/index.js";
import session from "express-session";
import passport from "./passport.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const URI = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình static file
app.use(express.static("uploads"));

// Cấu hình CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // URL frontend của bạn
    credentials: true, // Cho phép gửi cookie
  })
);

// Cấu hình express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Đặt khóa bí mật trong .env
    resave: false, // Không lưu session nếu không thay đổi
    saveUninitialized: false, // Không lưu session chưa khởi tạo
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS ở chế độ production
      maxAge: 1000 * 60 * 60 * 24, // Thời gian tồn tại cookie (1 ngày)
    },
  })
);

// Cấu hình cookie-parser middleware
app.use(cookieParser());

// Kết nối MongoDB
mongooseConnection();

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

// Cấu hình routers
app.use("/", routers);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
