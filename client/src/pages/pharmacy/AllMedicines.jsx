/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { host } from '../../host.js';

const AllMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${host}/api/pharmacy/getallmedicines`);
        const medicinesData = response.data.medicines;
        setMedicines(medicinesData);
        setFilteredMedicines(medicinesData);
        
        // Calculate max price with a buffer
        if (medicinesData.length > 0) {
          const prices = medicinesData.map(m => Number(m.discountprice));
          const calculatedMax = Math.ceil(Math.max(...prices) / 100) * 100 + 100; // Round to nearest 100 + buffer
          setMaxPrice(calculatedMax);
          setPriceRange([0, calculatedMax]);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch medicines');
        console.error('Error fetching medicines:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract unique categories
  const categories = ['All', ...new Set(medicines.map(medicine => medicine?.category?.categoryName).filter(Boolean))];

  // Apply filters when dependencies change
  useEffect(() => {
    let results = [...medicines];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      results = results.filter(medicine => 
        medicine?.category?.categoryName === selectedCategory
      );
    }
    
    // Apply price filter
    results = results.filter(medicine => 
      Number(medicine.discountprice) >= priceRange[0] && 
      Number(medicine.discountprice) <= priceRange[1]
    );
    
    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(medicine =>
        medicine.name.toLowerCase().includes(searchLower) ||
        medicine?.category?.categoryName?.toLowerCase().includes(searchLower) ||
        medicine?.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    if (sortOption) {
      results = applySorting([...results], sortOption);
    }
    
    setFilteredMedicines(results);
  }, [medicines, selectedCategory, priceRange, searchTerm, sortOption]);

  const applySorting = (data, option) => {
    switch(option) {
      case 'priceLow':
        return data.sort((a, b) => Number(a.discountprice) - Number(b.discountprice));
      case 'priceHigh':
        return data.sort((a, b) => Number(b.discountprice) - Number(a.discountprice));
      case 'rating':
        return data.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
      case 'newest':
        return data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      default:
        return data;
    }
  };

  const calculateDiscount = (original, discounted) => {
    const discount = Math.round(((original - discounted) / original) * 100);
    return isNaN(discount) ? 0 : discount;
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, maxPrice]);
    setSearchTerm('');
    setSortOption('');
  };




  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 text-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-center mb-2">Failed to load products</h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 w-full"
      >
        {/* Header with sticky behavior - Full Width */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="py-4 flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-900 flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span>Pharmacy Store</span>
              </h1>
              
              <div className="hidden md:block flex-1 mx-8 relative">
                <input
                  type="text"
                  placeholder="Search by name, category, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <AiOutlineSearch className="h-5 w-5" />
                </div>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <AiOutlineClose className="h-5 w-5" />
                  </button>
                )}
              </div>
              
             
            </div>
            
            {/* Mobile Search */}
            <div className="md:hidden pb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <AiOutlineSearch className="h-5 w-5" />
                </div>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <AiOutlineClose className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Full Width */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile Filters */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-sm font-semibold text-gray-800">Filters</h2>
                    <button 
                      onClick={resetFilters}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Reset all
                    </button>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-2">Category</h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`text-xs px-3 py-1.5 rounded-full ${
                              selectedCategory === category 
                              ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                              : 'bg-gray-100 text-gray-800 border border-transparent hover:border-gray-200'
                            } transition-all`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xs font-medium text-gray-700">Price Range</h3>
                        <span className="text-xs font-medium text-blue-600">Rs.{priceRange[0]} - Rs.{priceRange[1]}</span>
                      </div>
                      <div className="px-1">
                        <input
                          type="range"
                          min="0"
                          max={maxPrice}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer range-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Two column layout for filters and products */}
          <div className="flex w-full">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden md:block w-64 pr-6">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-semibold text-gray-800">Filters</h2>
                  <button 
                    onClick={resetFilters}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Reset all
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Category</h3>
                    <div className="space-y-1">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                            selectedCategory === category 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Price Range</h3>
                    <div className="px-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-900">Rs. {priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer range-input"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Rs. 0</span>
                        <span>Rs. {maxPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Products Area - Taking most of the space */}
            <div className="flex-1 md:pl-2">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{filteredMedicines.length}</span> products found
                    {selectedCategory !== 'All' && <span> in <span className="font-medium">{selectedCategory}</span></span>}
                    {searchTerm && <span> matching &quot;<span className="font-medium">{searchTerm}</span>&quot;</span>}
                  </p>
                  
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="flex items-center border border-gray-200 rounded-md">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                        title="Grid View"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                        title="List View"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <select 
                      className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="">Sort by: Default</option>
                      <option value="priceLow">Price: Low to High</option>
                      <option value="priceHigh">Price: High to Low</option>
                      <option value="rating">Rating: High to Low</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product display */}
              {filteredMedicines.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                    {filteredMedicines.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        calculateDiscount={calculateDiscount}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMedicines.map(product => (
                      <ProductListItem 
                        key={product.id} 
                        product={product} 
                        calculateDiscount={calculateDiscount}
                      />
                    ))}
                  </div>
                )
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-10 flex flex-col items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you&apos;re looking for.</p>
                  <button 
                    onClick={resetFilters}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Product Card Component
const ProductCard = ({ product, calculateDiscount }) => {
  return (
    <NavLink to={`/pharmacy/${product.slug}`} className="group block">
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col"
      >
        <div className="relative pt-[100%] bg-gray-50">
          <img
            src={product.medicineimg || "https://via.placeholder.com/300x300?text=No+Image"}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-contain p-4"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
          {product.price > product.discountprice && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-sm">
              {calculateDiscount(Number(product.price), Number(product.discountprice))}% OFF
            </div>
          )}
          
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div>
            {product?.category?.categoryName && (
              <span className="inline-block text-xs font-medium text-blue-600 mb-1">
                {product.category.categoryName}
              </span>
            )}
            <h3 className="text-gray-900 font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </div>
          
          <div className="mt-auto pt-3">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <AiFillStar key={i} className={`h-4 w-4 ${i < Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-600">({product.rating || 'N/A'})</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {product.price > product.discountprice && (
                  <span className="text-xs text-gray-500 line-through">Rs.{product.price}</span>
                )}
                <span className="font-bold text-gray-900">Rs.{product.discountprice}/-</span>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">In Stock</span>
            </div>
          </div>
        </div>
      </motion.div>
    </NavLink>
  );
};

