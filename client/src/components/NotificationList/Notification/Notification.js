import React, { useEffect, useState } from "react";
import "./Notification.scss";
import * as api from "../../../api";
import { convertToPascalCase } from "../../../helpers/string";
import { Avatar } from "@mui/material";

export default function Notification({ notification }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await api.fetchUserByUserId(notification.senderId);
      const formatUser = { ...user, name: convertToPascalCase(user.name) };
      setUser(formatUser);
    };
    notification && fetchUser();
  }, [notification]);

  return (
    <div className="notification">
      <Avatar src={user?.avatar} />
      <span className="notification--message">
        <span className="notification--message__name">{`${user?.name} `}</span>
        {`${notification?.message}`}
      </span>
    </div>
  );
}
