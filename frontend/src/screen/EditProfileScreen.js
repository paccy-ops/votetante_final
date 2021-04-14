import React, { useEffect, useState } from 'react';
import Button from '../shared/components/FormElements/Button';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../shared/components/UIElements/Card';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { USER_UPDATE_PROFILE_RESET } from '../constants/UserConstant';
import './EditProfileScreen.css';
import { getUserDetails, updateUserProfile } from '../Action/UserActions';
function EditProfileScreen({ history }) {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success || userInfo.id !== user.id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        history.push('/user/profile');
      } else {
        setName(user.name);
        setEmail(user.email);
        setLocation(user.location);
        setBio(user.bio);
      }
    }
  }, [dispatch, userInfo, user, history, success]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user.id,
          name: name,
          email: email,
          location: location,
          bio: bio,
          // image: image,
          password: password,
        })
      );
    }
  };

  return (
    <form onSubmit={updateSubmitHandler}>
      <div className='login-form-register'>
        <div className='container-form'>
          <div className='form-all'>
            <h2>EDIT YOUR PROFILE </h2>
            {message && <Card className='error_message'>{message}</Card>}
            {error && <Card className='error_message'>{error}</Card>}
            {loading && <LoadingSpinner asOverlay />}
            <div className='form-control'>
              <label htmlFor='username'>Name</label>
              <input
                type='text'
                id='username'
                placeholder='Enter Username'
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
                placeholder='Write Bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className='form-control'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-control'>
              <label htmlFor='pasword2'>Confirm Password</label>
              <input
                type='password'
                id='password2'
                placeholder='Enter Password again'
                value={confirmPassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>

            <Button type='submit'>SAVE PROFILE</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditProfileScreen;
