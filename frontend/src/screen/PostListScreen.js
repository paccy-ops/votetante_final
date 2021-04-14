import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import Card from '../shared/components/UIElements/Card';
import './PostListScreen.css';
import { EditOutlined, DeleteOutline } from '@material-ui/icons';
import Controls from '../shared/controls/Controls';
import Notification from '../shared/components/UIElements/Notification';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ConfirmDialog from '../shared/components/UIElements/ConfirmDialog';
import { listPosts, deletePost, PostCreate } from '../Action/PostActions';
import { POST_CREATE_RESET } from '../constants/PostConstants';
// import Popup from '../shared/components/UIElements/Popup'
// import EmployeesForm from '../shared/components/UIElements/EmployeesForm'

function PostListScreen({ history }) {
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
  const postList = useSelector((state) => state.postList);
  const { posts, loading, error } = postList;

  const postCreate = useSelector((state) => state.postCreate);
  const {
    post: createdPost,
    loading: loadingCreate,
    error: errorCreate,
    success: createSuccess,
  } = postCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    success: deleteSuccess,
    error: deleteError,
    loading: loadingDelete,
  } = postDelete;

  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('/login/user');
    } else if (createSuccess) {
      history.push(`/admin/post/${createdPost.id}/edit`);
    } else {
      dispatch(listPosts());
    }
  }, [dispatch, userInfo, history, deleteSuccess, createSuccess, createdPost]);

  const createPostHandler = () => {
    dispatch(PostCreate());
  };

  const deleteHandler = (id) => {
    dispatch(deletePost(id));
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
    <div className='post__list'>
      <h2 style={{ fontSize: '23px' }}>ALL POSTS LIST</h2>
      <button onClick={createPostHandler} className='add_post' type='button'>
        {' '}
        <i className='fas fa-plus'></i> Add Post
      </button>
      {deleteError && <Card>{deleteError}</Card>}
      {loadingDelete && <LoadingSpinner asOverlay />}

      {errorCreate && <Card>{errorCreate}</Card>}
      {loadingCreate && <LoadingSpinner asOverlay />}
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
              <th>Description</th>
              <th>Applications</th>
              <th>CreatedAt</th>
              <th>Active</th>
              <th>User Application</th>
              <th>Voting in Action</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.description.slice(1, 50)}...</td>
                <td>{post.applications}</td>
                <td>{post.createdAt}</td>
                <td>
                  <span style={{ color: post.isActive ? '#126EFD' : '' }}>
                    {post.isActive ? (
                      'Yes'
                    ) : (
                      <i
                        style={{ color: 'red', marginLeft: '20px' }}
                        className='fas fa-times'></i>
                    )}
                  </span>
                </td>
                <td>
                  <span style={{ color: post.isApplying ? '#126EFD' : '' }}>
                    {post.isApplying ? (
                      'Yes'
                    ) : (
                      <i
                        style={{ color: 'red', marginLeft: '20px' }}
                        className='fas fa-times'></i>
                    )}
                  </span>
                </td>

                <td>
                  <span style={{ color: post.isVoting ? '#126EFD' : '' }}>
                    {post.isVoting ? (
                      'Yes'
                    ) : (
                      <i
                        style={{ color: 'red', marginLeft: '20px' }}
                        className='fas fa-times'></i>
                    )}
                  </span>
                </td>
                <td>
                  <Link to={`/post/${post.id}`}>
                    <Controls.ActionButton color='primary'>
                      <VisibilityIcon fontSize='small' />
                    </Controls.ActionButton>
                  </Link>
                  <Link to={`/admin/post/${post.id}/edit`}>
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
                            deleteHandler(post.id);
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

export default withRouter(PostListScreen);
