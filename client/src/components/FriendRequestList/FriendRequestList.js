import React, { useEffect, useState } from "react";
import "./FriendRequestList.scss";
import { Button, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import * as api from "../../api";
import FriendRequest from "../FriendRequest/FriendRequest";

const SeeAllButton = styled(Button)`
  text-transform: none;
`;

export default function FriendRequestList() {
  const [pendingFriends, setPendingFriends] = useState([]);
  const user = useSelector(userState$);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const friends = await api.fetchFriendsByUserId(user._id);
      const pendingFriends =
        friends.filter(
          (friend) =>
            friend.senderId !== user._id && friend.status === "pending"
        ) || [];
      setPendingFriends(pendingFriends);
    };
    fetchData();
  }, [user]);

  return (
    <div className="friend-request-list">
      {/* Header */}
      {pendingFriends.length > 0 && (
        <div className="friend-request-list--header">
          <h3>Lời mời kết bạn</h3>
          <SeeAllButton variant="text">Xem tất cả</SeeAllButton>
        </div>
      )}

      {/* Friend Request List */}
      {pendingFriends.map((friend) => (
        <FriendRequest key={friend?._id} friend={friend} />
      ))}
    </div>
  );
}
