import { GET_ERRORS, SET_CURRENT_USER, AUTH_START, AUTH_END } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { clearData } from "./itemActions";

// Login - Get User Token
export const loginUser = userData => dispatch => {
  dispatch(authStart());
  axios
    .post("API_URL/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(authEnd());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // clear all data
  dispatch(clearData());
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Item loading
export const authStart = () => {
  return {
    type: AUTH_START
  };
};

// Item loading
export const authEnd = () => {
  return {
    type: AUTH_END
  };
};
