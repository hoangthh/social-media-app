import { Avatar, Box, Button, Card, styled } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/actions";
import { userState$ } from "../../redux/selectors";
import { getLastWordOfName } from "../../helpers/string";
import { Link } from "react-router-dom";

const CreatePostCard = styled(Card)`
  display: flex;
  margin-top: 30px;
  padding: 10px 20px;
`;

const CreatePostButton = styled(Button)`
  flex: 1;
  margin-left: 20px;
  color: F0F2F5;
  border-radius: 20px;
  text-transform: none;
`;

export default function CreatePost() {
  const user = useSelector(userState$);

  const dispatch = useDispatch();

  const openCreatePostModal = useCallback(() => {
    dispatch(showModal());
  }, [dispatch]);

  return (
    <div className="create-post--button">
      {/* Create Post Card */}
      <CreatePostCard>
        {/* Avatar User */}
        <Link to={`/user/${user._id}`}>
          <Avatar src={user.avatar} />
        </Link>

        {/* Create Post Button */}
        <CreatePostButton
          variant="outlined"
          color="inherit"
          onClick={openCreatePostModal}
        >
          {getLastWordOfName(user.name)} ơi, bạn đang nghĩ gì thế?
        </CreatePostButton>
      </CreatePostCard>
    </div>
  );
}
