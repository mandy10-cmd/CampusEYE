import React, { useState } from 'react';
import { Eye, Lock, ChevronRight } from 'lucide-react';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Dummy validation
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
    } else {
      setError('');
      // Handle signup logic here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-black/60 backdrop-blur-2xl rounded-3xl p-8 md:p-12 w-full max-w-md border border-gray-700/50 shadow-2xl"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Eye className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Create Your Account
        </h2>
        <p className="text-gray-400 text-center mb-6">Sign up to get started with TrinetraAI</p>

        {error && (
          <div className="mb-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-3">
          <div className="w-1/2">
            <label className="flex text-gray-300 mb-1" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="First Name"
            />
          </div>

          <div className="w-1/2">
            <label className="flex text-gray-300 mb-1" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={form.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-gray-300 mb-1" htmlFor='text'>College Name</label>
          <input
            id="text"
            name="text"
            type="text"
            autoComplete="text"
            value={form.text}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your College name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="••••••••"
          />
        </div>
         <div className="mb-6">
          <label className="block text-gray-300 mb-1" htmlFor="password">Confirm Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          Sign Up
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;