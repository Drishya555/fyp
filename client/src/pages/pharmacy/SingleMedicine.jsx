import { AiFillStar } from "react-icons/ai";
import './pharmamedia.css'
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import {motion} from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AuthStore from "../../hooks/authStore"; // Import the AuthStore

const SingleMedicine = () => {
  const {slug} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/pharmacy/getrandomproducts");
        setMedicines(response.data.products);
      } catch (err) {
        console.log(`Error in fetching ${err} `)
      }
    };

    fetchData();
  }, []); // Runs once when component mounts


  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/pharmacy/getmedicinebyslug/${slug}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching product: ${err}`);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);



  const addtocart = async (productid, quantity = 1) => {
    try {
        const userid = AuthStore.getUser()?.userid || null;
        if (!userid) {
            console.error("User not authenticated");
            return;
        }

        const response = await fetch("http://localhost:8000/api/cart/addtocart", {
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
            console.log("Cart updated successfully", data.cart);
        } else {
            console.error("Error updating cart", data.message);
        }
    } catch (error) {
        console.error("Error adding to cart", error);
    }
};


  if (loading) {
    return  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }


  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  


  

  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.9}}>
      <div className="singlecontainerpharma w-[90%] ml-[5%] flex gap-6 mt-[50px]">
        <div className="singleimg w-[30%] h-auto">
          <img className="w-full h-full" src={product.medicineimg}/>
        </div>

        <div className="pharmadescription w-[50%] p-2 mt-[50px]">
        <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
          <a href="#" className="text-gray-600 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <span className="mx-5 text-gray-500 ">
            /
          </span>
          <a href="#" className="text-gray-600  hover:underline">
            Pharmacy
          </a>
          <span className="mx-5 text-gray-500 ">
            /
          </span>
          <a href="#" className="text-gray-600  hover:underline">
            {product.name}
          </a>
        
        </div>

          <p className="text-gray-500">{product.category.categoryName}</p>
          <div className="sm:flex items-center gap-4">
          <h1 className="text-[25px] sm:text-[30px] font-medium mt-[-7px]">{product.name}</h1>
          <div className="flex items-center text-gray-500">
            ({product.rating})<AiFillStar color="#FFD700" size={22} />
            </div>
            </div>
          <p className="text-normal text-gray-700 text-[15px] sm:text-[17px]">{product.description}</p>
          <div className="flex items-center gap-2 mt-[30px]">
                  <p className="line-through text-[18px] text-gray-500">Rs.{product.price}/-</p>
                  <p className="font-bold text-[22px]">Rs.{product.discountprice}/-</p>
          </div>


          <div className="mt-[30px]">
            <button onClick={()=>addtocart(product._id)} className="z-[10] w-[100%] sm:w-[400px] h-[40px] border-2 border-black transition-[0.3s] hover:scale-[1.02] hover:bg-black hover:text-white">Add to Cart</button>
          </div>
        </div>
      </div>



      <h1 className="w-[80%] ml-[10%] text-[35px] font-medium mt-[80px]">Similar Products</h1>
      <div className='w-[80%] ml-[10%] pharmamedgrid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {medicines.map((product) => (
          <div key={product.id} className='min-h-[400px] shadow-sm rounded-xl mt-[50px] transition-[0.3s] hover:scale-[1.015] hover:shadow-lg' onClick={scroll}>
          <Link to={`/pharmacy/${product.slug}`}>

            <div className='w-[80%] min-h-[60%] h-auto ml-[10%]'>
              <img src={product.medicineimg} alt={product.name} className='w-full h-full' />
            </div>

            <div className="p-5 mt-[10px]">
              <div className="w-full flex justify-between">
                <p className="text-gray-500 text-[15px]">{product.name}</p>
                <p className="flex items-center text-gray-500">
                  ({product.rating}) <AiFillStar color="#FFD700" size={22} />
                </p>
              </div>

              <h1 className="text-[20px] w-[200px]">{product.name}</h1>

              <div className="pharmacardprice flex items-center justify-between">
                <button className="border-2 border-black p-1.5 rounded-[50px] pl-5 pr-5 mt-[20px] transition-[0.3s] hover:scale-[1.02]">
                  + Add to Cart
                </button>
                <div className="flex items-center gap-2">
                  <p className="line-through text-[14px] text-gray-500">{product.price}</p>
                  <p className="font-bold text-[18px]">{product.discountprice}</p>
                </div>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default SingleMedicine
