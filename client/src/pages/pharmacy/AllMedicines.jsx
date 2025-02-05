import { AiFillStar } from "react-icons/ai";
import './pharmamedia.css';

const products = [
  {
    id: 1,
    category: "SkinCare",
    name: "CeraVe Hydrating Facial Cleanser",
    image: "https://images.squarespace-cdn.com/content/v1/5cc8a2c6a9ab954d24d1a2b0/1602686558297-VRZ963EGDWW34ZZ6FA9C/CeraVe+Hydrating+Facial+Cleanser-3.png?format=1000w",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  },
  {
    id: 2,
    category: "ChildCare",
    name: "Nestle Cerelac Wheat Infant",
    image: "https://adora.baby/wp-content/uploads/2023/12/2.png",
    rating: 4.8,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  },
  {
    id: 3,
    category: "SkinCare",
    name: "The Purest Healthy Skin",
    image: "https://www.healme.com.np/storage/Product/PR-1718627783-4149982.webp",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  },
  {
    id: 4,
    category: "SkinCare",
    name: "Ordinary Skincare Solutions",
    image: "https://detailorientedbeauty.com/wp-content/uploads/2017/06/img_9024.jpg?w=640",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  },{
    id: 4,
    category: "SkinCare",
    name: "Ordinary Skincare Solutions",
    image: "https://m.media-amazon.com/images/I/61+VhI+do6L.jpg",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  },{
    id: 4,
    category: "SkinCare",
    name: "Ordinary Skincare Solutions",
    image: "https://www.rbnainfo.com/ppmsds_uploaddata/images/productline/RB_Dettol_Bottle_16.9floz_RBL2114485_3224889_FRONT_v1.jpg",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  },{
    id: 4,
    category: "SkinCare",
    name: "Ordinary Skincare Solutions",
    image: "https://img.drz.lazcdn.com/static/np/p/db769293573ab7b05a825f1a0106a947.jpg_720x720q80.jpg",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  },{
    id: 4,
    category: "SkinCare",
    name: "Ordinary Skincare Solutions",
    image: "https://www.nepal.ubuy.com/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvODFjVmI5T0VDdUwuX0FDX1NMMTUwMF8uanBn.jpg",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  },
  {
    id: 4,
    category: "SkinCare",
    name: "Ordinary Skincare Solutions",
    image: "https://m.media-amazon.com/images/I/61DkqFJIXBL._SL1500_.jpg",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  }
];

const AllMedicines = () => {
  return (
    <div className='w-[90%] ml-[5%]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[30px] md:text-[40px] font-bold'>
          All Products
        </h1>
      </div>

      <div className='pharmamedgrid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products.map((product) => (
          <div key={product.id} className='min-h-[400px] shadow-sm rounded-xl'>
            <div className='w-[80%] h-auto ml-[10%]'>
              <img src={product.image} alt={product.name} className='w-full h-full' />
            </div>

            <div className="p-5 mt-[10px]">
              <div className="w-full flex justify-between">
                <p className="text-gray-500 text-[15px]">{product.category}</p>
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
                  <p className="line-through text-[14px] text-gray-500">{product.oldPrice}</p>
                  <p className="font-bold text-[18px]">{product.newPrice}</p>
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
