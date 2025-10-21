"use client"
import { useState } from "react"

// Reusing the modern Icons from the latest design
const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)
const TimeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
)

export default function RegionSelection({ onNext, onBack, register, setValue, getValues, errors }) {
  const [selectedRegion, setSelectedRegion] = useState(getValues("region") || "")
  const [selectedSubRegion, setSelectedSubRegion] = useState(getValues("subRegion") || "")

  const regions = [
    { id: "toronto", name: "Toronto/GTA", description: "" },
    { id: "outside", name: "Outside GTA", description: "" },
    { id: "destination", name: "Destination Wedding", description: "" },
  ]

  const subRegions = [
    {
      id: "immediate",
      name: "Immediate Neighbors (15-30 Minutes)",
      description: "",
    },
    {
      id: "moderate",
      name: "Moderate Distance (30 Minutes to 1 Hour Drive)",
      description: "",
    },
    {
      id: "further",
      name: "Further Out But Still Reachable (1 Hour Plus)",
      description: "",
    },
  ]

  const handleRegionSelect = (regionName) => {
    setSelectedRegion(regionName)
    setValue("region", regionName)

    if (regionName !== "Outside GTA") {
      setSelectedSubRegion("")
      setValue("subRegion", "")
    }
  }

  const handleSubRegionSelect = (subRegionName) => {
    setSelectedSubRegion(subRegionName)
    setValue("subRegion", subRegionName)
  }

  const isNextEnabled = selectedRegion && (selectedRegion !== "Outside GTA" || selectedSubRegion)

  const handleNext = () => {
    if (selectedRegion === "Outside GTA" && !selectedSubRegion) {
      return
    }
    if (selectedRegion) {
      onNext()
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-2xl shadow-gray-400/20">
        <div className="mb-8 sm:mb-10 text-center">
          <h2
            className="text-2xl sm:text-3xl font-light text-gray-900 mb-3 tracking-wide"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            What region do you need services in?
            <span className="text-gray-400 ml-2 font-normal">*</span>
          </h2>
          <p
            className="text-gray-600 text-sm sm:text-base font-light max-w-2xl mx-auto"
            style={{ letterSpacing: "0.01em" }}
          >
            Select your preferred service location to get started.
          </p>
        </div>

        <div className="space-y-3 mb-10 sm:mb-12">
          {regions.map((region) => {
            const isSelected = selectedRegion === region.name
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => handleRegionSelect(region.name)}
                className={`
         group relative w-full p-4 sm:p-5 rounded-lg border transition-all duration-300 text-left flex items-center justify-between
                  
         ${
           isSelected
             ? "border-gray-700/50 bg-gray-100 shadow-lg shadow-gray-400/20"
             : "border-gray-300 bg-white hover:border-gray-500 hover:bg-gray-50 hover:shadow-md hover:shadow-gray-400/10"
         }
         cursor-pointer
        `}
              >
                <div className="relative flex-1">
                  <div
                    className={`font-light text-base sm:text-lg ${
                      isSelected ? "text-gray-900" : "text-gray-800 group-hover:text-gray-900"
                    }`}
                    style={{ letterSpacing: "0.01em" }}
                  >
                    {region.name}
                  </div>
                </div>

                {isSelected && (
                  <div className="ml-3 flex-shrink-0">
                    <CheckCircleIcon className="w-5 h-5 text-gray-700 drop-shadow-lg" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {selectedRegion === "Outside GTA" && (
          <div className="mb-10 sm:mb-12 p-5 sm:p-6 bg-gray-50 rounded-lg border border-gray-300">
            <h3
              className="text-lg sm:text-xl font-light text-gray-900 mb-4 flex items-center"
              style={{ letterSpacing: "0.01em" }}
            >
              <TimeIcon className="w-5 h-5 mr-2 text-gray-700 flex-shrink-0" strokeWidth="1.5" />
              Roughly how long does it take you to drive to the GTA?
              <span className="text-gray-400 ml-1 font-normal">*</span>
            </h3>

            <div className="space-y-2.5">
              {subRegions.map((subRegion) => {
                const isSubSelected = selectedSubRegion === subRegion.name
                return (
                  <button
                    key={subRegion.id}
                    type="button"
                    onClick={() => handleSubRegionSelect(subRegion.name)}
                    className={`
           group cursor-pointer w-full p-3.5 sm:p-4 rounded-lg text-left transition-all duration-300 border flex items-center justify-between
           ${
             isSubSelected
               ? "border-gray-700/50 bg-gray-100 shadow-md shadow-gray-400/20"
               : "border-gray-300 bg-white hover:border-gray-500 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-400/10"
           }
          `}
                  >
                    <div className="flex-1 relative">
                      <div
                        className={`font-light text-sm sm:text-base transition-colors ${
                          isSubSelected ? "text-gray-900" : "text-gray-800 group-hover:text-gray-900"
                        }`}
                        style={{ letterSpacing: "0.01em" }}
                      >
                        {subRegion.name}
                      </div>
                    </div>
                    {isSubSelected && (
                      <div className="ml-3 flex-shrink-0">
                        <CheckCircleIcon className="w-5 h-5 text-gray-700 drop-shadow-lg" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {errors.region && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg shadow-xl shadow-red-900/20">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-300 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-200 text-sm font-light">Please select a region to continue</p>
            </div>
          </div>
        )}

        {selectedRegion === "Outside GTA" && !selectedSubRegion && (
          <div className="mb-6 p-4 bg-amber-900/50 border border-amber-700 rounded-lg shadow-xl shadow-amber-900/20">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-amber-300 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-amber-200 text-sm font-light">Please select how long it takes to drive to the GTA</p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-5 sm:pt-6 border-t border-gray-300 mt-4">
          <button
            type="button"
            onClick={onBack}
            className="group relative px-5 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-light rounded-lg transition-all duration-300 overflow-hidden bg-gray-200 text-gray-900 shadow-md shadow-gray-400/20 hover:bg-gray-300 hover:scale-[1.02] active:scale-100 cursor-pointer border border-gray-400"
            style={{ letterSpacing: "0.05em" }}
          >
            <span className="relative">Back</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isNextEnabled}
            className={`
       relative px-8 sm:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-light rounded-lg transition-all duration-300 overflow-hidden
       ${
         isNextEnabled
           ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-md shadow-gray-700/20 hover:shadow-lg hover:shadow-gray-700/30 hover:scale-[1.02] active:scale-100 cursor-pointer border border-gray-600"
           : "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400"
       }
      `}
            style={{ letterSpacing: "0.05em" }}
          >
            {isNextEnabled && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out"></div>
            )}
            <span className="relative">Continue</span>
          </button>
        </div>
      </div>
    </div>
  )
}



// import { useState } from 'react';
// import React from 'react';

// // Reusing the modern Icons from the latest design
// const CheckCircleIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20">
//     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//   </svg>
// );
// const TimeIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//   </svg>
// );

// // Define the elegant color palette
// const PRIMARY_COLOR_CLASS = 'indigo-600';
// const PRIMARY_HOVER_CLASS = 'indigo-700';
// const LIGHT_ACCENT_CLASS = 'indigo-50';

// export default function RegionSelection({ onNext, onBack, register, setValue, getValues, errors }) {
//   const [selectedRegion, setSelectedRegion] = useState(getValues('region') || '');
//   const [selectedSubRegion, setSelectedSubRegion] = useState(getValues('subRegion') || '');

//   const regions = [
//     {
//       id: 'toronto',
//       name: 'Toronto/GTA',
//       description: '' // Kept empty as per base code
//     },
//     {
//       id: 'outside',
//       name: 'Outside GTA',
//       description: '' // Kept empty as per base code
//     },
//     {
//       id: 'destination',
//       name: 'Destination Wedding',
//       description: '' // Kept empty as per base code
//     }
//   ];

//   const subRegions = [
//     {
//       id: 'immediate',
//       name: 'Immediate Neighbors (15-30 Minutes)',
//       description: '' // Kept empty as per base code
//     },
//     {
//       id: 'moderate',
//       name: 'Moderate Distance (30 Minutes to 1 Hour Drive)',
//       description: '' // Kept empty as per base code
//     },
//     {
//       id: 'further',
//       name: 'Further Out But Still Reachable (1 Hour Plus)',
//       description: '' // Kept empty as per base code
//     }
//   ];

//   const handleRegionSelect = (regionName) => {
//     setSelectedRegion(regionName);
//     setValue('region', regionName);

//     // Clear sub-region if not Outside GTA (Logic retained)
//     if (regionName !== 'Outside GTA') {
//       setSelectedSubRegion('');
//       setValue('subRegion', '');
//     }
//   };

//   const handleSubRegionSelect = (subRegionName) => {
//     setSelectedSubRegion(subRegionName);
//     setValue('subRegion', subRegionName);
//   };

//   const handleNext = () => {
//     if (selectedRegion === 'Outside GTA' && !selectedSubRegion) {
//       return; // Logic retained
//     }
//     if (selectedRegion) {
//       onNext();
//     }
//   };

//   const isNextEnabled = selectedRegion && (selectedRegion !== 'Outside GTA' || selectedSubRegion);

//   return (
//     // Applied elegant container styling from the latest design
//     <div className="max-w-sm md:max-w-2xl lg:max-w-6xl mx-auto px-4 py-4 md:py-8 lg:py-12">
//       <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 lg:p-14 border border-gray-50">

//         {/* Header Section: Applied elegant typography */}
//         <div className="mb-6 md:mb-10 lg:mb-14">
//           <h2 className="text-lg md:text-2xl lg:text-4xl font-light text-gray-900 mb-2 md:mb-3 tracking-tight text-left">
//             What region do you need services in?
//             <span className="text-red-500 ml-1 font-normal">*</span>
//           </h2>
//           <p className="text-gray-500 text-sm md:text-base lg:text-lg">Select your preferred service location to get started.</p>
//         </div>

//         {/* Region Cards Grid: Reverted to 3-column layout, applied elegant card design and hover animation */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
//           {regions.map((region) => {
//             const isSelected = selectedRegion === region.name;
//             return (
//               <button
//                 key={region.id}
//                 type="button"
//                 onClick={() => handleRegionSelect(region.name)}
//                 className={`
//                   p-4 md:p-6 lg:p-8 rounded-xl text-left transition-all duration-300 border shadow-lg
//                   ${isSelected
//                     ? `bg-${PRIMARY_COLOR_CLASS} border-${PRIMARY_COLOR_CLASS} text-white transform scale-[1.02] shadow-xl`
//                     : `bg-white border-gray-200 hover:border-${PRIMARY_COLOR_CLASS} hover:shadow-xl hover:scale-[1.01]`
//                   }
//                   cursor-pointer hover:cursor-pointer
//                 `}
//               >
//                 <div className={`font-bold text-lg md:text-xl mb-2 ${
//                   isSelected ? 'text-white' : 'text-gray-900' // Consistent typography
//                 }`}>
//                   {region.name}
//                 </div>
//                 {/* The description is intentionally left out here as it was empty in the base code's array data */}

//                 {isSelected && (
//                   <div className={`mt-4 flex items-center text-white text-sm font-semibold`}>
//                     <CheckCircleIcon className="w-5 h-5 mr-2" />
//                     Selected
//                   </div>
//                 )}
//               </button>
//             )
//           })}
//         </div>

//         {/* Sub-region Selection: Applied elegant conditional styling */}
//         {selectedRegion === 'Outside GTA' && (
//           <div className="mb-8 md:mb-12 p-4 md:p-6 lg:p-8 bg-gray-50 rounded-xl border border-gray-200">
//             <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-4 md:mb-6 flex items-center">
//               <TimeIcon className={`w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-${PRIMARY_COLOR_CLASS}`} />
//               Roughly how long does it take you to drive to the GTA?
//               <span className="text-red-500 ml-1 font-normal">*</span>
//             </h3>

//             <div className="space-y-3 md:space-y-4">
//               {subRegions.map((subRegion) => {
//                 const isSubSelected = selectedSubRegion === subRegion.name;
//                 return (
//                   <button
//                     key={subRegion.id}
//                     type="button"
//                     onClick={() => handleSubRegionSelect(subRegion.name)} // Retained logic: selecting by subRegion.name
//                     className={`
//                       cursor-pointer w-full p-3 md:p-4 lg:p-5 rounded-lg text-left transition-all duration-300 border flex items-center justify-between
//                       ${isSubSelected
//                         ? `bg-${PRIMARY_COLOR_CLASS} border-${PRIMARY_COLOR_CLASS} shadow-lg transform scale-[1.01]`
//                         : `bg-white border-gray-300 hover:border-${PRIMARY_COLOR_CLASS} hover:shadow-md hover:scale-[1.005]`
//                       }
//                       hover:cursor-pointer
//                     `}
//                   >
//                     <div className="flex-1">
//                       <div className={`font-semibold text-base md:text-lg ${ // Styled name prominently
//                         isSubSelected ? 'text-white' : 'text-gray-900'
//                       }`}>
//                         {subRegion.name}
//                       </div>
//                     </div>
//                     {isSubSelected && (
//                       <div className="ml-4">
//                         <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
//                       </div>
//                     )}
//                   </button>
//                 )
//               })}
//             </div>
//           </div>
//         )}

//         {/* Error Messages: Applied clean, modern error styling */}
//         {errors.region && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               <p className="text-red-800 text-sm font-medium">Please select a region to continue</p>
//             </div>
//           </div>
//         )}

//         {selectedRegion === 'Outside GTA' && !selectedSubRegion && (
//           <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-lg">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//               <p className="text-amber-800 text-sm font-medium">Please select how long it takes to drive to the GTA</p>
//             </div>
//           </div>
//         )}

//         {/* Navigation Buttons: Back and Continue */}
//         <div className="flex justify-between items-center pt-6 md:pt-8 border-t border-gray-100 mt-4 md:mt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             className="px-4 py-2 md:px-6 md:py-3 lg:px-10 lg:py-3.5 rounded-xl font-bold text-sm md:text-base lg:text-lg shadow-lg transition-all duration-300 bg-gray-100 text-black hover:bg-gray-200 hover:shadow-xl transform hover:scale-[1.01] cursor-pointer"
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
