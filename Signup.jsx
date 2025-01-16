import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  // Define state for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [region, setRegion] = useState('');
  const [address, setAddress] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      phone_number: phoneNumber,
      region,
      address,
      aadhar_number: aadharNumber
    };

    try {
      // Make POST request to the backend API
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setError('');
      } else {
        setError(data.message);
        setSuccess('');
      }
    } catch (err) {
      setError('Something went wrong.');
      setSuccess('');
    }
  };

  return (
    <div className="relative h-screen w-full bg-blue-200"> {/* Blue background for the page */}
      <div className="relative flex justify-center items-center h-full">
        <div className="flex flex-col border rounded-lg p-6 w-full max-w-sm sm:w-[420px] bg-white bg-opacity-50 shadow-md">
          <h2 className="text-3xl font-semibold text-center mb-6">Signup</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {success && <div className="text-green-500 text-center mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-80"
              />
            </div>
            <div>
              <label className="block font-medium">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-80"
              />
            </div>
            <div>
              <label className="block font-medium">Phone Number:</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-80"
              />
            </div>
            <div>
              <label className="block font-medium">Region:</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-80"
              />
            </div>
            <div>
              <label className="block font-medium">Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-80"
              />
            </div>
            <div>
              <label className="block font-medium">Aadhar Number:</label>
              <input
                type="text"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-80"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Signup
            </button>
            <div className="text-center mt-4">
              <Link to="/" className="text-blue-500 hover:underline">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
