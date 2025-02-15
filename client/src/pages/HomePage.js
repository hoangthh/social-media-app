import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import Header from "../components/Header/Header";
import PostList from "../components/PostList/PostList";
import CreatePost from "../components/CreatePost/CreatePost";
import CreatePostModal from "../components/CreatePostModal/CreatePostModal";
import LeftNav from "../components/LeftNav/LeftNav";
import RightTool from "../components/RightTool/RightTool";
import CommentModal from "../components/CommentModal/CommentModal";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { userState$ } from "../redux/selectors";

const socket = io(process.env.REACT_APP_BACKEND_URL);

export default function HomePage() {
  const user = useSelector(userState$);

  // Thêm user hiện tại vào danh sách user online của server
  useEffect(() => {
    socket.emit("addUser", user._id);
    socket.on("getUsers", (users) => {});
  }, [user._id]);

  return (
    <Container maxWidth={false} disableGutters={true}>
      <Header />
      <Grid container alignItems="stretch">
        <Grid
          item
          lg={4}
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
        >
          <LeftNav />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <CreatePost />
          <CreatePostModal />
          <CommentModal socket={socket} />
          <PostList />
        </Grid>

        <Grid
          item
          md={6}
          lg={4}
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <RightTool />
          <ChatWindow socket={socket} />
        </Grid>
      </Grid>
    </Container>
  );
}
