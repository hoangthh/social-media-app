import { AvatarGroup, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AvatarCustom from "../AvatarCustom/AvatarCustom";
import * as api from "../../api";

const FriendCount = styled(Typography)`
  color: #65686c;
  font-weight: 400;
`;

const AvatarGroupCustom = styled(AvatarGroup)`
  margin-top: 5px;
  width: fit-content;
`;

export default function MutualFriend({
  personalUserId,
  showFriends = true,
  showMutualFriends = true,
  style,
}) {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [mutualFriends, setMutualFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!personalUserId) return;
      const mutualFriends = await api.fetchMutualFriends(personalUserId);
      setMutualFriends(mutualFriends);

      const friends = (await api.fetchFriendsByUserId(personalUserId)) || [];
      const acceptedFriends = friends.filter(
        (friend) => friend.status === "accepted"
      );
      setAcceptedFriends(acceptedFriends);
    };

    fetchFriends();
  }, [personalUserId]);

  return (
    <div className="mutual-friend" style={{ display: "flex", ...style }}>
      {/* FriendCount */}
      <FriendCount>
        {showFriends &&
          acceptedFriends?.length > 0 &&
          `${acceptedFriends?.length} người bạn`}
        {showFriends && showMutualFriends && mutualFriends.length > 0 && " • "}
        {showMutualFriends &&
          mutualFriends?.length > 0 &&
          `${mutualFriends?.length} bạn chung`}
      </FriendCount>

      {/* Display Avatar */}
      <AvatarGroupCustom max={7}>
        {mutualFriends?.map((friend) => (
          <AvatarCustom key={friend._id} user={friend} />
        ))}
      </AvatarGroupCustom>
    </div>
  );
}
