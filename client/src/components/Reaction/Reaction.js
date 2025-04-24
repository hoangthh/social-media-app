import { Tooltip } from "@mui/material";
import React from "react";
import * as api from "../../api";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { userState$ } from "../../redux/selectors";
import { reactions } from "../../helpers/reaction";
import { useSocket } from "../../socket/SocketProvider";

export default function Reaction({
  showReactions,
  setShowReactions,
  setReaction,
  post,
  comment,
}) {
  const { socket } = useSocket();

  const user = useSelector(userState$);

  const dispatch = useDispatch();

  // Hàm xử lí thả nhiều cảm xúc
  const handleMultipleReactionPost = async (reaction) => {
    setReaction(reaction);
    await api.createReactionPost(post._id, user._id, reaction.type);

    socket.emit("reactionPost", {
      senderId: user._id,
      receiverId: post.userId,
      message: "đã bày tỏ cảm xúc đối với bài viết của bạn",
    });

    dispatch(actions.getPosts.getPostsRequest());
  };

  return (
    showReactions && (
      <div
        className="card--footer--actions--button__reactions"
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        {reactions.map((reaction, index) => (
          <Tooltip
            key={index}
            title={reaction.title}
            placement="top"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -20],
                    },
                  },
                ],
              },
            }}
          >
            <img
              className="card--footer--actions--button__reactions__img"
              src={reaction.src}
              alt="reactions--icon"
              onClick={() => handleMultipleReactionPost(reaction)}
            />
          </Tooltip>
        ))}
      </div>
    )
  );
}
