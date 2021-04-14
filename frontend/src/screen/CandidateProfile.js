import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import Card from '../shared/components/UIElements/Card';
import './profileScreen.css';
import image from '../images/user.png';
import { Link } from 'react-router-dom';
import { getCandidateDetails } from '../Action/CandidateActions';
import { POST_CREATE_VOTE_RESET } from '../constants/PostConstants';
import { CreatePostVote } from '../Action/PostActions';
function UserProfileScreen({ match, history }) {
  const profileId = match.params.id;
  const dispatch = useDispatch();

  const postId = match.params.id;

  const candidateDetails = useSelector((state) => state.candidateDetails);
  const { loading, error, candidate } = candidateDetails;

  const votePost = useSelector((state) => state.votePost);
  const {
    success: successCreatedVote,
    loading: loadingCreatedVote,
    error: errorCreatedVote,
    cast: casted,
  } = votePost;

  useEffect(() => {
    if (
      !candidate.name ||
      candidate.id !== Number(profileId) ||
      successCreatedVote
    ) {
      dispatch(getCandidateDetails(profileId));
      dispatch({ type: POST_CREATE_VOTE_RESET });
      history.push('/');
    }
  }, [dispatch, candidate, profileId, history, successCreatedVote]);

  const votingSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(CreatePostVote(postId));
    //
  };

  return (
    <div className='main-post-details_profile'>
      {successCreatedVote && <Card>{casted}</Card>}
      {errorCreatedVote && <Card>{errorCreatedVote}</Card>}
      {loadingCreatedVote && <LoadingSpinner asOverlay />}
      {loading && <LoadingSpinner asOverlay />}
      {error && <Card>{error}</Card>}
      <div className='section-image_profile'>
        <img src={image} alt={candidate.name} />
        {candidate.isPass && (
          <div className='vote-button'>
            <button onClick={votingSubmitHandler}>
              Vote for: <span style={{ color: '#fff' }}>{candidate.name}</span>
            </button>
          </div>
        )}
      </div>
      <div className='section-description_profile'>
        <h2>
          <span style={{ color: 'green' }}>Name: </span>
          {candidate.name}
        </h2>
        <h2>
          <span style={{ color: 'green' }}>Address: </span>
          {candidate.address}
        </h2>

        <h2>
          <span style={{ color: 'green' }}>Role: </span>
          {candidate.isPass ? 'Candidate' : 'User'}
        </h2>
        <h2>
          <span style={{ color: 'green' }}>Email: </span>
          {candidate.candidate_email}
        </h2>

        <h2>
          <span style={{ color: 'green' }}>Applied For: </span>
          {candidate.applyingFor}
        </h2>

        <p>
          <span style={{ color: 'green' }}>Bio:</span>
          {candidate.bio}
        </p>
      </div>
      <Link to='/posts/candidates'>
        <button className='goBack'>Go back </button>
      </Link>
    </div>
  );
}

export default withRouter(UserProfileScreen);
