import header from '../../assets/realphar.png';
// import p1 from '../../assets/p1.png'
// import p2 from '../../assets/p2.png'
// import p3 from '../../assets/p3.png'
// import p4 from '../../assets/p4.png'

import { AiFillStar } from "react-icons/ai";
import './pharmamedia.css';

const Pharmacy = () => {
  
  return (
    <>
    <div className="relative w-[96%] h-auto mt-[10px] ml-[2%] rounded-3xl overflow-hidden">
      <img src={header} className='w-full h-full' ></img>
    </div>

  {/* <div className="flex justify-center items-center">
  <div className="flex flex-wrap justify-center gap-5 w-[95%]  p-5 rounded-2xl">
    {[
      { src: p1, label: "Respiratory Care" },
      { src: p2, label: "Diabetes Care" },
      { src: p3, label: "Kidney Care" },
      { src: p4, label: "Eye Care" },
      { src: p1, label: "Heart Care" },
      { src: p3, label: "Skin Care" },
    ].map((item, index) => (
      <div key={index} className="flex flex-col items-center w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[15%] hover:cursor-pointer">
        <img src={item.src} className="rounded-2xl w-full h-auto aspect-[4/5]" />
        <span className="mt-2 text-center text-gray-700 text-[20px] ">{item.label}</span>
      </div>
    ))}
  </div>
</div> */}


<div className='w-[90%] ml-[5%]'>
  <div className='flex items-center justify-between'>
  <h1 className='text-[30px] md:text-[40px] font-bold'>Trending Products <br/> for you</h1>
  <p className='transition-[0.3s] hidden md:block hover:cursor-pointer hover:underline '><a href="/allmedicines">View All Products</a></p>
  </div>
<div className='pharmamedgrid  grid grid-cols-4 gap-5'>
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
    </div>


    </>
  );
};

export default Pharmacy;
