import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import { signInStart, signInSuccess, signInFailure, logout } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signin', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.success === false) {
        if (res.status === 401) {
          dispatch(signInFailure('Incorrect email or password'));
        } else {
          dispatch(signInFailure(res.data.message));
        }
        return;
      }

      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.error('Error:', error);
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    // Redirect to the login page after logout
    navigate('/sign-in');
  }

  return (
    <div className="signin-container">
      <h1 className="signin-heading">SIGNIN</h1>
      {currentUser ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            disabled={loading}
          />
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            disabled={loading}
          />
          <button disabled={loading} type="submit">
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
      {!currentUser && (
        <p className="sign-up-link">Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
      )}
    </div>
  );
}

export default SignIn;
