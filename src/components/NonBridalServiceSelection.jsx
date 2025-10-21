"use client"

// Define the elegant color palette (Rose Glow Dark Mode theme)
const WARNING_COLOR_CLASS = "amber-300"

// PROFESSIONAL ICON ADDITIONS (Reused for consistency)
const HairStylistIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.5 5.5l-9 9m9-9h-4m4 0v4m-5 3c-.78 0-1.5-.28-2.07-.75C6.88 14.5 7 13.78 7 13c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3c.78 0 1.5.28 2.07.75.57.47.88 1.19.88 1.95s-.31 1.48-.88 1.95c-.57.47-1.29.75-2.07.75s-1.5-.28-2.07-.75C6.88 17.5 7 16.78 7 16c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3c.78 0 1.5.28 2.07.75.57.47.88 1.19.88 1.95s-.31 1.48-.88 1.95m12.43-1.25l-9-9m9 9h4m-4 0v-4"
    />
  </svg>
)

const ErrorIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
)

export default function NonBridalServiceSelection({ register, watch, errors, onNext, onBack, setValue }) {
  const watchedFields = watch()
  const personCount = watchedFields.nonBridal?.personCount || ""

  const handleNext = () => {
    if (personCount && personCount > 0) {
      onNext()
    }
  }

  const isNextEnabled = personCount && personCount > 0

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
      {/* Inner Card Container: Light theme with charcoal accents */}
      <div className="bg-white rounded-2xl p-5 sm:p-10 lg:p-14 border border-gray-200 shadow-2xl shadow-gray-400/20">
        {/* Header Section: Applied elegant typography standard */}
        <div className="mb-10 sm:mb-14 text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-wide leading-tight"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Non-Bridal Service Count
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-full mx-auto mb-5 opacity-80"></div>
          <p
            className="text-gray-600 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Please specify the number of people requiring services for your event or photoshoot.
          </p>
        </div>

        <div className="space-y-6 mb-12 sm:mb-16">
          {/* Person Count Input Field */}
          <div className="border border-gray-300 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-50 shadow-sm">
            <div className="flex items-start gap-4 mb-4">
              <div>
                <label className="block text-lg font-light text-gray-900 mb-2">
                  Number of people requiring hair & makeup services
                </label>
                <p className="text-sm text-gray-600 font-light">
                  This count includes everyone needing services for the event.
                </p>
              </div>
            </div>

            <input
              type="number"
              min={1}
              placeholder="Enter number of people (Minimum 1)"
              {...register("nonBridal.personCount", { required: true, min: 1 })}
              className={`
        w-full px-4 py-2 md:px-5 md:py-3 rounded-xl transition-all duration-200 text-gray-900
        bg-white border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-600
        font-light text-base md:text-lg
        ${errors?.nonBridal?.personCount ? "border-red-400 focus:border-red-500 focus:ring-red-500/50" : ""}
       `}
            />
            {errors?.nonBridal?.personCount && (
              <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg shadow-sm flex items-center">
                <ErrorIcon className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                <p className="text-red-700 text-sm font-light">
                  Please enter how many people need service (minimum 1).
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-6 pt-6 sm:pt-8 border-t border-gray-200">
          {/* Back Button (Secondary Style) */}
          <button
            type="button"
            onClick={onBack}
            className="group relative px-6 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden bg-gray-200 text-gray-700 shadow-md shadow-gray-400/20 hover:bg-gray-300 hover:scale-[1.03] active:scale-100 cursor-pointer border border-gray-300"
            style={{ letterSpacing: "0.05em" }}
          >
            <span className="relative">Back</span>
          </button>

          {/* Continue Button (Primary Style - Charcoal Gray) */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!isNextEnabled}
            className={`
       relative px-10 sm:px-12 py-3.5 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden
       ${
         isNextEnabled
           ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg shadow-gray-700/30 hover:shadow-2xl hover:shadow-gray-700/40 hover:scale-105 active:scale-100 cursor-pointer border border-gray-600"
           : "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400"
       }
      `}
            style={{ letterSpacing: "0.05em" }}
          >
            {/* Animated shimmer effect (Only on enabled state) */}
            {isNextEnabled && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out"></div>
            )}
            <span className="relative flex items-center justify-center gap-2.5">
              Continue
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

// import React from 'react';

// export default function NonBridalServiceSelection({ register, watch, errors, onNext, onBack, setValue }) {
//   const watchedFields = watch();
//   const personCount = watchedFields.nonBridal?.personCount || '';

//   const handleNext = () => {
//     if (personCount && personCount > 0) {
//       onNext();
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">How many people need our service?</h2>
//       </div>

//       <div className="space-y-6 mb-8">
//         {/* Person Count */}
//         <div className="border rounded-lg p-6 bg-gray-50">
//           <label className="block text-lg font-semibold text-gray-800 mb-2">
//             Number of people requiring hair & makeup services
//           </label>
//           <input
//             type="number"
//             min={1}
//             placeholder="Enter number of people"
//             {...register('nonBridal.personCount', { required: true, min: 1 })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           {errors?.nonBridal?.personCount && (
//             <p className="text-red-500 text-sm mt-2">Please enter how many people need service (minimum 1).</p>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-between">
//         <button
//           type="button"
//           onClick={onBack}
//           className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
//         >
//           ← Back
//         </button>
//         <button
//           type="button"
//           onClick={handleNext}
//           disabled={!personCount || personCount <= 0}
//           className={`px-6 py-3 rounded-lg transition-colors ${
//             personCount && personCount > 0
//               ? 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           Continue →
//         </button>
//       </div>
//     </div>
//   );
// }
