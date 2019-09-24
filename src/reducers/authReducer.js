import { SET_CURRENT_USER, AUTH_START, AUTH_END } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case AUTH_START:
      return {
        ...state,
        loading: true
      };
    case AUTH_END:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
