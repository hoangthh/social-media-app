import React, { useEffect, useRef, useState } from "react";
import "./ChatWindow.scss";
import { useDispatch, useSelector } from "react-redux";
import { chatWindowState$, userState$ } from "../../redux/selectors";
import { Avatar, styled, TextField } from "@mui/material";
import * as api from "../../api";
import io from "socket.io-client";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Message from "./Message/Message";
import { hideChatWindow } from "../../redux/actions";

const SendButton = styled(SendRoundedIcon)`
  color: #0264d3;
  cursor: pointer;
`;

const CloseButton = styled(CloseRoundedIcon)`
  color: #0264d3;
  border-radius: 50%;
  transition: all 0.1s;

  &:hover {
    background: #ccc;
    cursor: pointer;
  }
`;

const VoiceCallButton = styled(CallRoundedIcon)`
  margin-right: 5px;
  color: #0264d3;
  border-radius: 50%;
  transition: all 0.1s;

  &:hover {
    background: #ccc;
    cursor: pointer;
  }
`;

const VideoCallButton = styled(VideocamRoundedIcon)`
  margin-right: 5px;
  color: #0264d3;
  border-radius: 50%;
  transition: all 0.1s;

  &:hover {
    background: #ccc;
    cursor: pointer;
  }
`;

export default function ChatWindow() {
  const [receiver, setReceiver] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector(userState$); // User hiện tại
  const { isShow, data } = useSelector(chatWindowState$);
  const { receiverId, chatId, chat } = data || {};

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    // Nhận tin nhắn realtime
    socket.current.on("receiveMessage", (data) => {
      setArrivalMessage({
        senderId: data?.senderId,
        message: data?.message,
        createdAt: Date.now(),
      });
    });
  }, []);

  // Nếu có tin nhắn realtime thì thay đổi lại mảng messages
  useEffect(() => {
    arrivalMessage &&
      chat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, chat]);

  // Thêm user hiện tại vào danh sách user online của server
  useEffect(() => {
    user && socket.current.emit("addUser", user?.id);
    socket.current.on("getUsers", (users) => {});
  }, [user]);

  // Lấy người nhận tin nhắn bằng receiverId
  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.fetchUserByUserId(receiverId);
      setReceiver(res);
    };

    if (receiverId !== null && receiverId !== undefined) fetchUser();
  }, [receiverId]);

  // Lấy lịch sử tin nhắn khi chọn người nhận
  useEffect(() => {
    const getMessages = async () => {
      const res = await api.fetchMessagesByChatId(chatId);
      setMessages(res);
      console.log("messages: ", messages);
    };
    getMessages();
  }, [chatId]);

  // Scroll xuống tin nhắn mới nhất
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hàm gửi tin nhắn
  const sendMesssage = async (e) => {
    // Tin nhắn mới
    const newMessage = {
      chatId,
      senderId: user.id,
      message,
    };

    // Gửi tin nhắn lên socket
    socket.current.emit("sendMessage", {
      senderId: user?.id,
      receiverId,
      message,
    });

    // Lưu  tin nhắn mới vào db
    const res = await api.sendMessage(newMessage);
    setMessages([...messages, res]);
    setMessage("");
  };

  const handleCloseChatWindow = () => {
    dispatch(hideChatWindow());
  };

  return (
    <div className={`chat-window ${isShow ? "show" : "hide"}`}>
      {/* Header */}
      <div className="chat-window--header">
        <Avatar src={receiver?.avatar} sx={{ width: "30px", height: "30px" }} />
        <div className="chat-window--header--info">
          <p className="chat-window--header--info__name">{receiver?.name}</p>
          <p className="chat-window--header--info__time">
            Hoạt động 30 phút trước
          </p>
        </div>
        <VoiceCallButton />
        <VideoCallButton />
        <CloseButton onClick={handleCloseChatWindow} />
      </div>

      {/* Body */}
      <div className="chat-window--body">
        {/* Message Item */}
        {messages?.map((message, index) => {
          const nextMessage = messages[index + 1]; // Lấy tin nhắn tiếp theo

          return (
            <div key={message._id} ref={scrollRef}>
              <Message
                nextMessage={nextMessage}
                message={message}
                currentUser={user}
                receiver={receiver}
              />
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="chat-window--footer">
        <TextField
          id="search-input"
          placeholder="Aa"
          multiline
          minRows={1}
          maxRows={10}
          value={message}
          size="small"
          slotProps={{
            input: {
              style: {
                border: "none",
                outline: "none",
                borderRadius: "20px",
              },
            },
          }}
          sx={{
            marginRight: "10px",
            width: "100%",
            background: "#f0f2f5",
            borderRadius: "20px",
            border: "none",
            outline: "none",
          }}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            !e.shiftKey && e.key === "Enter" && sendMesssage(e);
          }}
        />
        <SendButton onClick={sendMesssage} />
      </div>
    </div>
  );
}
