import React from "react";

// Define the elegant color palette (Rose Glow Dark Mode theme)
const WARNING_COLOR_CLASS = "amber-300"; // Lighter amber for visibility on dark background

export default function SemiBridalAddons({
  register,
  watch,
  errors,
  onNext,
  onBack,
  setValue,
}) {
  const watchedFields = watch();
  const semiBridalService = watchedFields.bride_service;
  const jewelrySetting = watchedFields.needs_jewelry;
  const extensions = watchedFields.needs_extensions;
  const sareeDraping = watchedFields.needs_saree_draping;
  const hijabSetting = watchedFields.needs_hijab_setting;

  // Show extensions option always, like the original website
  const showExtensions = true;

  // Since all choices are optional add-ons, we assume 'onNext' is always available.
  const isNextEnabled = true;

  // Helper function to render a styled radio option - CONVERTED TO ROSE GLOW STANDARD
  const RadioOption = ({ label, value, name, price, isSelected }) => (
    <label
      className={`
        flex-1 flex items-center justify-center p-3 md:p-4 lg:p-5 rounded-xl cursor-pointer transition-all duration-300 shadow-xl overflow-hidden relative
        ${
          isSelected
            ? "border border-rose-400/50 bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-fuchsia-500/20 backdrop-blur-sm shadow-2xl shadow-rose-500/20 scale-[1.01] text-white"
            : "border border-gray-700/50 bg-gray-900/60 text-gray-200 hover:border-rose-400/40 hover:bg-gray-800/70 hover:shadow-lg hover:-translate-y-0.5"
        }
      `}
    >
      {/* Ambient glow on selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-fuchsia-500/10 blur-md"></div>
      )}

      <input
        type="radio"
        {...register(name)}
        value={value}
        // Hide default radio button, rely on the container style for feedback
        className="sr-only"
      />
      <span className="relative font-light text-base md:text-lg truncate">
        {label}
      </span>
    </label>
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
            Semi Bridal Add-ons
          </h2>
          {/* Divider line matching standard */}
          <div className="h-0.5 w-20 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 rounded-full mx-auto mb-5 opacity-80"></div>
          <p
            className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Select any additional services needed
          </p>
        </div>

        <div className="space-y-10 md:space-y-12 mb-8 md:mb-12">
          {/* Jewelry & Dupatta/Veil Setting - Section Box (Dark Mode) */}
          <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
            <div className="mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-light text-white mb-2">
                Jewelry & Dupatta/Veil Setting
              </h3>
              <p className="text-sm md:text-base text-gray-400 font-light">
                Professional assistance with jewelry placement and veil/dupatta
                arrangement.
              </p>
            </div>

            <div className="flex space-x-4">
              <RadioOption
                label="Yes"
                value="Yes"
                name="needs_jewelry"
                isSelected={jewelrySetting === "Yes"}
              />
              <RadioOption
                label="No"
                value="No"
                name="needs_jewelry"
                isSelected={jewelrySetting === "No"}
              />
            </div>
          </div>

          {/* Hair Extensions - Section Box (Dark Mode) */}
          {showExtensions && (
            <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
              <div className="mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-light text-white mb-2">
                  Hair Extensions Installation
                </h3>
                <p className="text-sm md:text-base text-gray-400 font-light mb-3">
                  Professional installation of hair extensions
                </p>
                {/* Warning Styling - CONVERTED to Dark Mode Amber Warning */}
                <p
                  className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10`}
                >
                  ⚠️ We do not provide the hair extensions. Client must have
                  their own.
                </p>
              </div>

              <div className="flex space-x-4">
                <RadioOption
                  label="Yes"
                  value="Yes"
                  name="needs_extensions"
                  isSelected={extensions === "Yes"}
                />
                <RadioOption
                  label="No"
                  value="No"
                  name="needs_extensions"
                  isSelected={extensions === "No"}
                />
              </div>
            </div>
          )}

          {/* Saree Draping - Section Box (Dark Mode) */}
          <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
            <div className="mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-light text-white mb-2">
                Saree Draping
              </h3>
              <p className="text-sm md:text-base text-gray-400 font-light mb-3">
                Traditional technique creating beautiful draping effect for
                dupatta or veil.
              </p>
            </div>

            <div className="flex space-x-4">
              <RadioOption
                label="Yes"
                value="Yes"
                name="needs_saree_draping"
                isSelected={sareeDraping === "Yes"}
              />
              <RadioOption
                label="No"
                value="No"
                name="needs_saree_draping"
                isSelected={sareeDraping === "No"}
              />
            </div>
          </div>

          {/* Hijab Setting - Section Box (Dark Mode) */}
          <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
            <div className="mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-light text-white mb-2">
                Hijab Setting
              </h3>
              <p className="text-sm md:text-base text-gray-400 font-light mb-3">
                Professional assistance with hijab styling and arrangement.
              </p>
            </div>

            <div className="flex space-x-4">
              <RadioOption
                label="Yes"
                value="Yes"
                name="needs_hijab_setting"
                isSelected={hijabSetting === "Yes"}
              />
              <RadioOption
                label="No"
                value="No"
                name="needs_hijab_setting"
                isSelected={hijabSetting === "No"}
              />
            </div>
          </div>

          {/* Summary Section: Refined typography and structure (Dark Mode) */}
          <div className="pt-6 md:pt-8 border-t border-gray-700/50">
            <h4 className="text-base md:text-lg font-light text-white mb-3 tracking-wide">
              Selected Service:
            </h4>

            <p className="text-lg md:text-xl font-light text-rose-300 mb-3">
              {/* Highlight selected base service */}
              {semiBridalService || "Both Hair & Makeup"}
            </p>

            {(jewelrySetting === "Yes" ||
              extensions === "Yes" ||
              sareeDraping === "Yes" ||
              hijabSetting === "Yes") && (
              <div className="mt-3 p-4 bg-gray-900/60 rounded-xl border border-gray-700/60 shadow-lg">
                <h4 className="font-semibold text-rose-200 mb-2">Add-ons:</h4>
                <ul className="text-sm md:text-base text-gray-300 space-y-1 ml-4 list-none">
                  {jewelrySetting === "Yes" && (
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Jewelry & Dupatta/Veil Setting
                    </li>
                  )}
                  {extensions === "Yes" && (
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Hair Extensions Installation
                    </li>
                  )}
                  {sareeDraping === "Yes" && (
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Saree Draping
                    </li>
                  )}
                  {hijabSetting === "Yes" && (
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Hijab Setting
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Applied the two-button standard */}
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
            onClick={onNext}
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

// import React from "react";

// // Define the elegant color palette (Rose Glow Dark Mode theme)
// const WARNING_COLOR_CLASS = "amber-300"; // Lighter amber for visibility on dark background

// export default function SemiBridalAddons({
//   register,
//   watch,
//   errors,
//   onNext,
//   onBack,
//   setValue,
// }) {
//   const watchedFields = watch();
//   const semiBridalService = watchedFields.bride_service;
//   const jewelrySetting = watchedFields.needs_jewelry;
//   const extensions = watchedFields.needs_extensions;
//   const sarhiDripping = watchedFields.needs_sarhi_dripping;
//   const hijabSetting = watchedFields.needs_hijab_setting;

//   // Show extensions option always, like the original website
//   const showExtensions = true;

//   // Since all choices are optional add-ons, we assume 'onNext' is always available.
//   const isNextEnabled = true;

//   // Helper function to render a styled radio option - CONVERTED TO ROSE GLOW STANDARD
//   const RadioOption = ({ label, value, name, isSelected }) => (
//     <label
//       className={`
//         flex-1 flex items-center justify-center p-3 md:p-4 lg:p-5 rounded-xl cursor-pointer transition-all duration-300 shadow-xl overflow-hidden relative
//         ${
//           isSelected
//             ? "border border-rose-400/50 bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-fuchsia-500/20 backdrop-blur-sm shadow-2xl shadow-rose-500/20 scale-[1.01] text-white"
//             : "border border-gray-700/50 bg-gray-900/60 text-gray-200 hover:border-rose-400/40 hover:bg-gray-800/70 hover:shadow-lg hover:-translate-y-0.5"
//         }
//       `}
//     >
//       {/* Ambient glow on selected */}
//       {isSelected && (
//         <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-fuchsia-500/10 blur-md"></div>
//       )}

//       <input
//         type="radio"
//         {...register(name)}
//         value={value}
//         // Hide default radio button, rely on the container style for feedback
//         className="sr-only"
//       />
//       <span className="relative font-light text-base md:text-lg">{label}</span>
//     </label>
//   );

//   return (
//     // Main container matching standard width and dark background treatment
//     <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
//       {/* Inner Card Container: Dark, blurred, bordered standard */}
//       <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-7 sm:p-10 lg:p-14 border border-gray-700/50 shadow-2xl shadow-gray-900/50">
//         {/* Header Section: Applied elegant typography standard */}
//         <div className="mb-10 sm:mb-14 text-center">
//           <h2
//             className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide leading-tight"
//             style={{
//               fontFamily: "system-ui, -apple-system, sans-serif",
//               letterSpacing: "0.02em",
//             }}
//           >
//             Semi Bridal Add-ons
//           </h2>
//           {/* Divider line matching standard */}
//           <div className="h-0.5 w-20 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 rounded-full mx-auto mb-5 opacity-80"></div>
//           <p
//             className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed"
//             style={{ letterSpacing: "0.01em" }}
//           >
//             Select any additional services needed.
//           </p>
//         </div>

//         <div className="space-y-10 md:space-y-12 mb-8 md:mb-12">
//           {/* Jewelry & Dupatta/Veil Setting - Section Box (Dark Mode) */}
//           <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
//             <div className="mb-4 md:mb-6">
//               <h3 className="text-xl md:text-2xl font-light text-white mb-2">
//                 Jewelry & Dupatta/Veil Setting
//               </h3>
//               <p className="text-sm md:text-base text-gray-400 font-light">
//                 Professional assistance with jewelry placement and veil/dupatta
//                 arrangement.
//               </p>
//             </div>

//             <div className="flex space-x-4">
//               <RadioOption
//                 label="Yes"
//                 value="Yes"
//                 name="needs_jewelry"
//                 isSelected={jewelrySetting === "Yes"}
//               />
//               <RadioOption
//                 label="No"
//                 value="No"
//                 name="needs_jewelry"
//                 isSelected={jewelrySetting === "No"}
//               />
//             </div>
//           </div>

//           {/* Hair Extensions - Section Box (Dark Mode) */}
//           {showExtensions && (
//             <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
//               <div className="mb-4 md:mb-6">
//                 <h3 className="text-lg md:text-xl font-light text-white mb-2">
//                   Hair Extensions Installation
//                 </h3>
//                 <p className="text-sm md:text-base text-gray-400 font-light mb-3">
//                   Professional installation of hair extensions
//                 </p>
//                 {/* Warning Styling - CONVERTED to Dark Mode Amber Warning */}
//                 <p
//                   className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10`}
//                 >
//                   ⚠️ We do not provide the hair extensions. Client must have
//                   their own.
//                 </p>
//               </div>

//               <div className="flex space-x-4">
//                 <RadioOption
//                   label="Yes"
//                   value="Yes"
//                   name="needs_extensions"
//                   isSelected={extensions === "Yes"}
//                 />
//                 <RadioOption
//                   label="No"
//                   value="No"
//                   name="needs_extensions"
//                   isSelected={extensions === "No"}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Saree Draping - Section Box (Dark Mode) */}
//           <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
//             <div className="mb-4 md:mb-6">
//               <h3 className="text-lg md:text-xl font-light text-white mb-2">
//                 Saree Draping
//               </h3>
//               <p className="text-sm md:text-base text-gray-400 font-light mb-3">
//                 Traditional technique creating beautiful draping effect for
//                 dupatta or veil.
//               </p>
//             </div>

//             <div className="flex space-x-4">
//               <RadioOption
//                 label="Yes"
//                 value="Yes"
//                 name="needs_sarhi_dripping"
//                 isSelected={sarhiDripping === "Yes"}
//               />
//               <RadioOption
//                 label="No"
//                 value="No"
//                 name="needs_sarhi_dripping"
//                 isSelected={sarhiDripping === "No"}
//               />
//             </div>
//           </div>

//           {/* Hijab Setting - Section Box (Dark Mode) */}
//           <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
//             <div className="mb-4 md:mb-6">
//               <h3 className="text-lg md:text-xl font-light text-white mb-2">
//                 Hijab Setting
//               </h3>
//               <p className="text-sm md:text-base text-gray-400 font-light mb-3">
//                 Professional assistance with hijab styling and arrangement.
//               </p>
//             </div>

//             <div className="flex space-x-4">
//               <RadioOption
//                 label="Yes"
//                 value="Yes"
//                 name="needs_hijab_setting"
//                 isSelected={hijabSetting === "Yes"}
//               />
//               <RadioOption
//                 label="No"
//                 value="No"
//                 name="needs_hijab_setting"
//                 isSelected={hijabSetting === "No"}
//               />
//             </div>
//           </div>

//           {/* Summary Section: Refined typography and structure (Dark Mode) */}
//           <div className="pt-6 md:pt-8 border-t border-gray-700/50">
//             <h4 className="text-base md:text-lg font-light text-white mb-3 tracking-wide">
//               Selected Service:
//             </h4>

//             <p className="text-lg md:text-xl font-light text-rose-300 mb-3">
//               {/* Highlight selected base service */}
//               {semiBridalService || "Both Hair & Makeup"}
//             </p>

//             {(jewelrySetting === "Yes" ||
//               extensions === "Yes" ||
//               sarhiDripping === "Yes" ||
//               hijabSetting === "Yes") && (
//               <div className="mt-3 p-4 bg-gray-900/60 rounded-xl border border-gray-700/60 shadow-lg">
//                 <h4 className="font-semibold text-rose-200 mb-2">Add-ons:</h4>
//                 <ul className="text-sm md:text-base text-gray-300 space-y-1 ml-4 list-disc marker:text-rose-400">
//                   {jewelrySetting === "Yes" && (
//                     <li className="flex items-center">
//                       <span className="text-green-400 mr-2">✓</span>
//                       Jewelry & Dupatta/Veil Setting
//                     </li>
//                   )}
//                   {extensions === "Yes" && (
//                     <li className="flex items-center">
//                       <span className="text-green-400 mr-2">✓</span>
//                       Hair Extensions Installation
//                     </li>
//                   )}
//                   {sarhiDripping === "Yes" && (
//                     <li className="flex items-center">
//                       <span className="text-green-400 mr-2">✓</span>
//                       Saree Draping
//                     </li>
//                   )}
//                   {hijabSetting === "Yes" && (
//                     <li className="flex items-center">
//                       <span className="text-green-400 mr-2">✓</span>
//                       Hijab Setting
//                     </li>
//                   )}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons: Applied the two-button standard */}
//         <div className="flex justify-between items-center pt-6 sm:pt-8 border-t border-gray-700/50 mt-4 md:mt-6">
//           {/* Back Button (Secondary Style) */}
//           <button
//             type="button"
//             onClick={onBack}
//             className="group relative px-6 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden bg-gray-700/50 text-gray-200 shadow-lg shadow-gray-900/50 hover:bg-gray-700/80 hover:scale-[1.03] active:scale-100 cursor-pointer border border-gray-600/30"
//             style={{ letterSpacing: "0.05em" }}
//           >
//             <span className="relative">Back</span>
//           </button>

//           {/* Continue Button (Primary Style - Rose Glow Gradient) */}
//           <button
//             type="button"
//             onClick={onNext}
//             disabled={!isNextEnabled}
//             className={`
//               relative px-10 sm:px-12 py-3.5 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden
//               ${
//                 isNextEnabled
//                   ? "bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:scale-105 active:scale-100 cursor-pointer border border-rose-400/30"
//                   : "bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/30"
//               }
//             `}
//             style={{ letterSpacing: "0.05em" }}
//           >
//             {/* Animated shimmer effect (Only on enabled state) */}
//             {isNextEnabled && (
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out"></div>
//             )}
//             <span className="relative flex items-center justify-center gap-2.5">
//               Continue
//               <svg
//                 className="w-5 h-5 transition-transform group-hover:translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M13 7l5 5m0 0l-5 5m5-5H6"
//                 />
//               </svg>
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
