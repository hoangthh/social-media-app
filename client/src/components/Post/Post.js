import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import "./Post.scss";
import * as api from "../../api";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import * as actions from "../../redux/actions";
import Reaction from "../Reaction/Reaction";
import { findReactionByType } from "../../reaction";
import ReactionUsers from "../ReactionUsers/ReactionUsers";

const Post = ({ post, dispatch }) => {
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

  // Hàm tìm kiếm Reaction Type theo UserId
  const findReactionTypeByUserId = (reactions, userId) => {
    if (!reactions) return;

    // Duyệt qua từng reaction trong bài post
    for (const [reaction, data] of Object.entries(reactions)) {
      // Kiểm tra nếu key có chứa danh sách users và userId tồn tại
      if (data?.users?.includes(userId)) {
        return reaction; // Trả về reaction nếu tìm thấy
      }
    }

    return null; // Trả về null nếu không tìm thấy
  };

  useEffect(() => {
    const fetchReaction = async () => {
      const res = await api.fetchReactionByPostId(post._id);
      const reactionType = findReactionTypeByUserId(res?.reactions, user._id);
      const mapReaction = findReactionByType(reactionType);
      setReaction(mapReaction);
    };

    const fetchComments = async () => {
      const comments = await api.fetchComments(post._id);
      setCommentCount(comments.length);
    };

    fetchReaction();
    fetchComments();
  }, [post, user._id]);

  const shareCount = 52;

  // Hàm xử lí thay đổi cảm xúc Thích
  const handleToggleLikeReactionPost = async () => {
    await api.createReactionPost(
      post._id,
      user._id,
      reaction?.title ? "default" : "like"
    );

    dispatch(actions.getPosts.getPostsRequest());
  };

  const openCommentModal = () => {
    dispatch(actions.showCommentModal(post));
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
        image={`${process.env.REACT_APP_BACKEND_URL}/${post.attachment}`}
        title="Title"
        component="img"
        sx={{
          borderTop: "1px solid #dadada",
          borderBottom: "1px solid #dadada",
          cursor: "pointer",
        }}
      />

      <div className="card--footer">
        <div className="card--footer--info">
          {/* Info left side */}
          <div className="card--footer--info__left">
            <ReactionUsers post={post} reaction={reaction} />
          </div>
          {/* Info right side */}
          <div className="card--footer--info__right">
            {commentCount > 0 && (
              <p
                className="card--footer--info__right--comment__p"
                onClick={openCommentModal}
              >
                {commentCount} bình luận
              </p>
            )}
            <p className="card--footer--info__right--share__p">
              {shareCount} lượt chia sẻ
            </p>
          </div>
        </div>

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
    </Card>
  );
};

export default Post;
