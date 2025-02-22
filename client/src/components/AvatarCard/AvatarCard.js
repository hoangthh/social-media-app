import React from "react";
import "./AvatarCard.scss";
import { Avatar, styled, Typography } from "@mui/material";
import RelationshipButton from "../RelationshipButton/RelationshipButton";
import MessengerButton from "../MessengerButton/MessengerButton";

const MainAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
`;

const Username = styled(Typography)`
  margin-left: 20px;
  font-size: 20px;
  font-weight: 700;
  color: black;
`;

export default function AvatarCard({ user }) {
  return (
    <div className="avatar-card">
      {/* Card Info */}
      <div className="avatar-card--info">
        {/* MainAvatar */}
        <MainAvatar src={user?.avatar} />

        {/* Username */}
        <Username>{user?.name}</Username>
      </div>

      {/* Card Actions */}
      <div className="avatar-card--actions">
        {/* RelationshipButton */}
        <RelationshipButton sx={{ flex: 1 }} personalUserId={user?._id} />

        {/* MessengerButton */}
        <MessengerButton
          active
          sx={{ flex: 1, marginLeft: "10px" }}
          personalUserId={user?._id}
        />
      </div>
    </div>
  );
}
