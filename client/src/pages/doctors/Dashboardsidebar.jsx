import { useState } from "react";
import {LayoutDashboard, CalendarClock, FilePlus, BrainCircuit, ClipboardList } from "lucide-react";
import DocPage from "./components/personalDashboard";
import DocAppointments from "./components/docAppointments";
import ImgDetection from "./components/imageDetection";
import AddMedicalData from "./components/AddMedicalRecord";
import AddPrescription from "./components/AddPrescription";
import AddNote from "./components/AddNote";
import AddSchedule from "./AddSchedule.jsx";
import ViewPrescriptions from "./components/ViewPrescriptions.jsx";
const menuItems = [
  { id: 1, name: "Dashboard", icon: <LayoutDashboard size={20} />, component: <DocPage /> },
  { id: 2, name: "Appointments", icon: <CalendarClock size={20} />, component: <DocAppointments /> },
  { id: 3, name: "Add Medical Record", icon: <FilePlus size={20} />, component: <AddMedicalData /> },
  { id: 4, name: "Ai Disease Detection", icon: <BrainCircuit size={20} />, component: <ImgDetection /> },
  { id: 5, name: "Prescription", icon: <ClipboardList size={20} />, component: <AddPrescription /> },
  { id: 6, name: "Change Schedule", icon: <ClipboardList size={20} />, component: <AddSchedule /> },
  { id: 7, name: "Appointment Note", icon: <ClipboardList size={20} />, component: <AddNote /> },
  { id: 8, name: "View Prescriptions", icon: <ClipboardList size={20} />, component: <ViewPrescriptions /> },

];


export default function ResponsiveSidebar() {
  const [active, setActive] = useState(1);

  return (
    <div className="h-screen min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-64 h-full min-h-screen bg-white shadow-md">
        <h2 className="p-4 text-gray-700 font-semibold">Profile Page</h2>
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
