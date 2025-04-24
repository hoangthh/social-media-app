import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// Tạo Context
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null); // Thêm state để cập nhật socket
  const [newMessageData, setNewMessageData] = useState({});
  const [arrivalSenderIds, setArrivalSenderIds] = useState([]);
  const [arrivalNotifications, setArrivalNotifications] = useState([]);
  const [isReadData, setIsReadData] = useState({ chatId: "", isRead: true });

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_BACKEND_URL);

      socketRef.current.on("connect", () => {
        console.log(
          "Connected to socket server with ID:",
          socketRef.current.id
        );
        setSocket(socketRef.current);
      });

      // Nhận tin nhắn mới
      socketRef.current.on("receiveMessage", ({ senderId, chat }) => {
        setArrivalSenderIds((prev) => {
          // Chỉ thêm senderId nếu chưa có
          if (!prev.includes(senderId)) {
            return [...prev, senderId];
          }
          return prev;
        });
        setIsReadData({
          chatId: chat._id,
          isRead: false,
        });
      });

      // Nhận thông báo tương tác (thả cảm xúc)
      socketRef.current.on(
        "receiveReactionPostNotification",
        ({ senderId, message }) => {
          setArrivalNotifications((prev) => [...prev, { senderId, message }]);
        }
      );

      // Nhận thông báo bình luận
      socketRef.current.on(
        "receiveCommentPostNotification",
        ({ senderId, message }) => {
          setArrivalNotifications((prev) => [...prev, { senderId, message }]);
        }
      );
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        newMessageData,
        setNewMessageData,
        arrivalSenderIds,
        setArrivalSenderIds,
        arrivalNotifications,
        setArrivalNotifications,
        isReadData,
        setIsReadData,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
