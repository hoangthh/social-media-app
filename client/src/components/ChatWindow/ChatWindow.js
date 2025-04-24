import React, { useEffect, useRef, useState } from "react";
import "./ChatWindow.scss";
import { useDispatch, useSelector } from "react-redux";
import { chatWindowState$, userState$ } from "../../redux/selectors";
import {
  Avatar,
  InputAdornment,
  styled,
  TextField,
  Tooltip,
} from "@mui/material";
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
import { formatFlexibleTime, formatSmartTime } from "../../utils/momentConfig";
import { convertToPascalCase } from "../../helpers/string";

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

  &.unread {
    color: #fff;
    &:hover {
      background: transparent;
    }
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

  &.unread {
    color: #fff;
    &:hover {
      background: transparent;
    }
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

  &.unread {
    color: #fff;
    &:hover {
      background: transparent;
    }
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
  const {
    socket,
    setNewMessageData,
    setArrivalSenderIds,
    isReadData,
    setIsReadData,
  } = useSocket();
  const [receiver, setReceiver] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [openPicker, setOpenPicker] = useState(false);

  const { isShow, data } = useSelector(chatWindowState$);
  const { receiverId, chatId, chat } = data || {};
  const [isRead, setIsRead] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef();

  const dispatch = useDispatch();

  const user = useSelector(userState$); // User hiện tại

  useEffect(() => {
    // Nhận tin nhắn realtime
    socket?.on("receiveMessage", (data) => {
      setArrivalMessage({
        senderId: data?.senderId,
        message: data?.message,
        createdAt: Date.now(),
      });
    });

    socket?.on("typing", ({ senderId, chatId }) => {
      if (senderId === receiverId && chatId === chat._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000); // Ẩn sau 3 giây
      }
    });

    // Nếu có tin nhắn realtime thì thay đổi lại mảng messages
    arrivalMessage &&
      chat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);

    arrivalMessage && setIsReadData({ chatId, isRead: false });
    arrivalMessage && setIsRead(false);
  }, [socket, arrivalMessage, chat, chatId, receiverId, setIsReadData]);

  useEffect(() => {
    socket?.on("seenMessage", ({ viewerId }) => {
      if (viewerId === receiver._id)
        setMessages((prev) => {
          if (prev.length === 0) return prev;

          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = {
            ...updatedMessages[updatedMessages.length - 1],
            isSeen: true,
            updatedAt: Date.now(),
          };

          return updatedMessages;
        });
    });
  }, [socket, receiver]);

  useEffect(() => {
    // Lấy người nhận tin nhắn bằng receiverId
    const fetchUser = async () => {
      const res = await api.fetchUserByUserId(receiverId);
      res.name = convertToPascalCase(res.name);
      setReceiver(res);
    };

    receiverId && fetchUser();

    // Lấy lịch sử tin nhắn khi chọn người nhận
    const fetchMessages = async () => {
      const res = await api.fetchMessagesByChatId(chatId);
      setMessages(res);
    };

    chatId && fetchMessages();
  }, [receiverId, chatId]);

  // Scroll xuống tin nhắn mới nhất
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isReadData.chatId) setIsRead(isReadData.isRead);
  }, [isReadData]);

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
      chat,
    });

    // Lưu  tin nhắn mới vào db
    const res = await api.sendMessage(newMessage);
    setMessages([...messages, res]);
    setNewMessageData({ senderId: user._id, receiverId, message, chat });
    setMessage("");
  };

  const handleCloseChatWindow = () => {
    dispatch(hideChatWindow());
  };

  const handleChatWindowClick = async () => {
    if (isReadData.isRead === false) {
      setArrivalSenderIds([]);

      await api.updateIsReadLastMessage(chatId);
      setIsReadData({ chatId, isRead: true });

      await api.updateIsSeenLastMessage(chatId, user._id);
      socket?.emit("seenMessage", {
        viewerId: user._id,
        receiverId: receiver._id,
      });
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    socket?.emit("typing", {
      chatId,
      senderId: user._id,
      receiverId,
    });
  };

  return (
    <div
      className={`chat-window ${isShow ? "show" : "hide"} `}
      onClick={handleChatWindowClick}
    >
      {/* Header */}
      <div className={`chat-window--header ${!isRead ? "unread" : ""}`}>
        <Tooltip title={receiver?.name} placement="top">
          <Avatar
            src={receiver?.avatar}
            sx={{ width: "32px", height: "32px" }}
          />
        </Tooltip>
        <div className="chat-window--header--info">
          <p className="chat-window--header--info__name">{receiver?.name}</p>
          <p className="chat-window--header--info__time">
            Hoạt động 30 phút trước
          </p>
        </div>
        <VoiceCallButton className={`${!isRead ? "unread" : ""}`} />
        <VideoCallButton className={`${!isRead ? "unread" : ""}`} />
        <CloseButton
          onClick={handleCloseChatWindow}
          className={`${!isRead ? "unread" : ""}`}
        />
      </div>

      {/* Body */}
      <div className="chat-window--body">
        {/* Message Item */}
        {messages?.map((message, index) => {
          const nextMessage = messages[index + 1]; // Lấy tin nhắn tiếp theo
          const lastMessage = messages[messages.length - 1];

          return (
            <div key={index} ref={scrollRef}>
              <Message
                nextMessage={nextMessage}
                message={message}
                lastMessage={lastMessage}
                currentUser={user}
                receiver={receiver}
              />
            </div>
          );
        })}
        {messages[messages?.length - 1]?.senderId === user._id && (
          <div className="chat-window--body__read-or-seen">
            {messages[messages?.length - 1].isSeen ? (
              <Tooltip
                title={`${receiver.name} đã xem lúc ${formatFlexibleTime(
                  messages[messages?.length - 1].updatedAt
                )}`}
                placement="top"
              >
                <Avatar
                  src={receiver?.avatar}
                  sx={{ width: "16px", height: "16px", cursor: "pointer" }}
                />
              </Tooltip>
            ) : (
              <p>{`Đã gửi ${formatSmartTime(
                messages[messages?.length - 1].createdAt
              )}`}</p>
            )}
          </div>
        )}
        {isTyping && (
          <div className="chat-window--body__typing-wrapper">
            <Avatar
              src={receiver?.avatar}
              sx={{ width: "32px", height: "32px" }}
            />
            <img
              src={"/typing.gif"}
              alt=""
              className="chat-window--body__typing-wrapper typing-img"
            />
          </div>
        )}
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
          onChange={handleInputChange}
          onKeyDown={(e) => {
            message.trim() &&
              !e.shiftKey &&
              e.key === "Enter" &&
              sendMesssage(e);
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
