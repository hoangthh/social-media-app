import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as api from "../../../api";
import "./Chat.scss";
import { useDispatch, useSelector } from "react-redux";
import { userState$ } from "../../../redux/selectors";
import {
  convertToPascalCase,
  getLastWordOfName,
} from "../../../helpers/string";
import { hideChatList, showChatWindow } from "../../../redux/actions";

export default function Chat({ chat }) {
  const [chatUser, setChatUser] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);
  const [sender, setSender] = useState("");

  const currentUser = useSelector(userState$);

  const dispatch = useDispatch();

  useEffect(() => {
    const chatUserId = chat.members.find(
      (member) => member !== currentUser._id
    );

    const fetchUser = async () => {
      const chatUser = await api.fetchUserByUserId(chatUserId);
      setChatUser(chatUser);
    };

    chat && fetchUser();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await api.fetchMessagesByChatId(chat._id);
      const latestMessage = messages.at(-1);
      latestMessage?.senderId !== currentUser._id
        ? setSender(getLastWordOfName(chatUser?.name))
        : setSender("Bạn");
      setLatestMessage(latestMessage);
    };

    fetchMessages();
  }, [chat, chatUser, currentUser]);

  const handleSelectChat = (receiverId, chatId, chat) => {
    dispatch(hideChatList());
    dispatch(showChatWindow({ receiverId, chatId, chat }));
  };

  return (
    <>
      {latestMessage && (
        <div
          className="chat"
          onClick={() => handleSelectChat(chatUser._id, chat._id, chat)}
        >
          <Avatar src={chatUser?.avatar} />

          <div className="chat--info">
            {/* Header - Name */}
            <span className="chat--info__header">
              {convertToPascalCase(chatUser?.name)}
            </span>

            {/* Footer */}
            <div className="chat--info__footer">
              {/* Latest Message */}
              <span className="chat--info__footer--latest-message">
                {`${sender}: ${latestMessage?.message}`}
              </span>

              {/* Time */}
              <span className="chat-list--item--info__footer--time">{}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
