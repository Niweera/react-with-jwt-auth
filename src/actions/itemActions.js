import { GET_DATA, ITEM_LOADING, GET_ERRORS, CLEAR_DATA } from "./types";
import axios from "axios";

// Get Data
export const getData = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get(`API_URL`)
    .then(res => {
      // do something with the res.data
      dispatch({
        type: GET_DATA,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Item loading
export const setItemLoading = () => {
  return {
    type: ITEM_LOADING
  };
};
// Clear data
export const clearData = () => {
  return {
    type: CLEAR_DATA
  };
};
