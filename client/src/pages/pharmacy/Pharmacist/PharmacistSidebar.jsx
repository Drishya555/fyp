import { useState } from "react";
import { User, Settings, Monitor, Bell } from "lucide-react";
import Orders from "./components/orders";
import Prescriptions from "./components/prescriptions";
import Products from "./components/products";
import PharmacistDasboard from "./components/pharmacistDasboard";
const menuItems = [
  { id: 1, name: "Dashboard", icon: <User size={20} />, component: <PharmacistDasboard/> },
  { id: 2, name: "Products", icon: <Settings size={20} />, component: <Products/> },
  { id: 3, name: "Orders", icon: <Monitor size={20} />, component: <Orders/>  },
  { id: 4, name: "Prescription", icon: <Bell size={20} />, component: <Prescriptions/> },
];

export default function ResponsiveSidebar() {
  const [active, setActive] = useState(1);

  return (
    <div className="h-screen min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-64 h-full min-h-screen bg-white shadow-md">
        <h2 className="p-4 text-gray-700 font-semibold">Pharmacist Dashboard</h2>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-300 ${
                active === item.id
                  ? "text-black border-r-4 border-blue-500 bg-gray-100"
                  : "text-gray-500 hover:text-black hover:bg-hoverblue"
              }`}
              onClick={() => setActive(item.id)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-0 md:p-0 overflow-auto">
        {menuItems.find((item) => item.id === active)?.component}
      </div>


      {/* Bottom Navigation for mobile */}
<div className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white shadow-md flex justify-around py-3 px-0">
  {menuItems.map((item) => (
    <button
      key={item.id}
      onClick={() => setActive(item.id)}
      className={`flex flex-col items-center ${
        active === item.id ? "text-blue-500" : "text-gray-500"
      }`}
    >
      {item.icon}
      <span className="text-xs mt-1">{item.name}</span>
    </button>
  ))}
</div>

    </div>
  );
}
