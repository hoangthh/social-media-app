import { Avatar, Box, Button, Card, Modal } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalState$ } from "../../redux/selectors";
import { showModal } from "../../redux/actions";

export default function CreatePost() {
  const cardStyles = {
    display: "flex",
    flexDirection: "row",
    padding: "10px 20px",
    marginTop: "30px",
  };

  const buttonStyles = {
    color: "F0F2F5",
    marginLeft: "20px",
    textTransform: "none",
    borderRadius: "20px",
    flex: "1",
    display: "flex",
    textAlign: "start",
  };

  const dispatch = useDispatch();

  const openCreatePostModal = useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <Box>
      <Card sx={cardStyles}>
        <Avatar />
        <Button
          variant="outlined"
          sx={buttonStyles}
          color="inherit"
          onClick={openCreatePostModal}
        >
          Hoàng ơi, bạn đang nghĩ gì thế?
        </Button>
      </Card>
    </Box>
  );
}