// Product List Item Component
const ProductListItem = ({ product, calculateDiscount }) => {
  return (
    <NavLink to={`/pharmacy/${product.slug}`} className="group block">
      <motion.div 
        whileHover={{ y: -2 }}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="flex">
          <div className="w-32 h-32 sm:w-48 sm:h-48 relative bg-gray-50 shrink-0">
            <img
              src={product.medicineimg || "https://via.placeholder.com/300x300?text=No+Image"}
              alt={product.name}
              className="w-full h-full object-contain p-3"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />
            {product.price > product.discountprice && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                {calculateDiscount(Number(product.price), Number(product.discountprice))}% OFF
              </div>
            )}
          </div>
          
          <div className="flex-1 p-4 flex flex-col">
            <div>
              {product?.category?.categoryName && (
                <span className="inline-block text-xs font-medium text-blue-600 mb-1">
                  {product.category.categoryName}
                </span>
              )}
              <h3 className="text-lg text-gray-900 font-medium group-hover:text-blue-600 transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {product.description || "No description available for this product. This medicine might be used for specific treatments or conditions. Please consult your healthcare provider for more information."}
              </p>
            </div>
            
            <div className="mt-auto flex items-end justify-between pt-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar key={i} className={`h-4 w-4 ${i < Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-600">({product.rating || 'N/A'})</span>
                </div>

                <div className="flex items-center gap-2">
                  {product.price > product.discountprice && (
                    <span className="text-sm text-gray-500 line-through">Rs.{product.price}</span>
                  )}
                  <span className="font-bold text-gray-900">Rs.{product.discountprice}/-</span>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </motion.div>
    </NavLink>
  );
};

export default AllMedicines;