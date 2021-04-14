import React, { useEffect, useState } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CreatePostVote, listPostDetails } from '../Action/PostActions';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import Card from '../shared/components/UIElements/Card';
import { APPLY_CREATE_RESET } from '../constants/CandidatesConstants';
import Button from '../shared/components/FormElements/Button'
import { POST_CREATE_VOTE_RESET } from '../constants/PostConstants';

const VotingScreenPage = ({ match, history }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [cast, setCast] = useState();

  const postId = match.params.id;

  const postDetails = useSelector((state) => state.postDetails);
  const { post, loading, errors } = postDetails;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const votePost = useSelector((state) => state.votePost);
  const {
    success: successCreatedVote,
    loading: loadingCreatedVote,
    error: errorCreatedVote,
    cast:casted
  } = votePost;

  useEffect(() => {
    dispatch({ type: APPLY_CREATE_RESET });
    if (!userInfo) {
      history.push('/login/user');
    } else if (successCreatedVote) {
      setCast('')
      dispatch({type:POST_CREATE_VOTE_RESET})
      history.push('/');
    } else {
      dispatch(listPostDetails(postId));
      if (post.candidates) {
        setLoadingData(false);
        setData(post.candidates);
      } else {
        setData([]);
        setLoadingData(true);
      }
    }
  }, [dispatch, postId, history, post, successCreatedVote, userInfo]);

  const votingSubmitHandler = (e) =>{
    e.preventDefault()
    dispatch(CreatePostVote(
      postId
    ))
    // 
  }
  // if (loadingData) {
  //   return <LoadingSpinner asOverlay />;
  // }


  return (

    <div>
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><Link class="dropdown-item" href="#">Action</Link></li>
    <li><Link class="dropdown-item" href="#">Another action</Link></li>
    <li><Link class="dropdown-item" href="#">Something else here</Link></li>
  </ul>
</div>
    <form style={{ marginTop: '200px' }} onSubmit={votingSubmitHandler}>


   
        <h1>
          You are Voting for{' '}
          <span style={{ margin: '10px', color: 'seagreen' }}>
            {post.title}
          </span>
          Post
        </h1>
    

      <div className='section-candidate'>
       
      {successCreatedVote&&<Card>{casted}</Card>}
      {errors&&<Card>{errors}</Card>}
      {errorCreatedVote&&<Card>{errorCreatedVote}</Card>}
      {loadingCreatedVote&&<LoadingSpinner asOverlay/>}
      {loading&&<LoadingSpinner asOverlay/>}
          {data.map((postCandidate) => {
            return (
              <div>
                {postCandidate.isPass && (
                  <div className='posts'>
                    <div className='description'>
                      <div>
                        <img
                          src={postCandidate.candidate_image}
                          alt={postCandidate.name}
                        />
                        <span style={{ marginLeft: '20px', fontSize: '12px' }}>
                          <span style={{ color: 'green' }}>Name:</span>
                          {postCandidate.name}
                        </span>
                        <h4 style={{ fontSize: '12px' }}>
                          <spn style={{ color: '#000' }}>Applied For: </spn>
                          <sp>{postCandidate.title}</sp>
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

                        <div class="form-check">
                  <input style={{padding:'20px'}} value={cast} onChange={(e) => setCast(e.target.checked)} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                  <label style={{fontSize:'18px'}} class="form-check-label" for="flexRadioDefault1">
                  <i class="fas fa-vote-yea"></i>{postCandidate.name}
                  </label>
                </div>
                                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          <Button disabled={!cast} style={{width:'10%'}}  type="submit">submit vote</Button>

      </div>
      
    </form>
    </div>
  );
};

export default withRouter(VotingScreenPage);
