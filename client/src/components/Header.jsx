import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Header() {
  return (
    <div className="Header">
      <h1 className="welcome-text">Auth App</h1>
      <ul className="ListItems">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/sign-up'>Sign Up</Link></li>
      </ul>
    </div>
  );
}

export default Header;
