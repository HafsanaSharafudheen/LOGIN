import React, { useEffect, useState } from 'react';
import api from '../../axios/axios.js';
import './Admindashboard.css'; 

function AdminDashboard() {
  const [users, setUsers] = useState([]);

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

  const handleEdit = (userId) => {
    // Implement edit functionality here
    console.log('Edit user with ID:', userId);
  };

  const handleDelete = (userId) => {
    // Implement delete functionality here
    console.log('Delete user with ID:', userId);
  };

  return (
    <div className="admin-dashboard">
      <h2>User Details</h2>
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
                  <button onClick={() => handleEdit(user.id)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
