import { MessageModel } from "../models/messageModel.js";
let users = []; // Lưu socketId

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

export const socket = (io) => {
  // Socket.IO
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("receiveMessage", { senderId, message });
    });

    // Khi user disconnect, xóa khỏi danh sách
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};
