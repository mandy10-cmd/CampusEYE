import React, { useState } from 'react';
import { Eye, Lock, ChevronRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle backend errors (adjust error path as needed)
        const errorMsg = data?.errors?.non_field_errors?.[0] || 'Login failed. Check your email and password.';
        throw new Error(errorMsg);
      }

      // Extract tokens (adjust based on actual response structure)
      const { access, refresh } = data.token;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Redirect on success
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In (tbd in future)
  const handleGoogleSignIn = () => {
    alert('Google Sign-In not yet implemented.');
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
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-6">Sign in to your Trinetra account</p>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all mb-6"
          disabled={isLoading}
        >
          <FcGoogle className="w-5 h-5" />
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 text-gray-400 mb-6 text-sm">
          <hr className="flex-1 border-t border-gray-600" />
          OR
          <hr className="flex-1 border-t border-gray-600" />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-2 text-sm">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="you@example.com"
            disabled={isLoading}
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'transform hover:scale-105'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
