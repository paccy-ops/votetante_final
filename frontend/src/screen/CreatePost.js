import React, { useEffect, useState } from 'react';
import Button from '../shared/components/FormElements/Button';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../shared/components/UIElements/Card';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import './EditProfileScreen.css';
import Notification from '../shared/components/UIElements/Notification';
import { listPostDetails, PostUpdate } from '../Action/PostActions';
import { POST_UPDATE_RESET } from '../constants/PostConstants';

function CreatePost({ match, history }) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const postId = match.params.id;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [post_image, setPost_image] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  const postUpdate = useSelector((state) => state.postUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = postUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET });
      history.push('/admin/posts');
    } else {
      if (!post.title || post.id !== Number(postId)) {
        dispatch(listPostDetails(postId));
      } else {
        setTitle(post.title);
        setDescription(post.description);
        setPost_image(post.post_image);
        setIsActive(post.isActive);
        setIsApplying(post.isApplying);
        setIsVoting(post.isVoting);
      }
    }
  }, [dispatch, history, successUpdate, post, postId]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      PostUpdate({
        id: postId,
        title,
        description,
        post_image,
        isActive,
        isApplying,
        isVoting,
      })
    );
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success',
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('post_image', file);
    formData.append('post_id', postId);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/posts/upload/',
        formData,
        config
      );

      setPost_image(data);

      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
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
            {errorUpdate && <Card>{errorUpdate}</Card>}
            {loadingUpdate && <LoadingSpinner asOverlay />}
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <Card>{error}</Card>
            ) : (
              <div className='form-all'>
                <h2>EDIT POST </h2>

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
                  <label htmlFor='description'>Description</label>
                  <textarea
                    type='text'
                    id='description'
                    placeholder='Write a Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className='form-control'>
                  <label htmlFor='image'>Upload Post Image</label>
                  <textarea
                    type='file'
                    id='image'
                    placeholder='Post Image'
                    value={post_image}
                    onChange={(e) => setPost_image(e.target.value)}
                  />
                  <div>
                    <input
                      className='form-control form-control-lg'
                      id='formFileLg'
                      type='file'
                      onChange={uploadFileHandler}
                    />
                    {uploading && <LoadingSpinner asOverlay />}
                  </div>
                </div>
                <div className='form-control'>
                  <div className='form-check form-switch'>
                    <input
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className='form-check-input'
                      type='checkbox'
                      id='flexSwitchCheckDefault'
                    />
                    <label
                      className='form-check-label'
                      htmlFor='flexSwitchCheckDefault'>
                      Active
                    </label>
                  </div>
                </div>
                <div className='form-control'>
                  <div className='form-check form-switch'>
                    <input
                      checked={isApplying}
                      onChange={(e) => setIsApplying(e.target.checked)}
                      className='form-check-input'
                      type='checkbox'
                      id='flexSwitchCheckDefaults'
                    />
                    <label
                      className='form-check-label'
                      htmlFor='flexSwitchCheckDefaults'>
                      Users Application{' '}
                    </label>
                  </div>
                </div>

                <div className='form-control'>
                  <div className='form-check form-switch'>
                    <input
                      checked={isVoting}
                      onChange={(e) => setIsVoting(e.target.checked)}
                      className='form-check-input'
                      type='checkbox'
                      id='flexSwitchCheckDefaults'
                    />
                    <label
                      className='form-check-label'
                      htmlFor='flexSwitchCheckDefaults'>
                      OnGoing vote{' '}
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

export default CreatePost;
