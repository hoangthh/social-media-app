import { Button as ButtonDefault, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import * as api from "../../api";

const Button = styled(ButtonDefault)`
  background: #dadada;
  color: black;
  font-size: 15px;
  text-transform: none;
`;

const activeStyle = {
  background: "#0866ff",
  color: "#fff",
};

export default function MessengerButton({ personalUserId, sx }) {
  const [friend, setFriend] = useState(null);

  const user = useSelector(userState$);

  useEffect(() => {
    const fetchFriends = async () => {
      const friends = await api.fetchFriendsByUserId(user?._id);
      const friend =
        friends.find(
          (friend) =>
            (friend.senderId === user._id &&
              friend.receiverId === personalUserId) ||
            (friend.senderId === personalUserId &&
              friend.receiverId === user._id)
        ) || null;
      setFriend(friend);
    };

    fetchFriends();
  }, [user?._id, personalUserId]);

  return (
    <Button
      variant="contained"
      sx={{ ...(friend?.status === "accepted" ? activeStyle : {}), ...sx }}
    >
      <i
        className="fa-brands fa-facebook-messenger"
        style={{ marginRight: "5px" }}
      />
      <span>Nhắn tin</span>
    </Button>
  );
}
