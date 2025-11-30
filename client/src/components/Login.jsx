import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Login Successful! 🔓');
      navigate('/editor');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <div
      className="relative flex h-screen justify-center items-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/img1.png')" }}
    >

      {/* 🔥 Dark overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      <div className="bg-gray-800/70 backdrop-blur-lg p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Login 🔐</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="p-3 rounded bg-gray-700/80 border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="p-3 rounded bg-gray-700/80 border border-gray-600 focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-300 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
