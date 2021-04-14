import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import Card from '../shared/components/UIElements/Card';
import './UserListScreen.css';
import { deleteUser, listUsers } from '../Action/UserActions';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';
import Controls from '../shared/controls/Controls';
import Notification from '../shared/components/UIElements/Notification';
import ConfirmDialog from '../shared/components/UIElements/ConfirmDialog';
// import Popup from '../shared/components/UIElements/Popup'
// import EmployeesForm from '../shared/components/UIElements/EmployeesForm'

function UserListScreen({ history }) {
  
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
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login/user');
    }
  }, [dispatch, userInfo, history, success]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error',
    });
  };
  return (
    <div className='user__list'>
      <h2 style={{ fontSize: '23px' }}>USERS LIST</h2>

      {loading ? (
        <LoadingSpinner asOverlay />
      ) : error ? (
        <Card>{error}</Card>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Candidate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.location}</td>
                <td>
                  <span style={{ color: user.isAdmin ? '#126EFD' : '' }}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td style={{ color: user.isCandidate ? '#126EFD' : '' }}>
                  {user.isCandidate ? (
                    'Yes'
                  ) : (
                    <i
                      style={{ color: 'red', marginLeft: '20px' }}
                      className='fas fa-times'></i>
                  )}
                </td>
                <td>
                  <Link to={`/users/${user.id}`}>
                    <Controls.ActionButton color='primary'>
                      <VisibilityIcon fontSize='small' />
                    </Controls.ActionButton>
                  </Link>
                  <Link to={`/admin/user/${user.id}/edit`}>
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
                          title: 'Are you sure to delete this User?',
                          subTitle: "You can't undo this operation!",
                          onConfirm: () => {
                            deleteHandler(user.id);
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

export default withRouter(UserListScreen);
