import React, { useEffect, useState } from 'react';
import './PostScreen.css';
import image from '../images/gunnar.jpg';
import user from '../images/user.png';
import { useSelector, useDispatch } from 'react-redux';
import { listPostDetails } from '../Action/PostActions';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import Card from '../shared/components/UIElements/Card';
import { CandidateCreate } from '../Action/CandidateActions';
import { APPLY_CREATE_RESET } from '../constants/CandidatesConstants';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PostScreen({ match, history }) {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [message, setMessage] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const postId = match.params.id;

  const createApplication = useSelector((state) => state.createApplication);
  const {
    success: successCreated,
    loading: loadingCreated,
    error: errorCreated,
  } = createApplication;

  const postDetails = useSelector((state) => state.postDetails);
  const { post, loading, errors } = postDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const candidate =post.candidates
  useEffect(() => {
    dispatch({ type: APPLY_CREATE_RESET });
    if (!userInfo) {
      history.push('/login/user');
    } else if (successCreated) {
      history.push(`/user/candidate/${post.id}/edit`);
    } else {
      if (errorCreated) {
        setMessage(errorCreated);
      }
      if (successCreated) {
        setMessage('Candidate added');
      }
      dispatch(listPostDetails(postId));
      if (post.candidates) {
        setLoadingData(false);
        setData(post.candidates);
      } else {
        setData([]);
        setLoadingData(true);
      }
    }
  }, [
    dispatch,
    postId,
    message,
    errorCreated,
    history,
    post,
    successCreated,
    userInfo,
  ]);

  const createCandidateHandler = (e) => {
    e.preventDefault();
    dispatch(CandidateCreate(post.id));
  };

  if (loadingData) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <div className='main-post-details'>
      {loadingCreated && <LoadingSpinner asOverlay />}
      {loading && <LoadingSpinner asOverlay />}
      {errors && <Card>{errors}</Card>}
      <div className='section-image'>
        <img src={image} alt={post.title} />
        {post.isApplying && (
          <button
            type='button'
            onClick={createCandidateHandler}
            className='apply'>
            APPLY FOR THIS POST
          </button>
        )}
      </div>

      <div className='section-description'>
        <h1>
          <span style={{ color: 'green' }}>Title: </span>
          {post.title}
        </h1>
        <h1>
          <span style={{ color: 'green' }}>Post:</span>
          {
            <span
              style={{ color: post.applications === 10 ? 'red' : '#674305' }}>
              {post.applications === 10 ? 'Closed' : 'Open'}
            </span>
          }
        </h1>
        <h1>
          <span style={{ color: 'green' }}>Application: </span>{' '}
          {post.applications}
        </h1>
        <p>
          <span style={{ color: 'green' }}>Description:</span>{' '}
          {post.description}
        </p>
        {message && <Card>{message}</Card>}
        {errorCreated && <Card>{errorCreated}</Card>}
        {loadingCreated && <LoadingSpinner asOverlay />}
      </div>
      <div
        className='active-application-bar'
        style={{
          position: 'absolute',
          top: '570px',
          left: '200px',
        }}>
        <h1 className='active_application'>
          Active Application for{' '}
          <span
            style={{
              color: 'seagreen',
              fontWeight: '900',
            }}>
            {post.title}
          </span>
        </h1>
      </div>
      <div className='section-candidate'>
        {data.map((postCandidate) => {
          return (
            <div key={postCandidate.id}>
              {postCandidate.isPass && (
                <div className='posts'>
                  <Link to='/post'>
                    <div className='description'>
                      <div>
                        <img src={user} alt={postCandidate.name} />
                        <span style={{ marginLeft: '20px', fontSize: '12px' }}>
                          <span style={{ color: 'green' }}>Name:</span>
                          {postCandidate.name}
                        </span>
                        <h4 style={{ fontSize: '12px' }}>
                          <span style={{ color: '#000' }}>Applied For: </span>
                          <span>{postCandidate.title}</span>
                        </h4>
                        <h4 style={{ fontSize: '12px' }}>
                          <span style={{ color: '#000' }}>E-mail:</span>{' '}
                          {postCandidate.candidate_email}
                        </h4>
                        <p
                          style={{
                            fontSize: '15px',
                            width: '90%',
                            marginLeft: '10px',
                            fontFamily: 'sans-serif',
                          }}>
                          <span
                            style={{
                              marginRight: '10px',
                              color: 'seagreen',
                            }}>
                            Bio:
                          </span>
                          {postCandidate.bio.slice(1, 100)}
                        </p>
                        <Link to={`/profile/candidates/${postCandidate.id}`}>
                          <button>View Profile</button>
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(PostScreen);
