import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../lib/currencyFormat";

// Cloud Upload Icon (using strokeWidth=1.5 for consistency with custom icons)
const UploadIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

// Chevron Right Icon (using strokeWidth=2 for consistency with previous chevrons)
const ChevronRightIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default function PaymentScreenshotUpload() {
  const navigate = useNavigate();

  return (
    // FIXED: Added px-4 to match the BookingHeader's padding and layout
    <div className="max-w-2xl mx-auto px-4">
      <button
        onClick={() => navigate("/interac-upload")}
        className="group relative cursor-pointer inline-flex items-center justify-between w-full px-5 py-4 sm:py-5 rounded-xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm transition-all duration-300 text-left overflow-hidden hover:border-gray-900 hover:bg-gray-800/60 hover:shadow-xl hover:shadow-gray-800/10 hover:-translate-y-0.5"
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/5 to-gray-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative flex items-center flex-1 min-w-0">
          {/* Upload Icon */}
          <UploadIcon className="w-5 h-5 mr-3 flex-shrink-0 text-gray-950 transition-colors duration-300 group-hover:text-gray-50" />

          {/* Text Container */}
          <div className="text-left relative flex-1 min-w-0 pr-6">
            {/* Main Text */}
            <div className="font-normal text-base sm:text-lg text-gray-900 group-hover:text-gray-50 transition-colors">
              Upload your Interac screenshot here.
            </div>
            {/* Note Text */}
            <div className="text-xs sm:text-sm mt-1 text-gray-800 group-hover:text-gray-200 transition-colors font-light italic truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              Note: You can upload first or last payment screenshot against your
              booking ID here.
            </div>
          </div>
        </div>

        {/* Chevron Icon */}
        <ChevronRightIcon className="w-5 h-5 flex-shrink-0 text-gray-900 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gray-50" />
      </button>
    </div>
  );
}

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { formatCurrency } from '../../lib/currencyFormat'; // Added currency formatter import

// export default function PaymentScreenshotUpload() {
//   const navigate = useNavigate();

//   return (
//     <button
//       onClick={() => navigate('/interac-upload')}
//       className="group cursor-pointer inline-flex items-center px-3 py-1.5 md:px-8 md:py-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 hover:border-blue-300 rounded-xl text-blue-700 hover:text-blue-800 font-semibold text-xs md:text-base transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 w-[650px] justify-center"
//     >
//       <svg className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//       </svg>
//       <div className="text-center">
//         <div className="font-semibold">Upload your Interac screenshot here.</div>
//         <div className="text-xs mt-1">Note: You can upload first or last payment screenshot against your booking ID here.</div>
//       </div>
//       <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
//       </svg>
//     </button>
//   );
// }
