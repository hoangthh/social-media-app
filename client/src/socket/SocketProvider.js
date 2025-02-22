import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

// Tạo Context
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null); // Thêm state để cập nhật socket

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_BACKEND_URL);

      socketRef.current.on("connect", () => {
        console.log(
          "✅ Connected to socket server with ID:",
          socketRef.current.id
        );
        setSocket(socketRef.current);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("❌ Socket disconnected");
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
