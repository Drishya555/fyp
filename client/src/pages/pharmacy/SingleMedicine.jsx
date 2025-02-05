import { AiFillStar } from "react-icons/ai";
import './pharmamedia.css'


const products = [
  {
    id: 3,
    category: "SkinCare",
    name: "The Purest Healthy Skin",
    image: "https://www.healme.com.np/storage/Product/PR-1718627783-4149982.webp",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2299/-",
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
    id: 5,
    category: "SkinCare",
    name: "Ordinary Skincare Solutions",
    image: "https://m.media-amazon.com/images/I/61+VhI+do6L.jpg",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  },{
    id: 6,
    category: "SkinCare",
    name: "Ordinary Skincare Solutions",
    image: "https://m.media-amazon.com/images/I/61DkqFJIXBL._SL1500_.jpg",
    rating: 4.3,
    oldPrice: "Rs.3400/-",
    newPrice: "Rs.2199/-",
  }
]
const SingleMedicine = () => {
  return (
    <>
      <div className="singlecontainerpharma w-[90%] ml-[5%] flex gap-6 mt-[50px]">
        <div className="singleimg w-[30%] h-auto">
          <img className="w-full h-full" src="https://images.squarespace-cdn.com/content/v1/5cc8a2c6a9ab954d24d1a2b0/1602686558297-VRZ963EGDWW34ZZ6FA9C/CeraVe+Hydrating+Facial+Cleanser-3.png?format=1000w"/>
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
            CeraVe
          </a>
        
        </div>

          <p className="text-gray-500">Skincare</p>
          <div className="sm:flex items-center gap-4">
          <h1 className="text-[25px] sm:text-[30px] font-medium mt-[-7px]">CeraVe Hydrating Facial Cleanser </h1>
          <div className="flex items-center text-gray-500">
            (4.9)<AiFillStar color="#FFD700" size={22} />
            </div>
            </div>
          <p className="text-normal text-gray-700 text-[15px] sm:text-[17px]">The CeraVe Cleanser is a dermatologist-developed face wash designed for various skin types. It contains essential ceramides to maintain the skin barrier and hyaluronic acid for hydration. Available in different formulas like the Hydrating Cleanser (for normal to dry skin) and the Foaming Cleanser (for oily skin), it gently cleanses without stripping moisture. It’s fragrance-free, non-comedogenic, and suitable for sensitive skin.</p>
          <div className="flex items-center gap-2 mt-[30px]">
                  <p className="line-through text-[18px] text-gray-500">Rs.4200/-</p>
                  <p className="font-bold text-[22px]">Rs.3800/-</p>
          </div>


          <div className="mt-[30px]">
            <button className="w-[100%] sm:w-[400px] h-[40px] border-2 border-black transition-[0.3s] hover:scale-[1.02] hover:bg-black hover:text-white">Add to Cart</button>
          </div>
        </div>
      </div>



      <h1 className="w-[80%] ml-[10%] text-[35px] font-medium mt-[80px]">Similar Products</h1>
      <div className='w-[80%] ml-[10%] pharmamedgrid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
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
    </>
  )
}

export default SingleMedicine
