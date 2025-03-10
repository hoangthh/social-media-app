import { Avatar, AvatarGroup, styled, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as api from "../../api";
import { findReactionByType } from "../../helpers/reaction";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import ReactionUser from "./ReactionUser/ReactionUser";

// ReactionIcon Component
const ReactionIcon = styled(Avatar)`
  &.MuiAvatar-root {
    border: none;
    width: 20px;
    height: 20px;
  }

  &.favourite-icon {
    width: 19px;
    height: 19px;
  }
`;

export default function ReactionUsers({ post, reaction }) {
  const [reactionTypes, setReactionTypes] = useState(null);
  const [hasReaction, setHasReaction] = useState(false);
  const [topReactionTypes, setTopReactionTypes] = useState(null);
  const [reactionUserIds, setReactionUserIds] = useState(null);

  const user = useSelector(userState$);

  useEffect(() => {
    const fetchReaction = async () => {
      const res = await api.fetchReactionByPostId(post._id);
      const reactionTypes = res?.reaction || {};
      setReactionTypes(reactionTypes);

      if (res?.reaction) {
        // Kiểm tra có user nào reaction không
        const hasReaction = Object.values(reactionTypes).some(
          (type) => type.length > 0
        );
        setHasReaction(hasReaction);
        setHasReaction(true);
      }

      if (hasReaction) {
        // Lọc ra các reaction có số lượng user > 0
        const topReactionTypes = Object.entries(reactionTypes)
          .map(([key, value]) => ({
            type: key,
            count: value.length,
            userIds: value,
          }))
          .filter((type) => type.count > 0)
          .sort((a, b) => b.count - a.count) // Sắp xếp giảm dần theo số lượng user
          .slice(0, 3); // Lấy top 3
        setTopReactionTypes(topReactionTypes);

        const reactionUserIds = Object.values(reactionTypes).flat();
        setReactionUserIds(reactionUserIds);
      }
    };

    post && fetchReaction();
  }, [hasReaction, post]);

  // Hàm kiểm tra xem userId có tồn tại duy nhất trong một reaction không
  const isOnlyCurrentUserLike = (userId) => {
    return reactionUserIds?.every(
      (reactionUserId) => reactionUserId === userId
    );
  };

  return (
    hasReaction && (
      <div className="card--footer--info__left--react">
        <AvatarGroup max={4}>
          {topReactionTypes?.map((reaction) => {
            const mapReaction = findReactionByType(reaction.type);
            return (
              <Tooltip
                key={reaction.type}
                title={reaction.userIds.map((reactionUserId) => (
                  <ReactionUser
                    key={reactionUserId}
                    reactionUserId={reactionUserId}
                  />
                ))}
              >
                <ReactionIcon
                  className={mapReaction.className}
                  src={mapReaction.icon}
                />
              </Tooltip>
            );
          })}
        </AvatarGroup>

        {/* Reaction User List */}
        <Tooltip
          title={reactionUserIds?.map((reactionUserId) => (
            <ReactionUser
              key={reactionUserId}
              reactionUserId={reactionUserId}
            />
          ))}
        >
          <span className="card--footer--info__left--react--p">
            {isOnlyCurrentUserLike(user._id)
              ? `${user.name}`
              : reaction?.title
              ? `Bạn và ${reactionUserIds?.length - 1} người khác`
              : `${reactionUserIds?.length}`}
          </span>
        </Tooltip>
      </div>
    )
  );
}
