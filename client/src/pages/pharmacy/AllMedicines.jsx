import { AiFillStar } from "react-icons/ai";
import './pharmamedia.css';
import { useState, useEffect } from "react";
import axios from 'axios';

// const products = [
//   {
//     id: 1,
//     category: "SkinCare",
//     name: "CeraVe Hydrating Facial Cleanser",
//     image: "https://images.squarespace-cdn.com/content/v1/5cc8a2c6a9ab954d24d1a2b0/1602686558297-VRZ963EGDWW34ZZ6FA9C/CeraVe+Hydrating+Facial+Cleanser-3.png?format=1000w",
//     rating: 4.3,
//     oldPrice: "Rs.3400/-",
//     newPrice: "Rs.2199/-",
//   },
//   {
//     id: 2,
//     category: "ChildCare",
//     name: "Nestle Cerelac Wheat Infant",
//     image: "https://adora.baby/wp-content/uploads/2023/12/2.png",
//     rating: 4.8,
//     oldPrice: "Rs.3400/-",
//     newPrice: "Rs.2199/-",
//   },
//   {
//     id: 3,
//     category: "SkinCare",
//     name: "The Purest Healthy Skin",
//     image: "https://www.healme.com.np/storage/Product/PR-1718627783-4149982.webp",
//     rating: 4.3,
//     oldPrice: "Rs.3400/-",
//     newPrice: "Rs.2299/-",
//   },
//   {
//     id: 4,
//     category: "SkinCare",
//     name: "Ordinary Skincare Solutions",
//     image: "https://detailorientedbeauty.com/wp-content/uploads/2017/06/img_9024.jpg?w=640",
//     rating: 4.3,
//     oldPrice: "Rs.3400/-",
//     newPrice: "Rs.2199/-",
//   },{
//     id: 5,
//     category: "SkinCare",
//     name: "Ordinary Skincare Solutions",
//     image: "https://m.media-amazon.com/images/I/61+VhI+do6L.jpg",
//     rating: 4.3,
//     oldPrice: "Rs.3400/-",
//     newPrice: "Rs.2199/-",
//   },{
//     id: 6,
//     category: "SkinCare",
//     name: "Ordinary Skincare Solutions",
//     image: "https://m.media-amazon.com/images/I/61DkqFJIXBL._SL1500_.jpg",
//     rating: 4.3,
//     oldPrice: "Rs.3400/-",
//     newPrice: "Rs.2199/-",
//   }
// ];

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
    <div className='w-[90%] ml-[5%]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[30px] md:text-[40px] font-bold'>All Products</h1>

        {/* <div className="flex items-center gap-3">
          <div className="relative w-56">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700"
            >
              {sortOption}
              <svg xmlns="http://www.w3.org/2000/svg" className={`ml-auto h-4 text-gray-600 transition ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="absolute left-0 mt-1 w-full bg-white border rounded-lg shadow-lg">
                <li onClick={() => handleSort('Price')} className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Price</li>
                <li onClick={() => handleSort('Rating')} className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Rating</li>
                <li onClick={() => handleSort('Ascending')} className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Ascending</li>
                <li onClick={() => handleSort('Descending')} className="cursor-pointer px-3 py-2 text-sm text-gray-500 hover:bg-blue-500 hover:text-white">Descending</li>
              </ul>
            )}
          </div>
        </div> */}
      </div>

      <div className='pharmamedgrid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-[50px]'>
        {medicines.map((product) => (
          <div key={product.id} className='min-h-[400px] shadow-sm rounded-xl'>
            <div className='w-[80%] min-h-[60%] h-[auto] ml-[10%]'>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMedicines;
