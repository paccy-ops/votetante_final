import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import Card from '../shared/components/UIElements/Card';
import './CandidateList.css';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';
import Controls from '../shared/controls/Controls';
import Notification from '../shared/components/UIElements/Notification';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ConfirmDialog from '../shared/components/UIElements/ConfirmDialog';
import { CandidateDelete, listCandidates } from '../Action/CandidateActions';

function CandidateList({ history }) {
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
    if (!userInfo.isAdmin) {
      history.push('/login/user');
    } else {
      dispatch(listCandidates());
    }
  }, [dispatch, userInfo, history, deleteSuccess]);

  const deleteHandler = (id) => {
    dispatch(CandidateDelete(id));
    if (deleteSuccess) {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error',
      });
    }
  };

  return (
    <div className='candidate__list'>
      <h2 style={{ fontSize: '23px' }}>ALL CANDIDATES LIST</h2>
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
              <th>#</th>
              <th>Title</th>
              <th> Name</th>
              <th> Email</th>
              <th> Address</th>
              <th> Casts</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.id}</td>
                <td>{candidate.title}</td>
                <td>{candidate.name}</td>
                <td>{candidate.candidate_email}</td>
                <td>{candidate.address}</td>
                <td>{candidate.numCasts}</td>
                <td>
                  <span style={{ color: candidate.isPass ? '#126EFD' : '' }}>
                    {candidate.isPass ? (
                      'Yes'
                    ) : (
                      <i
                        style={{ color: 'red', marginLeft: '20px' }}
                        className='fas fa-times'></i>
                    )}
                  </span>
                </td>

                <td>
                  <Link to={`/users/${candidate.user}`}>
                    <Controls.ActionButton color='primary'>
                      <VisibilityIcon fontSize='small' />
                    </Controls.ActionButton>
                  </Link>
                  <Link to={`/admin/candidatelist/${candidate.id}/edit`}>
                    <Controls.ActionButton color='primary'>
                      <EditOutlined fontSize='small' />
                    </Controls.ActionButton>
                  </Link>
                  <Controls.ActionButton color='default'>
                    <DeleteOutline
                      fontSize='small'
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to delete this Post?',
                          subTitle: "You can't undo this operation!",
                          onConfirm: () => {
                            deleteHandler(candidate.id);
                          },
                        });
                        // onDelete(item.id);
                      }}
                    />
                  </Controls.ActionButton>
                </td>
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

export default withRouter(CandidateList);
