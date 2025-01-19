import { INIT_STATE } from "../../constant";
import { getUser, getType } from "../actions";

export default function userReducers(state = INIT_STATE.user, action) {
  switch (action.type) {
    case getType(getUser.getUserRequest()):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getUser.getUserSuccess()):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getUser.getUserFailure()):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
