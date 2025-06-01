/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [detectionType, setDetectionType] = useState(null); // 'pneumonia' or 'braintumor' or 'breastcancer'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
      setResult(null);
      setError(null);
    },
  });

  const analyzeImage = async () => {
    if (!image || !detectionType) return;
    
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('image', image);
      
      let endpoint = '';
      if (detectionType === 'pneumonia') {
        endpoint = 'http://127.0.0.1:8000/api/pneumonia/';
      } else if (detectionType === 'braintumor') {
        endpoint = 'http://127.0.0.1:8000/api/braintumor/';
      } else if (detectionType === 'breastcancer') {
        endpoint = 'http://127.0.0.1:8000/api/breastcancer/';
      }

      console.log("Sending request to:", endpoint);
      console.log("Image being sent:", image);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        // Explicitly NOT setting Content-Type header
      });
      
      const data = await response.json();
      console.log("API response:", data);
      
      // Handle validation errors (400 status code with error message)
      if (!response.ok) {
        if (data && data.error) {
          setError(data.error);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setResult(data);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError(err.message || "Failed to process image");
    } finally {
      setLoading(false);
    }
  };

  const handleDetectionClick = (type) => {
    setDetectionType(type);
    setIsModalOpen(true);
  };

  const resetDetection = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Pneumonia Section */}
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
                onClick={() => handleDetectionClick('pneumonia')}
              >
                Detect Pneumonia
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 relative">
            <img
              src="https://www.chenmed.com/sites/default/files/2024-06/Patient-Centered%20Care%20Strategies%20for%20Building%20Strong%20Doctor-Patient%20Relationships%20.jpg"
              alt="Smiling Patient"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Brain Tumor Section */}
      <div className="w-full p-6">
        <div className="min-h-auto bg-white text-black p-4 md:p-12 flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="flex-1 space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Detecting Brain Tumor
              <br /> Transforming Diagnoses with
              <br />
              <span className="text-blue-500">Advanced AI Image Detection</span>
            </h1>

            <p className="text-lg text-gray-600">
              From early detection to accurate diagnoses, Mediaid's brain tumor detection technology leverages cutting-edge AI and advanced imaging to deliver precise, timely, and life-saving insights for better neurological health.
            </p>

            <div className="flex gap-4">
              <button
                className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
                onClick={() => handleDetectionClick('braintumor')}
              >
                Detect Brain Tumor
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 relative">
            <img
              src="https://gspatients.com/wp-content/uploads/2023/03/Doctor-and-patient.jpg"
              alt="Smiling Patient"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Breast Cancer Section */}
      <div className="w-full p-6">
        <div className="min-h-auto bg-white text-black p-4 md:p-12 flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="flex-1 space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Detecting Breast Cancer
              <br /> Transforming Diagnoses with
              <br />
              <span className="text-blue-500">Advanced AI Image Detection</span>
            </h1>

            <p className="text-lg text-gray-600">
              From early detection to accurate diagnoses, Mediaid's breast cancer detection technology leverages cutting-edge AI and advanced imaging to deliver precise, timely, and life-saving insights for better women's health.
            </p>

            <div className="flex gap-4">
              <button
                className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
                onClick={() => handleDetectionClick('breastcancer')}
              >
                Detect Breast Cancer
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 relative">
            <img
              src="https://vidhilegalpolicy.in/wp-content/uploads/2023/04/iStock-1418999473.jpg"
              alt="Smiling Patient"
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Detection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-black text-xl"
              onClick={resetDetection}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6">
              {detectionType === 'pneumonia' && 'Pneumonia Detection'}
              {detectionType === 'braintumor' && 'Brain Tumor Detection'}
              {detectionType === 'breastcancer' && 'Breast Cancer Detection'}
            </h2>

            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500 transition mb-6"
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

            {image && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Uploaded Image:</h3>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-full rounded-lg shadow-lg"
                />
                {detectionType === 'pneumonia' && (
                  <div className="mt-3 p-2 bg-blue-50 text-sm text-blue-700 rounded">
                    <p className="font-semibold">Expected: Lung X-ray Image</p>
                  </div>
                )}
                {detectionType === 'braintumor' && (
                  <div className="mt-3 p-2 bg-blue-50 text-sm text-blue-700 rounded">
                    <p className="font-semibold">Expected: Brain MRI Scan</p>
                  </div>
                )}
                {detectionType === 'breastcancer' && (
                  <div className="mt-3 p-2 bg-blue-50 text-sm text-blue-700 rounded">
                    <p className="font-semibold">Expected: Mammogram Image</p>
                  </div>
                )}
                <button
                  onClick={analyzeImage}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white w-full rounded-lg hover:bg-blue-600 transition"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Analyze Image"}
                </button>
              </div>
            )}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-4 bg-blue-50 rounded-lg text-center"
              >
                <p className="text-blue-600 font-medium">Analyzing image...</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 p-6 bg-gray-50 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-4">Detection Results</h3>
                <div className="space-y-3">
                  {Object.entries(result).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
                      <span className="font-semibold">
                        {typeof value === 'number' ? value.toFixed(2) : value.toString()}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={resetDetection}
                  className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full"
                >
                  Analyze Another Image
                </button>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
              >
                <p className="font-medium">
                  {error.includes("Invalid image type") ? (
                    <>
                      <span className="font-bold block mb-2">Invalid Image Type</span>
                      {detectionType === 'pneumonia' && "Please upload a lung X-ray image."}
                      {detectionType === 'braintumor' && "Please upload a brain MRI image."}
                      {detectionType === 'breastcancer' && "Please upload a mammogram image."}
                    </>
                  ) : (
                    <>Error: {error}</>
                  )}
                </p>
                <div className="mt-2 text-sm text-red-600">
                  {error.includes("Invalid image type") && (
                    <ul className="list-disc pl-5">
                      {detectionType === 'pneumonia' && (
                        <>
                          <li>Ensure the image is a proper chest X-ray</li>
                          <li>Image should be in grayscale format</li>
                        </>
                      )}
                      {detectionType === 'braintumor' && (
                        <>
                          <li>Ensure the image is a proper brain MRI scan</li>
                          <li>Image should be in grayscale format</li>
                        </>
                      )}
                    </ul>
                  )}
                </div>
                <div className="flex mt-4 gap-2">
                  <button
                    onClick={() => setError(null)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => {
                      setError(null);
                      setImage(null);
                    }}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Upload New Image
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploader;