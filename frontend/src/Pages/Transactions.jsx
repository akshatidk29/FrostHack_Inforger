import React, { useState, useEffect } from "react";
import { UseTransactionStore } from "../Store/UseTransactionStore";
import { axiosInstance } from "../Lib/Axios.js";
import { CreditCard, Plus, X, Filter, Calendar, Clock, Search, ChevronDown, ArrowDown, ArrowUp, Sparkles, DollarSign } from "lucide-react";

const Transactions = () => {
  const { transactions, FetchTransactions, AddTransaction, isLoading } = UseTransactionStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    category: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    description: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateCard, setAnimateCard] = useState(-1);
  
  // Fetch transactions on mount
  useEffect(() => {
    FetchTransactions();
  }, [FetchTransactions]);
  
  // Get unique categories with colors
  const categoryColors = {
    Food: "bg-amber-100 text-amber-600",
    Transport: "bg-cyan-100 text-cyan-600",
    Shopping: "bg-purple-100 text-purple-600",
    Bills: "bg-rose-100 text-rose-600",
    Entertainment: "bg-indigo-100 text-indigo-600",
    Health: "bg-emerald-100 text-emerald-600",
    Default: "bg-blue-100 text-blue-600"
  };
  
  const getCategoryColor = (category) => {
    return categoryColors[category] || categoryColors.Default;
  };
  
  // Get unique categories
  const categories = ["All", ...new Set(transactions.map(txn => txn.category))];
  
  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(txn => {
      const category = txn.category ? txn.category.toLowerCase() : "";
      const description = txn.description ? txn.description.toLowerCase() : "";
      const matchesSearch =
        category.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || txn.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === "oldest") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOrder === "highest") {
        return b.amount - a.amount;
      } else {
        return a.amount - b.amount;
      }
    });
  
  // Handle new transaction submission
  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!newTransaction.category || !newTransaction.amount) return;

    setIsSubmitting(true);
    try {
      await AddTransaction({
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        date: newTransaction.date,
        description: newTransaction.description
      });

      // Reset form and close modal
      setNewTransaction({
        category: "",
        amount: "",
        date: new Date().toISOString().split('T')[0],
        description: ""
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({ ...prev, [name]: value }));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="min-h-screen pt-25 bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-lg p-8 mb-8 border border-white/50 transition-all duration-500 hover:shadow-xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
              <Sparkles className="mr-3 text-blue-600" size={24} />
              Transactions
            </h1>
            <p className="text-gray-600 text-lg">View, filter, and manage your financial activity</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full hover:translate-x-0 transition-transform duration-300"></span>
            <span className="relative flex items-center justify-center">
              <Plus size={20} className="mr-2" />
              Add Transaction
            </span>
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div className="relative min-w-[180px]">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <select
              className="w-full pl-12 pr-10 py-3 appearance-none bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          
          {/* Sort Order */}
          <div className="relative min-w-[180px]">
            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <select
              className="w-full pl-12 pr-10 py-3 appearance-none bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>
      
      {/* Transaction List */}
      <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <DollarSign className="mr-2 text-blue-600" size={20} />
          Transaction History
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-blue-600 border-r-blue-300 border-b-blue-200 border-l-blue-400 animate-spin"></div>
              <div className="absolute top-2 left-2 right-2 bottom-2 rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-indigo-200 border-l-transparent animate-spin animation-delay-150"></div>
            </div>
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {filteredTransactions.map((txn, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-5 hover:bg-blue-50 rounded-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-md ${animateCard === index ? 'animate-pulse' : ''}`}
                onMouseEnter={() => setAnimateCard(index)}
                onMouseLeave={() => setAnimateCard(-1)}
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl ${getCategoryColor(txn.category)}`}>
                    <CreditCard size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800 text-lg">{txn.category}</p>
                    <p className="text-sm text-gray-500">{formatDate(txn.date)}</p>
                    {txn.description && (
                      <p className="text-sm text-gray-600 mt-1 max-w-md">{txn.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-bold text-gray-900">₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  {sortOrder === "newest" || sortOrder === "oldest" ? (
                    <span className="text-xs text-gray-500 mt-1">{index === 0 ? 'Most recent' : ''}</span>
                  ) : (
                    <span className="text-xs text-gray-500 mt-1">
                      {sortOrder === "highest" && index === 0 ? (
                        <span className="flex items-center text-green-600">
                          <ArrowUp size={12} className="mr-1" /> Highest
                        </span>
                      ) : sortOrder === "lowest" && index === 0 ? (
                        <span className="flex items-center text-blue-600">
                          <ArrowDown size={12} className="mr-1" /> Lowest
                        </span>
                      ) : ""}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <CreditCard size={32} className="text-blue-500" />
            </div>
            <p className="text-gray-500 mb-3 text-lg">No transactions found.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-blue-600 font-medium hover:underline flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Add your first transaction
            </button>
          </div>
        )}
      </div>
      
      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Add New Transaction</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleAddTransaction}>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. Food, Transport, Shopping"
                    className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    value={newTransaction.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input
                      type="number"
                      name="amount"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full pl-8 p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                      value={newTransaction.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      name="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                      value={newTransaction.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    name="description"
                    placeholder="Add notes about this transaction"
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 resize-none"
                    value={newTransaction.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative group"
                disabled={isSubmitting}
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                <span className="relative">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus size={18} className="mr-2 inline-block" />
                      Add Transaction
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Add global styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5d1e5;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a4b4d1;
        }
        
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
        
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};

export default Transactions;