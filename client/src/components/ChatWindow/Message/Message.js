import { Avatar, styled, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Message.scss";
import {
  formatFlexibleTime,
  formatSmartTime,
} from "../../../utils/momentConfig";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useSocket } from "../../../socket/SocketProvider";

const ReactionIcon = styled(AddReactionOutlinedIcon)`
  width: 30px;
  height: 30px;
  color: #666;
  border-radius: 50%;
  padding: 4px;
  &:hover {
    background: #dadada;
    cursor: pointer;
  }
`;
const ReplyIcon = styled(ReplyOutlinedIcon)`
  width: 30px;
  height: 30px;
  color: #555;
  border-radius: 50%;
  padding: 4px;
  &:hover {
    background: #dadada;
    cursor: pointer;
  }
`;
const MoreIcon = styled(MoreVertOutlinedIcon)`
  width: 30px;
  height: 30px;
  color: #555;
  border-radius: 50%;
  padding: 4px;
  &:hover {
    background: #dadada;
    cursor: pointer;
  }
`;

export default function Message({
  nextMessage,
  message,
  lastMessage,
  currentUser,
  receiver,
}) {
  const [openMessageOption, setOpenMessageOption] = useState(false);

  const isSameSenderNext = nextMessage?.senderId === message.senderId; // Kiểm tra sender tiếp theo
  const isSender = message.senderId === currentUser._id; // Kiểm tra có phải người gửi không
  const isReceiver = message.senderId !== currentUser._id; // Kiểm tra có phải receiver không
  const isLastMessage = message._id === lastMessage?._id && isSender;

  useEffect(() => {}, []);
  return (
    <>
      <div
        className={`message ${isSender ? "sender" : "receiver"}`}
        onMouseEnter={() => setOpenMessageOption(true)}
        onMouseLeave={() => setOpenMessageOption(false)}
      >
        {!isSameSenderNext && isReceiver && (
          <Tooltip
            title={receiver?.name}
            placement="left"
            sx={{ width: "100%" }}
          >
            <Avatar
              src={receiver?.avatar}
              sx={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
          </Tooltip>
        )}
        <div
          className={`message${isSender ? "--sender" : "--receiver"} ${
            isSameSenderNext && isReceiver && "same"
          }`}
        >
          <Tooltip
            title={formatFlexibleTime(message.createdAt).replace("t", "T")}
            placement="left"
          >
            <p>{message.message}</p>
          </Tooltip>
        </div>
        {openMessageOption && (
          <div
            className={`message--option ${isSender ? "sender" : "receiver"}`}
          >
            <Tooltip title="Bày tỏ cảm xúc" placement="top">
              <ReactionIcon />
            </Tooltip>
            <Tooltip title="Trả lời" placement="top">
              <ReplyIcon />
            </Tooltip>
            <Tooltip title="Xem thêm" placement="top">
              <MoreIcon />
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
}
