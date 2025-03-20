import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const DoctorProfile = () => {
  const [doctor, setDoctor] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    // Fetch doctor data from API
    fetch(`http://localhost:8000/api/doctors/getselecteddoc/${id}`)
      .then((response) => response.json())
      .then((data) => setDoctor(data));
  }, []);



  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Doctor Info */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          {/* Doctor Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <img
              src="https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png"
              alt="Doctor"
              className="w-24 h-24 rounded-full"
            />
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800">
                Rayna Westervelt M.Psi
              </h1>
              <p className="text-sm text-gray-500">ENT Doctor</p>
              <p className="text-sm text-gray-500">
                Siloam Hospitals, West Bekasi, Bekasi
              </p>
              <div className="flex gap-2 mt-2 justify-center md:justify-start">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  Full-time
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  250K - 350K
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  94%
                </span>
              </div>
            </div>
          </div>

          {/* Doctor Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Doctor Profile
            </h2>
            <p className="text-gray-600 mt-2">
              With a seasoned career spanning four years, our ENT specialist
              brings a wealth of experience and expertise to the field. Having
              dedicated their professional journey to ear, nose, and throat care,
              they have honed their skills in diagnosing and treating a wide
              range of ENT conditions. Their commitment to staying abreast of the
              latest advancements in the field ensures that patients receive
              cutting-edge care.
            </p>
            <a href="#" className="text-blue-600 mt-2 inline-block">
              More →
            </a>
          </div>

          {/* Practice Experience */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Practice Experience
            </h2>
            <ul className="mt-2 space-y-4">
              <li className="flex items-start gap-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6EYlFuMb3pGni74Aa2zM9vSOBstsqEfWwNg&s"
                  alt="Hospital Logo"
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-gray-800 font-medium">
                    Siloam Hospitals Bekasi Timur
                  </p>
                  <p className="text-gray-600 text-sm">
                    ENT Doctor • Neurology • Online Consultation
                  </p>
                  <p className="text-gray-500 text-sm">
                    Dec 2022 - Present • 1 yrs 1 mos
                  </p>
                  <p className="text-gray-500 text-sm">
                    Margahayu, Kec. Bekasi Timur, West Java
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9DzkpdrFD8NrUwada9ezpgwJn6QhkMI-pJQ&s"
                  alt="Hospital Logo"
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-gray-800 font-medium">
                    Mitra Keluarga Pratama Jatiasih
                  </p>
                  <p className="text-gray-600 text-sm">
                    ENT Doctor • Otology • Fulltime
                  </p>
                  <p className="text-gray-500 text-sm">
                    Dec 2021 - Nov 2022 • 1 yrs 0 mos
                  </p>
                  <p className="text-gray-500 text-sm">
                    Jatimekar, Kec. Jatiasih, West Java
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQggnc_Xiee3x6TkGBi7GXcNf1aONOh1mtKmA&s"
                  alt="Hospital Logo"
                  className="w-10 h-10"
                />
                <div>
                  <p className="text-gray-800 font-medium">
                    RS Ananda Bekasi
                  </p>
                  <p className="text-gray-600 text-sm">
                    ENT Doctor • Otology • Fulltime
                  </p>
                  <p className="text-gray-500 text-sm">
                    Feb 2019 - Oct 2021 • 2 yrs 8 mos
                  </p>
                  <p className="text-gray-500 text-sm">
                    Medan Satria, Kec. Medan Satria, Bekasi City
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Doctor Review */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Doctor Review
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80"
                alt="Reviewer"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-medium">Makenna Scheffler</p>
                <p className="text-gray-500 text-sm">20 January 2024 • 05:54</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Medical Actions & Articles */}
        <div className="space-y-6">
          {/* Medical Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Medical Actions
            </h2>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>Brainstem Evoked Response Audiometry (BERA)</li>
              <li>ENT Surgery</li>
              <li>ENT Consultation</li>
              <li>Ear Endoscopy</li>
              <li>Ear Cleaning</li>
              <li>Tympanoplasty</li>
              <li>Hearing Test</li>
            </ul>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
              Make Appointments
            </button>
          </div>

          {/* Download App */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Download now to start your research
            </h2>
            <div className="flex justify-center gap-3 mt-4">
              <img
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80"
                alt="App Store"
                className="h-10"
              />
              <img
                src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80"
                alt="Google Play"
                className="h-10"
              />
            </div>
          </div>

          {/* Articles */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800">Health</h2>
            <ul className="mt-2 space-y-4">
              <li className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
                  alt="Article"
                  className="w-16 h-16 rounded"
                />
                <div>
                  <p className="text-gray-800 font-medium">
                    The Impact of Nutrition on Mental Health
                  </p>
                  <p className="text-gray-500 text-sm">January 7, 2024</p>
                  <a href="#" className="text-blue-600 text-sm">
                    Read more →
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1576765607924-3f7b8410f1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
                  alt="Article"
                  className="w-16 h-16 rounded"
                />
                <div>
                  <p className="text-gray-800 font-medium">
                    Baby Crying During Sleep: 6 Causes and Remedies
                  </p>
                  <p className="text-gray-500 text-sm">January 7, 2024</p>
                  <a href="#" className="text-blue-600 text-sm">
                    Read more →
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80"
                  alt="Article"
                  className="w-16 h-16 rounded"
                />
                <div>
                  <p className="text-gray-800 font-medium">
                    Identifying Non-Harmful Characteristics of Lumps in the Armpit
                  </p>
                  <p className="text-gray-500 text-sm">January 7, 2024</p>
                  <a href="#" className="text-blue-600 text-sm">
                    Read more →
                  </a>
                </div>
              </li>
            </ul>
            <a href="#" className="text-blue-600 mt-4 inline-block">
              See All
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;