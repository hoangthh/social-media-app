import { Avatar, Badge, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Contact.scss";
import * as api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { showChatWindow } from "../../../redux/actions";
import { convertToPascalCase } from "../../../helpers/string";
import { userState$ } from "../../../redux/selectors";

const StyledAvatar = styled(Avatar)`
  width: 28px;
  height: 28px;
`;

const ChatUsername = styled(Typography)`
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
  user-select: none;
`;

export default function Contact({ userId }) {
  const [chatUser, setChatUser] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(userState$);

  useEffect(() => {
    const fetchUser = async () => {
      const chatUser = await api.fetchUserByUserId(userId);
      const formatChatUser = {
        ...chatUser,
        name: convertToPascalCase(chatUser.name),
      };
      setChatUser(formatChatUser);
    };

    userId && fetchUser();
  }, [userId]);

  const handleOpenChat = async () => {
    const chat = await api.createChat(user._id, chatUser._id);
    dispatch(showChatWindow({ receiverId: userId, chatId: chat._id, chat }));
  };

  return (
    <div className="contact" onClick={handleOpenChat}>
      <Badge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        color="success"
        variant="dot"
      >
        <StyledAvatar src={chatUser?.avatar} />
      </Badge>
      <ChatUsername>{chatUser?.name}</ChatUsername>
    </div>
  );
}
