import { styled, Button as ButtonDefault } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import * as api from "../../api";

const Button = styled(ButtonDefault)`
  font-size: 15px;
  background: #dadada;
  color: black;
  text-transform: none;
`;

const activeStyle = {
  background: "#0866ff",
  color: "#fff",
};

export default function RelationshipButton({ personalUserId, sx }) {
  const [friend, setFriend] = useState(false);

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

  const handleToogleFriendStatus = async () => {
    if (!friend) {
      const res = await api.createFriendRequest(user?._id, personalUserId);
      setFriend(res);
      return;
    }
    if (friend.status === "pending" || friend.status === "accepted") {
      await api.deleteFriendRequest(friend._id);
      setFriend(null);
    }
  };

  return (
    <Button
      variant="contained"
      sx={{ ...(friend?.status !== "accepted" ? activeStyle : {}), ...sx }}
      onClick={handleToogleFriendStatus}
    >
      <PersonRoundedIcon sx={{ marginRight: "5px" }} />
      <span>
        {!friend?.status
          ? "Thêm bạn bè"
          : friend.status === "pending"
          ? "Hủy lời mời"
          : "Bạn bè"}
      </span>
    </Button>
  );
}
