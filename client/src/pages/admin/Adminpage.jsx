import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Search, Users, Calendar, ShoppingCart, 
  User
} from 'lucide-react';

const AdminDashboard = () => {



  // Mock data for dashboard
  const userData = [
    { name: 'Jan', users: 40 },
    { name: 'Feb', users: 55 },
    { name: 'Mar', users: 72 },
    { name: 'Apr', users: 89 },
    { name: 'May', users: 102 },
    { name: 'Jun', users: 125 },
  ];

  const usersByRole = [
    { name: 'Regular Users', value: 250 },
    { name: 'Doctors', value: 80 },
    { name: 'Pharmacists', value: 35 },
    { name: 'Hospital Admins', value: 15 },
  ];

  const appointmentData = [
    { name: 'Mon', appointments: 12 },
    { name: 'Tue', appointments: 19 },
    { name: 'Wed', appointments: 15 },
    { name: 'Thu', appointments: 22 },
    { name: 'Fri', appointments: 28 },
    { name: 'Sat', appointments: 10 },
    { name: 'Sun', appointments: 5 },
  ];

  const ordersData = [
    { name: 'Week 1', orders: 25 },
    { name: 'Week 2', orders: 38 },
    { name: 'Week 3', orders: 42 },
    { name: 'Week 4', orders: 30 },
  ];

  const medicineStockData = [
    { name: 'Antibiotics', stock: 120, sold: 45 },
    { name: 'Pain Relief', stock: 85, sold: 62 },
    { name: 'Vitamins', stock: 200, sold: 38 },
    { name: 'Antidepressants', stock: 75, sold: 27 },
    { name: 'Antacids', stock: 110, sold: 53 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 12400 },
    { name: 'Feb', revenue: 14800 },
    { name: 'Mar', revenue: 13900 },
    { name: 'Apr', revenue: 17200 },
    { name: 'May', revenue: 18900 },
    { name: 'Jun', revenue: 21500 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Users" 
          count="380" 
          icon={<Users size={24} />} 
          change="+12% this month" 
          color="bg-blue-500"
        />
        <StatsCard 
          title="Doctors" 
          count="80" 
          icon={<User size={24} />} 
          change="+5% this month" 
          color="bg-green-500"
        />
        <StatsCard 
          title="Appointments" 
          count="152" 
          icon={<Calendar size={24} />} 
          change="+18% this week" 
          color="bg-purple-500"
        />
        <StatsCard 
          title="Orders" 
          count="93" 
          icon={<ShoppingCart size={24} />} 
          change="+7% this week" 
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section - First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">User Growth</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={userData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#0088FE" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Roles Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">User Roles Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usersByRole}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {usersByRole.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Section - Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Weekly Appointments</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appointmentData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="appointments" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Monthly Orders</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={ordersData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="orders" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Section - Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Medicine Stock vs. Sold */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Medicine Stock vs. Sold</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={medicineStockData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" stackId="a" fill="#8884d8" />
                <Bar dataKey="sold" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Monthly Revenue</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, count, icon, change, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{count}</h3>
          <p className="text-xs text-green-500 mt-2">{change}</p>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;