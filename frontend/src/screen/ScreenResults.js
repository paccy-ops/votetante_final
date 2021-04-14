import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import Card from '../shared/components/UIElements/Card';
import './ScreenResults.css';
import Notification from '../shared/components/UIElements/Notification';
import ConfirmDialog from '../shared/components/UIElements/ConfirmDialog';
import { listCandidates } from '../Action/CandidateActions';

function ScreenResults({ history }) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });
  const dispatch = useDispatch();

  const candidatesList = useSelector((state) => state.candidatesList);
  const { candidates, loading, error } = candidatesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteCandidate = useSelector((state) => state.deleteCandidate);
  const {
    success: deleteSuccess,
    error: deleteError,
    loading: loadingDelete,
  } = deleteCandidate;

  useEffect(() => {
    dispatch(listCandidates());
  }, [dispatch, userInfo, history, deleteSuccess]);

  return (
    <div className='candidate__list_screen'>
      <h2 style={{ fontSize: '23px' }}>CANDIDATES LIVE RESULTS</h2>
      {deleteError && <Card>{deleteError}</Card>}
      {loadingDelete && <LoadingSpinner asOverlay />}

      {loading ? (
        <LoadingSpinner asOverlay />
      ) : error ? (
        <Card>{error}</Card>
      ) : (
        <table
          style={{
            marginTop: '30px',
          }}>
          <thead>
            <tr>
              <th>Post</th>
              <th> Candidate Name</th>

              <th> Candidate Address</th>
              <th> Number of Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.title}</td>
                <td>{candidate.name}</td>

                <td>{candidate.address}</td>
                {candidate.numCasts > 2 ? (
                  <td>
                    {candidate.numCasts}{' '}
                    <spa style={{ color: '#FDCC10' }}>
                      <i class='fas fa-angle-double-up'></i>
                    </spa>
                  </td>
                ) : (
                  <td>{candidate.numCasts} - </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default withRouter(ScreenResults);
