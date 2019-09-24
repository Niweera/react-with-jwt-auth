import { GET_DATA, ITEM_LOADING, CLEAR_DATA } from "../actions/types";

const initialState = {
  data: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ITEM_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_DATA:
      return {
        ...state,
        data: null,
        loading: false
      };
    case GET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
