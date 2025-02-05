import { AiFillStar } from "react-icons/ai";
import './pharmamedia.css'
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
    </>
  )
}

export default SingleMedicine
