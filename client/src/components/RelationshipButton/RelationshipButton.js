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

  const currentUser = useSelector(userState$);

  useEffect(() => {
    const fetchFriends = async () => {
      const friends = await api.fetchFriendsByUserId(currentUser?._id);

      const friend =
        friends.find(
          (friend) =>
            (friend.senderId === currentUser._id &&
              friend.receiverId === personalUserId) ||
            (friend.senderId === personalUserId &&
              friend.receiverId === currentUser._id)
        ) || null;

      setFriend(friend);
    };

    fetchFriends();
  }, [currentUser?._id, personalUserId]);

  const handleToogleFriendStatus = async () => {
    if (!friend) {
      const res = await api.createFriendRequest(
        currentUser?._id,
        personalUserId
      );
      setFriend(res);
      return;
    }
    if (friend.status === "pending" && friend.receiverId === currentUser._id) {
      const res = await api.acceptFriendRequest(friend._id);
      setFriend(res);
      return;
    }
    if (
      (friend.status === "pending" && friend.senderId === currentUser._id) ||
      friend.status === "accepted"
    ) {
      await api.deleteFriendRequest(friend._id);
      setFriend(null);
      return;
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
          : friend.status === "pending" && friend.senderId === currentUser._id
          ? "Hủy lời mời"
          : friend.status === "pending" && friend.senderId !== currentUser._id
          ? "Chấp nhận lời mời"
          : "Bạn bè"}
      </span>
    </Button>
  );
}
