import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import Header from './components/Header';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/signUp/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
