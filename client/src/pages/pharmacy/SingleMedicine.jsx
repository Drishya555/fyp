// import { AiFillStar } from "react-icons/ai";
// import './pharmamedia.css'
// import {useState, useEffect} from 'react';
// import { useParams } from "react-router-dom";
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import {motion} from 'framer-motion';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import AuthStore from "../../hooks/authStore"; // Import the AuthStore
// import { host } from "../../host";
// const SingleMedicine = () => {
//   const {slug} = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [medicines, setMedicines] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${host}/api/pharmacy/getrandomproducts`);
//         setMedicines(response.data.products);
//       } catch (err) {
//         console.log(`Error in fetching ${err} `)
//       }
//     };

//     fetchData();
//   }, []); // Runs once when component mounts


//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await axios.get(`${host}/api/pharmacy/getmedicinebyslug/${slug}`);
//         setProduct(response.data.product);
//         setLoading(false);
//       } catch (err) {
//         console.error(`Error fetching product: ${err}`);
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [slug]);



//   const addtocart = async (productid, quantity = 1) => {
//     try {
//         const userid = AuthStore.getUser()?.userid || null;
//         if (!userid) {
//             console.error("User not authenticated");
//             return;
//         }

//         const response = await fetch(`${host}/api/cart/addtocart`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 user: userid,
//                 products: [{ product: productid, quantity }],
//             }),
//         });

//         const data = await response.json();
//         if (data.success) {
//             console.log("Cart updated successfully", data.cart);
//         } else {
//             console.error("Error updating cart", data.message);
//         }
//     } catch (error) {
//         console.error("Error adding to cart", error);
//     }
// };


//   if (loading) {
//     return  <Box sx={{ display: 'flex' }}>
//     <CircularProgress />
//   </Box>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }


//   const scroll = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
  


  

//   return (
//     <motion.div
//     initial={{opacity:0}}
//     animate={{opacity:1}}
//     exit={{opacity:0}}
//     transition={{duration:0.9}}>
//       <div className="singlecontainerpharma w-[90%] ml-[5%] flex gap-6 mt-[50px]">
//         <div className="singleimg w-[30%] h-auto">
//           <img className="w-full h-full" src={product.medicineimg}/>
//         </div>

//         <div className="pharmadescription w-[50%] p-2 mt-[50px]">
//         <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
//           <a href="#" className="text-gray-600 ">
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//             </svg>
//           </a>
//           <span className="mx-5 text-gray-500 ">
//             /
//           </span>
//           <a href="#" className="text-gray-600  hover:underline">
//             Pharmacy
//           </a>
//           <span className="mx-5 text-gray-500 ">
//             /
//           </span>
//           <a href="#" className="text-gray-600  hover:underline">
//             {product.name}
//           </a>
        
//         </div>

//           <p className="text-gray-500">{product?.category?.categoryName}</p>
//           <div className="sm:flex items-center gap-4">
//           <h1 className="text-[25px] sm:text-[30px] font-medium mt-[-7px]">{product.name}</h1>
//           <div className="flex items-center text-gray-500">
//             ({product.rating})<AiFillStar color="#FFD700" size={22} />
//             </div>
//             </div>
//           <p className="text-normal text-gray-700 text-[15px] sm:text-[17px]">{product.description}</p>
//           <div className="flex items-center gap-2 mt-[30px]">
//                   <p className="line-through text-[18px] text-gray-500">Rs.{product.price}/-</p>
//                   <p className="font-bold text-[22px]">Rs.{product.discountprice}/-</p>
//           </div>


//           <div className="mt-[30px]">
//             <button onClick={()=>addtocart(product._id)} className="z-[10] w-[100%] sm:w-[400px] h-[40px] border-2 border-black transition-[0.3s] hover:scale-[1.02] hover:bg-black hover:text-white">Add to Cart</button>
//           </div>
//         </div>
//       </div>



//       <h1 className="w-[80%] ml-[10%] text-[35px] font-medium mt-[80px]">Similar Products</h1>
//       <div className='w-[80%] ml-[10%] pharmamedgrid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
//         {medicines.map((product) => (
//           <div key={product.id} className='min-h-[400px] shadow-sm rounded-xl mt-[50px] transition-[0.3s] hover:scale-[1.015] hover:shadow-lg' onClick={scroll}>
//           <Link to={`/pharmacy/${product.slug}`}>

