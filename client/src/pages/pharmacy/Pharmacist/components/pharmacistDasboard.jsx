/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { host } from "../../../../host.js";
import { 
  LineChart, BarChart, PieChart, Pie, Line, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from "recharts";
import { 
  FiHome, FiPackage, FiTrendingUp, FiClock, 
  FiDollarSign, FiShoppingBag, FiBox, 
  FiCalendar, FiArrowUp, FiArrowDown, FiRefreshCw
} from "react-icons/fi";
import { motion } from "framer-motion";
import AuthStore from "../../../../hooks/authStore.js";

const PharmacistDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week"); // week, month, year
  const [refreshTrigger, setRefreshTrigger] = useState(0);
      const token = AuthStore.getToken();

  useEffect(() => {
    fetchOrders();
  }, [refreshTrigger]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${host}/api/orders`,{
        headers: {
          Authorization: token ? `Bearer ${token}` : '',  
        },
      });
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Calculate summary metrics
  const dashboardMetrics = useMemo(() => {
    if (!orders.length) return {
      totalOrders: 0,
      totalRevenue: 0,
      avgOrderValue: 0,
      pendingOrders: 0,
      deliveredOrders: 0
    };

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const avgOrderValue = totalRevenue / totalOrders;
    const pendingOrders = orders.filter(order => order.deliveryStatus === "pending").length;
    const deliveredOrders = orders.filter(order => order.deliveryStatus === "delivered").length;

    return {
      totalOrders,
      totalRevenue,
      avgOrderValue,
      pendingOrders,
      deliveredOrders
    };
  }, [orders]);

  // Filter orders based on time range
  const getFilteredOrders = () => {
    const now = new Date();
    let cutoffDate;

    switch (timeRange) {
      case "week":
        cutoffDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "month":
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "year":
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        cutoffDate = new Date(now.setDate(now.getDate() - 7));
    }

    return orders.filter(order => new Date(order.createdAt) >= cutoffDate);
  };

  // Process data for charts
  const chartData = useMemo(() => {
    const filteredOrders = getFilteredOrders();
    
    // Daily revenue data
    const revenueByDay = {};
    const statusCountByDay = {};
    const paymentMethodCounts = {};
    const productPopularity = {};
  
    filteredOrders.forEach(order => {
      // For revenue by day
      const date = new Date(order.createdAt).toLocaleDateString();
      revenueByDay[date] = (revenueByDay[date] || 0) + order.totalAmount;
      
      // For status count by day
      if (!statusCountByDay[date]) {
        statusCountByDay[date] = {
          pending: 0,
          shipped: 0,
          delivered: 0,
          cancelled: 0
        };
      }
      statusCountByDay[date][order.deliveryStatus]++;
      
      // For payment methods
      paymentMethodCounts[order.paymentMethod] = (paymentMethodCounts[order.paymentMethod] || 0) + 1;
      
      // For product popularity
      order.items.forEach(item => {
        const productId = typeof item.product === 'string' 
          ? item.product.substring(0, 6)
          : (item.product?.name || 'unknown');
        
        productPopularity[productId] = (productPopularity[productId] || 0) + item.quantity;
      });
    });
    
    // Format data for charts
    const revenueChartData = Object.keys(revenueByDay).map(date => ({
      date,
      revenue: revenueByDay[date]
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const statusChartData = Object.keys(statusCountByDay).map(date => ({
      date,
      ...statusCountByDay[date]
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const paymentMethodChartData = Object.keys(paymentMethodCounts).map(method => ({
      name: method,
      value: paymentMethodCounts[method]
    }));
    
    const productPopularityData = Object.keys(productPopularity)
      .map(productId => ({
        name: `Product ${productId}`,
        value: productPopularity[productId]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    
    return {
      revenueChartData,
      statusChartData,
      paymentMethodChartData,
      productPopularityData
    };
  }, [orders, timeRange]);

  // Colors for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];
  

  const StatCard = ({ icon: Icon, title, value, trend, trendValue, bgColor }) => (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl shadow-sm p-6 ${bgColor || 'bg-white'}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-gray-500 text-sm font-medium mb-1">{title}</span>
          <span className="text-2xl font-bold text-gray-800">{value}</span>
          {trend && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <FiArrowUp className="text-green-500 mr-1" />
              ) : (
                <FiArrowDown className="text-red-500 mr-1" />
              )}
              <span className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trendValue}% vs. previous period
              </span>
            </div>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center">
          <Icon className="text-indigo-600 text-xl" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FiHome className="text-indigo-600 text-2xl" />
            <h1 className="text-2xl font-bold text-gray-800">Pharmacy Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-lg shadow-sm p-1 flex">
              <button 
                onClick={() => setTimeRange("week")}
                className={`px-4 py-2 text-sm rounded-md ${timeRange === "week" ? "bg-indigo-600 text-white" : "text-gray-600"}`}
              >
                Week
              </button>
              <button 
                onClick={() => setTimeRange("month")}
                className={`px-4 py-2 text-sm rounded-md ${timeRange === "month" ? "bg-indigo-600 text-white" : "text-gray-600"}`}
              >
                Month
              </button>
              <button 
                onClick={() => setTimeRange("year")}
                className={`px-4 py-2 text-sm rounded-md ${timeRange === "year" ? "bg-indigo-600 text-white" : "text-gray-600"}`}
              >
                Year
              </button>
            </div>
            
            <button 
              onClick={refreshData}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <FiRefreshCw />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <StatCard 
                icon={FiShoppingBag} 
                title="Total Orders" 
                value={dashboardMetrics.totalOrders} 
                trend="up" 
                trendValue="12.5" 
              />
              <StatCard 
                icon={FiDollarSign} 
                title="Total Revenue" 
                value={`₹${dashboardMetrics.totalRevenue.toLocaleString()}`} 
                trend="up" 
                trendValue="8.3" 
              />
              <StatCard 
                icon={FiTrendingUp} 
                title="Avg. Order Value" 
                value={`₹${Math.round(dashboardMetrics.avgOrderValue).toLocaleString()}`} 
                trend="down" 
                trendValue="3.7" 
              />
              <StatCard 
                icon={FiClock} 
                title="Pending Orders" 
                value={dashboardMetrics.pendingOrders} 
                trend="up" 
                trendValue="5.2" 
              />
              <StatCard 
                icon={FiBox} 
                title="Delivered Orders" 
                value={dashboardMetrics.deliveredOrders} 
                trend="up" 
                trendValue="15.8" 
              />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Trend */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-gray-800">Revenue Trend</h2>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <FiCalendar size={14} />
                    <span>Last {timeRange}</span>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData.revenueChartData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} 
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Order Status */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-gray-800">Order Status Breakdown</h2>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <FiPackage size={14} />
                    <span>By status</span>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData.statusChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Legend />
                      <Bar dataKey="pending" name="Pending" fill="#f59e0b" />
                      <Bar dataKey="shipped" name="Shipped" fill="#3b82f6" />
                      <Bar dataKey="delivered" name="Delivered" fill="#10b981" />
                      <Bar dataKey="cancelled" name="Cancelled" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Payment Methods */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-gray-800">Payment Methods</h2>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <FiDollarSign size={14} />
                    <span>Distribution</span>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData.paymentMethodChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {chartData.paymentMethodChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        formatter={(value, name, props) => [`${value} orders`, props.payload.name]} 
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-gray-800">Top Products</h2>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <FiPackage size={14} />
                    <span>By quantity</span>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData.productPopularityData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                      <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={100} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        formatter={(value) => [`${value} units`, 'Quantity']} 
                      />
                      <Bar dataKey="value" fill="#6366f1">
                        {chartData.productPopularityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-800">Recent Orders</h2>
                <a href="/order-management" className="text-indigo-600 text-sm font-medium hover:underline">
                  View All Orders
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order._id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {typeof order.user === 'string' 
                            ? order.user.substring(0, 8) + "..." 
                            : (order.user?.name || "Unknown")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.items.length} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ₹{order.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 
                              order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${order.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-800' : 
                              order.deliveryStatus === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                              order.deliveryStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {order.deliveryStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PharmacistDashboard;