import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signin', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);

      if (res.data.success === false) {
        setError('Invalid email or password');
      } else {
        navigate('/')
      }
    } catch (error) {
      setLoading(false);
      setError('Something went wrong');
      console.error('Error:', error);
    }
  }

  return (
    <div className="signin-container">
      <h1 className="signin-heading">SIGNIN</h1>
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
      <p className="sign-up-link">Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
    </div>
  );
}

export default SignIn;
