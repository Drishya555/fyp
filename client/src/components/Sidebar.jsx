import { useState, useEffect } from "react";
import { RxDashboard } from "react-icons/rx";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { AiOutlineHistory } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate(); // Using useNavigate for navigation

  const handleClick = (link, route) => {
    setActiveLink(link);
    if (route) {
      navigate(route); // Redirect to the specified route
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768); // Mobile: ≤768px
      setIsTablet(width > 768 && width <= 1025); // Tablet: 768px - 1025px
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Sidebar for Tablet & Desktop */}
      {!isMobile && (
        <aside
          className={`flex flex-col justify-between ${
            isTablet ? (isExpanded ? "w-64" : "w-16") : "w-64"
          } h-[90vh] px-5 py-8 overflow-y-auto bg-white shadow-lg transition-all duration-300`}
          onMouseEnter={() => isTablet && setIsExpanded(true)}
          onMouseLeave={() => isTablet && setIsExpanded(false)}
        >
          {/* Top Section */}
          <div>
            <nav className="-mx-3 space-y-3">
              <a
                onClick={() => handleClick("dashboard", "/appointment-dashboard")}
                className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${
                  activeLink === "dashboard" ? "bg-gray-200" : ""
                }`}
              >
                <RxDashboard className="w-[25px] h-[25px]" />
                {(!isTablet || isExpanded) && (
                  <span className="ml-2 text-sm font-medium">Dashboard</span>
                )}
              </a>

              <a
                onClick={() => handleClick("book", "/book-appointment")}
                className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${
                  activeLink === "book" ? "bg-gray-200" : ""
                }`}
              >
                <IoCalendarNumberOutline className="w-[25px] h-[25px]" />
                {(!isTablet || isExpanded) && (
                  <span className="ml-2 text-sm font-medium">Book An Appointment</span>
                )}
              </a>

              <a
                onClick={() => handleClick("doctors", "/recommended-doctors")}
                className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${
                  activeLink === "doctors" ? "bg-gray-200" : ""
                }`}
              >
                <GoTasklist className="w-[25px] h-[25px]" />
                {(!isTablet || isExpanded) && (
                  <span className="ml-2 text-sm font-medium">Recommended Doctors</span>
                )}
              </a>

              <a
                onClick={() => handleClick("history", "/appointment-history")}
                className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${
                  activeLink === "history" ? "bg-gray-200" : ""
                }`}
              >
                <AiOutlineHistory className="w-[25px] h-[25px]" />
                {(!isTablet || isExpanded) && (
                  <span className="ml-2 text-sm font-medium">Appointment History</span>
                )}
              </a>
            </nav>
          </div>

          {/* Middle Section - Recent Appointments (Hidden on Tablet, visible on Desktop and Mobile) */}
          {!isTablet && (
            <div className="hidden lg:block">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-800">
                  Recent Appointments
                </h2>
                <button className="p-0.5 hover:bg-gray-100 duration-200 transition-colors text-gray-500 border rounded-lg">
                  <HiPlus className="w-4 h-4" />
                </button>
              </div>

              <nav className="mt-4 -mx-3 space-y-3">
                {["pink", "blue", "yellow"].map(
                  (color, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      <div className="flex items-center gap-x-2">
                        <span
                          className={`w-2 h-2 bg-${color}-500 rounded-full`}
                        ></span>
                        <span>Dr. Deepali Adhikari</span>
                      </div>
                    </button>
                  )
                )}
              </nav>
            </div>
          )}

          {/* Bottom Section */}
          <div>
            <a href="#" className="flex items-center px-4 -mx-2">
              <img
                className="object-cover mx-2 rounded-full h-[50px] w-[50px]"
                src="https://i.pinimg.com/736x/d9/af/98/d9af98742dfb7d43b4304bc59772d67b.jpg"
                alt="avatar"
              />
              {(!isTablet || isExpanded) && (
                <span className="ml-2 font-medium text-gray-600">
                  Carlos Sainz
                </span>
              )}
            </a>
          </div>
        </aside>
      )}

      {/* Bottom Navigation for Mobile */}
      {isMobile && (
        <nav className="fixed bottom-6 left-0 right-0 bg-white border-none shadow-sm rounded-sm flex justify-around mx-auto w-[90%] sm:w-[80%] py-2 border-t transform transition-all duration-300 ease-in-out hover:translate-y-[-4px] hover:bg-gray-50">
          <a
            href="#"
            className={`flex flex-col items-center text-gray-600 p-2 rounded-xl transition-all duration-300 transform ${
              activeLink === "dashboard" ? "text-purple-500" : "hover:text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleClick("dashboard", "/appointment-dashboard")}
          >
            <RxDashboard className="w-6 h-6" />
            <span className="text-xs">Dashboard</span>
          </a>

          <a
            href="#"
            className={`flex flex-col items-center text-gray-600 p-2 rounded-xl transition-all duration-300 transform ${
              activeLink === "book" ? "text-purple-500" : "hover:text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleClick("book", "/book-appointment")}
          >
            <IoCalendarNumberOutline className="w-6 h-6" />
            <span className="text-xs">Book</span>
          </a>

          <a
            href="#"
            className={`flex flex-col items-center text-gray-600 p-2 rounded-xl transition-all duration-300 transform ${
              activeLink === "doctors" ? "text-purple-500" : "hover:text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleClick("doctors", "/recommended-doctors")}
          >
            <GoTasklist className="w-6 h-6" />
            <span className="text-xs">Doctors</span>
          </a>

          <a
            href="#"
            className={`flex flex-col items-center text-gray-600 p-2 rounded-xl transition-all duration-300 transform ${
              activeLink === "history" ? "text-purple-500" : "hover:text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleClick("history", "/appointment-history")}
          >
            <AiOutlineHistory className="w-6 h-6" />
            <span className="text-xs">History</span>
          </a>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
