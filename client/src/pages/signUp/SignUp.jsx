import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure,  } from '../../redux/user/userSlice';
import api from '../../axios/axios.js';
import './SignUp.css';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isAdmin = useSelector(state => state.user.isAdmin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(false);

      const res = await api.post('/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if (res.data.success === false) {
        setError(true);
        return;
      } 
      
      if(isAdmin){
        navigate('/dashboard');
      } else {
        dispatch(signInSuccess(res.data));      
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-heading">SIGNUP</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" id="username" name="username" placeholder="Username" />
        <input onChange={handleChange} type="text" id="email" name="email" placeholder="Email" />
        <input onChange={handleChange} type="password" id="password" name="password" placeholder="Password" />
        <button disabled={loading} type="submit">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <p style={{ color: 'red' }}>{error ? (error.message || 'Something went wrong') : ''}</p>
      </form>
      <p className="sign-in-link">Already have an account? <Link to="/sign-in">Sign in</Link></p>
    </div>
  );
}

export default SignUp;
