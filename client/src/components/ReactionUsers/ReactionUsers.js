import { Avatar, AvatarGroup, styled, Tooltip } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import * as api from "../../api";
import { findReactionByType } from "../../reaction";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";

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
  const user = useSelector(userState$);

  useEffect(() => {
    const fetchReaction = async () => {
      await api.fetchReactionByPostId(post._id);
    };

    fetchReaction();
  }, [post._id]);

  const getTopReactions = (post) => {
    // Lọc ra các reactions có count > 0
    const reactionsWithCount = Object.keys(post)
      .filter((key) => post[key].count > 0) // Chỉ lấy những reaction có count > 0
      .map((key) => ({
        type: key,
        count: post[key].count,
      }));

    // Nếu không có reaction nào có count > 0
    if (reactionsWithCount.length === 0) {
      return 0; // Trả về 0 nếu tất cả count đều bằng 0
    }

    // Sắp xếp các reactions theo count giảm dần
    reactionsWithCount.sort((a, b) => b.count - a.count);

    // Trả về top 3 reactions
    return reactionsWithCount.slice(0, 3);
  };

  // Hàm kiểm tra xem userId có tồn tại duy nhất trong một reaction không
  const isOnlyLike = (post, userId) => {
    return (
      post.reactionUsers.length === 1 && post.reactionUsers[0]._id === userId
    );
  };

  return (
    post.reactionCount > 0 && (
      <div className="card--footer--info__left--react">
        <AvatarGroup max={4} spacing="medium">
          {getTopReactions(post).map((reaction) => {
            const mapReaction = findReactionByType(reaction.type);
            return (
              <Tooltip
                key={reaction.type}
                title={
                  <Fragment>
                    {post[reaction.type]?.users.map((reactionUser, index) => (
                      <Fragment key={index}>
                        <p>{reactionUser.name}</p>
                        {/* Nếu số lượng người react nhiều hơn 10 thì thể hiện phần còn lại */}
                        {post.reactionCount > 10 && (
                          <p>và {post.reactionCount - 10} người khác</p>
                        )}
                      </Fragment>
                    ))}
                  </Fragment>
                }
              >
                <ReactionIcon
                  className={mapReaction.className}
                  src={mapReaction.icon}
                />
              </Tooltip>
            );
          })}
        </AvatarGroup>

        <Tooltip
          title={
            <Fragment>
              {post.reactionUsers.map((reactionUser) => (
                <p key={reactionUser._id}>{reactionUser.name}</p>
              ))}
            </Fragment>
          }
        >
          <p className="card--footer--info__left--react--p">
            {isOnlyLike(post, user._id)
              ? `${user.name}`
              : reaction?.title
              ? `Bạn và ${post.reactionCount - 1} người khác`
              : `${post.reactionCount}`}
          </p>
        </Tooltip>
      </div>
    )
  );
}
