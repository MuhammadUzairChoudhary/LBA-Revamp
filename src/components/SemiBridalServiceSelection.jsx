import React from "react";

// Icon for Checkmarks (remains unchanged)
const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export default function SemiBridalServiceSelection({
  register,
  watch,
  errors,
  onNext,
  onBack,
  setValue,
}) {
  const watchedFields = watch();
  const selectedService = watchedFields.bride_service;

  const handleServiceSelect = (service) => {
    setValue("bride_service", service);
  };

  const handleNext = () => {
    if (selectedService) {
      onNext();
    }
  };

  const isNextEnabled = selectedService;

  // Helper component for consistent card styling - CONVERTED TO ROSE GLOW STANDARD
  const SelectCard = ({
    value,
    label,
    subtext,
    priceText,
    onClick,
    isSelected,
    registerProps,
  }) => (
    <div
      onClick={onClick}
      className={`
    group relative w-full p-7 sm:p-8 rounded-2xl border transition-all duration-300 text-left overflow-hidden cursor-pointer
    ${
      isSelected
        ? "border-rose-400/50 bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-fuchsia-500/20 backdrop-blur-xl shadow-2xl shadow-rose-500/20 scale-[1.01]"
        : "border-gray-700/50 bg-gray-800/40 backdrop-blur-sm hover:border-rose-400/40 hover:bg-gray-800/60 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-0.5"
    }
   `}
    >
      {/* Ambient glow effect on selected (Required by standard) */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-fuchsia-500/10 blur-xl"></div>
      )}
      <div className="relative flex items-center justify-between">
        <div className="flex items-start space-x-3 md:space-x-4">
          {/* The hidden radio input is necessary to pass the value to react-hook-form */}
          <input
            type="radio"
            {...registerProps}
            value={value}
            checked={isSelected}
            readOnly
            className="sr-only"
          />
          <div>
            {/* Title: Applied dark mode typography standard */}
            <h3
              className={`font-light text-xl md:text-2xl mb-1 leading-tight transition-colors ${
                isSelected
                  ? "text-white"
                  : "text-gray-100 group-hover:text-rose-300"
              }`}
            >
              {label}
            </h3>
            {/* Subtext: Applied dark mode typography standard */}
            <p
              className={`text-sm md:text-base font-light leading-relaxed transition-colors ${
                isSelected
                  ? "text-rose-100/90"
                  : "text-gray-400 group-hover:text-gray-300"
              }`}
            >
              {subtext}
            </p>
          </div>
        </div>

        <div className="text-right flex items-center space-x-2 md:space-x-3 ml-4">
          {/* Price Text: Aligned to the right, using rose accent when selected */}
          <span
            className={`text-sm md:text-base font-light ${
              isSelected ? "text-rose-200" : "text-gray-400"
            }`}
          >
            {priceText}
          </span>
          {/* Checkmark / Indicator */}
          {isSelected ? (
            <CheckCircleIcon className="w-7 h-7 sm:w-8 sm:h-8 text-rose-300 drop-shadow-lg flex-shrink-0" />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-500 flex-shrink-0"></div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    // Main container matching standard width and dark background treatment
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Inner Card Container: Dark, blurred, bordered standard */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-7 sm:p-10 lg:p-14 border border-gray-700/50 shadow-2xl shadow-gray-900/50">
        {/* Header Section: Applied elegant typography standard */}
        <div className="mb-10 sm:mb-14 text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide leading-tight"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Semi Bridal Service Details
            <span className="text-rose-400 ml-2 font-normal">*</span>
          </h2>
          {/* Divider line matching standard */}
          <div className="h-0.5 w-20 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 rounded-full mx-auto mb-5 opacity-80"></div>
          <p
            className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            What service do you need?
          </p>
        </div>

        {/* Service Cards */}
        <div className="space-y-5 mb-12 sm:mb-16">
          {/* Both Hair & Makeup */}
          <SelectCard
            value="Both Hair & Makeup"
            label="Both Hair & Makeup"
            subtext="Complete semi bridal styling package"
            priceText="Price varies by package"
            onClick={() => handleServiceSelect("Both Hair & Makeup")}
            isSelected={selectedService === "Both Hair & Makeup"}
            registerProps={register("bride_service")}
          />

          {/* Hair Only */}
          <SelectCard
            value="Hair Only"
            label="Hair Only"
            subtext="Professional hair styling"
            priceText="Price varies by package"
            onClick={() => handleServiceSelect("Hair Only")}
            isSelected={selectedService === "Hair Only"}
            registerProps={register("bride_service")}
          />

          {/* Makeup Only */}
          <SelectCard
            value="Makeup Only"
            label="Makeup Only"
            subtext="Professional makeup application"
            priceText="Price varies by package"
            onClick={() => handleServiceSelect("Makeup Only")}
            isSelected={selectedService === "Makeup Only"}
            registerProps={register("bride_service")}
          />
        </div>

        {errors.bride_service && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg shadow-xl shadow-red-900/20 text-center mx-auto">
            <p className="text-sm text-red-200 font-light">
              {errors.bride_service.message}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 sm:pt-8 border-t border-gray-700/50 mt-4 md:mt-6">
          {/* Back Button (Secondary Style) */}
          <button
            type="button"
            onClick={onBack}
            className="group relative px-6 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden bg-gray-700/50 text-gray-200 shadow-lg shadow-gray-900/50 hover:bg-gray-700/80 hover:scale-[1.03] active:scale-100 cursor-pointer border border-gray-600/30"
            style={{ letterSpacing: "0.05em" }}
          >
            <span className="relative">Back</span>
          </button>

          {/* Continue Button (Primary Style - Rose Glow Gradient) */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!isNextEnabled}
            className={`
       relative px-10 sm:px-12 py-3.5 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden
       ${
         isNextEnabled
           ? "bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:scale-105 active:scale-100 cursor-pointer border border-rose-400/30"
           : "bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/30"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// import React from 'react';

// // Define the elegant color palette (Indigo theme)
// const PRIMARY_COLOR_CLASS = 'indigo-600';
// const PRIMARY_HOVER_CLASS = 'indigo-700';
// const LIGHT_ACCENT_CLASS = 'indigo-50'; // For lighter text on selection background

// // Icon for Checkmarks
// const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
//     <svg className={className} fill="currentColor" viewBox="0 0 20 20">
//       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//     </svg>
// );

// export default function SemiBridalServiceSelection({ register, watch, errors, onNext, onBack, setValue }) {
//   const watchedFields = watch();
//   const selectedService = watchedFields.bride_service;

//   const handleServiceSelect = (service) => {
//     setValue('bride_service', service);
//   };

//   const handleNext = () => {
//     if (selectedService) {
//       onNext();
//     }
//   };

//   const isNextEnabled = selectedService;

//   // Helper component for consistent card styling
//   const SelectCard = ({ value, label, subtext, priceText, onClick, isSelected, registerProps }) => (
//     <div
//       onClick={onClick}
//       className={`
//         border border-gray-200 rounded-xl p-4 md:p-6 cursor-pointer transition-all duration-300 shadow-lg
//         ${isSelected
//           ? `bg-${PRIMARY_COLOR_CLASS} border-${PRIMARY_COLOR_CLASS} text-white transform scale-[1.01] shadow-xl`
//           : `bg-white hover:border-${PRIMARY_COLOR_CLASS} hover:shadow-xl hover:scale-[1.005]`
//         }
//       `}
//     >
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3 md:space-x-4">
//             {/* The hidden radio input is necessary to pass the value to react-hook-form */}
//             <input
//                 type="radio"
//                 {...registerProps}
//                 value={value}
//                 checked={isSelected}
//                 readOnly
//                 className="sr-only"
//             />
//           <div>
//             <h3 className={`font-bold text-lg md:text-xl mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
//               {label}
//             </h3>
//             <p className={`text-sm md:text-base ${isSelected ? `text-${LIGHT_ACCENT_CLASS}` : 'text-gray-600'}`}>
//               {subtext}
//             </p>
//           </div>
//         </div>

//         <div className="text-right flex items-center space-x-2 md:space-x-3">
//             <span className={`text-sm md:text-base ${isSelected ? 'text-white' : 'text-gray-500'}`}>
//               {priceText}
//             </span>
//             {isSelected ? (
//                 <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
//             ) : (
//                 <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-gray-300"></div>
//             )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     // Applied elegant container styling (max-w-6xl, shadow-2xl, increased padding)
//     <div className="max-w-sm md:max-w-2xl lg:max-w-6xl mx-auto px-4 py-8 md:py-12">
//       <div className="bg-white rounded-xl shadow-2xl p-6 md:p-14 border border-gray-50">

//         {/* Header Section: Applied elegant typography (font-light, larger size) */}
//         <div className="mb-10 md:mb-14">
//           <h2 className="text-base md:text-2xl lg:text-4xl font-light text-gray-900 mb-3 tracking-tight text-left">
//             Semi Bridal Service Details
//           </h2>
//           <p className="text-gray-500 text-sm md:text-base lg:text-lg">What service do you need?</p>
//         </div>

//         <div className="space-y-6 mb-12">
//           {/* Both Hair & Makeup */}
//           <SelectCard
//             value="Both Hair & Makeup"
//             label="Both Hair & Makeup"
//             subtext="Complete semi bridal styling package"
//             priceText="Price varies by package"
//             onClick={() => handleServiceSelect('Both Hair & Makeup')}
//             isSelected={selectedService === 'Both Hair & Makeup'}
//             registerProps={register('bride_service')}
//           />

//           {/* Hair Only */}
//           <SelectCard
//             value="Hair Only"
//             label="Hair Only"
//             subtext="Professional hair styling"
//             priceText="Price varies by package"
//             onClick={() => handleServiceSelect('Hair Only')}
//             isSelected={selectedService === 'Hair Only'}
//             registerProps={register('bride_service')}
//           />

//           {/* Makeup Only */}
//           <SelectCard
//             value="Makeup Only"
//             label="Makeup Only"
//             subtext="Professional makeup application"
//             priceText="Price varies by package"
//             onClick={() => handleServiceSelect('Makeup Only')}
//             isSelected={selectedService === 'Makeup Only'}
//             registerProps={register('bride_service')}
//           />
//         </div>

//         {errors.bride_service && (
//           <p className="mt-2 text-sm text-red-600 text-center mb-8">{errors.bride_service.message}</p>
//         )}

//         {/* Navigation Buttons */}
//         <div className="flex justify-between items-center pt-6 md:pt-8 border-t border-gray-100 mt-4 md:mt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             // Back button MATCHED to primary style (solid Indigo fill)
//             className={`
//               px-4 py-2 md:px-6 md:py-3 lg:px-10 lg:py-3.5 rounded-xl font-bold text-sm md:text-base lg:text-lg shadow-lg transition-all duration-300
//               bg-${PRIMARY_COLOR_CLASS} text-white
//               hover:bg-${PRIMARY_HOVER_CLASS} hover:shadow-xl transform hover:scale-[1.01] cursor-pointer
//             `}
//           >
//             Back
//           </button>

//           <button
//             type="button"
//             onClick={handleNext}
//             disabled={!isNextEnabled}
//             className={`
//               px-4 py-2 md:px-6 md:py-3 lg:px-10 lg:py-3.5 rounded-xl font-bold text-sm md:text-base lg:text-lg shadow-lg transition-all duration-300
//               ${isNextEnabled
//                 ? `bg-${PRIMARY_COLOR_CLASS} text-white hover:bg-${PRIMARY_HOVER_CLASS} hover:shadow-xl transform hover:scale-[1.01] cursor-pointer`
//                 : 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
//               }
//             `}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
