import {
  POST_LIST_SUCCESS,
  POST_LIST_REQUEST,
  POST_LIST_FAIL,
  //
  POST_DETAIL_SUCCESS,
  POST_DETAIL_REQUEST,
  POST_DETAIL_FAIL,
  //
  POST_DELETE_SUCCESS,
  POST_DELETE_REQUEST,
  POST_DELETE_FAIL,

  //
  POST_CREATE_SUCCESS,
  POST_CREATE_REQUEST,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,

  //
  POST_UPDATE_SUCCESS,
  POST_UPDATE_REQUEST,
  POST_UPDATE_FAIL,
  POST_UPDATE_RESET,

  // 
  POST_CREATE_VOTE_REQUEST,
  POST_CREATE_VOTE_RESET,
  POST_CREATE_VOTE_SUCCESS,
  POST_CREATE_VOTE_FAIL
} from '../constants/PostConstants';

export const postListReducers = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const postDetailReducers = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_DETAIL_REQUEST:
      return { loading: true, ...state };
    case POST_DETAIL_SUCCESS:
      return { loading: false, post: action.payload };
    case POST_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const postDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const postCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE

export const postUpdateReducers = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true };
    case POST_UPDATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_UPDATE_RESET:
      return { post: {} };
    default:
      return state;
  }
};

export const postVoteCreateReducers = (state = {  }, action) => {
  switch (action.type) {
    case POST_CREATE_VOTE_REQUEST:
      return { loading: true };
    case POST_CREATE_VOTE_SUCCESS:
      return { loading: false, success: true,cast: action.payload};
    case POST_CREATE_VOTE_FAIL:
      return { loading: false, error: action.payload };
    case POST_CREATE_VOTE_RESET:
      return {  };
    default:
      return state;
  }
};

