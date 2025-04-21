import React, { useEffect, useState } from "react";
import "./FriendRequest.scss";
import { Avatar, Button, styled } from "@mui/material";
import * as api from "../../api";
import MutualFriend from "../MutualFriend/MutualFriend";
import { Link } from "react-router-dom";
import { formatSmartTime } from "../../utils/momentConfig";

const MainAvatar = styled(Avatar)`
  width: 100%;
  height: 100%;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const AcceptButton = styled(Button)`
  font-weight: bold;
  text-transform: none;
`;
const DeclineButton = styled(Button)`
  margin-left: 10px;
  background: #e2e5e9;
  color: black;
  font-weight: bold;
  text-transform: none;
`;

export default function FriendRequest({ friend }) {
  const [user, setUser] = useState(null);
  const [statusChange, setStatusChange] = useState(false);
  const [noti, setNoti] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await api.fetchUserByUserId(friend?.senderId);
      setUser(user);
    };

    friend && fetchUser();
  }, [friend]);

  const handleAcceptFriendRequest = async () => {
    if (!friend) return;
    await api.acceptFriendRequest(friend._id);
    setStatusChange(true);
    setNoti("Các bạn đã trở thành bạn bè");
  };

  const handleDeclineFriendRequest = async () => {
    if (!friend) return;
    await api.deleteFriendRequest(friend._id);
    setStatusChange(true);
    setNoti("Đã gỡ lời mời kết bạn");
  };

  return (
    <div className="friend-request">
      <Link to={`/user/${user?._id}`}>
        <div className="friend-request--main-avatar">
          <MainAvatar src={user?.avatar} />
        </div>
      </Link>

      <div className="friend-request--info">
        <div className="friend-request--info--header">
          {/* Username */}
          <a
            href={`/user/${user?._id}`}
            className="friend-request--info--header__link"
          >
            {user?.name}
          </a>

          {/* Request Time */}
          <span>{formatSmartTime(friend.createdAt)}</span>
        </div>

        {statusChange ? (
          noti
        ) : (
          <>
            <MutualFriend
              personalUserId={user?._id}
              showFriends={false}
              style={{
                flexDirection: "row-reverse",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "10px",
              }}
            />

            <div className="friend-request--buttons">
              {/* Accept Button */}
              <AcceptButton
                variant="contained"
                onClick={handleAcceptFriendRequest}
              >
                Xác nhận
              </AcceptButton>

              {/* DeclineButton */}
              <DeclineButton
                variant="contained"
                onClick={handleDeclineFriendRequest}
              >
                Xóa
              </DeclineButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
