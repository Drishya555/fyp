
import { AiFillStar } from "react-icons/ai";
import './pharmamedia.css';

const ptest = () => {
  return (
    <div className='pharmamedgrid w-[90%] ml-[5%] grid grid-cols-4 gap-5'>
      <div className='min-h-[400px] shadow-sm rounded-xl'>
        <div className='w-[80%] h-auto ml-[10%]'>
            <img src='https://images.squarespace-cdn.com/content/v1/5cc8a2c6a9ab954d24d1a2b0/1602686558297-VRZ963EGDWW34ZZ6FA9C/CeraVe+Hydrating+Facial+Cleanser-3.png?format=1000w' className='w-full h-full'></img>
        </div>

        <div className="p-5 mt-[10px]">
            <div className="w-full flex justify-between">
                <p className="text-gray-500 text-[15px]">SkinCare</p>
                <p className="flex items-center text-gray-500">(4.3)<AiFillStar color="#FFD700" size={22}/></p>
            </div>
            <h1 className="text-[20px] w-[200px]">CeraVe Hydrating Facial Clenser</h1>

            <div className="pharmacardprice flex items-center justify-between">
                <button className="border-2 border-black p-1.5 rounded-[50px] pl-5 pr-5 mt-[20px] transition-[0.3s] hover:scale-[1.02]">+ Add to Cart</button>
                <div className="flex items-center gap-2">
                    <p className="line-through text-[14px] text-gray-500">Rs.3400/-</p>
                    <p className="font-bold text-[18px]">Rs.2199/-</p>
                </div>
            </div>
        </div>
      </div>
      <div className='min-h-[450px] shadow-sm rounded-xl'>
      <div className='w-[80%] h-auto ml-[10%]'>
            <img src='https://adora.baby/wp-content/uploads/2023/12/2.png' className='w-full h-full'></img>
        </div>
        <div className="p-5 mt-[10px]">
            <div className="w-full flex justify-between">
                <p className="text-gray-500 text-[15px]">ChildCare</p>
                <p className="flex items-center text-gray-500">(4.8)<AiFillStar color="#FFD700" size={22}/></p>
            </div>
            <h1 className="text-[20px] w-[200px]">Nestle Cerelac Wheat Infant</h1>

            <div className="pharmacardprice flex items-center justify-between">
                <button className="border-2 border-black p-1.5 rounded-[50px] pl-5 pr-5 mt-[20px] transition-[0.3s] hover:scale-[1.02]">+ Add to Cart</button>
                <div className="flex items-center gap-2">
                    <p className="line-through text-[14px] text-gray-500">Rs.3400/-</p>
                    <p className="font-bold text-[18px]">Rs.2199/-</p>
                </div>
            </div>
        </div>
      </div>
      <div className='min-h-[450px] shadow-sm rounded-xl'>
      <div className='w-[80%] h-auto ml-[10%]'>
            <img src='https://www.healme.com.np/storage/Product/PR-1718627783-4149982.webp' className='w-full h-full'></img>
        </div>
        <div className="p-5 mt-[10px]">
            <div className="w-full flex justify-between">
                <p className="text-gray-500 text-[15px]">SkinCare</p>
                <p className="flex items-center text-gray-500">(4.3)<AiFillStar color="#FFD700" size={22}/></p>
            </div>
            <h1 className="text-[20px] w-[200px]">The Purest Healthy Skin</h1>

            <div className="pharmacardprice flex items-center justify-between">
                <button className="border-2 border-black p-1.5 rounded-[50px] pl-5 pr-5 mt-[20px] transition-[0.3s] hover:scale-[1.02]">+ Add to Cart</button>
                <div className="flex items-center gap-2">
                    <p className="line-through text-[14px] text-gray-500">Rs.3400/-</p>
                    <p className="font-bold text-[18px]">Rs.2199/-</p>
                </div>
            </div>
        </div>
      </div>
      <div className='min-h-[450px] shadow-sm rounded-xl'>
      <div className='w-[80%] h-auto ml-[10%]'>
            <img src='https://detailorientedbeauty.com/wp-content/uploads/2017/06/img_9024.jpg?w=640' className='w-full h-full'></img>
        </div>
        <div className="p-5 mt-[10px]">
            <div className="w-full flex justify-between">
                <p className="text-gray-500 text-[15px]">SkinCare</p>
                <p className="flex items-center text-gray-500">(4.3)<AiFillStar color="#FFD700" size={22}/></p>
            </div>
            <h1 className="text-[20px] w-[200px]">Ordinary Skincare Solutions</h1>

            <div className="pharmacardprice flex items-center justify-between">
                <button className="border-2 border-black p-1.5 rounded-[50px] pl-5 pr-5 mt-[20px] transition-[0.3s] hover:scale-[1.02]">+ Add to Cart</button>
                <div className="flex items-center gap-2">
                    <p className="line-through text-[14px] text-gray-500">Rs.3400/-</p>
                    <p className="font-bold text-[18px]">Rs.2199/-</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ptest
