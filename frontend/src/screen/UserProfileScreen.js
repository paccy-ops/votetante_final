import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserDetails } from '../Action/UserActions';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import Card from '../shared/components/UIElements/Card';
import profile from '../images/user.png';

function UserProfileScreen({ match, location }) {
  const profileId = match.params.id;
  const redirect = location.search;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user.id !== Number(profileId)) {
      dispatch(getUserDetails(profileId));
    }
  }, [dispatch, user, profileId, redirect]);

  return (
    <div className='main-post-details_profile'>
      {loading && <LoadingSpinner asOverlay />}
      {error && <Card>{error}</Card>}
      <div className='section-image_profile'>
        <img src={profile} alt={user.name} />
      </div>
      <div className='section-description_profile'>
        <h2>
          <span style={{ color: 'green' }}>Name: </span>
          {user.name}
        </h2>
        <h2>
          <span style={{ color: 'green' }}>Address: </span>
          {user.location}
        </h2>

        <h2>
          <span style={{ color: 'green' }}>Role: </span>
          {user.isAdmin ? 'Admin' : user.isCandidate ? 'Candidate' : 'User'}
        </h2>
        <h2>
          <span style={{ color: 'green' }}>Email: </span>
          {user.email}
        </h2>

        <h2>
          <span style={{ color: 'green' }}>Applied For: </span>
          {user.applyingFor}
        </h2>

        <p>
          <span style={{ color: 'green' }}>Bio:</span>
          {user.bio}
        </p>
      </div>
    </div>
  );
}

export default withRouter(UserProfileScreen);
