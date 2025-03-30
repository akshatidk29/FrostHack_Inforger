import React, { useState } from "react";
import { UseAuthStore } from "../Store/UseAuthStore";
import { Link } from "react-router-dom";
import { User, Menu, X } from "lucide-react";

const Navbar = () => {
  const { authUser, isCheckingAuth, Logout } = UseAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  if (isCheckingAuth) {
    return (
      <nav className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-[1000]">
        <div className="text-white">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg py-4 px-8 flex justify-between items-center">
      {/* ✅ Logo */}
      <Link
        to="/Home"
        className="text-5xl font-bold tracking-wide text-black"
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        X<span className="text-blue-800">pensa</span>
      </Link>

      {/* ✅ Mobile Menu Button */}
      <button className="md:hidden text-indigo-300" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* ✅ Navigation Links */}
      <div className={`md:flex space-x-8 ${isOpen ? "block" : "hidden"} absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white/10 md:bg-transparent p-6 md:p-0 rounded-lg shadow-md md:shadow-none`}>
        {["Home", "About", "Contact"].map((item, index) => (
          <div key={index} className="group">
            <Link
              to={`/${item}`}
              className="block md:inline text-lg font-medium text-indigo-500 hover:text-blue-800 transition duration-300 px-4 py-2 relative"
              onClick={() => setIsOpen(false)}
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        ))}
      </div>


      {/* ✅ User Section */}
      <div className="hidden md:flex items-center space-x-4">
        {authUser ? (
          <>
            <span className="text-indigo-300 hover:text-cyan-600 font-medium">Hello, {authUser.fullName}</span>
            <Link to="/Profile" className="text-indigo-300 hover:text-cyan-600 transition-all">
              <User className="w-7 h-7 hover:scale-110 transition-transform duration-300" />
            </Link>
            <button
              onClick={Logout}
              className="px-5 py-2 text-lg font-medium text-red-200 bg-red-600/50 hover:bg-red-500 transition-all rounded-full shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/Login" className="relative px-6 py-2 text-lg font-medium group">
              Login
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/Signup" className="relative px-6 py-2 text-lg font-medium group">
              Sign Up
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;