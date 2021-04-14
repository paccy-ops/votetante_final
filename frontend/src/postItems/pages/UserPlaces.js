import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { listPostDetails } from '../../Action/PostActions';
import PostItem from '../components/PostItem';
import Card from '../../shared/components/UIElements/Card';
const UserPlaces = ({ match }) => {
  const dispatch = useDispatch();

  const postDetails = useSelector((state) => state.postDetails);
  const { post, loading, errors } = postDetails;

  useEffect(() => {
    dispatch(listPostDetails(match.params.id));
  }, [dispatch, match]);
  return (
    <React.Fragment>
      {loading ? (
        <div className='center'>
          <LoadingSpinner />
        </div>
      ) : errors ? (
        <Card>{errors}</Card>
      ) : (
        <PostItem items={post} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
