import { INIT_STATE } from "../../constant";
import { getType, showCommentModal, hideCommentModal } from "../actions";

export default function commentModalReducers(
  state = INIT_STATE.commentModal,
  action
) {
  switch (action.type) {
    case getType(showCommentModal()):
      return {
        isShow: true,
        data: action.payload,
      };
    case getType(hideCommentModal()):
      return {
        isShow: false,
      };

    default:
      return state;
  }
}
