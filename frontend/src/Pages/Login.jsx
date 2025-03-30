import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Loader, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedScene from "../Components/AnimatedScene";

const Login = () => {
  const { Login, isLoggingIn } = UseAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    await Login(email, password);
    navigate("/Home"); // Redirect to Home after login
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <AnimatedScene />
      </div>

      {/* Login Content Container */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between px-10">
        
        {/* Left Side - Large Heading */}
        <div className="hidden md:block md:w-1/2 text-left">
          <h1 className="text-8xl font-extrabold text-blue-900 leading-tight">Login</h1>
          <h2 className="text-6xl font-semibold text-blue-900 leading-tight">to Your</h2>
          <h1 className="text-7xl font-extrabold text-blue-900 leading-tight">Account.</h1>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 max-w-md mx-auto bg-white/20 backdrop-blur-lg shadow-xl border border-green-400 rounded-3xl p-8 text-center transition-all duration-300 hover:scale-105">
          
          {/* Brand Name */}
          <h2 className="text-5xl mb-5 font-bold text-black">X<span className="text-blue-800">pensa</span></h2>
          <p className="text-gray-500 mt-2">Welcome back! </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            
            {/* Email Input */}
            <div>
              <label className="block text-gray-500 font-medium text-left">Email</label>
              <input
                type="email"
                className="w-full mt-2 px-4 py-2 bg-white/20 border border-gray-300 rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="relative">
              <label className="block text-gray-500 font-medium text-left">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-2 px-4 py-2 bg-white/20 border border-gray-300 rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full border border-black font-semibold py-3 rounded-2xl shadow-lg transition-all"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? <Loader className="animate-spin mr-2 inline-block" size={20} /> : "Login"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/Signup" className="text-blue-900 hover:underline transition">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;