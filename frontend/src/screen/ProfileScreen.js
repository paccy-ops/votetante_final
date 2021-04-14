import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../Action/UserActions';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import Card from '../shared/components/UIElements/Card';
import Button from '../shared/components/FormElements/Button';
import './profileScreen.css';
import profile from '../images/user.png';
function ProfileScreen({ history }) {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || !user.image || userInfo.id !== user.id) {
        dispatch(getUserDetails('profile'));
      }
    }
  }, [dispatch, userInfo, user, history]);

  return (
    <div className='profile-page'>
      <div className='main-post-details_profile'>
        {loading && <LoadingSpinner asOverlay />}
        {error && <Card>{error}</Card>}
        {user.image ? (
          <div className='section-image_profile'>
            <img src={profile} alt={user.name} />
          </div>
        ) : (
          <div className='section-image_profile'>
            <img src={profile} alt={user.name} />
          </div>
        )}
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

          <p>
            <span style={{ color: 'green' }}>Bio:</span>
            {user.bio}
          </p>
        </div>
        <div className='btn-profile'>
          <div className='btn1'>
            {!user.bio && !user.location ? (
              <Button
                to={`/user/profile/${user.id}/edit`}
                style={{ marginLeft: '30px' }}>
                COMPLETE PROFILE
              </Button>
            ) : (
              <Button
                to={`/user/profile/${user.id}/edit`}
                style={{ marginLeft: '30px' }}>
                EDIT
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
