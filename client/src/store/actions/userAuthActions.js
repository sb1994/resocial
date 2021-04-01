import axios from "axios";
import setUserToken from "../../utils/setUserToken";
import jwt_decode from "jwt-decode";
import * as types from "./action_types";
import { uploadProfileImageToFirebase } from "../../utils/functions";

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
    console.log(data);
    dispatch(setLoggedUser(data));
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.data.message,
    });
  }
};
export const getSearchedUser = (id) => async (dispatch) => {
  // gets the users profile based on the id dispatched from
  // the url
  try {
    let { data } = await axios.get(`/api/users/profile/${id}`);
    dispatch(setSearchedUser(data.user));
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.data.message,
    });
  }
};
export const getFollowers = (id) => async (dispatch) => {
  // gets the users profile based on the id dispatched from
  // the url
  try {
    let { data } = await axios.get(`/api/users/profile/${id}/followers`);
    console.log(data.followers.followers);
    // dispatch(setSearchedUser(data.user));
    dispatch({
      type: types.SET_FOLLOWERS_LIST_SUCCESS,
      payload: data.followers.followers,
    });
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.data.message,
    });
  }
};
export const getFollowing = (id) => async (dispatch) => {
  // gets the users profile based on the id dispatched from
  // the url
  try {
    let { data } = await axios.get(`/api/users/profile/${id}/following`);
    console.log(data.following.following);
    dispatch({
      type: types.SET_FOLLOWING_LIST_SUCCESS,
      payload: data.following.following,
    });
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.data.message,
    });
  }
};
export const updateUser = (rawPhoto, firstName, lastName) => async (
  dispatch,
  getState
) => {
  // uploading the images to firebase
  // let photos = await uploadImgsToFirebase(rawPhotos);
  let photo;

  if (rawPhoto !== null) {
    photo = await uploadProfileImageToFirebase(rawPhoto);
  } else {
    console.log(getState().auth.user.profile_pic);
    photo = getState().auth.user.profile_pic;
  }

  console.log(photo);

  try {
    // console.log(photos);
    let { data } = await axios.post(`/api/users/profile/edit`, {
      firstName,
      lastName,
      photo,
    });
    console.log(data);
    dispatch(setLoggedUser(data));
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.response.data.message,
    });
  }
};
export const followUser = (id) => async (dispatch) => {
  // follows the users profile based on the id dispatched from
  // the url
  try {
    // console.log(id);
    let { data } = await axios.post(`/api/users/profile/${id}/follow`);
    console.log({ following: data.currentUser.following });
    console.log({ followers: data.searchedUser.followers });
    // dispatching the updated user data
    dispatch(setSearchedUser(data.searchedUser));
    dispatch(setLoggedUser(data.currentUser));
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.data.message,
    });
  }
};
export const unFollowUser = (id) => async (dispatch) => {
  // gets the users profile based on the id dispatched from
  // the url
  try {
    let { data } = await axios.post(`/api/users/profile/${id}/unfollow`);
    console.log(data);
    dispatch(setSearchedUser(data.searchedUser));
    dispatch(setLoggedUser(data.currentUser));
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.data.message,
    });
  }
};

export const setSearchedUser = (user) => {
  // sets the payload of the user reducer
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
  // dispatch(setSearchedUser({}));
};
