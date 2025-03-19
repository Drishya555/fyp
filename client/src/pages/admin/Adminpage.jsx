
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// Demo Data
const transactionData = [
  {
    product: "Coral Medical",
    category: "Website",
    price: 20006,
    date: "Dec 20 2024",
    status: "Complete",
  },
  {
    product: "Rapple Tech",
    category: "Mobile App",
    price: 51706,
    date: "Dec 20 2024",
    status: "Packing",
  },
  {
    product: "Lingomastery",
    category: "Webapp Design",
    price: 50382,
    date: "Jan 01 2024",
    status: "Shipping",
  },
  {
    product: "Georgia Caring",
    category: "Logo Design",
    price: 50082,
    date: "Jan 01 2024",
    status: "Cancelled",
  },
  {
    product: "Rick Palekmesky",
    category: "Branding",
    price: 51806,
    date: "Jan 02 2024",
    status: "Shipping",
  },
  {
    product: "Flowwise Ontario",
    category: "Responsive",
    price: 56411,
    date: "Jan 04 2024",
    status: "Complete",
  },
];

const platformData = [
  { name: "Instagram", value: 40, color: "#f87171" },
  { name: "Facebook", value: 30, color: "#3b82f6" },
  { name: "TikTok", value: 20, color: "#86efac" },
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-normal text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-blue-600">Pradaci</h1>
        </div>
        <nav className="space-y-4">
          {[
            "Overview",
            "Request",
            "Projects",
            "History",
            "Tools",
            "Template AI",
            "Library Chart",
            "Document",
            "Other",
            "Help",
            "Plugin",
            "Integration",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className={`block text-gray-600 hover:text-blue-600 ${
                item === "Overview" ? "text-blue-600 font-medium" : ""
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="mt-8">
          <div className="flex items-center space-x-3">
            <img
              src="https://media.gettyimages.com/id/1591832777/video/doctor-woman-and-checklist-for-healthcare-advice-consulting-and-medical-support-test-and.jpg?s=640x640&k=20&c=cf3M9rNJ2343wiXxvfc-qnO2wsUdGg4VlXVJDeCnOhg="
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white shadow-lg object-cover"
            />
            <div>
              <p className="text-gray-800 font-medium">Turja Sen Das</p>
              <p className="text-gray-600 text-sm">turja01@gmail.com</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Upgrade Plan
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-medium text-gray-800">
              Good Morning, Turja! 👋
            </h1>
            <p className="text-gray-600">Welcome back to Pradaci</p>
          </div>
          <div className="flex space-x-3">
            <button className="p-2 bg-gray-200 rounded-full">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Export Data
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800">
            Dashboard <span className="text-gray-600">48 Prompt &gt;</span>
          </h2>
          <p className="text-gray-600">
            Track your sales and achieve your financial goals
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <p className="text-gray-600">Revenue</p>
            <h3 className="text-2xl font-medium text-gray-800">$597,905.04</h3>
            <p className="text-green-600">+12% vs prev. month</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <p className="text-gray-600">Total Sales</p>
            <h3 className="text-2xl font-medium text-gray-800">$376,517.27</h3>
            <p className="text-green-600">+24% vs prev. month</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <p className="text-gray-600">Website</p>
            <h3 className="text-2xl font-medium text-gray-800">43.9%</h3>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "43.9%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <p className="text-gray-600">E-Commerce</p>
            <h3 className="text-2xl font-medium text-gray-800">90.3%</h3>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-400 h-2.5 rounded-full"
                  style={{ width: "90.3%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Recent Transaction
              </h3>
              <select className="border rounded-lg p-2 text-gray-600">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-600">
                    <th className="py-2">Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((transaction, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2">{transaction.product}</td>
                      <td>{transaction.category}</td>
                      <td>${transaction.price.toLocaleString()}</td>
                      <td>{transaction.date}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            transaction.status === "Complete"
                              ? "bg-green-100 text-green-600"
                              : transaction.status === "Packing"
                              ? "bg-yellow-100 text-yellow-600"
                              : transaction.status === "Shipping"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-600">Page 1 of 100</p>
              <div className="flex space-x-2">
                {[1, 2, 3, "...", 8, 9].map((page, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded-lg ${
                      page === 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Value */}
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Platform Value
              </h3>
              <select className="border rounded-lg p-2 text-gray-600">
                <option>Yearly</option>
                <option>Monthly</option>
                <option>Daily</option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center mt-4 gap-4">
                  {platformData.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span
                        className="w-4 h-4 block rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></span>
                      <span className="text-gray-700 text-sm">
                        {entry.name} ({entry.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mt-4">
              <div>
                <p className="text-gray-600">Instagram</p>
                <p className="text-lg font-medium text-gray-800">$574,279</p>
              </div>
              <div>
                <p className="text-gray-600">Facebook</p>
                <p className="text-lg font-medium text-gray-800">$308,047</p>
              </div>
              <div>
                <p className="text-gray-600">TikTok</p>
                <p className="text-lg font-medium text-gray-800">$647,069</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-6 bg-white p-6 rounded-lg border border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              Isn&apos;t the dashboard result suitable?
            </h3>
            <p className="text-gray-600">
              Track your sales and achieve your financial goals
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create New Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;