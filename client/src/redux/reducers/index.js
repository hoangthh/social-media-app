import { combineReducers } from "redux";
import posts from "./posts";
import modal from "./modal";
import user from "./user";
import commentModal from "./commentModal";
import chatList from "./chatList";
import chatWindow from "./chatWindow";

export default combineReducers({
  posts,
  modal,
  user,
  commentModal,
  chatList,
  chatWindow,
});
