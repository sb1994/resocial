import * as types from "../actions/action_types";

const initialState = {
  error: null,
  postsLoading: false,
  selectedPost: {},
  selectedFeedPosts: [],
  posts: [],
};
const post = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POSTS_REQUEST:
      return {
        ...state,
      };
    case types.GET_POSTS_SUCCESS:
      return {
        ...state,
      };
    case types.GET_SELECTED_FEED_POSTS_REQUEST:
      return {
        ...state,
        postsLoading: true,
      };
    case types.GET_SELECTED_FEED_POSTS_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        selectedFeedPosts: action.payload.posts,
      };
    case types.GET_SELECTED_POST_REQUEST:
      return {
        ...state,
        postsLoading: true,
      };
    case types.GET_SELECTED_POST_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        selectedPost: action.payload,
      };
    case types.ADD_POST_REQUEST:
      return {
        ...state,
      };
    case types.ADD_POST_SUCCESS:
      return {
        ...state,
      };
    case types.ADD_LIKE_POST_REQUEST:
      return {
        ...state,
        postsLoading: true,
      };
    case types.ADD_LIKE_POST_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        selectedPost: action.payload.selectedPost,
      };
    case types.REMOVE_LIKE_POST_REQUEST:
      return {
        ...state,
        postsLoading: true,
      };
    case types.REMOVE_LIKE_POST_SUCCESS:
      return {
        ...state,
        postsLoading: false,
        selectedPost: action.payload.selectedPost,
      };
    default:
      return state;
  }
};

export default post;
