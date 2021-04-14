import React, { useEffect } from 'react';
import './CandidateItem.css';
import { useSelector, useDispatch } from 'react-redux';
import profile from '../../images/user.png';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { getCandidateDetails } from '../../Action/CandidateActions';

const CandidatesItems = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const candidateDetails = useSelector((state) => state.candidateDetails);
  const { candidate, loading } = candidateDetails;

  useEffect(() => {
    dispatch(getCandidateDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading && <LoadingSpinner asOverlay />}
      <div>
        {props.isPass ? (
          <div className='posts'>
            <Link to={`/profile/candidates/${candidate.id}`}>
              <div className='description'>
                <div>
                  <img src={profile} alt={props.name} />
                  <h2 style={{ marginLeft: '20px', fontSize: '12px' }}>
                    <span style={{ color: 'green' }}>Name:</span>
                    {props.name}
                  </h2>
                  <h4 style={{ fontSize: '20px' }}>
                    <span style={{ color: '#000' }}>Applied For: </span>
                    <span>{props.title}</span>
                  </h4>
                  <h4 style={{ fontSize: '12px' }}>
                    <span style={{ color: '#000' }}>E-mail:</span>{' '}
                    {props.candidate_email}
                  </h4>
                  <p
                    style={{
                      fontSize: '15px',
                      width: '90%',
                      marginLeft: '10px',
                      fontFamily: 'sans-serif',
                    }}>
                    <span style={{ marginRight: '10px', color: 'seagreen' }}>
                      Bio:
                    </span>
                    {props.bio.slice(1, 100)}
                  </p>

                  <button>proceed to vote</button>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CandidatesItems;
