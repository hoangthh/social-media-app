import { Avatar, Button, Modal, TextField } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { modalState$ } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { createPost, hideModal } from "../../redux/actions";
import "./CreatePostModal.scss";
import PeopleIcon from "@mui/icons-material/People";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

export default function CreatePostModal() {
  const [data, setData] = useState({
    content: "",
    attachment: "",
  });

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const { isShow } = useSelector(modalState$);

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const handleCloseModal = useCallback(() => {
    dispatch(hideModal());
    setData({
      content: "",
      attachment: "",
    });
  }, [dispatch]);

  const handleContentChange = (e) => {
    const contentValue = e.target.value;
    setData((prevData) => {
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
      const reader = new FileReader();

      // Khi file đã được đọc xong
      reader.onloadend = () => {
        setData((prevData) => ({
          ...prevData,
          attachment: reader.result,
        }));
      };

      // Đọc file dưới dạng Data URL (Base64)
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChangeImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleCloseImage = (e) => {
    e.stopPropagation();
    setData((prevData) => ({ ...prevData, attachment: "" }));
  };

  const handleSubmit = useCallback(() => {
    if (data.content) {
      console.log("[Submit data]", { data });
      dispatch(createPost.createPostRequest(data));
      handleCloseModal();
    }
  }, [data, dispatch]);

  const userName = "Hoàng";

  const fullName = "Huy Hoàng";

  const body = (
    <div className="modal--body">
      <div className="modal--body--header">
        <h3>Tạo bài viết</h3>
        <div
          className="modal--body--header--close-button"
          onClick={handleCloseModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="modal--body--info">
        <Avatar />
        <div className="modal--body--info__detail">
          <p>{fullName}</p>
          <Button
            variant="contained"
            size="small"
            color="inherit"
            startIcon={<PeopleIcon />}
            endIcon={<ArrowDropDownIcon />}
            sx={{ marginTop: -2, textTransform: "none", background: "#ccc" }}
          >
            Bạn bè
          </Button>
        </div>
      </div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          multiline
          minRows={5}
          maxRows={10}
          placeholder={`${userName} ơi, bạn đang nghĩ gì thế?`}
          value={data.content}
          onChange={handleContentChange}
          sx={{ marginTop: "10px" }}
        />

        {data.attachment ? (
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
              src={data.attachment}
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

      <div className="modal--body--button" onClick={handleSubmit}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          fullWidth
          disabled={isSubmitButtonDisabled}
          sx={{ textTransform: "none" }}
        >
          Đăng
        </Button>
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
