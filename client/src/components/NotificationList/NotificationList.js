import React, { useEffect, useState } from "react";
import "./NotificationList.scss";
import { useSocket } from "../../socket/SocketProvider";
import * as api from "../../api";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import Notification from "./Notification/Notification";

export default function NotificationList() {
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState(null);
  const currentUser = useSelector(userState$);

  useEffect(() => {
    socket.on("receiveReactionPostNotification", ({ senderId, message }) => {
      setNotifications((prev) => [...prev, { senderId, message }]);
    });
    socket.on("receiveCommentPostNotification", ({ senderId, message }) => {
      setNotifications((prev) => [...prev, { senderId, message }]);
    });
  }, [socket]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await api.fetchNotifications(currentUser._id);
      setNotifications(notifications);
    };

    fetchNotifications();
  }, [currentUser]);

  return (
    <div className="notification-list">
      {/* Header */}
      <div className="chat-list--header">
        <p className="chat-list--header__p">Thông báo</p>
        <p>...</p>
      </div>

      {/* Notification */}
      {notifications?.map((notification, index) => (
        <Notification key={index} notification={notification} />
      ))}
    </div>
  );
}
