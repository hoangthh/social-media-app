import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as api from "../../../api/";
import "./ChatListItem.scss";

export default function ChatListItem({ chat, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const chatUserId = chat.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      const user = await api.fetchUserByUserId(chatUserId);
      setUser(user);
    };
    getUser();
  }, [chat, currentUser]);

  return (
    <div className="chat-list--item">
      <Avatar src={user?.avatar} />
      <div className="chat-list--item--info">
        <p className="chat-list--item--info__header">{user?.name}</p>
        <div className="chat-list--item--info__footer">
          <p className="chat-list--item--info__footer--latest-message">{}</p>
          <p className="chat-list--item--info__footer--time">{}</p>
        </div>
      </div>
    </div>
  );
}
