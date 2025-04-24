import { Avatar, Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as api from "../../../api";
import "./Chat.scss";
import { useDispatch, useSelector } from "react-redux";
import { userState$ } from "../../../redux/selectors";
import { convertToPascalCase } from "../../../helpers/string";
import { hideChatList, showChatWindow } from "../../../redux/actions";
import { formatSmartTime } from "../../../utils/momentConfig";
import { useSocket } from "../../../socket/SocketProvider";

export default function Chat({ chat }) {
  const { socket, setArrivalSenderIds, setIsReadData } = useSocket();
  const [chatUser, setChatUser] = useState(null);
  const [isRead, setIsRead] = useState(chat.lastMessage.isRead);

  const currentUser = useSelector(userState$);

  const dispatch = useDispatch();

  useEffect(() => {
    const chatUserId = chat.members.find(
      (member) => member !== currentUser._id
    );

    const fetchUser = async () => {
      const chatUserFromApi = await api.fetchUserByUserId(chatUserId);
      setChatUser(chatUserFromApi);
    };

    chat && fetchUser();
  }, [chat, currentUser]);

  useEffect(() => {
    setIsRead(chat.lastMessage.isRead);
  }, [chat]);

  const handleSelectChat = async (receiverId, chatId, chat) => {
    dispatch(hideChatList());
    dispatch(showChatWindow({ receiverId, chatId, chat }));

    setArrivalSenderIds((prev) =>
      prev.filter((senderId) => senderId !== chatUser._id)
    );

    await api.updateIsReadLastMessage(chatId);
    setIsRead(!chat.lastMessage.isRead);
    setIsReadData({ chatId, isRead: true });

    await api.updateIsSeenLastMessage(chatId, currentUser._id);
    socket?.emit("seenMessage", {
      viewerId: currentUser._id,
      receiverId: chatUser._id,
    });
  };

  return (
    <>
      {chat.lastMessage && (
        <div
          className="chat"
          onClick={() => handleSelectChat(chatUser._id, chat._id, chat)}
        >
          <Avatar
            src={chatUser?.avatar}
            sx={{ width: "56px", height: "56px" }}
          />

          <div className="chat--info">
            {/* Header - Name */}
            <span className="chat--info__header">
              {convertToPascalCase(chatUser?.name)}
            </span>

            {/* Footer */}
            <div
              className={`chat--info__footer ${
                !isRead && chat.lastMessage.senderId !== currentUser._id
                  ? "bold"
                  : ""
              }`}
            >
              {/* Latest Message */}
              {chat.lastMessage.senderId === currentUser._id && (
                <span className="chat--info__footer sender">{"Bạn:"}</span>
              )}
              <span className="chat--info__footer last-message">
                {chat.lastMessage.message}
              </span>
              {formatSmartTime(chat.lastMessage.createdAt) !== "" && (
                <strong>.</strong>
              )}
              {/* Time */}
              <span className="chat--info__footer time">
                {formatSmartTime(chat.lastMessage.createdAt)}
              </span>
            </div>
          </div>
          {!isRead && chat.lastMessage.senderId !== currentUser._id && (
            <Badge variant="dot" color="primary"></Badge>
          )}
        </div>
      )}
    </>
  );
}
