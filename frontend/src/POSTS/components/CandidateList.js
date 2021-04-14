import React from 'react';
import './CandidateList.css';
import CandidateItem from './CandidateItem';
import { useSelector } from 'react-redux';

const CandidateList = ({ candidates }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (candidates.length === 0) {
    return (
      <div className='application-center'>
        <h1> NO Available Candidate </h1>
      </div>
    );
  }

  if (userInfo.voted) {
    return (
      <div className='application-center'>
        <h1> You vote submitted successful </h1>
      </div>
    );
  }

  return (
    <div className='application-active'>
      <h1>Accepted Application </h1>
      <ul className='posts-list'>
        {candidates.map((candidate) => (
          <CandidateItem
            key={candidate.id}
            id={candidate.id}
            name={candidate.name}
            title={candidate.title}
            isPass={candidate.isPass}
            user={candidate.user}
            candidate_image={candidate.candidate_image}
            bio={candidate.bio}
            candidate_email={candidate.candidate_email}
          />
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
