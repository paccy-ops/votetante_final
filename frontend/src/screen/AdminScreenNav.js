import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
function AdminScreenNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        style={{
          background: 'seagreen',
          color: '#fff',
          margin: '20px',
          padding: '10px',
        }}
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}>
        SELECT
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Link to='/admin/users/'>USERS</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/admin/posts/'>POSTS</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/admin/candidatelist/'>CANDIDATE</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AdminScreenNav;
