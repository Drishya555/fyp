// import DocSidebar from "../components/DocSidebar";
import { useState, useEffect } from "react";
import { IoCalendarOutline, IoFilter } from "react-icons/io5";
import { PiPersonSimpleWalk } from "react-icons/pi";
import { MdPeopleOutline, MdOutlineSort } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { FaRegUser, FaSearch } from "react-icons/fa";
import axios from 'axios';
import BookAppointmentTesting from "./BookAppointmentTesting.jsx";
import { host } from '../host.js';

// Import images
import a from '../assets/gm.png';
import b from '../assets/cardio.png';
import c from '../assets/bone.png';
import d from '../assets/tooth.png';
import e from '../assets/neuro.png';
import f from '../assets/brain.png';

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState("About");
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    experience: "",
    minPrice: "",
    maxPrice: "",
    rating: ""
  });
  const [sortOption, setSortOption] = useState("recommended");

  const categories = [
    { name: "General", img: a },
    { name: "Cardiologist", img: b },
    { name: "Orthopedic", img: c },
    { name: "Dentist", img: d },
    { name: "Neurologist", img: e },
    { name: "Psychiatrists", img: f },
  ];

  const tabs = ["About", "Schedule", "Ratings"];
  const tabContent = {
    About: (
      <div>
        <p className="text-gray-600 mb-6">{selectedDoctor?.about || "No information available."}</p>
        <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
          Book Appointment
        </button>
      </div>
    ),
    Schedule: (
      <div>
        <h1 className="text-lg font-medium mb-4">This Week&apos;s Schedule</h1>
        {selectedDoctor ? (
          <BookAppointmentTesting docid={selectedDoctor._id} />
        ) : (
          <p className="text-gray-500">Please select a doctor to view their schedule.</p>
        )}
      </div>
    ),
    Ratings: (
      <div>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <CiStar 
                key={i} 
                className={`w-5 h-5 ${i < Math.floor(selectedDoctor?.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">{selectedDoctor?.rating || 0} out of 5</span>
        </div>
        <p className="text-gray-500">Based on {selectedDoctor?.totalReviews || 0} patient reviews</p>
      </div>
    ),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/api/doctors/getalldoctors`);
        setDoctors(response.data.doctors);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const applyFiltersAndSort = (doctors) => {
    let filtered = [...doctors];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        doctor => doctor?.specialization?.specialization === selectedCategory
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor?.specialization?.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Experience filter
    if (filters.experience) {
      filtered = filtered.filter(doctor => 
        doctor.experience >= parseInt(filters.experience)
      );
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(doctor => 
        doctor.hourlyPrice >= parseInt(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(doctor => 
        doctor.hourlyPrice <= parseInt(filters.maxPrice)
      );
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(doctor => 
        Math.floor(doctor.rating) >= parseInt(filters.rating)
      );
    }

    // Sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.hourlyPrice - b.hourlyPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.hourlyPrice - a.hourlyPrice);
        break;
      case "experience":
        filtered.sort((a, b) => b.experience - a.experience);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Recommended (default sorting)
        break;
    }

    return filtered;
  };

  const filteredDoctors = applyFiltersAndSort(doctors);

  const resetFilters = () => {
    setFilters({
      experience: "",
      minPrice: "",
      maxPrice: "",
      rating: ""
    });
    setSearchQuery("");
    setSelectedCategory(null);
    setSortOption("recommended");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
           {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Content */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Find Your Doctor</h1>
                <p className="text-gray-500">Browse and book appointments with specialists</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors mt-3 sm:mt-0">
                <IoCalendarOutline className="text-blue-500" />
                <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search doctors by name or specialty..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <IoFilter className="text-gray-600" />
                    <span>Filters</span>
                  </button>
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="experience">Most Experienced</option>
                      <option value="rating">Top Rated</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <MdOutlineSort className="text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                      <select
                        value={filters.experience}
                        onChange={(e) => setFilters({...filters, experience: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Any</option>
                        <option value="5">5+ years</option>
                        <option value="10">10+ years</option>
                        <option value="15">15+ years</option>
                        <option value="20">20+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (Rs.)</label>
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (Rs.)</label>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                      <select
                        value={filters.rating}
                        onChange={(e) => setFilters({...filters, rating: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Any</option>
                        <option value="4">4+ stars</option>
                        <option value="3">3+ stars</option>
                        <option value="2">2+ stars</option>
                        <option value="1">1+ stars</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Specializations</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border border-gray-200 flex flex-col items-center cursor-pointer transition-all duration-200
                      ${selectedCategory === category.name 
                        ? "bg-blue-50 border-blue-200 text-blue-600" 
                        : "hover:bg-blue-50 hover:border-blue-200"}`}
                    onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
                  >
                    <div className="w-12 h-12 mb-2 flex items-center justify-center">
                      <img src={category.img} alt={category.name} className="max-h-full max-w-full" />
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctors List */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-800">
                  {selectedCategory ? `${selectedCategory} Doctors` : "All Doctors"}
                  <span className="text-blue-500 ml-2">({filteredDoctors.length})</span>
                </h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>

              {filteredDoctors.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No doctors match your current filters</p>
                  <button 
                    onClick={resetFilters}
                    className="mt-2 text-blue-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDoctors.map((doctor, index) => (
                    <div
                      key={index}
                      className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer
                        ${selectedDoctor?._id === doctor._id ? "ring-2 ring-blue-500" : ""}`}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      <div 
                        className="w-full h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url('${doctor.image || "https://via.placeholder.com/300x200?text=Doctor"}')`}}
                      ></div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800">{doctor?.name || "Unknown Doctor"}</h3>
                        <p className="text-sm text-gray-500">{doctor?.specialization?.specialization || "Specialist"}</p>
                        <div className="mt-3 flex items-center">
                          <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                              <CiStar 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(doctor?.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({doctor?.totalReviews || 0})</span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-blue-600 font-semibold">Rs.{doctor.hourlyPrice || 0}/-</span>
                          <div className="flex items-center text-sm text-gray-500">
                            <PiPersonSimpleWalk className="mr-1" />
                            {doctor.experience || 0}yrs
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-sm p-6 sticky top-6 h-fit">
            {selectedDoctor ? (
              <>
                {/* Doctor Profile */}
                <div className="relative">
                  <img
                    src={selectedDoctor.image || "https://via.placeholder.com/400x300?text=Doctor+Image"}
                    alt={selectedDoctor.name}
                    className="w-full h-56 object-cover rounded-xl"
                  />
                  <div className="absolute bottom-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Rs.{selectedDoctor.hourlyPrice}/-
                  </div>
                </div>
                
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-gray-800">{selectedDoctor.name}</h2>
                  <p className="text-gray-500">{selectedDoctor?.specialization?.specialization || "Specialist"}</p>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <PiPersonSimpleWalk className="text-purple-600 mr-1" size={20} />
                      <span className="font-bold">{selectedDoctor.experience || "0"}</span>
                    </div>
                    <p className="text-xs text-gray-500">Years</p>
                  </div>
                  
                  <div className="h-10 w-px bg-gray-300"></div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <MdPeopleOutline className="text-green-500 mr-1" size={20} />
                      <span className="font-bold">{selectedDoctor.totalPatients || "0"}</span>
                    </div>
                    <p className="text-xs text-gray-500">Patients</p>
                  </div>
                  
                  <div className="h-10 w-px bg-gray-300"></div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <CiStar className="text-yellow-500 mr-1" size={20} />
                      <span className="font-bold">{selectedDoctor.rating || "0"}</span>
                    </div>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-6">
                  <div className="flex border-b border-gray-200">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-sm font-medium transition-all duration-200
                          ${activeTab === tab 
                            ? "border-b-2 border-blue-500 text-blue-600" 
                            : "text-gray-500 hover:text-blue-500"}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="py-4">
                    {tabContent[activeTab]}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <FaRegUser className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Doctor Selected</h3>
                <p className="text-gray-500 max-w-xs">
                  Select a doctor from the list to view their profile and schedule appointments.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;