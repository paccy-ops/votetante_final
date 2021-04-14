import React from 'react';
import logo from '../../../images/tante-01.svg';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <React.Fragment>
      <ul className={`${userInfo ? 'nav-links' : 'nav-link-with-noUser'}`}>
        <li>
          <NavLink to='/'>
            <img className='logo' src={logo} alt='logo' />
          </NavLink>
        </li>

        <li>
          <NavLink to='/' exact className='color-active'>
            Home
          </NavLink>
        </li>

        {userInfo && (
          <li>
            <NavLink to='/posts/candidates' className='color-active'>
              Vote
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to='/about/us' className='color-active'>
            About us
          </NavLink>
        </li>

        <li>
          <NavLink to='/our/Service' className='color-active'>
            Our Service
          </NavLink>
        </li>

        {!userInfo ? (
          <li>
            <NavLink to='/login/user' className='color-active'>
              Login
            </NavLink>
          </li>
        ) : (
          ''
        )}
      </ul>
    </React.Fragment>
  );
};

export default NavLinks;
