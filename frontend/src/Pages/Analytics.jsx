import React, { useState, useEffect } from "react";
import { UseTransactionStore } from "../Store/UseTransactionStore";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { Calendar, TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon, Activity, DollarSign, ArrowUpCircle } from "lucide-react";

const Analytics = () => {
  const { transactions, FetchTransactions } = UseTransactionStore();
  const [totalSpent, setTotalSpent] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weekdayData, setWeekdayData] = useState([]);
  const [timeOfDayData, setTimeOfDayData] = useState([]);
  const [largestTransaction, setLargestTransaction] = useState(null);
  const [activeChart, setActiveChart] = useState("overview");
  
  // Enhanced color palette for charts
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899', '#06B6D4', '#6366F1'];
  
  // Fetch transactions when component mounts
  useEffect(() => {
    FetchTransactions();
  }, [FetchTransactions]);

  // Process data when transactions change
  useEffect(() => {
    if (transactions && transactions.length > 0) {
      processTransactionData();
    }
  }, [transactions]);
  
  const processTransactionData = () => {
    // Calculate total spent
    const total = transactions.reduce((acc, txn) => acc + txn.amount, 0);
    setTotalSpent(total);
    
    // Process category data
    const categories = {};
    transactions.forEach(txn => {
      if (categories[txn.category]) {
        categories[txn.category] += txn.amount;
      } else {
        categories[txn.category] = txn.amount;
      }
    });
    
    const categoryDataArray = Object.keys(categories).map(category => ({
      name: category,
      value: categories[category],
      percentage: ((categories[category] / total) * 100).toFixed(1)
    }));
    
    setCategoryData(categoryDataArray.sort((a, b) => b.value - a.value));
    
    // Process monthly data
    const months = {};
    transactions.forEach(txn => {
      const date = new Date(txn.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const monthName = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      
      if (months[monthKey]) {
        months[monthKey].amount += txn.amount;
        months[monthKey].count += 1;
      } else {
        months[monthKey] = {
          name: monthName,
          amount: txn.amount,
          count: 1
        };
      }
    });
    
    const monthDataArray = Object.values(months).sort((a, b) => 
      new Date(`01 ${a.name}`) - new Date(`01 ${b.name}`)
    );
    
    setMonthlyData(monthDataArray);
    
    // Process weekday data
    const weekdays = {
      0: { name: "Sun", amount: 0, count: 0 },
      1: { name: "Mon", amount: 0, count: 0 },
      2: { name: "Tue", amount: 0, count: 0 },
      3: { name: "Wed", amount: 0, count: 0 },
      4: { name: "Thu", amount: 0, count: 0 },
      5: { name: "Fri", amount: 0, count: 0 },
      6: { name: "Sat", amount: 0, count: 0 }
    };
    
    transactions.forEach(txn => {
      const date = new Date(txn.date);
      const day = date.getDay();
      weekdays[day].amount += txn.amount;
      weekdays[day].count += 1;
    });
    
    setWeekdayData(Object.values(weekdays));
    
    // Process time of day data
    const timeOfDay = {
      morning: { name: "Morning (6-12)", amount: 0, count: 0 },
      afternoon: { name: "Afternoon (12-17)", amount: 0, count: 0 },
      evening: { name: "Evening (17-22)", amount: 0, count: 0 },
      night: { name: "Night (22-6)", amount: 0, count: 0 }
    };
    
    transactions.forEach(txn => {
      const date = new Date(txn.date);
      const hour = date.getHours();
      
      let period;
      if (hour >= 6 && hour < 12) period = "morning";
      else if (hour >= 12 && hour < 17) period = "afternoon";
      else if (hour >= 17 && hour < 22) period = "evening";
      else period = "night";
      
      timeOfDay[period].amount += txn.amount;
      timeOfDay[period].count += 1;
    });
    
    setTimeOfDayData(Object.values(timeOfDay));
    
    // Find largest transaction
    if (transactions.length > 0) {
      const largest = transactions.reduce((max, txn) => 
        txn.amount > max.amount ? txn : max, transactions[0]
      );
      setLargestTransaction(largest);
    }
  };
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-xl rounded-lg border border-indigo-100">
          <p className="font-semibold text-indigo-900">{label}</p>
          <p className="text-indigo-600 font-bold">₹{payload[0].value.toLocaleString()}</p>
          {payload[0].payload.count && (
            <p className="text-gray-500 text-sm">{payload[0].payload.count} transactions</p>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b pt-25 from-indigo-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="backdrop-blur-md bg-white/80 rounded-3xl shadow-2xl p-8 mb-8 text-center border border-indigo-100">
          <h1 className="text-4xl font-bold bg-gradient-to-r text-blue-800 bg-clip-text">
            Financial Analytics
          </h1>
          <p className="text-blue-800 mt-2">
            Visualize your Spending Patterns and Financial Trends
          </p>
        </div>
        
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-indigo-50">
            <div className="p-3 bg-indigo-100 rounded-full mr-4">
              <DollarSign className="text-indigo-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-gray-800">₹{totalSpent.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-blue-50">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Activity className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Transactions</p>
              <p className="text-2xl font-bold text-gray-800">{transactions.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-green-50">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <ArrowUpCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Largest Expense</p>
              <p className="text-2xl font-bold text-gray-800">
                {largestTransaction ? `₹${largestTransaction.amount.toLocaleString()}` : '-'}
              </p>
              <p className="text-xs text-gray-500">
                {largestTransaction ? largestTransaction.category : ''}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-purple-50">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Per Month</p>
              <p className="text-2xl font-bold text-gray-800">
                {monthlyData.length > 0 
                  ? `₹${Math.round(totalSpent / monthlyData.length).toLocaleString()}`
                  : '-'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Chart Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2">
          <button 
            className={`px-6 py-3 rounded-full flex items-center whitespace-nowrap shadow-md transition-all duration-300 ${
              activeChart === 'overview' 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
            onClick={() => setActiveChart('overview')}
          >
            <TrendingUp size={18} className="mr-2" />
            Spending Overview
          </button>
          <button 
            className={`px-6 py-3 rounded-full flex items-center whitespace-nowrap shadow-md transition-all duration-300 ${
              activeChart === 'categories' 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
            onClick={() => setActiveChart('categories')}
          >
            <PieChartIcon size={18} className="mr-2" />
            Spending by Category
          </button>
          <button 
            className={`px-6 py-3 rounded-full flex items-center whitespace-nowrap shadow-md transition-all duration-300 ${
              activeChart === 'time' 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
            onClick={() => setActiveChart('time')}
          >
            <Calendar size={18} className="mr-2" />
            Spending by Time
          </button>
          <button 
            className={`px-6 py-3 rounded-full flex items-center whitespace-nowrap shadow-md transition-all duration-300 ${
              activeChart === 'patterns' 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
            onClick={() => setActiveChart('patterns')}
          >
            <BarChartIcon size={18} className="mr-2" />
            Spending Patterns
          </button>
        </div>
        
        {/* Main Chart Area */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-indigo-50">
          {activeChart === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 bg-gradient-to-r from-indigo-600 to-blue-600  bg-clip-text">Monthly Spending Overview</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      name="Amount (₹)" 
                      stroke="#4F46E5" 
                      strokeWidth={3} 
                      dot={{ r: 6, fill: "#4F46E5", strokeWidth: 2, stroke: "#fff" }} 
                      activeDot={{ r: 8, fill: "#4F46E5", strokeWidth: 2, stroke: "#fff" }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          
          {activeChart === 'categories' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 bg-gradient-to-r from-indigo-600 to-blue-600  bg-clip-text">Spending by Category</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={90}
                        innerRadius={30}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="overflow-y-auto max-h-80 rounded-xl shadow-lg border border-indigo-50">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-indigo-700 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-indigo-700 uppercase tracking-wider">
                          % of Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {categoryData.map((category, index) => (
                        <tr key={index} className="hover:bg-indigo-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                              <div className="text-sm font-medium text-gray-900">{category.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-800 font-medium">
                            ₹{category.value.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {category.percentage}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeChart === 'time' && (
            <div>
              <h2 className="text-2xl font-semibold  mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">Spending by Time Period</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-50">
                  <h3 className="text-lg font-medium text-indigo-800 mb-4">Day of Week</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weekdayData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="amount" name="Amount (₹)" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-50">
                  <h3 className="text-lg font-medium text-indigo-800 mb-4">Time of Day</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeOfDayData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="amount" name="Amount (₹)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeChart === 'patterns' && (
            <div>
              <h2 className="text-2xl font-semibold  mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">Spending Patterns</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-50">
                  <h3 className="text-lg font-medium text-indigo-800 mb-4">Transaction Volume by Month</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" name="Transaction Count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-50">
                  <h3 className="text-lg font-medium text-indigo-800 mb-4">Average Transaction Size</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={monthlyData.map(month => ({
                          ...month,
                          average: month.count > 0 ? Math.round(month.amount / month.count) : 0
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                        <Bar dataKey="average" name="Avg Transaction (₹)" fill="#A78BFA" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Insights Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-indigo-50">
          <h2 className="text-2xl font-semibold  mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">Financial Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryData.length > 0 && (
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100 shadow-lg transform transition-all duration-300 hover:scale-105">
                <h3 className="font-medium text-indigo-900 text-lg mb-3">Top Spending Category</h3>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4 shadow-md">
                    <PieChartIcon className="text-indigo-600" size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{categoryData[0]?.name || '-'}</p>
                    <p className="text-sm text-gray-600">
                      ₹{categoryData[0]?.value.toLocaleString() || '-'} ({categoryData[0]?.percentage || '-'}% of total)
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-lg transform transition-all duration-300 hover:scale-105">
              <h3 className="font-medium text-indigo-900 text-lg mb-3">Spending Frequency</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4 shadow-md">
                  <Calendar className="text-blue-600" size={28} />
                </div>
                <div>
                  {monthlyData.length > 0 ? (
                    <>
                      <p className="text-2xl font-bold text-gray-800">
                        {Math.round(transactions.length / monthlyData.length)} transactions/month
                      </p>
                      <p className="text-sm text-gray-600">
                        {(transactions.length / (monthlyData.length * 30)).toFixed(1)} transactions/day
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-600">Not enough data</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;