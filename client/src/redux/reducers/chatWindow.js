import { INIT_STATE } from "../../constant";
import { getType, showChatWindow, hideChatWindow } from "../actions";

export default function chatReducers(state = INIT_STATE.chatWindow, action) {
  switch (action.type) {
    case getType(showChatWindow()):
      return {
        isShow: true,
        data: action.payload,
      };
    case getType(hideChatWindow()):
      return {
        isShow: false,
      };

    default:
      return state;
  }
}
