import React from "react";
import { Container, Grid } from "@mui/material";
import Header from "../components/Header/Header";
import PostList from "../components/PostList/PostList";
import CreatePost from "../components/CreatePost/CreatePost";
import { Avatar, Card, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import CreatePostModal from "../components/CreatePostModal/CreatePostModal";
import LeftNav from "../components/LeftNav/LeftNav";
import RightTool from "../components/RightTool/RightTool";

export default function HomePage() {
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
        </Grid>
      </Grid>
    </Container>
  );
}
