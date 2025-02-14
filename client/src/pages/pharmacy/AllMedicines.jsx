import { AiFillStar } from "react-icons/ai";
import './pharmamedia.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import the Link component from react-router-dom
import {motion} from 'framer-motion';


const AllMedicines = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/pharmacy/getallmedicines");
        setMedicines(response.data.medicines);
      } catch (err) {
        console.log(`Error in fetching ${err} `)
      }
    };

    fetchData();
  }, []); // Runs once when component mounts

  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.9}}>
    <div className='w-[90%] ml-[5%]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[30px] md:text-[40px] font-bold'>All Products</h1>
      </div>

      <div className='pharmamedgrid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-[50px]'>
        {medicines.map((product) => (

          <div key={product.id} className='min-h-[400px] shadow-sm rounded-xl transition-[0.3s] hover:scale-[1.015] hover:shadow-lg'>
          <Link to={`/pharmacy/${product.slug}`}>

            <div className='w-[80%] min-h-[60%] h-[auto] ml-[10%] pt-[10px]'>
                <img src={product.medicineimg} alt={product.name} className='w-full h-full' />
            </div>

            <div className="p-5 mt-[10px]">
              <div className="w-full flex justify-between">
                <p className="text-gray-500 text-[15px]">{product.category.categoryName}</p>
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
                  <p className="line-through text-[14px] text-gray-500">Rs.{product.price}/-</p>
                  <p className="font-bold text-[18px]">Rs.{product.discountprice}/-</p>
                </div>
              </div>
            </div>
            </Link>

          </div>
        ))}
      </div>
    </div>
    </motion.div>
  );
};

export default AllMedicines;
