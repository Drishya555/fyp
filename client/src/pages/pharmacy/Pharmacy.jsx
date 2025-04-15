import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { host } from '../../host';
import './pharmamedia.css';

// Importing icons from lucide-react as a replacement for AiFillStar
import { Star, ShoppingCart, Search, ChevronRight, TrendingUp, Heart } from "lucide-react";

const Pharmacy = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = ['All', 'Prescription', 'OTC', 'Supplements', 'Personal Care'];
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try { 
        const response = await axios.get(`${host}/api/pharmacy/getallmedicines`);
        setMedicines(response.data.medicines);
      } catch (err) {
        console.log(`Error in fetching ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Runs once when component mounts

  // Filter medicines based on active category and search term
  const filteredMedicines = medicines.filter(product => {
    const matchesCategory = activeCategory === 'All' || 
      (product?.category?.categoryName === activeCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration:0.5}}
      className="bg-gray-50 min-h-screen pb-16"
    >
      {/* Hero Banner with Search */}
      <div className="relative w-full h-96 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">Your Health, Our Priority</h1>
          <p className="text-xl text-white text-center mb-8 max-w-2xl">Find medicines, supplements, and personal care products for your wellness journey</p>
          
          <div className="relative w-full max-w-2xl">
            <input 
              type="text" 
              placeholder="Search for medicines, supplements..." 
              className="w-full p-4 pl-12 rounded-full shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 no-scrollbar">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category 
                    ? 'bg-blue-600 text-white font-medium shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8">
        {/* Enhanced Trending Products Section */}
        {/* Enhanced Trending Products Section */}
<section className="mb-16">
  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 shadow-lg overflow-hidden relative border border-gray-100">
    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mr-32 -mt-32 opacity-20"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-100 rounded-full -ml-20 -mb-20 opacity-20"></div>
    
    <div className="relative z-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Trending Products</h2>
          </div>
          <p className="text-gray-600 max-w-2xl">Carefully selected products based on customer preferences and wellness trends</p>
        </div>
        
        <Link 
          to="/allmedicines" 
          className="group inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>View all products</span>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse h-96 border border-gray-100">
              <div className="h-48 bg-gray-100"></div>
              <div className="p-5">
                <div className="h-4 bg-gray-100 rounded mb-3 w-3/4"></div>
                <div className="h-6 bg-gray-100 rounded mb-4 w-full"></div>
                <div className="flex justify-between mt-6">
                  <div className="h-8 w-24 bg-gray-100 rounded-full"></div>
                  <div className="h-8 w-20 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredMedicines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedicines.slice(0, 8).map((product) => (
            <motion.div 
              key={product.id} 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md border border-gray-100 group"
            >
              <Link to={`/pharmacy/${product.slug}`} className="block h-full">
                <div className="relative p-4 flex items-center justify-center h-56 bg-gray-50 overflow-hidden">
                  <motion.img 
                    src={product.medicineimg} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  {product.price > product.discountprice && (
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm">
                      Save {Math.round((product.price - product.discountprice) / product.price * 100)}%
                    </div>
                  )}
                  
                  <button 
                    className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-rose-500 shadow-sm hover:shadow-md transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to wishlist functionality
                    }}
                  >
                    <Heart size={16} className="transition-colors" />
                  </button>
                </div>

                <div className="p-5 pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                      {product?.category?.categoryName || "General"}
                    </span>
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14} fill="#F59E0B" stroke="#F59E0B" strokeWidth={0.5} />
                      <span className="text-amber-600 font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      {product.price > product.discountprice && (
                        <span className="line-through text-sm text-gray-400 mr-2">
                          ₹{product.price}
                        </span>
                      )}
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.discountprice}
                      </span>
                    </div>
                    <button 
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart functionality
                      }}
                    >
                      <ShoppingCart size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                  
                  {/* Subtle trending badge */}
                  {product.id % 3 === 0 && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 text-[10px] font-semibold py-0.5 px-2 rounded-full border border-amber-200">
                      Popular
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
            <Search size={24} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No matching products</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn&apos;t find any products matching your criteria. Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  </div>
</section>
        
        {/* Featured Categories Section */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter(cat => cat !== 'All').map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl text-center cursor-pointer shadow-sm hover:shadow-md"
                onClick={() => setActiveCategory(category)}
              >
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  {category === 'Prescription' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                  {category === 'OTC' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                  {category === 'Supplements' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                  {category === 'Personal Care' && <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}
                </div>
                <h3 className="font-medium text-lg text-gray-800">{category}</h3>
                <p className="text-sm text-gray-600 mt-2">Browse our {category.toLowerCase()} collection</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Testimonials/Trust Section */}
        <section className="mt-16 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Our Customers Trust Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">100% Genuine Products</h3>
              <p className="text-gray-600">All medicines and products are sourced directly from manufacturers</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your medicines delivered to your doorstep within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Expert Support</h3>
              <p className="text-gray-600">Get advice from our qualified pharmacists whenever you need</p>
            </div>
          </div>
        </section>
      </div>
      
      {/* Floating Action Button */}
      <a href="/cart">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors z-20"
      >
        <ShoppingCart size={24} />
      </motion.button>
      </a>
    </motion.div>
  );
};

export default Pharmacy;







































