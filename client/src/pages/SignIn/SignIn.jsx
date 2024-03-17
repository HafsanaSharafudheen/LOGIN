import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../axios/axios.js';
import './SignIn.css';
import { signInSuccess, logout, signInStart } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await api.post('/auth/signin', formData, 
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        { withCredentials: true }
      );
      setLoading(false);
      if (res.data.success === false) {
        setError(true);
        return;
      }
<<<<<<< HEAD
    dispatch(signInSuccess(res.data.user));
    if (res.data.user.isAdmin) {
=======
    dispatch(signInSuccess(res.data));
    if (res.data.isAdmin) {
>>>>>>> 527880ad4e985b4907fcc6e405e6dc2d7a577e10
      navigate('/dashboard');
    } else {
      navigate('/');
    }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/sign-in');
  };

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
