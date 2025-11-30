import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registration Successful! Please Login. 🎉');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <div
      className="relative flex h-screen justify-center items-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/reg1.png')" }}
    >
      {/* 🔥 Dark overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      <div className="bg-gray-400/70 backdrop-blur-lg p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Register 📝</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username (Unique)"
            required
            onChange={handleChange}
            className="p-3 rounded bg-gray-700/80 border border-gray-600 focus:outline-none focus:border-green-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="p-3 rounded bg-gray-700/80 border border-gray-600 focus:outline-none focus:border-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="p-3 rounded bg-gray-700/80 border border-gray-600 focus:outline-none focus:border-green-500"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-900 text-sm font-bold  ">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
