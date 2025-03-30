import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Loader, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedScene from "../Components/AnimatedScene";

const Signup = () => {
  const { Signup, isSigningUp } = UseAuthStore();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    await Signup(fullName, email, password);
    navigate("/Home"); // Redirect to Home after successful signup
  };

  return (
    <div className="relative flex flex-col-reverse md:flex-row items-center justify-center min-h-screen w-full px-6 sm:px-10 md:px-12">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <AnimatedScene />
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 md:gap-16">

        {/* Left Side: Signup Heading */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <div className="text-left">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-blue-900 leading-tight">
              Begin
            </h1>
            <h2 className="text-5xl sm:text-6xl font-semibold text-blue-900 leading-tight">
              your Financial
            </h2>
            <h1 className="text-6xl sm:text-7xl font-extrabold text-blue-900 leading-tight">
              Revolution.
            </h1>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full sm:max-w-sm md:max-w-lg p-6 sm:p-8 md:p-10 flex flex-col justify-center border border-green-400 bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl transition-all duration-300 hover:scale-105">
          <h2 className="text-4xl sm:text-5xl md:text-6xl mb-3 font-bold text-black text-center">X<span className="text-blue-800">pensa</span></h2>
          <p className="text-gray-500 mt-2 text-center">Create your Account</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:space-y-5">

            {/* Full Name Input */}
            <div>
              <label className="block text-gray-500 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 bg-white/20 border border-gray-300 rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-500 font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 bg-white/20 border border-gray-300 rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="relative">
              <label className="block text-gray-500 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-4 py-2 bg-white/20 border border-gray-300 rounded-lg placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full border mt-6 border-black font-semibold py-3 rounded-2xl shadow-lg transition-all"
              disabled={isSigningUp}
            >
              {isSigningUp ? <Loader className="animate-spin mr-2 inline-block" size={20} /> : "Sign Up"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/Login" className="text-blue-900 hover:underline transition">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Signup;