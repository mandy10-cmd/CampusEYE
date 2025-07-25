import React, { useState } from 'react';
import { Eye, Lock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    text: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Modal logic states
  const [step, setStep] = useState('enterEmail'); // 'enterEmail' | 'enterCode'
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const dummyVerificationCode = '123456';

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Fake APIs
  const sendCodeAPI = () =>
    new Promise((res) => {
      console.log(`✅ Code ${dummyVerificationCode} sent to:`, form.email);
      setTimeout(res, 1000);
    });

  const verifyCodeAPI = () =>
    new Promise((res, rej) => {
      setTimeout(() => {
        code === dummyVerificationCode ? res() : rej(new Error('Invalid verification code'));
      }, 1000);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, text, email, password, confirmPassword } = form;

    if (!firstName || !lastName || !text || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setShowModal(true); // Open modal for email verification
    await sendCodeAPI();
    setStep('enterCode');
  };

  const handleVerifyCode = async () => {
    setVerifying(true);
    setError('');
    try {
      await verifyCodeAPI();
      alert('🎉 Account successfully verified!');
      setShowModal(false);
      navigate('/dashboard'); // Adjust as needed
    } catch (err) {
      setError(err.message);
    } finally {
      setVerifying(false);
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
        <p className="text-gray-400 text-center mb-6">Sign up to get started with CampusEye</p>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-2 text-sm">
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
              placeholder="First Name"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
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
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-gray-300 mb-1" htmlFor="text">College Name</label>
          <input
            id="text"
            name="text"
            type="text"
            value={form.text}
            onChange={handleChange}
            placeholder="Enter your College name"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-1" htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
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

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl w-full max-w-md shadow-lg relative">
            <h3 className="text-lg font-semibold text-white mb-4">
              {step === 'enterEmail' ? 'Verify Your Email' : 'Enter Verification Code'}
            </h3>

            {step === 'enterCode' && (
              <>
                <p className="text-sm text-gray-400 mb-3">
                  Enter the 6-digit code sent to <strong>{form.email}</strong>.
                </p>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  placeholder="123456"
                  className="mb-4 w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white focus:outline-none"
                />
              </>
            )}

            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-2 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleVerifyCode}
              disabled={verifying}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              {verifying ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;