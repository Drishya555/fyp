import Sidebar from '../../components/Sidebar'; // Import Sidebar component
import { AiOutlineStock } from "react-icons/ai";
import './appcss.css';

const AppDashboard = () => {
  return (
    <>
      <div className="flex">
        {/* Sidebar Component */}
        <div className='h-screen fixed z-10 w-[250px]'>
          <Sidebar />
        </div>

        {/* Main Content Section */}
        <section className="flex-1 sm:ml-[70px] lg:ml-[256px] ml-0"> {/* Added responsive margin-left */}
          <div className="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44">
            <div className="absolute inset-0 hidden lg:block">
              <img className="object-cover object-right-bottom w-full h-full" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/background.png" alt />
            </div>
            <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-xl mx-auto text-center lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
                <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight">Book an appointment NOW!</h1>
                <p className="mt-8 text-base font-normal leading-7 text-gray-400 lg:max-w-md xl:pr-0 lg:pr-16">
                  With MediAid&apos;s easy to use booking system, scheduling your medical appointments has never been simpler.
                </p>
                <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
                  <a href="#" title className="inline-flex items-center justify-center px-3 py-3 text-base font-bold leading-7 text-gray-900 transition-all duration-200 bg-white border border-transparent rounded-md sm:px-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white hover:bg-gray-200" role="button">
                    Book Now
                  </a>
                  <a href="#" title className="inline-flex items-center justify-center px-2 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-transparent border border-transparent rounded-md sm:px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-700 hover:bg-gray-700" role="button">
                    View Verified Doctors
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:hidden">
              <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/bg.png" alt />
            </div>
          </div>

          <div className='appusergrid w-[98%] h-[15vh] ml-[1%] mt-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-[550px]'>
            <div className='h-full bg-white shadow-lg rounded-xl p-6'>
              <h1 className='text-[23px]'>Total Appointments</h1>
              <div className='flex w-full justify-between items-center'>
                <p className='text-[50px]'>15</p>
                <p className='flex text-homegreen items-center'><AiOutlineStock /> 26%</p>
              </div>
            </div>
            <div className='h-full bg-white shadow-lg rounded-xl p-6'>
              <h1 className='text-[23px]'>Total Amount Spent</h1>
              <div className='flex w-full justify-between items-center'>
                <p className='text-[40px]'>Rs.45,000 /-</p>
                <p className='flex text-homegreen items-center'><AiOutlineStock /> 26%</p>
              </div>
            </div>
            <div className='h-full bg-white shadow-lg rounded-xl p-6'>
              <h1 className='text-[23px]'>E-Pharmacy</h1>
              <div className='flex w-full justify-between items-center'>
                <p className='text-[40px]'>Rs.25,000 /-</p>
                <p className='flex text-homegreen items-center'><AiOutlineStock /> 10%</p>
              </div>
            </div>
            <div className='h-full bg-white shadow-lg rounded-xl p-6'>
              <h1 className='text-[23px]'>Appointments</h1>
              <div className='flex w-full justify-between items-center'>
                <p className='text-[40px]'>Rs.20,000 /-</p>
                <p className='flex text-homegreen items-center'><AiOutlineStock /> 24%</p>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  );
};

export default AppDashboard;
