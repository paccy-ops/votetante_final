import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logo from '../../../images/tante-01.svg';
import profile from '../../../images/user.png';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './MainNavigation.css';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import NavLink from './NavLinks';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../Action/UserActions';

const MainNavigation = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openDrawerHandle = () => {
    setDrawerIsOpen(true);
  };
  const closeDrawerHandle = () => {
    setDrawerIsOpen(false);
  };
  const logoutHandler = () => {
    setAnchorEl(null);
    dispatch(logout());
    if (!userInfo) {
      history.push('/');
    }
  };

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  return (
    <React.Fragment>
      <MainHeader>
        {drawerIsOpen && <Backdrop onClick={closeDrawerHandle} />}

        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandle}>
          <nav className='main-navigation__drawer-nav'>
            <NavLink />
          </nav>
        </SideDrawer>

        <button
          className='main-navigation__menu-btn'
          onClick={openDrawerHandle}>
          {' '}
          <span />
          <span />
          <span />{' '}
        </button>
        <h1 className='main-navigation__title'>
          {userInfo ? (
            <Link to='/'>{userInfo.name} </Link>
          ) : (
            <Link to='/'>
              VoteTante{' '}
              <img
                style={{ width: '100px', marginTop: '10px' }}
                className='logo'
                src={logo}
                alt='logo'
              />
            </Link>
          )}
        </h1>

        {userInfo ? (
          <div>
            <Button
              style={{
                backgroundColor: 'transparent',
                borderRadius: '10%',
                position: 'absolute',
                marginLeft: '30px',
                right: '10px',
                top: '19px',
              }}
              aria-controls='customized-menu'
              aria-haspopup='true'
              onClick={handleClick}>
              {userInfo.image ? (
                <img className='image-profile' src={profile} alt='profile' />
              ) : (
                <img className='image-profile' src={profile} alt='profile' />
              )}
            </Button>
            <StyledMenu
              id='customized-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <Link to='/user/profile'>
                <StyledMenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText primary='PROFILE' />
                </StyledMenuItem>
              </Link>
              {userInfo.isAdmin && (
                <Link to='/admin/posts'>
                  <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <DashboardIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='DASHBOARD' />
                  </StyledMenuItem>
                </Link>
              )}

              <Link to='/'>
                <StyledMenuItem onClick={logoutHandler}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText primary='LOGOUT' />
                </StyledMenuItem>
              </Link>
            </StyledMenu>
          </div>
        ) : (
          ''
        )}

        <nav className='main-navigation__header-nav'>
          <NavLink />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
