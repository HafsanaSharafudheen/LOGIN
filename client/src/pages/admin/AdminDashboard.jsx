import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setIsAdmin } from '../../redux/user/userSlice.js'; // Import the setIsAdmin action
import api from '../../axios/axios.js';
import './Admindashboard.css'; 

function AdminDashboard() {
  const dispatch = useDispatch(); 

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/user/fetchUsers'); 
      dispatch(setIsAdmin(response.data.isAdmin)); // Dispatch setIsAdmin action

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
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
