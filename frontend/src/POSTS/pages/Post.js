import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { listPosts } from '../../Action/PostActions';
import Card from '../../shared/components/UIElements/Card';
import PostList from '../components/PostList';

const Post = () => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);
  const { error, loading, posts } = postList;

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <div className='center'>
          <LoadingSpinner asOverlay />
        </div>
      ) : error ? (
        <Card>{error}</Card>
      ) : (
        <PostList allPosts={posts} />
      )}
    </React.Fragment>
  );
};

export default Post;
