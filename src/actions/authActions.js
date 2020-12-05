import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  ERRORS_CLEANUP,
  UPDATE_FLOW
} from "./types";

axios.create({
  withCredentials: true
});

// Clean up of error on page redirect
export const errorsCleanup = () => {
  return {
    type: ERRORS_CLEANUP
  };
};

// Check Sign In/Sign Up flow
export const checkUserFlow = (email) => dispatch => {
  axios
    .post("/api/users/flowcheck", { email })
    .then(res => {
      dispatch({
        type: ERRORS_CLEANUP
      });
      dispatch({
        type: UPDATE_FLOW,
        payload: res.data
      });
    })
    .catch(err => {
      if (err && err.response && err.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
}

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // console.log(decoded);
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: ERRORS_CLEANUP
      });
      history.push("/jitsiComponent")
    }) // re-direct to login on successful register
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log(decoded);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: ERRORS_CLEANUP
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    );
};

// Login with Google - get user token
export const googleLogin = () => dispatch => {
  axios
    .get("/auth/google")
    .then(res => {
      console.log(res);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  console.log(decoded);
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
