import {
  CANDIDATES_LIST_REQUEST,
  CANDIDATES_LIST_SUCCESS,
  CANDIDATES_LIST_FAIL,
  CANDIDATES_LIST_RESET,

  //
  APPLY_CREATE_REQUEST,
  APPLY_CREATE_SUCCESS,
  APPLY_CREATE_FAIL,
  APPLY_CREATE_RESET,

  //
  CANDIDATE_DETAILS_SUCCESS,
  CANDIDATE_DETAILS_FAIL,
  CANDIDATE_DETAILS_REQUEST,
  CANDIDATE_DETAILS_RESET,

  //
  CANDIDATE_DELETE_SUCCESS,
  CANDIDATE_DELETE_FAIL,
  CANDIDATE_DELETE_REQUEST,

  //
  CANDIDATE_UPDATE_SUCCESS,
  CANDIDATE_UPDATE_FAIL,
  CANDIDATE_UPDATE_REQUEST,
  CANDIDATE_UPDATE_RESET,

  //
  CANDIDATE_POST_SUCCESS,
  CANDIDATE_POST_FAIL,
  CANDIDATE_POST_REQUEST,
  CANDIDATE_POST_RESET,
} from '../constants/CandidatesConstants';

export const listCandidatesReducer = (state = { candidates: [] }, action) => {
  switch (action.type) {
    case CANDIDATES_LIST_REQUEST:
      return { loading: true };
    case CANDIDATES_LIST_SUCCESS:
      return { loading: false, candidates: action.payload };
    case CANDIDATES_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CANDIDATES_LIST_RESET:
      return { candidates: [] };

    default:
      return state;
  }
};

// APPLY CREATE

export const postCreateApplicationReducers = (state = {}, action) => {
  switch (action.type) {
    case APPLY_CREATE_REQUEST:
      return { ...state, loading: true };
    case APPLY_CREATE_SUCCESS:
      return { loading: false, success: true, application: action.payload };
    case APPLY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case APPLY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const CandidateDetailsReducers = (state = { candidate: {} }, action) => {
  switch (action.type) {
    case CANDIDATE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CANDIDATE_DETAILS_SUCCESS:
      return { loading: false, candidate: action.payload };
    case CANDIDATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CANDIDATE_DETAILS_RESET:
      return { candidate: {} };

    default:
      return state;
  }
};

//

export const CandidateDetailsByPostReducers = (
  state = { candidate: {} },
  action
) => {
  switch (action.type) {
    case CANDIDATE_POST_REQUEST:
      return { ...state, loading: true };
    case CANDIDATE_POST_SUCCESS:
      return { loading: false, candidate: action.payload };
    case CANDIDATE_POST_FAIL:
      return { loading: false, error: action.payload };
    case CANDIDATE_POST_RESET:
      return { candidate: {} };

    default:
      return state;
  }
};

// CANDIDATE UPDATE
export const candidateUpdateReducers = (state = {}, action) => {
  switch (action.type) {
    case CANDIDATE_UPDATE_REQUEST:
      return { loading: true };

    case CANDIDATE_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case CANDIDATE_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case CANDIDATE_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

// candidate delete

export const candidateDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case CANDIDATE_DELETE_REQUEST:
      return { loading: true };
    case CANDIDATE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CANDIDATE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
