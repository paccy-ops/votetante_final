import {
  CANDIDATES_LIST_REQUEST,
  CANDIDATES_LIST_SUCCESS,
  CANDIDATES_LIST_FAIL,

  //
  APPLY_CREATE_REQUEST,
  APPLY_CREATE_SUCCESS,
  APPLY_CREATE_FAIL,

  //
  CANDIDATE_DETAILS_SUCCESS,
  CANDIDATE_DETAILS_FAIL,
  CANDIDATE_DETAILS_REQUEST,

  //
  CANDIDATE_DELETE_SUCCESS,
  CANDIDATE_DELETE_FAIL,
  CANDIDATE_DELETE_REQUEST,

  //
  CANDIDATE_UPDATE_SUCCESS,
  CANDIDATE_UPDATE_FAIL,
  CANDIDATE_UPDATE_REQUEST,

  //
  CANDIDATE_POST_SUCCESS,
  CANDIDATE_POST_FAIL,
  CANDIDATE_POST_REQUEST,
} from '../constants/CandidatesConstants';
import axios from 'axios';

export const listCandidates = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CANDIDATES_LIST_REQUEST,
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

    const { data } = await axios.get(
      process.env.REACT_APP_BACKEND_URL + '/candidates/',
      config
    );

    dispatch({
      type: CANDIDATES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANDIDATES_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// create post

export const CandidateCreate = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLY_CREATE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URL}/candidates/${id}/create/`,
      {},
      config
    );

    dispatch({
      type: APPLY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLY_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// get candidate details

export const getCandidateDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANDIDATE_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/candidates/${id}`,

      config
    );
    dispatch({ type: CANDIDATE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANDIDATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// candidate by post

export const getCandidateByPostDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CANDIDATE_POST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/candidates/post/${id}`,

      config
    );
    dispatch({ type: CANDIDATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CANDIDATE_POST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const CandidateUpdate = (candidate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CANDIDATE_UPDATE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URL}/candidates/update/${candidate.id}/`,
      candidate,
      config
    );

    dispatch({ type: CANDIDATE_UPDATE_SUCCESS });
    dispatch({
      type: CANDIDATE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CANDIDATE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// CANDIDATE DELETE

export const CandidateDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CANDIDATE_DELETE_REQUEST,
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
      `${process.env.REACT_APP_BACKEND_URL}/candidates/delete/${id}`,
      config
    );

    dispatch({
      type: CANDIDATE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CANDIDATE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
