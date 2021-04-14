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

  //
  POST_UPDATE_SUCCESS,
  POST_UPDATE_REQUEST,
  POST_UPDATE_FAIL,

  //
  //
  POST_CREATE_VOTE_REQUEST,
  POST_CREATE_VOTE_SUCCESS,
  POST_CREATE_VOTE_FAIL,
} from '../constants/PostConstants';
import axios from 'axios';
export const listPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });
    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/posts/'
    );
    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAIL_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`
    );

    dispatch({ type: POST_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/posts/delete/${id}`,
      config
    );

    dispatch({
      type: POST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// create post

export const PostCreate = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + '/posts/create/',
      {},
      config
    );

    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const PostUpdate = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/posts/update/${post.id}/`,
      post,
      config
    );

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: POST_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const CreatePostVote = (candidateId, cast) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: POST_CREATE_VOTE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/candidates/${candidateId}/cast/`,
      cast,
      config
    );

    dispatch({
      type: POST_CREATE_VOTE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_VOTE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
