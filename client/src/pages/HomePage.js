import React from "react";
import { Container, Grid } from "@mui/material";
import PostList from "../components/PostList/PostList";
import CreatePost from "../components/CreatePost/CreatePost";
import CreatePostModal from "../components/CreatePostModal/CreatePostModal";
import LeftNav from "../components/LeftNav/LeftNav";
import RightTool from "../components/RightTool/RightTool";
import CommentModal from "../components/CommentModal/CommentModal";
import ChatWindow from "../components/ChatWindow/ChatWindow";

export default function HomePage() {
  return (
    <Container maxWidth={false} disableGutters={true}>
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
          <CommentModal />
          <PostList />
          <ChatWindow />
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
        </Grid>
      </Grid>
    </Container>
  );
}
