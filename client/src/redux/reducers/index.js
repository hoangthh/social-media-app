import { combineReducers } from "redux";
import posts from "./posts";
import modal from "./modal";
import user from "./user";
import commentModal from "./commentModal";

export default combineReducers({
  posts,
  modal,
  user,
  commentModal,
});