//             <div className='w-[80%] min-h-[60%] h-auto ml-[10%]'>
//               <img src={product.medicineimg} alt={product.name} className='w-full h-full' />
//             </div>

//             <div className="p-5 mt-[10px]">
//               <div className="w-full flex justify-between">
//                 <p className="text-gray-500 text-[15px]">{product.name}</p>
//                 <p className="flex items-center text-gray-500">
//                   ({product.rating}) <AiFillStar color="#FFD700" size={22} />
//                 </p>
//               </div>

//               <h1 className="text-[20px] w-[200px]">{product.name}</h1>

//               <div className="pharmacardprice flex items-center justify-between">
//                 <button className="border-2 border-black p-1.5 rounded-[50px] pl-5 pr-5 mt-[20px] transition-[0.3s] hover:scale-[1.02]">
//                   + Add to Cart
//                 </button>
//                 <div className="flex items-center gap-2">
//                   <p className="line-through text-[14px] text-gray-500">{product.price}</p>
//                   <p className="font-bold text-[18px]">{product.discountprice}</p>
//                 </div>
//               </div>
//             </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   )
// }

// export default SingleMedicine


































import { AiFillStar, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { MdShoppingCart } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '@mui/material/Skeleton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AuthStore from "../../hooks/authStore";
import { host } from "../../host";
import './pharmamedia.css';

const SingleMedicine = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Fetch random products for similar products section
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/api/pharmacy/getrandomproducts`);
        setMedicines(response.data.products);
      } catch (err) {
        console.log(`Error in fetching ${err}`);
      }
    };

    fetchData();
  }, []);

  // Fetch product data based on slug
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${host}/api/pharmacy/getmedicinebyslug/${slug}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching product: ${err}`);
        setLoading(false);
      }
    };

    fetchProductData();
    setAddedToCart(false); // Reset cart notification on product change
    setQuantity(1); // Reset quantity on product change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const addtocart = async (productid) => {
    try {
      const userid = AuthStore.getUser()?.userid || null;
      if (!userid) {
        alert("Please log in to add items to your cart");
        return;
      }

      const response = await fetch(`${host}/api/cart/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userid,
          products: [{ product: productid, quantity }],
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
      } else {
        console.error("Error updating cart", data.message);
      }
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-[90%] ml-[5%] mt-[50px]">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton variant="rectangular" className="w-full md:w-[40%]" height={400} />
          <div className="w-full md:w-[60%]">
            <Skeleton variant="text" height={30} width="40%" />
            <Skeleton variant="text" height={50} width="80%" />
            <Skeleton variant="text" height={25} width="30%" />
            <Skeleton variant="text" height={120} />
            <Skeleton variant="text" height={40} width="50%" />
            <Skeleton variant="rectangular" height={50} width="60%" className="mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you are looking for does not exist or has been removed.</p>
          <Link to="/pharmacy" className="inline-block mt-4 px-6 py-2 bg-black text-white">
            Back to Pharmacy
          </Link>
        </div>
      </div>
    );
  }

  // Calculate discount percentage
  const discountPercentage = Math.round(((product.price - product.discountprice) / product.price) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Breadcrumbs */}
      <div className="w-[90%] ml-[5%] py-4 flex items-center text-sm overflow-x-auto whitespace-nowrap">
        <Link to="/" className="text-gray-600 hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link to="/pharmacy" className="text-gray-600 hover:text-gray-900">
          Pharmacy
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      {/* Product Main Content */}
      <div className="singlecontainerpharma w-[90%] ml-[5%] flex flex-col md:flex-row gap-8 mb-16">
        {/* Product Image Section */}
        <div className="w-full md:w-[40%] relative">
          <div className="sticky top-24">
            <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
              <img 
                className="w-full h-auto object-contain mx-auto" 
                src={product.medicineimg} 
                alt={product.name}
              />
            </div>
            
            {/* Image Actions */}
            <div className="flex justify-center gap-4 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200">
                <AiOutlineHeart size={20} /> Save
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200">
                <AiOutlineShareAlt size={20} /> Share
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="pharmadescription w-full md:w-[60%] p-2">
          {/* Category & Rating */}
          <div className="flex justify-between items-center">
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
              {product?.category?.categoryName || "Medicine"}
            </span>
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <AiFillStar color="#FFD700" size={16} />
              <span className="font-medium">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h1 className="text-3xl md:text-4xl font-semibold mt-3 mb-2">{product.name}</h1>
          
          {/* Short Description */}
          <p className="text-gray-700 my-4 leading-relaxed">
            {product.description.length > 150 
             ? `${product.description.substring(0, 150)}...` 
             : product.description}
          </p>

          {/* Price Section */}
          <div className="mt-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">₹{product.discountprice}</span>
              <div className="flex flex-col">
                <span className="line-through text-gray-500">₹{product.price}</span>
                <span className="text-green-600 font-medium">{discountPercentage}% off</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Inclusive of all taxes | Free delivery on orders above ₹599
            </p>
          </div>

          {/* In Stock & Delivery */}
          <div className="flex items-center gap-2 text-green-600 mb-6">
            <IoIosCheckmarkCircle size={20} />
            <span>In Stock</span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex border border-gray-300 rounded">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 text-lg font-medium border-r border-gray-300 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 min-w-[40px] text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 text-lg font-medium border-l border-gray-300 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => addtocart(product._id)}
              className="flex-1 flex justify-center items-center gap-2 py-3 bg-black text-white font-medium rounded hover:bg-gray-900 transition duration-300"
            >
              <MdShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="flex-1 py-3 border-2 border-black font-medium rounded hover:bg-gray-100 transition duration-300">
              Buy Now
            </button>
          </div>

          {/* Added to Cart Notification */}
          <AnimatePresence>
            {addedToCart && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-700"
              >
                <IoIosCheckmarkCircle size={20} />
                Item successfully added to your cart!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabbed Content */}
          <div className="mt-12">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="product information tabs">
                <Tab label="Description" />
                <Tab label="Details" />
                <Tab label="Reviews" />
              </Tabs>
            </Box>
            
            {/* Description Tab */}
            {activeTab === 0 && (
              <div className="py-4">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
            
            {/* Details Tab */}
            {activeTab === 1 && (
              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">Brand</span>
                    <span className="font-medium">{product.brand || "Generic"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">Category</span>
                    <span className="font-medium">{product?.category?.categoryName || "Medicine"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">Item Code</span>
                    <span className="font-medium">{product._id?.substring(0, 8) || "N/A"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-sm">Stock Status</span>
                    <span className="font-medium text-green-600">In Stock</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 2 && (
              <div className="py-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-medium">{product.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar key={i} color={i < Math.floor(product.rating) ? "#FFD700" : "#e0e0e0"} size={22} />
                      ))}
                    </div>
                    <span className="text-gray-500 ml-2">based on customer reviews</span>
                  </div>
                </div>
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                <button className="mt-4 px-6 py-2 bg-gray-100 rounded font-medium hover:bg-gray-200">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="bg-gray-50 py-16">
        <div className="w-[90%] ml-[5%]">
          <h2 className="text-3xl font-semibold mb-8">Similar Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicines.slice(0, 4).map((item) => (
              <Link to={`/pharmacy/${item.slug}`} key={item._id} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm transition duration-300 group-hover:shadow-md">
                  <div className="h-48 p-4 bg-gray-50 flex items-center justify-center">
                    <img 
                      src={item.medicineimg} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105" 
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">{item?.category?.categoryName || "Medicine"}</span>
                      <div className="flex items-center">
                        <AiFillStar color="#FFD700" size={16} />
                        <span className="ml-1 text-sm">{item.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-lg mb-2 line-clamp-1">{item.name}</h3>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">₹{item.discountprice}</span>
                        <span className="line-through text-sm text-gray-500">₹{item.price}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          addtocart(item._id, 1);
                        }}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                      >
                        <MdShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Link 
              to="/pharmacy" 
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
      <a href="/cart">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors z-20"
      >
        
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        
      </motion.button>
      </a>
    </motion.div>
  );
};

export default SingleMedicine;