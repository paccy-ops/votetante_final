import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import CandidateList from '../components/CandidateList';
import { listCandidates } from '../../Action/CandidateActions';

const CandidatePost = () => {
  const dispatch = useDispatch();

  const candidatesList = useSelector((state) => state.candidatesList);
  const { error, loading, candidates } = candidatesList;

  useEffect(() => {
    dispatch(listCandidates());
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
        <CandidateList candidates={candidates} />
      )}
    </React.Fragment>
  );
};

export default CandidatePost;
