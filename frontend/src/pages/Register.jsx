import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/auth/register", { name, email, password });

      setSuccess("Registered successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 via-sky-200 to-white relative overflow-hidden">

      {/* SUCCESS TOAST */}
      {success && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          {success}
        </div>
      )}

      {/* Soft cloud glow */}
      <div className="absolute w-[600px] h-[600px] bg-white/40 rounded-full blur-3xl top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-white/30 rounded-full blur-3xl bottom-[-200px] right-[-200px]" />

      {/* Register Card */}
      <div className="relative w-full max-w-sm bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white">

        {/* Brand */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-xl font-bold">
            T
          </div>
          <span className="ml-2 text-xl font-semibold">Taskify</span>
        </div>

        <h2 className="text-xl font-semibold text-center mb-1">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Start managing your tasks efficiently.
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              👤
            </span>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              ✉️
            </span>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔒
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-white font-medium bg-gradient-to-b from-gray-900 to-black hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
