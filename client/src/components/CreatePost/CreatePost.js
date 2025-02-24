import { Avatar, Box, Button, Card } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/actions";
import { userState$ } from "../../redux/selectors";
import { getLastWordOfName } from "../../helpers/string";
import { Link } from "react-router-dom";

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

  const user = useSelector(userState$);

  const dispatch = useDispatch();

  const openCreatePostModal = useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <Box>
      <Card sx={cardStyles}>
        <Link to={`/user/${user._id}`}>
          <Avatar src={user.avatar} />
        </Link>
        <Button
          variant="outlined"
          sx={buttonStyles}
          color="inherit"
          onClick={openCreatePostModal}
        >
          {getLastWordOfName(user.name)} ơi, bạn đang nghĩ gì thế?
        </Button>
      </Card>
    </Box>
  );
}
