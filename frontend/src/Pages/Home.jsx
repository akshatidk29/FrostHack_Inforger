import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, BarChart, MessageSquare, HomeIcon, Bot, Activity, Shield, Zap } from "lucide-react";

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [typedText, setTypedText] = useState("");
  const navigate = useNavigate();
  const tagline = "Your Money, Your Future, Your Control.";

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    let direction = 1; // 1 for typing, -1 for erasing

    const typingInterval = setInterval(() => {
      if (direction === 1) {
        if (currentIndex <= tagline.length) {
          setTypedText(tagline.substring(0, currentIndex));
          currentIndex++;
        } else {
          // Pause at the end before erasing
          setTimeout(() => {
            direction = -1;
          }, 2000);
        }
      } else {
        if (currentIndex > 0) {
          currentIndex--;
          setTypedText(tagline.substring(0, currentIndex));
        } else {
          // Pause before typing again
          setTimeout(() => {
            direction = 1;
          }, 500);
        }
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Format greeting based on time of day

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-24 pb-32 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text */}
            <div className="lg:ml-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
                Welcome to <h1 className="text-5xl mb-5 font-bold text-black">X<span className="text-blue-800">pensa</span></h1>
              </h1>

              {/* Animated Tagline */}
              <div className="mt-12 h-12">
                <p className="text-2xl md:text-3xl text-gray-700 font-medium relative">
                  <span className="relative">
                    {typedText}
                    <span className="absolute right-0 h-full w-1 bg-purple-500 animate-blink"></span>
                  </span>
                </p>
              </div>

              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Manage your money like a Pro with real-time Insights, Set budget goals, Cut unnecessary expenses, and Watch your savings Grow.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/Profile"
                  className="px-8 py-3 bg-gradient-to-r from-purple-200 to-blue-800 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <Link
                  to="/About"
                  className="px-8 py-3 bg-white text-purple-600 border border-purple-200 rounded-full font-medium shadow-sm hover:shadow transition-all duration-300 transform hover:-translate-y-1"
                >
                  Learn More
                </Link>
              </div>

            </div>

            {/* Right Column - Graphic */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-60 animate-float"></div>
                <div className="absolute top-32 -right-5 w-16 h-16 bg-blue-400 rounded-full opacity-60 animate-float-delayed"></div>
                <div className="absolute -bottom-5 left-20 w-24 h-24 bg-purple-400 rounded-full opacity-60 animate-float-slow"></div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-600">Manage Your Money Effortlessly</h2>
            <p className="mt-4 text-xl text-gray-800 max-w-3xl mx-auto">
              Powerful tools Designed to give you Clarity and Control over your Financial Journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Transactions Card */}
            <Link to="/transactions" className="group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-200">
                <div className="p-4 rounded-full bg-green-100 mb-6 w-16 h-16 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <CreditCard className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Transactions</h2>
                <p className="text-gray-600">
                  Track every ₹ with smart Categorization and real-time Updates. Never miss a Transaction or Subscription Again.
                </p>
                <div className="mt-6 flex items-center text-gray-700">
                  <span>Explore transactions</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Analytics Card */}
            <Link to="/analytics" className="group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-md p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full border border-gray-200">
                <div className="p-4 rounded-full bg-blue-100 mb-6 w-16 h-16 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <BarChart className="text-blue-600" size={32} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Analytics</h2>
                <p className="text-gray-600">
                  Gain Powerful Insights with Visual Representations of your Spending patterns and Financial health.
                </p>
                <div className="mt-6 flex items-center text-gray-700">
                  <span>View analytics</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Eye-catching Feature Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:ml-16">
              <h2 className="text-4xl font-bold mb-6">Smart Financial Planning</h2>
              <p className="text-xl text-purple-100 mb-8">
                Our AI-powered platform analyzes your spending habits and provides personalized recommendations to help you save more and spend wisely.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-white bg-opacity-20 mr-4">
                    <Activity className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Real-time Insights</h3>
                    <p className="text-purple-100">Get instant notifications and updates about your financial status</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-white bg-opacity-20 mr-4">
                    <Shield className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Secure Budgeting</h3>
                    <p className="text-purple-100">Create and manage budgets with bank-level security protocols</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-white bg-opacity-20 mr-4">
                    <Zap className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Smart Automation</h3>
                    <p className="text-purple-100">Automate savings and bill payments to stay on track effortlessly</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -top-5 -left-5 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-pink-300 rounded-full opacity-30 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assistant Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Need Financial Guidance?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI assistant is here to help you make better Financial Decisions
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div
              onClick={() => navigate('/assistant')}
              className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-10 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Meet Your Financial Assistant</h3>
                    <p className="text-gray-600 mb-8">
                      Get Personalized Financial Advice, answers to your Questions, and Guidance tailored to your specific needs and goals.
                    </p>
                    <div className="inline-block">
                      <button className="px-6 py-3 bg-gradient-to-r from-purple-300 to-blue-400 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                        Chat With Assistant
                      </button>
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-br from-purple-100 to-blue-100 p-10 flex items-center justify-center">
                    {/* Robot Assistant Animation */}
                    <div className="relative w-64 h-64">
                      {/* Robot Body */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl relative overflow-hidden">
                          {/* Robot Face */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            {/* Eyes */}
                            <div className="flex space-x-6 mb-4">
                              <div className="w-6 h-6 bg-white rounded-full animate-blink"></div>
                              <div className="w-6 h-6 bg-white rounded-full animate-blink delay-150"></div>
                            </div>
                            {/* Mouth */}
                            <div className="w-12 h-2 bg-white rounded-full mt-2"></div>
                          </div>
                        </div>
                      </div>

                      {/* Robot Arm - Waving Animation */}
                      <div className="absolute top-1/4 -right-4 origin-bottom-left animate-wave">
                        <div className="w-12 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                        <div className="w-4 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full ml-8 -mt-2"></div>
                      </div>
                    </div>

                    {/* Speech Bubble */}
                    <div className="absolute top-8 right-8 bg-white rounded-2xl p-4 shadow-lg">
                      <p className="text-purple-600 font-medium">Need help with your finances?</p>
                      <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials or Additional Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Users Love Xpensa</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands who have transformed their financial lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-2xl shadow-md p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">AM</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Akshat Mittal</h3>
                  <p className="text-gray-500 text-sm">Xpensa user for 6 months</p>
                </div>
              </div>
              <p className="text-gray-600">
                Xpensa has completely transformed the way I manage my finances. The insights and AI-driven suggestions have helped me stay on top of my expenses effortlessly.
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-2xl shadow-md p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">AJ</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Arihant Jain</h3>
                  <p className="text-gray-500 text-sm">Xpensa user for 1 year</p>
                </div>
              </div>
              <p className="text-gray-600">
                The automated tracking and analytics have been game-changers for me. I’ve saved more money in the past year than ever before, all thanks to Xpensa!
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-2xl shadow-md p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">LS</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Luv Sharma</h3>
                  <p className="text-gray-500 text-sm">Xpensa user for 3 months</p>
                </div>
              </div>
              <p className="text-gray-600">
                Xpensa makes budgeting so much easier! I love the intuitive UI and the detailed breakdown of my expenses, helping me make smarter financial decisions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Finances?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of users who have taken control of their financial future with Xpensa
          </p>
          <button
            onClick={() => navigate("/Profile")}
            className="px-8 py-4 bg-white text-purple-600 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
          >
            Get Started For Free
          </button>
        </div>
      </section>

      {/* CSS for Animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-15deg); }
        }
        
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
        
        .delay-150 {
          animation-delay: 150ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default Home;