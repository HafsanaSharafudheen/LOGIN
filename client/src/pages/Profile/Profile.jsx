import React, { useState, useRef   } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from  '../../axios/axios.js'
import { useNavigate } from 'react-router-dom';
import { logout, signInSuccess } from '../../redux/user/userSlice';
import './Profile.css';
import instance from '../../axios/axios'

function Profile() {
  const [selectedFile, setSelectedFile] = useState(null); 
  const { currentUser } = useSelector(state => state.user);
  const defaultProfilePicture = 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg?w=740';
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const file = e.target.files[0]; 
    setSelectedFile(file); 
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
    try {
        const response = await api.post(`/user/profile/${currentUser._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'          
          }
        });
        await dispatch(signInSuccess(response.data.user));    
      console.log('Profile picture uploaded successfully');
      console.log(response.data);

      navigate('/');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }


    
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/'); 
  };

 
  
  // Function to trigger file input click
  const handleButtonClick = () => {
    fileRef.current.click(); // Trigger file input click when button is clicked
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        {/* Input element for file upload */}
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileSelect}
        />
      <div>
        {currentUser.profilePicture ? (
          <img src={selectedFile ? URL.createObjectURL(selectedFile) : instance.defaults.serverURL+ currentUser.profilePicture} alt="Profile"
          onClick={handleButtonClick}  />
        ) : (
          <img src={selectedFile ? URL.createObjectURL(selectedFile) : defaultProfilePicture} alt="Default Profile" 
          onClick={handleButtonClick} />
        )}
      </div>

        <div>
          <input type='text' id='username' placeholder='Username' defaultValue={currentUser.username} />
          <input type='text' id='email' placeholder='Email' defaultValue={currentUser.email} />
          <input type='password' id='password' placeholder='Password' />
          
          {/* Button to upload the selected file */}
          <button type="button" onClick={handleFileUpload}>Upload </button>
        </div>
        <div>
            <span className="profile-link" onClick={handleSignOut}>Sign Out</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
