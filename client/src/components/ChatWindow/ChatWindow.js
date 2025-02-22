import React, { useEffect, useRef, useState } from "react";
import "./ChatWindow.scss";
import { useDispatch, useSelector } from "react-redux";
import { chatWindowState$, userState$ } from "../../redux/selectors";
import { Avatar, InputAdornment, styled, TextField } from "@mui/material";
import * as api from "../../api";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Message from "./Message/Message";
import { hideChatWindow } from "../../redux/actions";
// import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import { useSocket } from "../../socket/SocketProvider";

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

const EmojiButton = styled(EmojiEmotionsRoundedIcon)`
  color: #0264d3;
  border-radius: 50%;
  transition: all 0.1s;

  &:hover {
    background: #f0f0f0;
    cursor: pointer;
  }
`;

export default function ChatWindow() {
  const socket = useSocket();
  const [receiver, setReceiver] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [openPicker, setOpenPicker] = useState(false);

  const scrollRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector(userState$); // User hiện tại
  const { isShow, data } = useSelector(chatWindowState$);
  const { receiverId, chatId, chat } = data || {};

  useEffect(() => {
    // Nhận tin nhắn realtime
    socket?.on("receiveMessage", (data) => {
      setArrivalMessage({
        senderId: data?.senderId,
        message: data?.message,
        createdAt: Date.now(),
      });
    });

    // Nếu có tin nhắn realtime thì thay đổi lại mảng messages
    arrivalMessage &&
      chat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [socket, arrivalMessage, chat]);

  useEffect(() => {
    // Lấy người nhận tin nhắn bằng receiverId
    const fetchUser = async () => {
      const res = await api.fetchUserByUserId(receiverId);
      setReceiver(res);
    };

    if (receiverId) fetchUser();

    // Lấy lịch sử tin nhắn khi chọn người nhận
    const getMessages = async () => {
      const res = await api.fetchMessagesByChatId(chatId);
      setMessages(res);
    };

    getMessages();
  }, [receiverId, chatId]);

  // Scroll xuống tin nhắn mới nhất
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hàm gửi tin nhắn
  const sendMesssage = async (e) => {
    // Tin nhắn mới
    const newMessage = {
      chatId,
      senderId: user._id,
      message,
    };

    // Gửi tin nhắn lên socket
    socket?.emit("sendMessage", {
      senderId: user._id,
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
            <div key={index} ref={scrollRef}>
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
              endAdornment: (
                <InputAdornment position="end">
                  <EmojiButton onClick={() => setOpenPicker(!openPicker)} />
                </InputAdornment>
              ),
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
        {openPicker && (
          <div className="chat-window--footer__emoji-box">
            <Picker
              onEmojiSelect={(e) => setMessage((prev) => prev + e.native)}
              locale="vi"
              autoFocus="true"
              navPosition="bottom"
              previewPosition="none"
              skinTonePosition="none"
            />
          </div>
        )}
        <SendButton onClick={sendMesssage} />
      </div>
    </div>
  );
}
