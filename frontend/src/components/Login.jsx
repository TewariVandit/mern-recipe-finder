import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth-slice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mern-recipe-finder.onrender.com/api/v1/user/login', userDetails);

      if (response.data.success) {
        dispatch(login({
          user: response.data.user,
          token: response.data.token
        }));
        localStorage.setItem('token', response.data.token);
        navigate('/');
        setUserDetails({ email: '', password: '' });
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="h-screen flex flex-col m-0 p-0 ">
      {/* Top Div with Background Image */}
      <div
        className="h-2/5 bg-cover bg-center "
        style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg")' }}
      ></div>

      {/* Off-white Background for Form */}
      <div className="h-1/5 flex justify-center items-start">
        <div className="bg-white p-8 rounded-t-xl shadow-md w-4/5 md:w-1/3 de mt-[-10%]">
          <h1 className="text-center text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full mb-4 rounded"
            />
            <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
              Login
            </button>
            <div className="text-center mt-4">
              Not have an account yet <Link to="/signup" className="text-blue-400 underline"> sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
