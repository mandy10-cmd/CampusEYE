import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Eye, ChevronRight } from "lucide-react";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    college: "",
    email: location.state?.email || "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Ensure email comes from EmailVerification
  useEffect(() => {
    if (!location.state?.email) {
      navigate("/email-verification");
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, last_name, college, email, password, password2 } = form;

    if (!first_name || !last_name || !college || !email || !password || !password2) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://campuseye-backend-4dlk.onrender.com/api/user/completeregistration/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ first_name, last_name, college, email, password, password2 }),
        }
      );

      const contentType = res.headers.get("content-type");
      const text = await res.text();

      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const json = JSON.parse(text);
          throw new Error(json?.detail || "Signup failed.");
        } else {
          throw new Error("Unexpected server error. Try again later.");
        }
      }

      // ✅ Success
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
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
          Complete Your Account
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Just a few more details to finish your signup
        </p>

        {error && (
          <div className="mb-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-3">
          <div className="w-1/2">
            <label className="text-gray-300 mb-1 block">First Name</label>
            <input
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
              disabled={loading}
            />
          </div>
          <div className="w-1/2">
            <label className="text-gray-300 mb-1 block">Last Name</label>
            <input
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
              disabled={loading}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="text-gray-300 mb-1 block">College</label>
          <input
            name="college"
            type="text"
            value={form.college}
            onChange={handleChange}
            placeholder="Enter your college"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="text-gray-300 mb-1 block">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="text-gray-300 mb-1 block">Confirm Password</label>
          <input
            name="password2"
            type="password"
            value={form.password2}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gray-700/50 text-white"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;