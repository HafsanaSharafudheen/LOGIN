import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import instance from '../axios/axios'


function Header() {
  const { currentUser } = useSelector(state => state.user);
  const defaultProfilePicture = 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg?w=740';

  return (
    <div className="Header">
      <h1 className="welcome-text">LapWorld</h1>
      <ul className="ListItems">
        <li>
          <Link to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/about'>
            About
          </Link>
        </li>
        <li>
          <Link to={currentUser ? '/profile' : '/sign-in'}>
            {currentUser ? (
              <img src={instance.defaults.serverURL+currentUser.profilePicture || defaultProfilePicture} alt="Profile" />
            ) : (
              'Sign In'
            )}
          </Link>
        </li>
        {!currentUser && (
          <li>
            <Link to='/sign-up'>
              Sign Up
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
