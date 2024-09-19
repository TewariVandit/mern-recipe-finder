import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    bio: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/add', formData);
      if (response.data.success) {
        navigate('/login'); // Navigate to login after successful signup
      } else {
        alert('Signup failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="h-screen flex flex-col m-0 p-0">
      {/* Top Div with Background Image */}
      <div
        className="h-2/5 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg")' }}
      ></div>

      {/* Off-white Background for Form */}
      <div className="h-1/5 flex justify-center items-start">
        <div className="bg-white p-8 rounded-t-xl shadow-md w-4/5 md:w-1/3 mt-[-10%]">
          <h1 className="text-center text-2xl font-semibold mb-4">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded"
            />
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded"
            />
            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded h-24"
            />
            <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
              Sign Up
            </button>
            <div className="text-center mt-4">
              Already have an account<Link to="/login" className="text-blue-400 underline"> log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
