import React, { useCallback, useEffect, useRef, useState } from "react";
import "./CommentModal.scss";
import { Avatar, Modal, styled, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useDispatch, useSelector } from "react-redux";
import { commentModalState$, userState$ } from "../../redux/selectors";
import * as actions from "../../redux/actions";
import Post from "../Post/Post";
import CommentItem from "./CommentItem/CommentItem";
import * as api from "../../api";
import { useSocket } from "../../socket/SocketProvider";

const CommentInput = styled(TextField)`
  width: 100%;
  background: #f0f2f5;
  border: none;
  outline: none;
  border-radius: 20px;
  margin-right: 5px;
`;

const SendButton = styled(SendRoundedIcon)`
  color: #0264d3;
  cursor: pointer;
`;
const SendButtonDisabled = styled(SendRoundedIcon)`
  color: #bec3ca;
  cursor: not-allowed;
`;

export default function CommentModal() {
  const socket = useSocket();
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState("");
  const [arrivalComment, setArrivalComment] = useState(null);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);

  const scrollRef = useRef();

  const { isShow, data } = useSelector(commentModalState$);
  const post = data || {};
  const user = useSelector(userState$);

  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("receiveComment", (data) => {
      setArrivalComment({
        postId: data?.postId,
        userId: data?.userId,
        comment: data?.comment,
        createdAt: Date.now(),
      });
    });

    // Nếu có tin nhắn realtime thì thay đổi lại mảng comments
    arrivalComment && setComments((prev) => [...prev, arrivalComment]);
  }, [socket, arrivalComment]);

  useEffect(() => {
    // Lấy comments từ db
    const fetchComments = async () => {
      const comments = await api.fetchComments(post._id);
      setComments(comments);
    };

    fetchComments();
  }, [post._id]);

  // Scroll xuống comment mới nhất
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleCloseModal = useCallback(() => {
    dispatch(actions.hideCommentModal());
  }, [dispatch]);

  const handleCommentInputChange = (e) => {
    const contentValue = e.target.value;
    setComment(contentValue);
    if (contentValue) {
      setIsSendButtonDisabled(false);
    } else {
      setIsSendButtonDisabled(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngăn xuống dòng khi chỉ nhấn Enter
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (comment) {
      const newComment = {
        postId: post._id,
        userId: user._id,
        comment,
      };

      // Gửi tin nhắn lên socket
      socket.emit("sendComment", newComment);
      const res = await api.createComment(newComment);
      setComments([...comments, res]);
      setComment(""); // Xóa nội dung sau khi submit (nếu cần)
      setIsSendButtonDisabled(true);
    }
  };

  const body = (
    <div className="comment-modal">
      {/* Header */}
      <div className="comment-modal--header">
        Bài viết của {post?.author}
        <div
          className="comment-modal--header__close-button"
          onClick={handleCloseModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      {/* Current Post */}
      <div className="comment-modal--post">
        <Post post={post} dispatch={dispatch} />

        {/* Read Comments */}
        {comments?.map((comment) => (
          <div key={comment._id} ref={scrollRef}>
            <CommentItem key={comment._id} comment={comment} />
          </div>
        ))}
      </div>

      {/* Write Comment */}
      <div className="comment-modal--write-comment">
        <Avatar
          sx={{
            marginRight: "5px",
          }}
          src={user.avatar}
        />
        <CommentInput
          placeholder="Viết bình luận"
          multiline
          minRows={1}
          maxRows={10}
          onChange={handleCommentInputChange}
          onKeyDown={handleKeyDown}
          value={comment}
          slotProps={{
            input: {
              style: {
                border: "none",
                outline: "none",
                borderRadius: "20px",
                height: "40px",
              },
            },
          }}
        />
        {isSendButtonDisabled ? (
          <SendButtonDisabled />
        ) : (
          <SendButton onClick={handleSubmit} />
        )}
      </div>
    </div>
  );

  return (
    <Modal
      open={isShow}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {body}
    </Modal>
  );
}
