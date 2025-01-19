import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import "./Post.scss";
import * as api from "../../api";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import * as actions from "../../redux/actions";

const reactions = [
  {
    title: "Thích",
    type: "like",
    className: "like-icon",
    icon: "/like-icon.png",
    src: "/reaction-like.gif",
  },
  {
    title: "Yêu thích",
    type: "favourite",
    className: "favourite-icon",
    icon: "/favourite-icon.png",
    src: "/reaction-favourite.gif",
  },
  {
    title: "Haha",
    type: "haha",
    className: "haha-icon",
    icon: "/haha-icon.png",
    src: "/reaction-haha.gif",
  },
  {
    title: "Wow",
    type: "wow",
    className: "wow-icon",
    icon: "/wow-icon.png",
    src: "/reaction-wow.gif",
  },
  {
    title: "Buồn",
    type: "sad",
    className: "sad-icon",
    icon: "/sad-icon.png",
    src: "/reaction-sad.gif",
  },
  {
    title: "Phẫn nộ",
    type: "angry",
    className: "angry-icon",
    icon: "/angry-icon.png",
    src: "/reaction-angry.gif",
  },
];

const Post = ({ post, dispatch }) => {
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

  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState({
    title: "",
    type: "",
    className: "",
    icon: "",
    src: "",
  });
  const user = useSelector(userState$);

  useEffect(() => {
    const reactionType = findReactionTypeByUserId(post, user.id);

    const mapReaction = findReactionByType(reactionType);

    setReaction(mapReaction);
  }, []);

  const commentCount = 497;

  const shareCount = 52;

  // Hàm kiểm tra xem userId có tồn tại duy nhất trong một reaction không
  const isOnlyLike = (post, userId) => {
    return (
      post.reactionUsers.length === 1 && post.reactionUsers[0]._id === userId
    );
  };

  // Hàm tìm kiếm Reaction Type theo UserId
  const findReactionTypeByUserId = (post, userId) => {
    // Duyệt qua từng reaction trong bài post
    for (const [reaction, data] of Object.entries(post)) {
      // Kiểm tra nếu key có chứa danh sách users và userId tồn tại
      if (data?.users?.some((user) => user._id === userId)) {
        return reaction; // Trả về reaction nếu tìm thấy
      }
    }

    return null; // Trả về null nếu không tìm thấy
  };

  // Hàm tìm kiếm Reaction theo Type
  const findReactionByType = (type) => {
    return reactions.find((reaction) => reaction.type === type);
  };

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

  // Hàm xử lí thả nhiều cảm xúc
  const handleMultipleReactionPost = async (reaction) => {
    setReaction(reaction);
    await api.reactPost(user.id, post._id, reaction.type);
    dispatch(actions.getPosts.getPostsRequest());
  };

  // Hàm xử lí thay đổi cảm xúc Thích
  const handleToggleLikeReactionPost = async () => {
    if (reaction?.title) {
      setReaction({
        title: "",
        type: "",
        className: "",
        icon: "",
        src: "",
      });
      await api.reactPost(user.id, post._id, "default");
    } else {
      setReaction(findReactionByType("like"));
      await api.reactPost(user.id, post._id, "like");
    }

    dispatch(actions.getPosts.getPostsRequest());
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>A</Avatar>}
        title={post.author}
        subheader={moment(post.updatedAt).format("HH:MM MMM DD,YYYY")}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        className="card--header"
        sx={{ fontWeight: "bold" }}
      />

      <CardContent>
        <Typography variant="body2" component="p" color="textSecondary">
          {post.content}
        </Typography>
      </CardContent>

      <CardMedia
        image={post.attachment}
        title="Title"
        component="img"
        sx={{
          cursor: "pointer",
        }}
      />

      <div className="card--footer">
        <div className="card--footer--info">
          {/* Info left side */}
          <div className="card--footer--info__left">
            {post.reactionCount > 0 && (
              <div className="card--footer--info__left--react">
                <AvatarGroup max={4} spacing="medium">
                  {getTopReactions(post).map((reaction) => {
                    const mapReaction = findReactionByType(reaction.type);
                    return (
                      <Tooltip
                        key={reaction.type}
                        title={
                          <Fragment>
                            {post[reaction.type].users.map((reactionUser) => (
                              <p key={reactionUser._id}>{reactionUser.name}</p>
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
                    {isOnlyLike(post, user.id)
                      ? `${user.name}`
                      : reaction?.title
                      ? `Bạn và ${post.reactionCount - 1} người khác`
                      : `${post.reactionCount}`}
                  </p>
                </Tooltip>
              </div>
            )}
          </div>
          {/* Info right side */}
          <div className="card--footer--info__right">
            <p className="card--footer--info__right--comment__p">
              {commentCount} bình luận
            </p>
            <p className="card--footer--info__right--share__p">
              {shareCount} lượt chia sẻ
            </p>
          </div>
        </div>

        <div className="card--footer--actions">
          {showReactions && (
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
          )}
          <div
            className="card--footer--actions--button"
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
            onClick={() => handleToggleLikeReactionPost()}
          >
            {reaction?.title ? (
              <>
                <img
                  src={reaction.icon}
                  alt={reaction.title}
                  className="card--footer--actions--button__icon"
                  style={{
                    width: 20,
                    height: 20,
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <span
                  className={`card--footer--actions--button__title ${reaction.className}`}
                >
                  {reaction.title}
                </span>
              </>
            ) : (
              <>
                <i className="bx bx-like"></i>
                <span>Thích</span>
              </>
            )}
          </div>
          <div className="card--footer--actions--button">
            <i className="fa-regular fa-comment"></i>
            <span>Bình luận</span>
          </div>
          <div className="card--footer--actions--button">
            <i className="bx bx-share"></i>
            <span>Chia sẻ</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Post;
