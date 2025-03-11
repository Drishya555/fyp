import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setLoading(true);
      setCompleted(false);
      setImage(acceptedFiles[0]);
      setProgress(0);
      setPaused(false);
    },
  });

  useEffect(() => {
    if (loading && !paused) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            setCompleted(true);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [loading, paused]);

  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const simulateUpload = () => {
    let interval = setInterval(() => {
      if (!paused) {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            setCompleted(true);
            return 100;
          }
          return prev + 5;
        });
      }
    }, 200);
  };

  

  return (

    <>
    <div className="relative min-h-[40vh] bg-gray-100 flex items-center justify-start">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src="https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?cs=srgb&dl=pexels-tomfisk-1692693.jpg&fm=jpg"
      alt="Roofing Service"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Content (Left-aligned) */}
  <div className="relative z-10 max-w-7xl pl-8 sm:pl-16 lg:pl-32">
    <div className="mt-12 mb-12">
      <p className="text-white text-sm uppercase mb-4">MediAid&apos;s Special</p>
      <h2 className="text-white text-5xl md:text-7xl font-bold leading-tight">
        Disease Detection® <br /> Powered By AI
      </h2>
      <p className="text-white mt-6 max-w-xl">
      Eline utilizes advanced AI image detection technology to accurately identify and analyze visual content, enhancing efficiency and precision in various applications.
      </p>
      <button className="mt-8 px-6 py-3 rounded-full bg-white text-gray-900 hover:bg-gray-200 transition-all">
        Get Started
      </button>
    </div>
  </div>
</div>

<div className="w-full p-6">
      <div className="min-h-auto bg-white text-black p-4 md:p-12 flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Detecting Pneumonia
            <br /> Transforming Diagnoses with
            <br />
            <span className="text-blue-500">Advanced AI Image Detection</span>
          </h1>

          <p className="text-lg text-gray-600">
            From early detection to accurate diagnoses, Mediaid's pneumonia detection technology leverages cutting-edge AI and advanced imaging to deliver precise, timely, and life-saving insights for better respiratory health.
          </p>

          <div className="flex gap-4">
            <button
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Detect Pneumonia
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 relative">
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Smiling Patient"
            className="w-full rounded-xl"
          />
        </div>
      </div>






<div className="w-full p-6">
<div className="min-h-auto bg-white text-black p-4 md:p-12 flex flex-col md:flex-row gap-8">
      {/* Left Section */}
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="inline-flex items-center">
          </span>
          Detecting Brain Tumor
 <br /> Transforming Diagnoses with
 <br />
          <span className="text-blue-500">Advanced AI Image Detection

</span>
        </h1>

        <p className="text-lg text-gray-600">
        From early detection to accurate diagnoses, Mediaid&apos;s pneumonia detection technology leverages cutting-edge AI and advanced imaging to deliver precise,\
         timely, and life-saving insights for better respiratory health.
        </p>

        <div className="flex gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">Detect Brain Tumor</button>
          
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative">
        <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Smiling Patient" className="w-full rounded-xl" />
      </div>
    </div>
</div>








<div className="w-full p-6">
<div className="min-h-auto bg-white text-black p-4 md:p-12 flex flex-col md:flex-row gap-8">
      {/* Left Section */}
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="inline-flex items-center">
          </span>
          Detecting Breast Cancer
 <br /> Transforming Diagnoses with
 <br />
          <span className="text-blue-500">Advanced AI Image Detection

</span>
        </h1>

        <p className="text-lg text-gray-600">
        From early detection to accurate diagnoses, Mediaid&apos;s pneumonia detection technology leverages cutting-edge AI and advanced imaging to deliver precise,\
         timely, and life-saving insights for better respiratory health.
        </p>

        <div className="flex gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">Detect Breast Cancer</button>
          
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 relative">
        <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Smiling Patient" className="w-full rounded-xl" />
      </div>
    </div>
</div>





    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-[500px]">
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500 transition"
        >
          <input {...getInputProps()} />
          {!image ? (
            <p className="text-gray-500">
              <span className="font-semibold">Drop your image here</span>, or{' '}
              <span className="text-blue-500 underline">browse</span>
              <br /> Supports: JPG, PNG
            </p>
          ) : (
            <p className="text-gray-700">{image.name}</p>
          )}
        </div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <p className="text-blue-600 font-medium mb-2">Uploading...</p>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div   
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-blue-500 rounded-full"
              />
            </div>
            <div className="flex items-center mt-4 space-x-4">
              <button
                onClick={() => setPaused((prev) => !prev)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg"
              >
                {paused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={() => {
                  setLoading(false);
                  setImage(null);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mt-6 p-4 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg shadow-md"
          >
            Upload Completed Successfully!
          </motion.div>
        )}
      </div>
    </div>

    {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-3xl shadow-xl w-[500px]">
            <button
              className="absolute top-4 right-4 text-black text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500 transition"
            >
              <input {...getInputProps()} />
              {!image ? (
                <p className="text-gray-500">
                  <span className="font-semibold">Drop your image here</span>, or{' '}
                  <span className="text-blue-500 underline">browse</span>
                  <br /> Supports: JPG, PNG
                </p>
              ) : (
                <p className="text-gray-700">{image.name}</p>
              )}
            </div>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6"
              >
                <p className="text-blue-600 font-medium mb-2">Uploading...</p>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    onClick={() => setPaused((prev) => !prev)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                  >
                    {paused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={() => {
                      setLoading(false);
                      setImage(null);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {completed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="mt-6 p-4 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg shadow-md"
              >
                Upload Completed Successfully!
              </motion.div>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default ImageUploader;
