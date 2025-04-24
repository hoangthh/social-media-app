import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatSmartTime } from "../../utils/momentConfig";
import "./Post.scss";
import * as api from "../../api";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import * as actions from "../../redux/actions";
import Reaction from "../Reaction/Reaction";
import { findReactionByType } from "../../helpers/reaction";
import ReactionUsers from "../ReactionUsers/ReactionUsers";
import { useSocket } from "../../socket/SocketProvider";
import { Link } from "react-router-dom";
import AvatarCustom from "../AvatarCustom/AvatarCustom";
import { media } from "../../muiResponsive";

const PostCard = styled(Card)`
  margin-top: 10px;
`;

const PostCardHeader = styled(CardHeader)`
  font-weight: bold;
`;

const Username = styled(Typography)`
  font-weight: 550;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

const PostCardMedia = styled(CardMedia)`
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  cursor: pointer;
`;

const CommentCount = styled(Typography)`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  ${media.sm(`
    font-size: 12px;
  `)}
`;

const ShareCount = styled(Typography)`
  margin-left: 10px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  ${media.sm(`
    font-size: 12px;
  `)}
`;

const Post = ({ post, dispatch }) => {
  const { socket } = useSocket();
  const [author, setAuthor] = useState(null);
  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState({
    title: "",
    type: "",
    className: "",
    icon: "",
    src: "",
  });
  const [commentCount, setCommentCount] = useState(null);

  const user = useSelector(userState$);

  useEffect(() => {
    const fetchAuthor = async () => {
      const author = await api.fetchUserByUserId(post.userId);
      setAuthor(author);
    };

    const fetchReaction = async () => {
      const res = await api.fetchReactionByPostId(post._id);
      const reactionType = findReactionTypeByUserId(res?.reaction, user._id);
      const mapReaction = findReactionByType(reactionType);
      setReaction(mapReaction);
    };

    const fetchComments = async () => {
      const comments = await api.fetchComments(post._id);
      setCommentCount(comments.length);
    };

    if (post) {
      fetchAuthor();
      fetchReaction();
      fetchComments();
    }
  }, [post, user]);

  // Hàm tìm kiếm Reaction Type theo UserId
  const findReactionTypeByUserId = (reactionTypes, userId) => {
    if (!reactionTypes) return;

    // Duyệt qua từng reaction trong bài post
    for (const [reactionType, data] of Object.entries(reactionTypes)) {
      // Kiểm tra nếu key có chứa danh sách users và userId tồn tại
      if (data.includes(userId)) {
        return reactionType; // Trả về reaction nếu tìm thấy
      }
    }

    return null; // Trả về null nếu không tìm thấy
  };

  const shareCount = 52;

  // Hàm xử lí thay đổi cảm xúc Thích
  const handleToggleLikeReactionPost = async () => {
    const res = await api.createReactionPost(
      post._id,
      user._id,
      reaction?.title ? "default" : "like"
    );

    console.log(res);
    socket.emit("reactionPost", {
      senderId: user._id,
      receiverId: author._id,
      message: "đã bày tỏ cảm xúc đối với bài viết của bạn",
    });

    dispatch(actions.getPosts.getPostsRequest());
  };

  const openCommentModal = () => {
    dispatch(actions.showCommentModal(post));
  };

  return (
    <PostCard>
      <PostCardHeader
        avatar={
          <AvatarCustom user={author}>
            <Link to={`/user/${post.userId}`}>
              <Avatar src={author?.avatar} />
            </Link>
          </AvatarCustom>
        }
        title={
          <Link to={`/user/${post.userId}`} style={{ textDecoration: "none" }}>
            <Username>{author?.name}</Username>
          </Link>
        }
        subheader={formatSmartTime(post.updatedAt) || "Vừa xong"}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardContent>
        <Typography>{post.content}</Typography>
      </CardContent>

      {post.attachment && (
        <PostCardMedia
          image={`${process.env.REACT_APP_BACKEND_URL}/${post.attachment}`}
          title="Title"
          component="img"
        />
      )}

      {/* Footer */}
      <div className="card--footer">
        <div className="card--footer--info">
          {/* Info left side */}
          <div className="card--footer--info__left">
            <ReactionUsers post={post} reaction={reaction} />
          </div>

          {/* Info right side */}
          <div className="card--footer--info__right">
            {commentCount > 0 && (
              <CommentCount onClick={openCommentModal}>
                {commentCount} bình luận
              </CommentCount>
            )}
            <ShareCount>{shareCount} lượt chia sẻ</ShareCount>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card--footer--actions">
          <Reaction
            showReactions={showReactions}
            setShowReactions={setShowReactions}
            setReaction={setReaction}
            post={post}
          />
          <div
            className="card--footer--actions--button"
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
            onClick={() => handleToggleLikeReactionPost()}
          >
            {reaction?.title ? (
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
            ) : (
              <i className="bx bx-like"></i>
            )}
            <span
              className={`card--footer--actions--button__title ${reaction?.className}`}
            >
              {reaction?.title || "Thích"}
            </span>
          </div>
          <div
            className="card--footer--actions--button"
            onClick={openCommentModal}
          >
            <i className="fa-regular fa-comment"></i>
            <span>Bình luận</span>
          </div>
          <div className="card--footer--actions--button">
            <i className="bx bx-share"></i>
            <span>Chia sẻ</span>
          </div>
        </div>
      </div>
    </PostCard>
  );
};

export default Post;
