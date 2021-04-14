import React, { useEffect, useState } from 'react';
import Button from '../shared/components/FormElements/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../shared/components/UIElements/Card';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { USER_UPDATE_RESET } from '../constants/UserConstant';
import './EditProfileScreen.css';
import Notification from '../shared/components/UIElements/Notification';

import { getUserDetails, updateUser } from '../Action/UserActions';

function EditUserScreen({ match, history }) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/users');
    } else {
      if (!user.name || user.id !== Number(userId)) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setLocation(user.location);
        setBio(user.bio);
        setIsCandidate(user.isCandidate);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, history, successUpdate]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        id: user.id,
        name,
        email,
        location,
        bio,
        isAdmin,
        isCandidate,
      })
    );
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success',
    });
  };
  return (
    <div>
      <Link to='/admin/users/'>
        <button
          style={{ position: 'absolute', left: '200px', outline: 'none' }}
          type='button'
          className='btn btn-outline-secondary'>
          GO BACK
        </button>
      </Link>
      <form onSubmit={updateSubmitHandler}>
        <div className='login-form-register'>
          <div className='container-form'>
            {errorUpdate && <Card>{errorUpdate}</Card>}
            {loadingUpdate && <LoadingSpinner asOverlay />}
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <Card>{error}</Card>
            ) : (
              <div className='form-all'>
                <h2>EDIT USER </h2>

                <div className='form-control'>
                  <label htmlFor='username'>Name</label>
                  <input
                    type='text'
                    id='username'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    id='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-control'>
                  <label htmlFor='address'>Address</label>
                  <input
                    type='text'
                    id='address'
                    placeholder='Enter Address'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className='form-control'>
                  <label htmlFor='bio'>Bio</label>
                  <textarea
                    type='text'
                    id='bio'
                    placeholder='Write a Bio'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <div className='form-control'>
                  <div className='form-check form-switch'>
                    <input
                      checked={isCandidate}
                      onChange={(e) => setIsCandidate(e.target.checked)}
                      className='form-check-input'
                      type='checkbox'
                      id='flexSwitchCheckDefault'
                    />
                    <label
                      className='form-check-label'
                      for='flexSwitchCheckDefault'>
                      IsCandidate
                    </label>
                  </div>
                </div>
                <div className='form-control'>
                  <div className='form-check form-switch'>
                    <input
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      className='form-check-input'
                      type='checkbox'
                      id='flexSwitchCheckDefaults'
                    />
                    <label
                      className='form-check-label'
                      for='flexSwitchCheckDefaults'>
                      IsAdmin
                    </label>
                  </div>
                </div>

                <Button type='submit'>SAVE UPDATES</Button>
              </div>
            )}
          </div>
        </div>
      </form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default EditUserScreen;
