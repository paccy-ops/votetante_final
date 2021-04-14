import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import { getCandidateDetails } from '../../Action/CandidateActions';

const CandidateProfile = ({ match, history }) => {
  const candidateId = match.params.id;

  const dispatch = useDispatch();

  const candidateDetails = useSelector((state) => state.candidateDetails);
  const { loading, error, candidate } = candidateDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (candidate.id === candidateId) {
        dispatch(getCandidateDetails(candidateId));
      }
    }
  }, [candidateId, candidate, userInfo, history, dispatch]);

  return (
    <div className='main-post-details_profile'>
      {loading && <LoadingSpinner asOverlay />}
      {error && <Card>{error}</Card>}
      <div className='section-image_profile'>
        <img src={candidate.image} alt={candidate.name} />
      </div>
      <div className='section-description_profile'>
        <h2>
          <span style={{ color: 'green' }}>Name: </span>
          {candidate.name}
        </h2>
        <h2>
          <span style={{ color: 'green' }}>Address: </span>
          {candidate.location}
        </h2>

        <h2>
          <span style={{ color: 'green' }}>Role: </span>
          {candidate.isAdmin ? 'Admin' : candidate.isCandidate ? 'Candidate' : 'User'}
        </h2>
        <h2>
          <span style={{ color: 'green' }}>Email: </span>
          {candidate.email}
        </h2>

        <p>
          <span style={{ color: 'green' }}>Bio:</span>
          {candidate.bio}
        </p>
      </div>
      <div className='btn-profile'></div>
    </div>
  );
};

export default CandidateProfile;
