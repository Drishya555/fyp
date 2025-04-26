/* eslint-disable react/no-unknown-property */
export default function MediaidNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      {/* Main Content */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-bold text-blue-500 mb-6">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
            Page not found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed or doesn&apos;t exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg transition-all hover:bg-blue-600 shadow hover:shadow-md"
              onClick={() => window.location.href = '/'}
            >
              Go to Homepage
            </button>
            <button 
              className="px-6 py-3 bg-white text-blue-500 font-medium rounded-lg border border-blue-500 transition-all hover:bg-blue-50"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Medical Graphic */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            {/* Pulsing circles */}
            <div className="absolute inset-0 border-2 border-blue-200 rounded-full animate-pulse opacity-30" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-6 border-2 border-blue-300 rounded-full animate-pulse opacity-40" style={{ animationDuration: '2.5s', animationDelay: '0.2s' }}></div>
            <div className="absolute inset-12 border-2 border-blue-400 rounded-full animate-pulse opacity-50" style={{ animationDuration: '2s', animationDelay: '0.4s' }}></div>
            
            {/* Medical cross */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <div className="absolute bg-blue-500 rounded-md w-full h-3 md:h-4 top-1/2 -translate-y-1/2"></div>
                <div className="absolute bg-blue-500 rounded-md h-full w-3 md:w-4 left-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Mediaid. All rights reserved.</p>
      </footer>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}