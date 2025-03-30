import React, { useState, useEffect } from "react";
import { UseTransactionStore } from "../Store/UseTransactionStore";
import { axiosInstance } from "../Lib/Axios.js";
import { MessageSquare, Send, ChevronRight, TrendingUp, Clock, HelpCircle, X, Sparkles, BarChart3, CreditCard, DollarSign } from "lucide-react";

const Assistant = () => {
  const { transactions } = UseTransactionStore();
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "How much did I spend on groceries last month?",
    "What's my biggest expense category?",
    "Show me my spending trends over time",
    "What day of the week do I spend the most?",
    "Compare my spending this month to last month"
  ]);

  // Handle AI chatbot query
  const handleChatSubmit = async () => {
    if (!query) return;
    setLoading(true);
    
    // Add user message to chat history
    const userMessage = {
      type: "user",
      message: query,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    
    try {
      const response = await axiosInstance.post("http://192.168.172.158:5001/Api/Transaction/Query", {
        query,
        transactions,
      });
      
      // Add AI response to chat history
      const aiMessage = {
        type: "assistant",
        message: response.data.response,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
      const errorMessage = {
        type: "assistant",
        message: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      
      setChatHistory(prev => [...prev, errorMessage]);
    }
    
    setQuery("");
    setLoading(false);
  };
  
  const handleSuggestedQuestion = (question) => {
    setQuery(question);
    handleChatSubmit();
  };
  
  const clearChat = () => {
    setChatHistory([]);
  };

  // Calculate date for message grouping
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen pt-25 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="backdrop-blur-md bg-white/80 rounded-3xl shadow-xl p-8 mb-8 text-center border border-indigo-100">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full p-3 mr-3">
              <DollarSign className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Financial Assistant
            </h1>
          </div>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Your personal AI companion for financial insights and smart money management
          </p>
        </div>
        
        {/* Main Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with suggested questions */}
          <div className="backdrop-blur-md bg-white/90 rounded-3xl shadow-lg p-6 lg:col-span-1 h-fit border border-indigo-100 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 rounded-full p-2 mr-3">
                <HelpCircle className="text-indigo-600" size={20} />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Ask Me About</h2>
            </div>
            
            <div className="space-y-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="w-full text-left p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <span className="text-gray-700 text-sm font-medium">{question}</span>
                  <ChevronRight className="text-indigo-400 group-hover:text-indigo-600 transition-colors transform group-hover:translate-x-1 duration-300" size={16} />
                </button>
              ))}
            </div>
            
            {chatHistory.length > 0 && (
              <button
                onClick={clearChat}
                className="w-full mt-6 p-3 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all duration-300 text-sm flex items-center justify-center hover:border-red-200 hover:text-red-500"
              >
                <X size={16} className="mr-2" />
                Clear conversation
              </button>
            )}
          </div>
          
          {/* Chat area */}
          <div className="backdrop-blur-md bg-white/90 rounded-3xl shadow-lg lg:col-span-3 flex flex-col h-[650px] border border-indigo-100 transition-all duration-300 hover:shadow-xl">
            {/* Date display */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="mr-2" size={18} />
                  <h3 className="font-medium">Financial Insights</h3>
                </div>
                <span className="text-xs opacity-80">{formatDate()}</span>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-indigo-50/30 to-transparent">
              {chatHistory.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-8 rounded-full mb-6">
                    <MessageSquare className="text-indigo-500" size={48} />
                  </div>
                  <h3 className="text-2xl font-medium text-gray-800 mb-3">Your Personal Finance Advisor</h3>
                  <p className="max-w-md text-gray-600">
                    Ask me anything about your spending habits, transaction history, or financial trends. I'm here to help you make smarter financial decisions.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-md">
                    <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                      <CreditCard className="mx-auto text-indigo-500 mb-2" size={24} />
                      <span className="text-xs text-gray-600">Spending</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                      <BarChart3 className="mx-auto text-indigo-500 mb-2" size={24} />
                      <span className="text-xs text-gray-600">Analysis</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm text-center">
                      <TrendingUp className="mx-auto text-indigo-500 mb-2" size={24} />
                      <span className="text-xs text-gray-600">Trends</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div 
                        className={`max-w-[80%] rounded-2xl p-5 shadow-sm ${
                          chat.type === 'user' 
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                            : chat.isError 
                              ? 'bg-red-50 text-red-800 border border-red-100' 
                              : 'bg-white text-gray-800 border border-indigo-50'
                        }`}
                      >
                        <p className={chat.type === 'user' ? 'text-white' : 'text-gray-700'}>{chat.message}</p>
                        <div className="flex justify-between items-center mt-3">
                          <p className={`text-xs ${chat.type === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>{chat.timestamp}</p>
                          {chat.type === 'assistant' && !chat.isError && (
                            <Sparkles className="text-indigo-400" size={12} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Input area */}
            <div className="border-t border-indigo-100 p-5 bg-white rounded-b-3xl">
              <div className="flex items-center bg-indigo-50 rounded-xl overflow-hidden shadow-inner transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-300">
                <input
                  type="text"
                  className="flex-1 p-4 bg-transparent border-none text-gray-700 focus:outline-none placeholder-indigo-300"
                  placeholder="Ask about your finances..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                />
                <button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 m-1 rounded-lg"
                  onClick={handleChatSubmit}
                  disabled={loading || !query}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Tips Section */}
        <div className="backdrop-blur-md bg-white/90 rounded-3xl shadow-lg p-8 mt-8 border border-indigo-100 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-2 mr-3">
              <Sparkles className="text-indigo-600" size={20} />
            </div>
            Tips for Better Financial Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-white rounded-full p-3 mr-3 shadow-sm">
                  <TrendingUp className="text-indigo-600" size={20} />
                </div>
                <h3 className="font-medium text-gray-800">Be Specific</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ask specific questions like "How much did I spend on food last week?" for more accurate insights.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-white rounded-full p-3 mr-3 shadow-sm">
                  <Clock className="text-indigo-600" size={20} />
                </div>
                <h3 className="font-medium text-gray-800">Time Periods</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Include time frames in your questions: "this month," "last week," or specific date ranges.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-white rounded-full p-3 mr-3 shadow-sm">
                  <MessageSquare className="text-indigo-600" size={20} />
                </div>
                <h3 className="font-medium text-gray-800">Follow-Ups</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ask follow-up questions to drill down into insights and get more detailed analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;