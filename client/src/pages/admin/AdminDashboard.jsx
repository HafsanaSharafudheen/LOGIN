import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../axios/axios.js';
import './Admindashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
const navigate=useNavigate();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/user/fetchUsers');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user }); // Initialize editedUser with the user details
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setEditedUser(null); // Reset editedUser when closing the modal
  };

  const handleUpdate = async () => {
    // Update user data in the database
    try {
      await api.post(`/user/updateUser/${editedUser._id}`, editedUser);
      console.log('Update user:', editedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
    // Reset editedUser and close modal after update
    setEditedUser(null);
    setSelectedUser(null);
    // Fetch updated user data
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    try {
        // Make an API request to delete the user
        await api.post(`/user/delete/${userId}`);
      
        // Update the local state after successful deletion
        setUsers(users.filter(user => user._id !== userId));
        
        console.log('User deleted successfully');
    } catch (error) {
        // Log any errors that occur during the deletion process
        console.error('Error deleting user:', error);
    }
};
const handleCreateUser=async()=>{
  navigate('/sign-up'); 
}

  return (
    <div className="admin-dashboard">
      <h2>User Details</h2>
      <button onClick={handleCreateUser}>Create User</button> 

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            user.isAdmin === false && (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Edit User</h2>
            <p>ID: {editedUser._id}</p>
            <p>Name: <input type="text" value={editedUser.username} onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })} /></p>
            <p>Email: <input type="text" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} /></p>
            <div className="buttons">
              <button onClick={handleCloseModal}>Cancel</button>
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
