import axios from "axios";
import * as types from "./action_types";

// get all posts
export const getPosts = () => async (dispatch) => {
  try {
    let { data } = await axios.get("/api/posts");
    console.log(data);
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.response.data.message,
    });
  }
};
export const getSelectedFeedPosts = (id) => async (dispatch) => {
  dispatch({
    type: types.GET_SELECTED_FEED_POSTS_REQUEST,
  });
  try {
    let { data } = await axios.get(`/api/posts/${id}/feed`);
    console.log(data);

    dispatch({
      type: types.GET_SELECTED_FEED_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.response.data.message,
    });
  }
};
export const getSelectedPost = (id) => async (dispatch) => {
  try {
    let { data } = await axios.get(`/api/posts/${id}`);
    console.log(data);

    dispatch({
      type: types.GET_SELECTED_POST_SUCCESS,
      payload: data.post,
    });
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.response.data.message,
    });
  }
};

export const addPostLike = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(`/api/posts/${id}/like/add`);
    console.log(data);
    dispatch({
      type: types.ADD_LIKE_POST_SUCCESS,
      payload: { selectedPost: data, loading: false },
    });
  } catch (error) {
    console.log(error);
  }
};
export const removePostLike = (id) => async (dispatch, getState) => {
  const { data } = await axios.post(`/api/posts/${id}/like/remove`);

  dispatch({
    type: types.REMOVE_LIKE_POST_SUCCESS,
    payload: { selectedPost: data, loading: false },
  });
};
export const createPost = (description, rawPhotos) => async (dispatch) => {
  try {
    // let { data } = await axios.post(`/api/posts/create`, { postData });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.response.data.message,
    });
  }
};
export const createSelectedFeedPostComment = (id, comment) => async (
  dispatch
) => {
  try {
    let { data } = await axios.post(`/api/posts/${id}/comment/create`, {
      comment,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: types.FAIL_AUTH,
      payload: error.response.data.message,
    });
  }
};
