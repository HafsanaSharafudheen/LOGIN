import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import Admindashboard from './pages/admin/AdminDashboard';
import { useSelector } from 'react-redux';


function App() {
  const isAdmin = useSelector(state => state.user.isAdmin);

  return (

    <BrowserRouter>
      <Routes>

        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        {isAdmin && <Route path='/dashboard' element={<Admindashboard/>} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
