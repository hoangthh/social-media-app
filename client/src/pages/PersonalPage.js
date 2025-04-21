import {
  styled,
  Avatar,
  CardMedia,
  Container,
  Typography,
  Button,
} from "@mui/material";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import React, { useEffect, useState } from "react";
import "./PersonalPage.scss";
import PostList from "../components/PostList/PostList";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../api";
import RelationshipButton from "../components/RelationshipButton/RelationshipButton";
import MessengerButton from "../components/MessengerButton/MessengerButton";
import { useSelector } from "react-redux";
import { userState$ } from "../redux/selectors";
import MutualFriend from "../components/MutualFriend/MutualFriend";
import ChatWindow from "../components/ChatWindow/ChatWindow";

const CoverImg = styled(CardMedia)`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const CameraCoverImgIcon = styled(CameraAltRoundedIcon)`
  margin-right: 5px;
`;

const AvatarImg = styled(Avatar)`
  width: 170px;
  height: 170px;
  border: 5px solid #fff;

  &:hover {
    background-color: #999;
    cursor: pointer;
  }
`;

const CameraAvatarImgIcon = styled(CameraAltRoundedIcon)`
  background: #e2e5e9;
  position: absolute;
  bottom: 10px;
  right: 5px;
  width: 40px;
  height: 40px;
  margin-right: 5px;
  padding: 5px;
  border-radius: 50%;

  &:hover {
    background-color: #f0f0f0;
    user-select: none;
    cursor: pointer;
  }
`;

const Username = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
`;

const ChangePersonalPageButton = styled(Button)`
  background: #e2e5e9;
  color: black;
  padding: 10px;
  font-size: 15px;
  border: none;
  outline: none;
  border-radius: 10px;
  text-transform: none;

  &:hover {
    background: #dadada;
    cursor: pointer;
  }
`;

const EditIcon = styled(EditRoundedIcon)`
  margin-right: 5px;
`;

export default function PersonalPage() {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [personalUser, setPersonalUser] = useState(null);

  const currentUser = useSelector(userState$);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser._id === userId) {
        setIsCurrentUser(true);
        setPersonalUser(currentUser);
        return;
      }

      const user = await api.fetchUserByUserId(userId);

      if (!user) {
        navigate("/");
        return;
      }
      setIsCurrentUser(false);
      setPersonalUser(user);
    };

    fetchUser();
  }, [personalUser, currentUser, userId, isCurrentUser, navigate]);

  return (
    <Container maxWidth={false} disableGutters={true}>
      {/* Header */}
      <div className="personal-page--header__wrapper">
        <div className="personal-page--header">
          {/* Cover Img Wrapper */}
          <div className="personal-page--header__cover-img">
            {/* Cover Img */}
            <CoverImg
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_tabby_and_white_kitten_n01.jpg/1200px-Golden_tabby_and_white_kitten_n01.jpg"
              component="img"
            />

            {/* Change Cover Img */}
            <button className="personal-page--header__cover-img--action">
              <CameraCoverImgIcon />
              Chỉnh sửa ảnh bìa
            </button>
          </div>

          <div className="personal-page--header__main">
            {/* Avatar Img */}
            <div className="personal-page--header__main--avatar">
              <AvatarImg src={personalUser?.avatar} />
              <CameraAvatarImgIcon />
            </div>

            {/* Main Info Wrapper */}
            <div className="personal-page--header__main--wrapper">
              {/* Main info */}
              <div>
                {/* Username */}
                <Username>{personalUser?.name}</Username>

                {/* MutualFriend */}
                <MutualFriend
                  personalUserId={personalUser?._id}
                  style={{ flexDirection: "column" }}
                />
              </div>

              {/* Main Actions */}
              {isCurrentUser ? (
                <ChangePersonalPageButton>
                  <EditIcon />
                  Chỉnh sửa trang cá nhân
                </ChangePersonalPageButton>
              ) : (
                <div className="personal-page--header__main--wrapper__actions">
                  <RelationshipButton
                    personalUserId={personalUser?._id}
                    sx={{ marginRight: "20px" }}
                  />
                  <MessengerButton personalUserId={personalUser?._id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post List */}
      <div className="personal-page--post-list">
        <PostList />
      </div>

      <ChatWindow />
    </Container>
  );
}
