import React, { useState, useEffect } from 'react';
import image4 from "../assets/images/p1.jpeg";
import axios from 'axios';

const Profile1 = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [allUsers, setAllUsers] = useState([]); // For handling all users' data
  const userId = localStorage.getItem('userId'); // Fetch user ID from localStorage

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/profile', { userId });

        if (userId === '5') {
          setAllUsers(response.data.users); // Handle all users
        } else {
          setUser(response.data.user); // Handle single user
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching profile');
      }
    };

    fetchProfile();
  }, [userId]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!user && userId !== '5') return <p className="text-center">Loading...</p>;
  if (userId === '5' && allUsers.length === 0) return <p className="text-center">Loading...</p>;

  if (userId === '5') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-center mb-4">All Users</h1>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone Number</th>
                <th className="border border-gray-300 p-2">Region</th>
                <th className="border border-gray-300 p-2">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((u) => (
                <tr key={u.id}>
                  <td className="border border-gray-300 p-2">{u.id}</td>
                  <td className="border border-gray-300 p-2">{u.email}</td>
                  <td className="border border-gray-300 p-2">{u.phone_number}</td>
                  <td className="border border-gray-300 p-2">{u.region}</td>
                  <td className="border border-gray-300 p-2">{u.bookings.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Display single user profile
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex justify-center mb-6">
          <img
            src={image4}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">User Profile</h1>
        <div className="space-y-4">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Password:</strong> {user.password}</p>
          <p><strong>Phone Number:</strong> {user.phone_number}</p>
          <p><strong>Region:</strong> {user.region}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Aadhar Number:</strong> {user.aadhar_number}</p>
          <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
          <p>
            <strong>Bookings:</strong>{' '}
            {user.bookings.length > 0 ? user.bookings.join(', ') : 'No bookings yet'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile1;
