import React, { useEffect, useState } from 'react';
import Button from '../shared/components/FormElements/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Card from '../shared/components/UIElements/Card';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import './EditProfileScreen.css';
import Notification from '../shared/components/UIElements/Notification';
import { getCandidateDetails } from '../Action/CandidateActions';

function ApplyScreen({ match, history }) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const candidateId = match.params.id;
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [candidate_email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [whyApply, setApplyReason] = useState('');
  const [bio, setBio] = useState('');

  const dispatch = useDispatch();

  const candidateDetails = useSelector((state) => state.candidateDetails);
  const { loading, error, candidate } = candidateDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const postUpdate = useSelector(state => state.postUpdate)
  // const {success:successUpdate,error:errorUpdate,loading:loadingUpdate} = postUpdate

  useEffect(() => {
    // if (successUpdate) {
    //   dispatch({type:APPLY_CREATE_RESET})
    //   history.push('/admin/posts')

    // }else{
    if (
      candidate.name !== userInfo.name ||
      candidate.post !== Number(candidateId)
    ) {
      dispatch(getCandidateDetails(candidateId));
    } else {
      setTitle(candidate.title);
      setBio(candidate.bio);
      setName(candidate.name);
      setEmail(candidate.candidate_email);
      setAddress(candidate.address);
      setApplyReason(candidate.whyApply);
    }
  }, [dispatch, candidate, candidateId, userInfo]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    console.log(candidateId);
    //  dispatch(CandidateCreate({
    //    post:candidateId, title,bio,name,candidate_email,address,whyApply
    //  }))
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success',
    });
  };
  return (
    <div>
      <Link to='/admin/posts/'>
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
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <Card>{error}</Card>
            ) : (
              <div className='form-all'>
                <h2>
                  {' '}
                  Your applying for{' '}
                  <spn
                    style={{
                      color: 'seagreen',
                      marginLeft: '3px',
                      marginRight: '3px',
                      fontWeight: '600',
                    }}>
                    {' '}
                    {candidate.title}{' '}
                  </spn>{' '}
                  Post
                </h2>

                <div className='form-control'>
                  <label htmlFor='title'>Post Title</label>
                  <input
                    type='text'
                    id='title'
                    placeholder='Enter Post Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className='form-control'>
                  <label htmlFor='name'> Name</label>
                  <input
                    type='text'
                    id='name'
                    placeholder=' Applicant Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='form-control'>
                  <label htmlFor='email'> Email</label>
                  <input
                    type='email'
                    id='email'
                    placeholder=' Applicant Email'
                    value={candidate_email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-control'>
                  <label htmlFor='address'> Address</label>
                  <input
                    type='text'
                    id='address'
                    placeholder=' Applicant address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className='form-control'>
                  <label htmlFor='description'>Biography</label>
                  <textarea
                    type='text'
                    id='description'
                    placeholder='Write a Bio'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <div className='form-control'>
                  <label htmlFor='why'>
                    Why are you applying for this Post?
                  </label>
                  <textarea
                    type='text'
                    id='why'
                    placeholder='why this post? '
                    value={whyApply}
                    onChange={(e) => setApplyReason(e.target.value)}
                  />
                </div>

                <Button type='submit'>SUBMIT APPLICATION</Button>
              </div>
            )}
          </div>
        </div>
      </form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default withRouter(ApplyScreen);
