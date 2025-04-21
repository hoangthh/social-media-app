import { Avatar, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CommentItem.scss";
import * as api from "../../../api";
import { formatSmartTime } from "../../../utils/momentConfig";
import AvatarCustom from "../../AvatarCustom/AvatarCustom";

export default function CommentItem({ comment }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserByUserId = async () => {
      const user = await api.fetchUserByUserId(comment.userId);
      setUser(user);
    };

    comment && fetchUserByUserId();
  }, [comment]);

  return (
    <div className="comment-item">
      <AvatarCustom user={user} />
      <div className="comment-item--wrapper">
        <div className="comment-item--wrapper--info">
          <span className="comment-item--wrapper--info__username">
            {user?.name}
          </span>
          <p className="comment-item--wrapper--info__comment">
            {comment?.comment}
          </p>
        </div>

        <Tooltip title={comment?.createdAt} placement="top">
          <span className="comment-item--wrapper--date">
            {formatSmartTime(comment?.createdAt)}
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
