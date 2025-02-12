import { createAction, createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction.type;
};

export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (err) => err,
});

export const createPost = createActions({
  createPostRequest: (payload) => payload,
  createPostSuccess: (payload) => payload,
  createPostFailure: (err) => err,
});

export const getUser = createActions({
  getUserRequest: undefined,
  getUserSuccess: (payload) => payload,
  getUserFailure: (err) => err,
});

export const showModal = createAction("SHOW_CREATE_POST_MODAL");
export const hideModal = createAction("HIDE_CREATE_POST_MODAL");

export const showCommentModal = createAction("SHOW_COMMENT_MODAL");
export const hideCommentModal = createAction("HIDE_COMMENT_MODAL");

export const showChatList = createAction("SHOW_CHAT_LIST");
export const hideChatList = createAction("HIDE_CHAT_LIST");

export const showChatWindow = createAction("SHOW_CHAT_WINDOW");
export const hideChatWindow = createAction("HIDE_CHAT_WINDOW");
