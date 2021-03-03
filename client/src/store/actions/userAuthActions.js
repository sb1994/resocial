import axios from "axios";
import setUserToken from "../../utils/setUserToken";
import jwt_decode from "jwt-decode";
import * as types from "./action_types";

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    let { data } = await axios.post("/api/users/register", userData);
    console.log(data);
    const token = data.token;

    localStorage.setItem("token", token);

    setUserToken(token);
    dispatch(setLoggedUser(data.savedUser));
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.response.data.message,
    });
  }
};

export const setLoggedOutUser = () => {
  return {
    type: types.SET_LOGGED_OUT_USER,
  };
};
export const startAuth = () => {
  return {
    type: types.START_AUTH,
  };
};
export const successAuth = (token) => {
  return {
    type: types.SUCCESS_AUTH,
    token: token,
  };
};
// Set logged in user
export const setLoggedUser = (decoded) => {
  return {
    type: types.SET_LOGGED_USER,
    payload: decoded,
  };
};
export const setLoggedUserRequest = () => {
  return {
    type: types.SET_LOGGED_USER_REQUEST,
  };
};

export const getCurrentUser = () => async (dispatch) => {
  dispatch(setLoggedUserRequest());
  try {
    let { data } = await axios.get("/api/users/current");
    dispatch(setLoggedUser(data.savedUser));
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.data.message,
    });
  }
};
export const getSearchedUser = (id) => async (dispatch) => {
  axios
    .get(`/api/users/${id}`)
    // .get(`https://jsonplaceholder.typicode.com/todos/1`)
    .then((result) => {
      dispatch(setSearchedUser(result.data));
      // console.log(result)
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setSearchedUser = (user) => {
  return {
    type: types.SET_SEARCHED_USER,
    payload: user,
  };
};

export const loginAuth = (email, password) => async (dispatch) => {
  // dispatch(startAuth());
  try {
    let { data } = await axios.post("api/users/login", {
      email: email,
      password: password,
    });
    console.log(data);
    const token = data.token;
    //sets the expirey date
    // const expire = new Date(new Date().getTime() + 10000 * 1000)
    //stores the the token and the expireation date in the browser
    //as a cookie
    localStorage.setItem("token", token);
    setUserToken(token);
    console.log(token);

    const decoded = jwt_decode(token);
    dispatch(setLoggedUser(data.userExists));
    // dispatch(getCurrentUser());
  } catch (error) {
    let { data } = error.response;
    console.log(data.message);
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  // Remove auth header for future requests
  setUserToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setLoggedOutUser());
  dispatch(setSearchedUser({}));
};