import { Avatar } from "@mui/material";
import React from "react";
import "./Message.scss";

export default function Message({
  nextMessage,
  message,
  currentUser,
  receiver,
}) {
  const isSameSenderNext = nextMessage?.senderId === message.senderId; // Kiểm tra sender tiếp theo
  const isSender = message.senderId === currentUser._id; // Kiểm tra có phải người gửi không
  const isReceiver = message.senderId !== currentUser._id; // Kiểm tra có phải receiver không

  return (
    <div className={`message ${isSender ? "sender" : "receiver"}`}>
      {!isSameSenderNext && isReceiver && (
        <Avatar
          src={receiver?.avatar}
          sx={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
      )}
      <div
        className={`message${isSender ? "--sender" : "--receiver"} ${
          isSameSenderNext && isReceiver && "same"
        }`}
      >
        <p>{message.message}</p>
      </div>
    </div>
  );
}
