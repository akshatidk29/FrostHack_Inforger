import React, { useState, useEffect } from 'react';
import { Clock, Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const [rotation, setRotation] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // ✅ Rotating clock animation
  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // ✅ Form entrance animation
  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 relative overflow-hidden">

      {/* ✅ Hero Section */}
      <div className="mb-20 mt-20 w-90% mx-auto relative h-100 overflow-hidden shadow-2xl flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img src="ContactBG.jpg" alt="Featured" className="w-full h-full object-cover" />
        <div className="absolute bottom-6  z-20 text-white ">
          <h2 className="text-8xl font-bold mb-2">Connect with Us.</h2>
          <p className="text-lg italic opacity-90 pl-12">Your Memories, Your Legacy, Our Platform.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row  justify-between gap-12 ">

        {/* ✅ Left Section - Contact Details */}
        <div className="md:w-1/2 pt-10">
          <div className="pl-12 mb-4">
            <h1 className="mt-16 mb-4 text-7xl font-bold bg-blue-900 bg-clip-text text-transparent">
              Contact.
            </h1>
            <p className="text-lg ml-3 mt-2 mb-19">
              Have questions or suggestions?{" "}
              <span className="text-blue-900 ">Let’s talk.</span>
            </p>
          </div>

          {/* ✅ Contact Details */}
          <div className="pl-16 space-y-4 text-lg">
            <div className="flex items-center space-x-4">
              <Mail className="text-blue-900" size={24} />
              <span>support@Xpensa.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-blue-900" size={24} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-blue-900" size={24} />
              <span>IIT Mandi, India</span>
            </div>
          </div>

          {/* ✅ Rotating Clock Icon */}
          <div className="absolute -top-4 -right-4 animate-pulse">
            <Clock className="text-indigo-400" size={32} />
          </div>
        </div>

        {/* ✅ Right Section - Contact Form */}
        <div className="md:w-1/2 p-8 pr-34">
          <form className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              <InputField label="Name" type="text" placeholder="Enter Your Name" />
              <InputField label="Email Address" type="email" placeholder="user@gmail.com" />
            </div>
            <InputField label="Subject" type="text" placeholder="How can we help?" />
            <TextareaField label="Message" placeholder="Let us know your thoughts..." />

            <button
              type="submit"
              className="w-1/3 bg-blue-900 hover:from-indigo-700 hover:bg-cyan-700 text-white rounded-3xl p-4 flex items-center justify-center space-x-2 transition group shadow-lg"
            >
              <span className="text-lg">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, type, placeholder }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const TextareaField = ({ label, placeholder }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium">{label}</label>
    <textarea
      placeholder={placeholder}
      className="mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 h-28"
    />
  </div>
);

export default ContactPage;
