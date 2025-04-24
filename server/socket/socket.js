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
      // Nếu có userId thì mới thêm user vào
      userId && addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on(
      "reactionPostNotification",
      ({ senderId, receiverId, message }) => {
        const user = getUser(receiverId);
        user &&
          io
            .to(user.socketId)
            .emit("receiveReactionPostNotification", { senderId, message });
      }
    );

    socket.on(
      "commentPostNotification",
      ({ senderId, receiverId, message }) => {
        const user = getUser(receiverId);
        user &&
          io
            .to(user.socketId)
            .emit("receiveCommentPostNotification", { senderId, message });
      }
    );

    socket.on("sendComment", ({ postId, userId, comment }) => {
      // Gửi comments tới tất cả socket
      io.emit("receiveComment", { postId, userId, comment });
    });

    socket.on("sendMessage", ({ senderId, receiverId, message, chat }) => {
      const user = getUser(receiverId);
      // Nếu có user nhận thì mới gửi tin nhắn
      user &&
        io
          .to(user.socketId)
          .emit("receiveMessage", { senderId, message, chat });
    });

    socket.on("typing", ({ chatId, senderId, receiverId }) => {
      const user = getUser(receiverId);
      user && io.to(user.socketId).emit("typing", { chatId, senderId });
    });

    socket.on("seenMessage", ({ viewerId, receiverId }) => {
      const user = getUser(receiverId);
      user && io.to(user.socketId).emit("seenMessage", { viewerId });
    });

    // Khi user disconnect, xóa khỏi danh sách
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};
