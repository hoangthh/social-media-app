import { INIT_STATE } from "../../constant";
import { getType, showChatList, hideChatList } from "../actions";

export default function chatReducers(state = INIT_STATE.chatList, action) {
  switch (action.type) {
    case getType(showChatList()):
      return {
        isShow: true,
      };
    case getType(hideChatList()):
      return {
        isShow: false,
      };

    default:
      return state;
  }
}
