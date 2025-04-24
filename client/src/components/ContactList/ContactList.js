import React, { useEffect, useState } from "react";
import { useSocket } from "../../socket/SocketProvider";
import "./ContactList.scss";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import Contact from "./Contact/Contact";
import { styled, Typography } from "@mui/material";

const ContactHeader = styled(Typography)`
  color: #65686c;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export default function ContactList() {
  const { socket } = useSocket();
  const [onlineUsers, setOnlineUsers] = useState([]);

  const currentUser = useSelector(userState$);

  useEffect(() => {
    socket?.on("getUsers", (users) => {
      const onlineUsers = users.filter(
        (user) => user.userId !== currentUser._id
      );
      console.log("onlineUsers", onlineUsers);
      setOnlineUsers(onlineUsers);
    });
  }, [socket, currentUser]);

  return (
    <>
      <div className="contact-list">
        <div className="contact-list--header">
          <ContactHeader>Người liên hệ</ContactHeader>
        </div>

        {/* Contact Person */}
        {onlineUsers?.length > 0
          ? onlineUsers.map((user) => (
              <Contact key={user.userId} userId={user.userId} />
            ))
          : "Bạn bè của bạn chưa online. Rủ họ ngay nào!"}
      </div>
    </>
  );
}
