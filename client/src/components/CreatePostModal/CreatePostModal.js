import {
  Avatar,
  Button,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { modalState$, userState$ } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, hideModal } from "../../redux/actions";
import "./CreatePostModal.scss";
import PeopleIcon from "@mui/icons-material/People";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { Link } from "react-router-dom";
import * as api from "../../api";

const Username = styled(Typography)`
  font-weight: bold;
`;

const WhoCanSeeButton = styled(Button)`
  text-transform: none;
  background: #e2e5e9;
  padding: 1px 5px;
`;

const SubmitButton = styled(Button)`
  text-transform: none;
`;

export default function CreatePostModal() {
  const [newPost, setNewPost] = useState({
    content: "",
    attachment: "",
    preview: "",
  });

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [previewImage, setPreviewImage] = useState();

  const { isShow } = useSelector(modalState$);
  const user = useSelector(userState$);

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const handleCloseModal = useCallback(() => {
    dispatch(hideModal());
    setNewPost({
      content: "",
      attachment: "",
    });
  }, [dispatch]);

  const handleContentChange = (e) => {
    const contentValue = e.target.value;
    setNewPost((prevData) => {
      // Cập nhật state với giá trị mới
      const updatedData = { ...prevData, content: contentValue };

      // Kiểm tra nếu content không rỗng để cập nhật trạng thái của nút submit
      if (contentValue) {
        setIsSubmitButtonDisabled(false);
      } else {
        setIsSubmitButtonDisabled(true);
      }

      return updatedData;
    });
  };

  const handleUploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.name.endsWith("png") ||
        selectedFile.name.endsWith("jpg") ||
        selectedFile.name.endsWith("jpeg"))
    ) {
      setPreviewImage(URL.createObjectURL(selectedFile));

      setNewPost((prevData) => ({
        ...prevData,
        attachment: selectedFile,
      }));
    }
  };

  const handleChangeImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleCloseImage = (e) => {
    e.stopPropagation();
    setNewPost((prevData) => ({ ...prevData, attachment: "" }));
  };

  const handleSubmit = useCallback(async () => {
    if (!newPost.content) return;
    const res = await api.createPost(
      user._id,
      newPost.content,
      newPost.attachment
    );
    if (!res) return;
    dispatch(getPosts.getPostsRequest());
    handleCloseModal();
  }, [user, newPost, dispatch, handleCloseModal]);

  const userName = "Hoàng";

  const body = (
    <div className="modal--body">
      {/* Header */}
      <div className="modal--body--header">
        <h3>Tạo bài viết</h3>
        <div
          className="modal--body--header--close-button"
          onClick={handleCloseModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      {/* Info */}
      <div className="modal--body--info">
        <Link to={`/user/${user._id}`}>
          <Avatar src={user.avatar} />
        </Link>

        {/* Info Detail */}
        <div className="modal--body--info__detail">
          {/* Username */}
          <Username>{user.name}</Username>

          {/* Role Button */}
          <WhoCanSeeButton
            variant="contained"
            size="small"
            color="inherit"
            startIcon={<PeopleIcon />}
            endIcon={<ArrowDropDownIcon />}
            sx={{}}
          >
            Bạn bè
          </WhoCanSeeButton>
        </div>
      </div>

      {/* Form */}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          multiline
          minRows={5}
          maxRows={10}
          placeholder={`${userName} ơi, bạn đang nghĩ gì thế?`}
          value={newPost.content}
          onChange={handleContentChange}
          sx={{ marginTop: "20px" }}
        />

        {newPost.attachment ? (
          <div id="image-input-preview">
            <div id="image-input-preview--overlay">
              <Button
                id="image-input-preview--change-image-button"
                variant="contained"
                color="#fff"
                startIcon={<AddToPhotosIcon />}
                onClick={handleChangeImage}
              >
                Thay đổi ảnh
              </Button>
            </div>
            <img
              id="image-input-preview--img"
              src={previewImage}
              alt="img-upload"
            />
            <label htmlFor="image-input" />
            <div
              id="image-input-preview--close-button"
              onClick={handleCloseImage}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        ) : (
          <label htmlFor="image-input">
            <div id="image-input-default">
              <AddToPhotosIcon fontSize="large" />
              Thêm ảnh
            </div>
          </label>
        )}
        <input
          id="image-input"
          hidden
          type="file"
          ref={inputRef}
          onChange={handleUploadImage}
        />
      </form>

      {/* Button */}
      <div className="modal--body--button" onClick={handleSubmit}>
        <SubmitButton
          variant="contained"
          color="primary"
          component="span"
          fullWidth
          disabled={isSubmitButtonDisabled}
        >
          Đăng
        </SubmitButton>
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
