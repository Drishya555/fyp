import { useState, useEffect } from 'react';
import axios from 'axios';
import {host} from '../host.js';
import { NavLink } from 'react-router-dom';

const HospitalStore = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState(200); // Dynamic max price based on data
  const [searchTerm, setSearchTerm] = useState(''); // Added search functionality
  const [sortOption, setSortOption] = useState('default'); // Added sorting functionality

  useEffect(() => {
    const getHospitalData = async () => {
      try {
        const res = await axios.get(`${host}/api/hospital/getallhospitals`);
        setHospitals(res.data.hospitals);
        
        // Calculate max price from the data
        if (res.data.hospitals.length > 0) {
          const prices = res.data.hospitals.map(h => h.price);
          const calculatedMax = Math.max(...prices) + 50; // Add buffer
          setMaxPrice(calculatedMax);
          setPriceRange([0, calculatedMax]);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch hospitals');
      } finally {
        setLoading(false);
      }
    };

    getHospitalData();
  }, []);

  // Extract unique locations from hospitals data
  const locations = [...new Set(hospitals.map(hospital => hospital.address))];
  
  // Extract unique categories from hospitals data
  const categories = ['All', ...new Set(hospitals.map(hospital => hospital.hospitaltype))];

  // Filter hospitals based on criteria and search term
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesCategory = selectedCategory === 'All' || hospital.hospitaltype === selectedCategory;
    const matchesPrice = hospital.price >= priceRange[0] && hospital.price <= priceRange[1];
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(hospital.address);
    const matchesSearch = searchTerm === '' || 
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.hospitaltype.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesLocation && matchesSearch;
  });

  // Sort the filtered hospitals
  const sortedHospitals = [...filteredHospitals].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'rating-high-low':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0; // Default sorting (as provided by the API)
    }
  });

  const handleLocationChange = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter(loc => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-medium text-gray-900">Hospital Finder</h1>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden text-sm text-gray-600 hover:text-gray-900"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-68px)]">
        {/* Filters Sidebar - Mobile */}
        {showFilters && (
          <div className="lg:hidden bg-white p-4 border-b border-gray-100">
            <div className="space-y-4">
              {/* Search Box - Mobile */}
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">Search</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search hospitals..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">Category</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-xs px-3 py-1 rounded-full ${selectedCategory === category ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">Price Range</h2>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Rs.{priceRange[0]}</span>
                  <span>Rs.{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1.5 bg-gray-200 rounded-full appearance-none"
                />
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">Location</h2>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map(location => (
                    <label key={location} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(location)}
                        onChange={() => handleLocationChange(location)}
                        className="h-3.5 w-3.5 text-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-xs text-gray-700">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters Sidebar - Desktop */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-100 p-6 overflow-y-auto">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Filters</h2>
          
          <div className="space-y-6">
            {/* Search Box - Desktop */}
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search hospitals..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-2 py-1.5 text-sm rounded ${selectedCategory === category ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Price Range</h3>
              <div className="px-1">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Rs. {priceRange[0]}</span>
                  <span>Rs. {priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1 bg-gray-200 rounded-full appearance-none"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Location</h3>
              <div className="space-y-2">
                {locations.map(location => (
                  <label key={location} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(location)}
                      onChange={() => handleLocationChange(location)}
                      className="h-3.5 w-3.5 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{location}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-sm text-gray-500">
              Showing {sortedHospitals.length} of {hospitals.length} hospitals
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search Box for Mobile View - Shown above content */}
              <div className="relative md:hidden w-full">
                <input
                  type="text"
                  placeholder="Search hospitals..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Sort Dropdown */}
              <select 
                className="text-sm border border-gray-200 rounded px-3 py-1.5 bg-white"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating-high-low">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {sortedHospitals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedHospitals.map(hospital => (
                <NavLink to={`/hospital-details/${hospital._id}`} className="group" key={hospital._id}>
                <div key={hospital._id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={hospital.image || "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={hospital.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-gray-900 font-medium">{hospital.name}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {hospital.hospitaltype}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{hospital.address}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-600">{hospital.rating || 'N/A'}</span>
                      </div>
                      <div className="ml-auto text-gray-900 font-medium">Rs.{hospital.price || 'N/A'}/-</div>
                    </div>
                  </div>
                </div>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-3 text-gray-500">No hospitals found matching your criteria</p>
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange([0, maxPrice]);
                  setSelectedLocations([]);
                  setSearchTerm('');
                  setSortOption('default');
                }}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalStore;