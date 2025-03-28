import { useState } from 'react';

// Sample hospital data
const hospitalsData = [
  {
    id: 1,
    name: "City General Hospital",
    category: "Public",
    location: "New York",
    rating: 4.5,
    price: 90,
    photo: "https://images.unsplash.com/photo-1519494026892-80cea6e6410c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "St. Mary's Medical Center",
    category: "Private",
    location: "Los Angeles",
    rating: 4.8,
    price: 100,
    photo: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Hope County Hospital",
    category: "Public",
    location: "Chicago",
    rating: 4.2,
    price: 60,
    photo: "https://images.unsplash.com/photo-1633080479810-4da2b8e2e99b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Elite Care Clinic",
    category: "Private",
    location: "Miami",
    rating: 4.7,
    price: 85,
    photo: "https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
];

const HospitalStore = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const locations = ["New York", "Los Angeles", "Chicago", "Miami"];

  const filteredHospitals = hospitalsData.filter(hospital => {
    const matchesCategory = selectedCategory === 'All' || hospital.category === selectedCategory;
    const matchesPrice = hospital.price >= priceRange[0] && hospital.price <= priceRange[1];
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(hospital.location);
    return matchesCategory && matchesPrice && matchesLocation;
  });

  const handleLocationChange = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter(loc => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

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
              <div>
                <h2 className="text-sm font-medium text-gray-700 mb-2">Category</h2>
                <div className="flex space-x-4">
                  {['All', 'Public', 'Private'].map(category => (
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
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
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
        <div className={`hidden lg:block w-64 bg-white border-r border-gray-100 p-6 overflow-y-auto`}>
          <h2 className="text-sm font-medium text-gray-700 mb-4">Filters</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Category</h3>
              <div className="space-y-2">
                {['All', 'Public', 'Private'].map(category => (
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
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
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
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">
              {filteredHospitals.length} {filteredHospitals.length === 1 ? 'hospital' : 'hospitals'} found
            </p>
            <select className="text-sm border border-gray-200 rounded px-3 py-1.5 bg-white">
              <option>Sort by: Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>

          {filteredHospitals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map(hospital => (
                <div key={hospital.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={hospital.photo}
                      alt={hospital.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-gray-900 font-medium">{hospital.name}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {hospital.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{hospital.location}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-600">{hospital.rating}</span>
                      </div>
                      <div className="ml-auto text-gray-900 font-medium">${hospital.price}</div>
                    </div>
                  </div>
                </div>
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
                  setPriceRange([0, 200]);
                  setSelectedLocations([]);
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