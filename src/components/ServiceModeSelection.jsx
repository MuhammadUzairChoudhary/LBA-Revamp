"use client"
import { useState, useEffect } from "react"
import PaymentScreenshotUpload from "./PaymentScreenshotUpload"

// Modern check icon
const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)

// Professional Studio Icon
const StudioIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

// Mobile Service Icon
const MobileIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
    />
    <circle cx="7" cy="17" r="1.5" fill="currentColor" />
    <circle cx="17" cy="17" r="1.5" fill="currentColor" />
  </svg>
)

const EditIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
)

const UploadIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

export default function ServiceModeSelection({ onNext, register, setValue, getValues, watch, errors }) {
  const [selectedMode, setSelectedMode] = useState("")

  const serviceModes = [
    {
      id: "studio",
      name: "Studio Service",
      value: "Studio Service",
      description: "Visit our professional studio location",
      icon: "studio",
    },
    {
      id: "mobile",
      name: "Mobile Makeup Artist",
      value: "Mobile Makeup Artist",
      description: "We come to your preferred location",
      icon: "mobile",
    },
  ]

  const watchedServiceMode = watch("service_mode")
  useEffect(() => {
    if (watchedServiceMode) {
      const mode = serviceModes.find((m) => m.value === watchedServiceMode)
      if (mode) {
        setSelectedMode(mode.name)
      }
    } else {
      setSelectedMode("")
    }
  }, [watchedServiceMode])

  const handleModeSelect = (mode) => {
    setSelectedMode(mode.name)
    setValue("service_mode", mode.value)

    if (mode.value === "Studio Service") {
      setValue("region", "Toronto/GTA")
      setValue("subRegion", "")
    }
  }

  const handleNext = () => {
    if (selectedMode) {
      onNext()
    }
  }

  const isNextEnabled = !!selectedMode

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <div className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 shadow-2xl shadow-gray-400/20">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-5">
          <h2
            className="text-2xl sm:text-3xl font-light text-gray-900 mb-3 tracking-wide"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Choose Your Service
            <span className="text-gray-400 ml-2">*</span>
          </h2>
          <p
            className="text-gray-600 text-sm sm:text-base font-light max-w-2xl mx-auto"
            style={{ letterSpacing: "0.01em" }}
          >
            Select the service delivery option that works best for you
          </p>
        </div>

        {/* Service Mode Cards */}
        <div className="space-y-3 mb-6 sm:mb-5">
          {serviceModes.map((mode) => {
            const isSelected = selectedMode === mode.name
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleModeSelect(mode)}
                className={`group relative w-full p-4 sm:p-5 rounded-lg border transition-all duration-300 text-left overflow-hidden cursor-pointer ${
                  isSelected
                    ? "border-gray-700/50 bg-gray-100 shadow-lg shadow-gray-400/20"
                    : "border-gray-300 bg-white hover:border-gray-500 hover:bg-gray-50 hover:shadow-md hover:shadow-gray-400/10"
                }`}
              >
                <div className="relative flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg transition-all duration-300 ${
                      isSelected
                        ? "bg-gray-300/50 shadow-md shadow-gray-500/20"
                        : "bg-gray-200/50 group-hover:bg-gray-300/50 group-hover:scale-105"
                    }`}
                  >
                    {mode.icon === "studio" ? (
                      <StudioIcon
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                          isSelected ? "text-gray-700" : "text-gray-600 group-hover:text-gray-700"
                        }`}
                      />
                    ) : (
                      <MobileIcon
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                          isSelected ? "text-gray-700" : "text-gray-600 group-hover:text-gray-700"
                        }`}
                      />
                    )}
                  </div>

                  {/* Heading + Description Only */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        className={`text-base sm:text-lg font-light transition-colors leading-tight ${
                          isSelected ? "text-gray-900" : "text-gray-800 group-hover:text-gray-900"
                        }`}
                        style={{ letterSpacing: "0.01em" }}
                      >
                        {mode.name}
                      </h3>

                      <div
                        className={`flex-shrink-0 ml-2 transition-all duration-300 ${
                          isSelected ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"
                        }`}
                      >
                        <CheckCircleIcon className="w-5 h-5 text-gray-700 drop-shadow-lg" />
                      </div>
                    </div>

                    <p
                      className={`text-xs sm:text-sm font-light transition-colors leading-relaxed ${
                        isSelected ? "text-gray-700" : "text-gray-600 group-hover:text-gray-700"
                      }`}
                      style={{ letterSpacing: "0.01em" }}
                    >
                      {mode.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={handleNext}
            disabled={!isNextEnabled}
            className={`relative px-8 sm:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-light rounded-lg transition-all duration-300 overflow-hidden ${
              isNextEnabled
                ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-md shadow-gray-700/20 hover:shadow-lg hover:shadow-gray-700/30 hover:scale-[1.02] active:scale-100 cursor-pointer border border-gray-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400"
            }`}
            style={{ letterSpacing: "0.05em" }}
          >
            {isNextEnabled && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out"></div>
            )}
            <span className="relative flex items-center justify-center gap-2">
              Continue
            </span>
          </button>
        </div>

        {/* Booking Options (same as before) */}
        <div className="space-y-3 pt-6 border-t border-gray-200">
          <button
            type="button" className="group relative w-full p-3 sm:p-4 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-all duration-300 text-left overflow-hidden cursor-pointer"
            ><div className="">
                <PaymentScreenshotUpload />
              </div>
          </button>
        </div>
      </div>
    </div>
  )
}





// import { useState, useEffect } from 'react';
// import React from 'react';

// // Reusing the modern Icons from the established design
// const CheckCircleIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20">
//     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//   </svg>
// );

// // Define the elegant color palette (Indigo theme)
// const PRIMARY_COLOR_CLASS = 'indigo-600';
// const PRIMARY_HOVER_CLASS = 'indigo-700';
// const LIGHT_ACCENT_CLASS = 'indigo-50';

// export default function ServiceModeSelection({ onNext, register, setValue, getValues, watch, errors }) {
//   const [selectedMode, setSelectedMode] = useState('');

//   const serviceModes = [
//     {
//       id: 'studio',
//       name: 'Studio Service',
//       value: 'Studio Service',
//       description: 'Visit our professional studio location',
//       icon: '🏢',
//       features: ['Professional studio setup', 'Fixed location', 'Controlled environment']
//     },
//     {
//       id: 'mobile',
//       name: 'Mobile Makeup Artist',
//       value: 'Mobile Makeup Artist',
//       description: 'We come to your preferred location',
//       icon: '🚗',
//       features: ['Travel to your location', 'Flexible venue options', 'Personalized service']
//     }
//   ];

//   // Watch the service_mode field and update selectedMode accordingly
//   const watchedServiceMode = watch('service_mode');
//   useEffect(() => {
//     if (watchedServiceMode) {
//       const mode = serviceModes.find(m => m.value === watchedServiceMode);
//       if (mode) {
//         setSelectedMode(mode.name);
//       }
//     } else {
//       setSelectedMode('');
//     }
//   }, [watchedServiceMode]);

//   const handleModeSelect = (mode) => {
//     setSelectedMode(mode.name);
//     setValue('service_mode', mode.value);

//     // If Studio Service is selected, automatically set region to Toronto/GTA
//     // since studio location is fixed
//     if (mode.value === 'Studio Service') {
//       setValue('region', 'Toronto/GTA');
//       setValue('subRegion', '');
//     }
//   };

//   const handleNext = () => {
//     if (selectedMode) {
//       onNext();
//     }
//   };

//   const isNextEnabled = !!selectedMode;

//   return (
//     <div className="max-w-sm md:max-w-2xl lg:max-w-6xl mx-auto px-4 py-4 md:py-8 lg:py-12">
//       <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 lg:p-14 border border-gray-50">

//         {/* Header Section */}
//         <div className="mb-6 md:mb-10 lg:mb-14">
//           <h2 className="text-lg md:text-2xl lg:text-4xl font-light text-gray-900 mb-2 md:mb-3 tracking-tight text-left">
//             How would you like to receive our services?
//             <span className="text-red-500 ml-1 font-normal">*</span>
//           </h2>
//           <p className="text-gray-500 text-sm md:text-base lg:text-lg">Choose the service delivery option that works best for you.</p>
//         </div>

//         {/* Service Mode Cards Grid */}
//         <div className="grid gap-4 md:gap-6 mb-8 md:mb-12">
//           {serviceModes.map((mode) => {
//             const isSelected = selectedMode === mode.name;
//             return (
//               <button
//                 key={mode.id}
//                 type="button"
//                 onClick={() => handleModeSelect(mode)}
//                 className={`w-full p-4 md:p-6 lg:p-8 rounded-xl border-2 transition-all duration-300 text-left shadow-lg hover:shadow-2xl transform hover:scale-[1.02] ${
//                   isSelected
//                     ? `border-${PRIMARY_COLOR_CLASS} bg-gradient-to-br from-${PRIMARY_COLOR_CLASS} to-${PRIMARY_HOVER_CLASS} text-white shadow-2xl scale-[1.02]`
//                     : `border-gray-200 bg-white hover:border-${PRIMARY_COLOR_CLASS} hover:shadow-xl`
//                 }`}
//               >
//                 <div className="flex items-start space-x-4">
//                   {/* Icon */}
//                   <div className={`text-2xl md:text-3xl lg:text-4xl ${isSelected ? 'grayscale-0' : 'grayscale'} transition-all duration-300`}>
//                     {mode.icon}
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between">
//                       <h3 className={`text-base md:text-lg lg:text-xl font-semibold mb-2 ${
//                         isSelected ? 'text-white' : 'text-gray-900'
//                       }`}>
//                         {mode.name}
//                       </h3>

//                       {/* Check icon */}
//                       {isSelected && (
//                         <CheckCircleIcon className={`w-6 h-6 md:w-7 md:h-7 text-${LIGHT_ACCENT_CLASS} flex-shrink-0`} />
//                       )}
//                     </div>

//                     <p className={`text-sm md:text-base mb-3 ${
//                       isSelected ? `text-${LIGHT_ACCENT_CLASS}` : 'text-gray-600'
//                     }`}>
//                       {mode.description}
//                     </p>

//                     {/* Features list */}
//                     <ul className="space-y-1">
//                       {mode.features.map((feature, index) => (
//                         <li key={index} className={`text-xs md:text-sm flex items-center ${
//                           isSelected ? `text-${LIGHT_ACCENT_CLASS}` : 'text-gray-500'
//                         }`}>
//                           <span className="w-1 h-1 bg-current rounded-full mr-2 flex-shrink-0"></span>
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </button>
//             );
//           })}
//         </div>

//         {/* Continue Button */}
//         <div className="flex justify-center">
//           <button
//             type="button"
//             onClick={handleNext}
//             disabled={!isNextEnabled}
//             className={`px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-5 text-sm md:text-base lg:text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform ${
//               isNextEnabled
//                 ? `bg-${PRIMARY_COLOR_CLASS} hover:bg-${PRIMARY_HOVER_CLASS} text-white hover:scale-105`
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
