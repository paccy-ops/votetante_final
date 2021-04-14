import React, { useEffect, useState } from 'react';
import Button from '../shared/components/FormElements/Button';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '../shared/components/UIElements/Card';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import './EditProfileScreen.css';
import Notification from '../shared/components/UIElements/Notification';
import { Link } from 'react-router-dom';
import {
  CandidateUpdate,
  getCandidateDetails,
} from '../Action/CandidateActions';
import { CANDIDATE_UPDATE_RESET } from '../constants/CandidatesConstants';

function EditCandidateScreen({ match, history }) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const candidateId = match.params.id;
  const [name, setName] = useState('');
  const [candidate_email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [whyApply, setReason] = useState('');
  const [isPass, setIsPass] = useState(false);

  const dispatch = useDispatch();

  const candidateDetails = useSelector((state) => state.candidateDetails);
  const { loading, error, candidate } = candidateDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateCandidate = useSelector((state) => state.updateCandidate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = updateCandidate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CANDIDATE_UPDATE_RESET });
      history.push('/admin/candidatelist');
    } else {
      if (!candidate.name || candidate.id !== Number(candidateId)) {
        dispatch(getCandidateDetails(candidateId));
      } else {
        setTitle(candidate.title);
        setName(candidate.name);
        setEmail(candidate.candidate_email);
        setAddress(candidate.address);
        setBio(candidate.bio);
        setReason(candidate.whyApply);
        setIsPass(candidate.isPass);
      }
    }
  }, [dispatch, candidate, candidateId, history, successUpdate]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      CandidateUpdate({
        id: candidate.id,
        name,
        title,
        candidate_email,
        address,
        bio,
        whyApply,
        isPass,
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
      <form onSubmit={updateSubmitHandler}>
        <div className='login-form-register'>
          <Link to='/admin/candidatelist'>
            <button
              style={{
                position: 'absolute',
                left: '200px',
                outline: 'none',
                top: '170px',
              }}
              type='button'
              className='btn btn-outline-secondary'>
              GO BACK
            </button>
          </Link>
          <div className='container-form'>
            {errorUpdate && <Card>{errorUpdate}</Card>}
            {loadingUpdate && <LoadingSpinner asOverlay />}
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <Card>{error}</Card>
            ) : (
              <div className='form-all'>
                <h2>
                  <span style={{ color: 'seagreen', marginRight: '10px' }}>
                    {candidate.name}
                  </span>{' '}
                  application{' '}
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
                    value={candidate_email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-control'>
                  <label htmlFor='address'>Address</label>
                  <input
                    type='text'
                    id='address'
                    placeholder='Enter Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                  <label htmlFor='reason'>Why this Post?</label>
                  <textarea
                    type='text'
                    id='reason'
                    placeholder='Write a reason'
                    value={whyApply}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                {userInfo.isAdmin && (
                  <div className='form-control'>
                    <div className='form-check form-switch'>
                      <input
                        checked={isPass}
                        onChange={(e) => setIsPass(e.target.checked)}
                        className='form-check-input'
                        type='checkbox'
                        id='flexSwitchCheckDefault'
                      />
                      <label
                        className='form-check-label'
                        htmlFor='flexSwitchCheckDefault'>
                        Pass
                      </label>
                    </div>
                  </div>
                )}

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

export default withRouter(EditCandidateScreen);
