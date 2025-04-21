import React, { useEffect, useState } from "react";
import "./FriendRequestList.scss";
import { Button, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import * as api from "../../api";
import FriendRequest from "../FriendRequest/FriendRequest";

const FriendRequestHeader = styled(Typography)`
  color: #65686c;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 5px;
`;

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
    <>
      <div className="friend-request-list">
        {/* Header */}

        <div className="friend-request-list--header">
          <FriendRequestHeader>Lời mời kết bạn</FriendRequestHeader>
          <SeeAllButton variant="text">Xem tất cả</SeeAllButton>
        </div>

        {/* Friend Request List */}
        {pendingFriends.length > 0
          ? pendingFriends.map((friend) => (
              <FriendRequest key={friend?._id} friend={friend} />
            ))
          : "Hiện chưa có lời mời kết bạn mới"}
      </div>
    </>
  );
}
