import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  postCreateReducers,
  postDeleteReducers,
  postDetailReducers,
  postListReducers,
  postUpdateReducers,
  postVoteCreateReducers,
} from './reducers/PostReducers';
import {
  userUpdateProfileReducer,
  userDeleteReducer,
  userDetailsReducers,
  userListReducer,
  userLoginReducers,
  userRegisterReducers,
  userUpdateReducer,
} from './reducers/UserReducer';
import {
  candidateDeleteReducers,
  CandidateDetailsByPostReducers,
  CandidateDetailsReducers,
  candidateUpdateReducers,
  listCandidatesReducer,
  postCreateApplicationReducers,
} from './reducers/CandidateReducers';

const reducer = combineReducers({
  postList: postListReducers,
  postDelete: postDeleteReducers,
  postCreate: postCreateReducers,
  postDetails: postDetailReducers,
  postUpdate: postUpdateReducers,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userList: userListReducer,
  userDetails: userDetailsReducers,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  candidatesList: listCandidatesReducer,
  createApplication: postCreateApplicationReducers,
  candidateDetails: CandidateDetailsReducers,
  updateCandidate: candidateUpdateReducers,
  deleteCandidate: candidateDeleteReducers,
  candidateByPost: CandidateDetailsByPostReducers,
  votePost : postVoteCreateReducers
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
