import React, { useState, useEffect } from "react";
import { UseAuthStore } from "../Store/UseAuthStore";
import { useInfoStore } from "../Store/UseInfoStore";
import {
  Target, Award, Wallet, TrendingUp, Edit2, ArrowUp, ChevronDown,
  ChevronUp, DollarSign, Flag, Save, X
} from "lucide-react";

const Profile = () => {
  const { authUser } = UseAuthStore();
  const { fetchBudgets, fetchGoals, addBudget, addGoal, budgetss, goals } = useInfoStore();

  const [activeTab, setActiveTab] = useState("overview");
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalUpdates, setGoalUpdates] = useState({});

  const budgets = budgetss; // ✅ Use budgets from the store

  const [newBudget, setNewBudget] = useState({ category: "", limit: "" });
  const [newGoal, setNewGoal] = useState({ title: "", target: "", deadline: "" });

  // ✅ Calculate financial health score
  const calculateFinancialHealthScore = () => {
    if (budgets.length === 0 && goals.length === 0) return 0;

    const budgetAdherence = budgets.length > 0
      ? budgets.reduce((acc, budget) => acc + (1 - Math.min(budget.spent / budget.limit, 1)) * 100, 0) / budgets.length
      : 0;

    const goalProgress = goals.length > 0
      ? goals.reduce((acc, goal) => acc + (goal.current / goal.target) * 100, 0) / goals.length
      : 0;

    return Math.round((budgetAdherence * 0.6) + (goalProgress * 0.4));
  };

  // ✅ Handle adding a new budget
  const handleAddBudget = () => {
    if (newBudget.category && newBudget.limit) {
      const newBudgetItem = {
        category: newBudget.category,
        limit: parseFloat(newBudget.limit),
        spent: 0,
        color: ["blue", "purple", "green", "pink", "orange"][Math.floor(Math.random() * 5)]
      };

      addBudget(newBudgetItem);
      setNewBudget({ category: "", limit: "" });
      setShowBudgetForm(false);
    }
  };

  // ✅ Handle adding a new goal
  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.deadline) {
      const newGoalItem = {
        title: newGoal.title,
        target: parseFloat(newGoal.target),
        current: 0,
        deadline: newGoal.deadline,
        complete: false,
      };

      addGoal(newGoalItem);
      setNewGoal({ title: "", target: "", deadline: "" });
      setShowGoalForm(false);
    }
  };

  const handleUpdateGoal = (goal) => {
    const updatedGoal = {
      ...goal,
      current: parseFloat(goalUpdates[goal.title]) || goal.current,
    };
    addGoal(updatedGoal);
  };
  

  // ✅ Fetch budgets & goals on mount
  useEffect(() => {
    fetchBudgets();
    fetchGoals();
  },[addGoal]);

  if (!authUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-purple-100">
          <h1 className="text-2xl font-bold text-indigo-700">User not found.</h1>
          <p className="mt-2 text-gray-500">Please login to view your profile.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br pt-25 from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
          <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 h-36 sm:h-44 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <defs>
                  <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" strokeWidth="1" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pattern)" />
              </svg>
            </div>
          </div>
          
          <div className="px-6 py-8 relative">
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <div className="rounded-full p-1 bg-white shadow-lg">
                <img
                  src={authUser.profilePic || "Profile.png"}
                  alt="Profile"
                  className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover transition-all duration-300 hover:scale-105"
                />
              </div>
            </div>

            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{authUser.fullName}</h2>
              <p className="text-gray-600 mt-1">Joined on {new Date(authUser.createdAt).toDateString()}</p>

              <div className="mt-8 flex justify-center space-x-8">
                <div className="text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-indigo-200 group-hover:shadow-md">
                    <Target className="h-10 w-10 text-indigo-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Goals</p>
                  <p className="font-bold text-xl text-gray-800">{goals.length}</p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-purple-200 group-hover:shadow-md">
                    <Wallet className="h-10 w-10 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Budgets</p>
                  <p className="font-bold text-xl text-gray-800">{budgets.length}</p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-green-200 group-hover:shadow-md">
                    <Award className="h-10 w-10 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Achievements</p>
                  <p className="font-bold text-xl text-gray-800">3</p>
                </div>

                <div className="text-center group relative">
                  <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-blue-200 group-hover:shadow-md">
                    <TrendingUp className="h-10 w-10 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Health Score</p>
                  <p className="font-bold text-xl text-gray-800">{calculateFinancialHealthScore()}</p>
                  <div className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm">
                    <span className="text-xs font-bold text-blue-600">{calculateFinancialHealthScore()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                className={`px-8 py-5 text-sm font-medium transition-all duration-300 ${
                  activeTab === "overview" 
                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 bg-opacity-50" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`px-8 py-5 text-sm font-medium transition-all duration-300 ${
                  activeTab === "budgets" 
                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 bg-opacity-50" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("budgets")}
              >
                Budgets
              </button>
              <button
                className={`px-8 py-5 text-sm font-medium transition-all duration-300 ${
                  activeTab === "goals" 
                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 bg-opacity-50" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("goals")}
              >
                Financial Goals
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Financial Overview</h3>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-2xl mb-8 border border-indigo-100 transition-all duration-300 hover:shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-medium text-indigo-800 text-lg">Financial Health Score</h4>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                        {calculateFinancialHealthScore()}
                      </span>
                      <span className="text-gray-400 ml-1">/100</span>
                    </div>
                  </div>

                  <div className="w-full bg-white rounded-full h-4 p-1 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${calculateFinancialHealthScore()}%` }}
                    ></div>
                  </div>

                  <p className="mt-5 text-sm text-gray-600 italic">
                    Your financial health score is based on your budget adherence, goal progress, and spending patterns.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                    <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-indigo-500" />
                      Quick Stats
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Total Budget</span>
                        <span className="font-semibold text-indigo-600">
                          ₹{budgets.reduce((acc, budget) => acc + budget.limit, 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Total Spent</span>
                        <span className="font-semibold text-indigo-600">
                          ₹{budgets.reduce((acc, budget) => acc + budget.spent, 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Goal Progress</span>
                        <div className="flex items-center">
                          <span className="font-semibold text-indigo-600 mr-1">
                            {Math.round(
                              goals.reduce((acc, goal) => acc + (goal.current / goal.target), 0) /
                              (goals.length || 1) * 100
                            )}%
                          </span>
                          <ArrowUp className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
                    <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-purple-500" />
                      Contact Information
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Email</span>
                        <span className="font-semibold text-purple-600 truncate max-w-xs">{authUser.email}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Account Type</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-bold">Premium</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Member Since</span>
                        <span className="font-semibold text-purple-600">{new Date(authUser.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Budgets Tab */}
            {activeTab === "budgets" && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800">Monthly Budgets</h3>
                  <button
                    onClick={() => setShowBudgetForm(!showBudgetForm)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm ${
                      showBudgetForm 
                        ? "bg-red-50 text-red-600 hover:bg-red-100" 
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {showBudgetForm ? (
                      <div className="flex items-center">
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Edit2 className="h-4 w-4 mr-1" />
                        Add Budget
                      </div>
                    )}
                  </button>
                </div>

                {showBudgetForm && (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl mb-8 border border-indigo-100 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-medium text-indigo-800 mb-4">New Budget</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                          placeholder="e.g. Food, Transportation"
                          value={newBudget.category}
                          onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Limit (₹)</label>
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                          placeholder="15000"
                          value={newBudget.limit}
                          onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={handleAddBudget}
                          className="w-full px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Budget
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {budgets.map((budget) => (
                    <div key={budget.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-md transition-all duration-300 hover:shadow-lg">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full bg-${budget.color}-500 mr-3`}></div>
                          <h4 className="font-medium text-gray-800 text-lg">{budget.category}</h4>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            <span className="text-lg font-bold text-indigo-600">₹{budget.spent.toLocaleString()}</span>
                            <span className="text-gray-500 mx-1">of</span>
                            <span className="text-lg font-bold text-gray-700">₹{budget.limit.toLocaleString()}</span>
                          </p>
                        </div>
                      </div>

                      <div className="w-full bg-gray-100 rounded-full h-3 mb-3 shadow-inner">
                        <div
                          className={`bg-${budget.color}-500 h-3 rounded-full transition-all duration-500 ease-out`}
                          style={{ width: `${Math.min((budget.spent / budget.limit) * 100, 100)}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 flex items-center">
                          <span className={`font-medium ${(budget.spent / budget.limit) > 0.8 ? "text-red-500" : "text-green-500"}`}>
                            {Math.round((budget.spent / budget.limit) * 100)}%
                          </span>
                          <span className="ml-1">used</span>
                        </p>
                        <p className="text-sm font-medium text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full">
                          ₹{(budget.limit - budget.spent).toLocaleString()} remaining
                        </p>
                      </div>
                    </div>
                  ))}

                  {budgets.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <Wallet className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 mb-3">You haven't set any budgets yet.</p>
                      <button
                        onClick={() => setShowBudgetForm(true)}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Create your first budget
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Goals Tab */}
            {activeTab === "goals" && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800">Financial Goals</h3>
                  <button
                    onClick={() => setShowGoalForm(!showGoalForm)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm ${
                      showGoalForm 
                        ? "bg-red-50 text-red-600 hover:bg-red-100" 
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {showGoalForm ? (
                      <div className="flex items-center">
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        Add Goal
                      </div>
                    )}
                  </button>
                </div>

                {showGoalForm && (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl mb-8 border border-indigo-100 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-medium text-indigo-800 mb-4">New Financial Goal</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                          placeholder="e.g. Emergency Fund, New Car"
                          value={newGoal.title}
                          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount (₹)</label>
                        <input
                          type="number"
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                          placeholder="100000"
                          value={newGoal.target}
                          onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                          value={newGoal.deadline}
                          onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={handleAddGoal}
                        className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Goal
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {goals.map((goal) => {
                    const progressPercent = Math.round((goal.current / goal.target) * 100);
                    const deadline = new Date(goal.deadline);
                    const daysLeft = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));
                    const color = goal.color || 'indigo';

                    return (
                      <div key={goal.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="flex items-center">
                              <Flag className="text-indigo-500 mr-2" size={20} />
                              <h4 className="font-medium text-gray-800 text-lg">{goal.title}</h4>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 flex items-center">
                              <span>Due by </span>
                              <span className="font-medium ml-1">{deadline.toLocaleDateString()}</span>
                            </p>
                          </div>
                          <div className="flex items-center text-sm font-bold px-3 py-1 rounded-full bg-indigo-50">
                            <span className={progressPercent >= 50 ? "text-green-600" : "text-orange-500"}>
                              {progressPercent}%
                            </span>
                            <span className="ml-1 text-gray-500 font-normal">complete</span>
                          </div>
                        </div>

                        <div className="w-full bg-gray-100 rounded-full h-3 mb-4 shadow-inner">
                          <div 
                            className="bg-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between mb-6">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-indigo-600">₹{goal.current.toLocaleString()}</span>
                            <span className="text-gray-400 mx-1">of</span>
                            <span className="font-semibold">₹{goal.target.toLocaleString()}</span>
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <span className="font-semibold text-indigo-600">{daysLeft}</span>
                            <span className="ml-1">days left</span>
                          </p>
                        </div>

                        <div className="flex space-x-3">
                          <input
                            type="number"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            placeholder="Update amount"
                            value={goalUpdates[goal.title] || ""}
                            onChange={(e) => setGoalUpdates((prev) => ({ ...prev, [goal.title]: e.target.value }))}
                          />
                          <button
                            className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all duration-300 flex items-center"
                            onClick={() => handleUpdateGoal(goal)}
                          >
                            <ArrowUp className="h-4 w-4 mr-1" />
                            Update
                          </button>
                        </div>
                      </div>
                    );
                  })}               </div>

                {goals.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't set any financial goals yet.</p>
                    <button
                      onClick={() => setShowGoalForm(true)}
                      className="mt-3 text-blue-600 hover:underline"
                    >
                      Create your first goal
                    </button>
                  </div>
                )}
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;