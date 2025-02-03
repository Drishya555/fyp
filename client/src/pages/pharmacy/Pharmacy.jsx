import header from '../../assets/pharmacyhead.png';
import p1 from '../../assets/p1.png'
import p2 from '../../assets/p2.png'
import p3 from '../../assets/p3.png'
import p4 from '../../assets/p4.png'

const Pharmacy = () => {
  return (
    <>
    <div className="w-[96%] h-auto mt-[10px] ml-[2%] rounded-xl overflow-hidden">
      <img src={header} className='w-full h-full' ></img>
    </div>

  <div className="flex justify-center items-center">
  <div className="flex flex-wrap justify-center gap-5 w-[95%]  p-5 rounded-2xl">
    {[
      { src: p1, label: "Respiratory Care" },
      { src: p2, label: "Diabetes Care" },
      { src: p3, label: "Kidney Care" },
      { src: p4, label: "Eye Care" },
      { src: p1, label: "Heart Care" },
      { src: p3, label: "Skin Care" },
    ].map((item, index) => (
      <div key={index} className="flex flex-col items-center w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[15%]">
        <img src={item.src} className="rounded-2xl w-full h-auto aspect-[4/5]" />
        <span className="mt-2 text-center text-gray-700 font-medium">{item.label}</span>
      </div>
    ))}
  </div>
</div>




<div className="flex w-[95%] p-5">
    
</div>




    </>
  );
};

export default Pharmacy;
