import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { postsState$ } from "../../redux/selectors";

export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector(postsState$);

  useEffect(() => {
    dispatch(actions.getPosts.getPostsRequest());
  }, [dispatch]);

  return (
    <Grid container spacing={2} alignItems="stretch" mt={1}>
      {posts.map((post) => (
        <Grid item xs={12} key={post._id}>
          <Post post={post} dispatch={dispatch} />
        </Grid>
      ))}
    </Grid>
  );
}
