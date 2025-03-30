import React, { useState, useEffect } from "react";
import { BarChart, Shield, Award, BrainCircuit, Users, TrendingUp, DollarSign } from "lucide-react";

const AboutPage = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* ✅ Hero Section */}
      <div className="mb-8 mt-20 w-80% mx-auto relative h-100 overflow-hidden shadow-2xl flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img
          src="AboutBG.jpg"
          alt="About XpenseWay"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-white text-center">
          <h2 className="text-6xl font-bold mb-2">Track. Optimize. Prosper.</h2>
          <p className="text-lg italic opacity-90">Your Ultimate Personal Finance Companion</p>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="container mt-16 mb-16 rounded-4xl mx-auto px-6 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 pb-6 bg-gradient-to-r from-gray-600 to-blue-400 bg-clip-text text-transparent">
            Why <span className="text-black">X</span><span className="text-blue-800">pensa</span>?
          </h1>
          <p className="text-blue-900 text-lg leading-relaxed">
            Managing Money shouldn't be complicated. Xpensa helps you track expenses, Analyze Spending Habits, and Optimize Finances Effortlessly—putting you in Control of your Future.
          </p>
        </div>

        {/* ✅ Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            icon={<DollarSign />}
            title="Smart Expense Tracking"
            description="Effortlessly log transactions and categorize expenses to stay on top of your finances."
          />
          <FeatureCard
            icon={<BarChart />}
            title="Insightful Analytics"
            description="Gain deep insights with interactive charts and AI-powered spending trends."
          />
          <FeatureCard
            icon={<TrendingUp />}
            title="Budgeting & Goal Setting"
            description="Set financial goals, track your progress, and build smarter spending habits."
          />
          <FeatureCard
            icon={<BrainCircuit />}
            title="AI Financial Assistant"
            description="Get personalized money-saving suggestions and optimize your budget using AI."
          />
          <FeatureCard
            icon={<Shield />}
            title="Bank-Grade Security"
            description="Your financial data is encrypted and protected with top-tier security measures."
          />
          <FeatureCard
            icon={<Award />}
            title="Gamified Rewards & Leaderboard"
            description="Stay motivated by earning rewards and competing in finance challenges."
          />
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/80 backdrop-blur-lg p-8 rounded-4xl shadow-lg border border-blue-200 hover:shadow-xl transition-all">
    <div className="text-blue-500 w-12 h-10">{icon}</div>
    <h3 className="text-2xl font-semibold text-blue-800 mb-8">{title}</h3>
    <p className="text-blue-700">{description}</p>
  </div>
);

export default AboutPage;
