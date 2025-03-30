import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { UseAuthStore } from "./Store/UseAuthStore";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Transactions from "./Pages/Transactions";
import Assistant from "./Pages/Assistant";
import Analytics from "./Pages/Analytics";

function App() {
  const { authUser, CheckAuth, isCheckingAuth } = UseAuthStore();

  useEffect(() => {
    CheckAuth(); // Check if user is logged in on app load
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Checking authentication...</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Signup" element={authUser ? <Navigate to="/Home" /> : <Signup />} />
        <Route path="/Login" element={authUser ? <Navigate to="/Home" /> : <Login />} />
        <Route path="/" element={authUser ? <Navigate to="/Home" /> : <Login />} />
        <Route path="/Profile" element={!authUser ? <Navigate to="/Login" /> : <Profile />} />
        <Route path="/Transactions" element={!authUser ? <Navigate to="/Login" /> : <Transactions />} />
        <Route path="/Assistant" element={!authUser ? <Navigate to="/Login" /> : <Assistant />} />
        <Route path="/Analytics" element={!authUser ? <Navigate to="/Login" /> : <Analytics />} />


      </Routes>
      <Footer />
    </>
  );
}

export default App;
