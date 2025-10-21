"use client"
// DatePicker import remains as per original code structure
import DatePicker from "./DatePicker"

// Icon for Checkmarks (remains unchanged)
const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
)

export default function BrideServiceSelection({ register, watch, errors, onNext, onBack, setValue }) {
  const watchedFields = watch()
  const selectedService = watchedFields.bride_service
  const needsTrial = watchedFields.needs_trial
  const trialService = watchedFields.trial_service
  const trialDate = watchedFields.trial_date
  const trialTime = watchedFields.trial_time

  // Define unique IDs for the inputs for the click handlers
  // NOTE: Assuming the DatePicker component exposes a way to pass this ID to its internal input.
  const trialDateId = "trial_date_input"
  const trialTimeId = "trial_time_input"

  const handleServiceSelect = (service) => {
    setValue("bride_service", service)
  }

  const handleTrialSelect = (needsTrial) => {
    setValue("needs_trial", needsTrial)
    if (needsTrial === "No") {
      setValue("trial_service", "") // Clear trial service if no trial needed
      setValue("trial_date", "") // Clear trial date if no trial needed
      setValue("trial_time", "") // Clear trial time if no trial needed
    }
  }

  const handleTrialServiceSelect = (service) => {
    setValue("trial_service", service)
  }

  const handleNext = () => {
    if (
      selectedService &&
      needsTrial !== undefined &&
      (needsTrial === "No" || (trialService && trialDate && trialTime))
    ) {
      onNext()
    }
  }

  const isNextEnabled =
    selectedService && needsTrial !== undefined && (needsTrial === "No" || (trialService && trialDate && trialTime))

  // Helper component for consistent card styling - LIGHT THEME STANDARD
  const SelectCard = ({ value, label, subtext, onClick, isSelected, registerProps, isRadio }) => (
    <div
      onClick={onClick}
      className={`
         group relative w-full p-4 sm:p-5 rounded-lg border transition-all duration-300 text-left flex items-center justify-between
         border-gray-300 bg-white hover:border-gray-500 hover:bg-gray-50 hover:shadow-md hover:shadow-gray-400/10
         cursor-pointer         
    ${
      isSelected
        ? "border border-gray-700/50 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 backdrop-blur-sm shadow-2xl shadow-gray-400/20 scale-[1.01]"
        : "border border-gray-300 bg-white backdrop-blur-sm hover:border-gray-500 hover:bg-gray-50 hover:shadow-xl hover:shadow-gray-400/10 hover:-translate-y-0.5"
    }
   `}
    >
      {/* Ambient glow effect on selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400/5 via-gray-500/5 to-gray-600/5 blur-xl"></div>
      )}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* The hidden radio input is necessary to pass the value to react-hook-form */}
          <input
            type={isRadio ? "radio" : "checkbox"}
            {...registerProps}
            value={value}
            checked={isSelected}
            readOnly
            className="sr-only"
          />
          <div>
            <h3
              className={`font-light text-lg md:text-xl mb-1 ${
                isSelected ? "text-gray-900" : "text-gray-800 group-hover:text-gray-700"
              }`}
            >
              {label}
            </h3>
            <p
              className={`text-sm md:text-base font-light ${
                isSelected ? "text-gray-700" : "text-gray-600 group-hover:text-gray-700"
              }`}
            >
              {subtext}
            </p>
          </div>
        </div>

        {/* Checkmark / Radio Indicator */}
        <div className="text-right ml-4">
          {isSelected ? (
            <CheckCircleIcon className="w-6 h-6 text-gray-700 drop-shadow-lg" />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-400 group-hover:border-gray-700 transition-colors"></div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    // Main container matching standard width and light background treatment
    <div className="max-w-3xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <div className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-200 shadow-2xl shadow-gray-400/20">
        {/* Header Section: Applied elegant typography standard */}
        <div className="mb-10 sm:mb-14 text-center">
          <h2
            className="text-2xl sm:text-3xl font-light text-gray-900 mb-3 tracking-wide" styles="font-family: system-ui, -apple-system, sans-serif; letter-spacing: 0.02em;"
          >
            Bridal Service Details
            <span className="text-gray-700 ml-2 font-normal">*</span>
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-full mx-auto mb-5 opacity-80"></div>
          <p
            className="text-gray-600 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Select the primary service and specify trial requirements.
          </p>
        </div>

        {/* Bride Service Selection */}
        <div className="space-y-4 md:space-y-6 mb-12 sm:mb-16">
          {/* Both Hair & Makeup */}
          <SelectCard
            value="Both Hair & Makeup"
            label="Both Hair & Makeup"
            subtext="Complete bridal styling package"
            onClick={() => handleServiceSelect("Both Hair & Makeup")}
            isSelected={selectedService === "Both Hair & Makeup"}
            registerProps={register("bride_service")}
            isRadio={true}
          />

          {/* Hair Only */}
          <SelectCard
            value="Hair Only"
            label="Hair Only"
            subtext="Professional hair styling only"
            onClick={() => handleServiceSelect("Hair Only")}
            isSelected={selectedService === "Hair Only"}
            registerProps={register("bride_service")}
            isRadio={true}
          />

          {/* Makeup Only */}
          <SelectCard
            value="Makeup Only"
            label="Makeup Only"
            subtext="Professional makeup application only"
            onClick={() => handleServiceSelect("Makeup Only")}
            isSelected={selectedService === "Makeup Only"}
            registerProps={register("bride_service")}
            isRadio={true}
          />
        </div>

        {/* Trial Question */}
        {selectedService && (
          <div className="mb-12 sm:mb-16 p-6 sm:p-8 lg:p-10 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200 shadow-xl shadow-gray-200/40">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-4">
              Do you need a Bridal Trial?
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6 font-light">
              *A trial allows you to test your look before the big day*
            </p>

            {/* Trial Options (Yes/No) */}
            <div className="space-y-4 md:flex md:space-x-4 md:space-y-0">
              {/* Trial: Yes */}
              <div
                onClick={() => handleTrialSelect("Yes")}
                className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-md overflow-hidden group relative
         ${
           needsTrial === "Yes"
             ? "border-gray-700/50 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 backdrop-blur-sm shadow-2xl shadow-gray-400/20 scale-[1.005]"
             : "bg-white border-gray-300 hover:border-gray-500 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5"
         }`}
              >
                {/* Ambient glow on selected */}
                {needsTrial === "Yes" && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400/5 via-gray-500/5 to-gray-600/5 blur-md"></div>
                )}
                <div className="relative flex items-center space-x-3">
                  {/* Radio Button Styling (Hidden input replaced by custom ring/check) */}
                  <input
                    type="radio"
                    {...register("needs_trial")}
                    value="Yes"
                    checked={needsTrial === "Yes"}
                    readOnly
                    className="sr-only"
                  />
                  {needsTrial === "Yes" ? (
                    <CheckCircleIcon className="w-6 h-6 text-gray-700 drop-shadow-lg flex-shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-400 group-hover:border-gray-700 flex-shrink-0 transition-colors"></div>
                  )}
                  <div>
                    <h4
                      className={`font-light text-lg ${
                        needsTrial === "Yes" ? "text-gray-900" : "text-gray-800 group-hover:text-gray-700"
                      }`}
                    >
                      Yes
                    </h4>
                    <p className={`text-sm font-light ${needsTrial === "Yes" ? "text-gray-700" : "text-gray-600"}`}>
                      I would like to add a trial
                    </p>
                  </div>
                </div>
              </div>

              {/* Trial: No */}
              <div
                onClick={() => handleTrialSelect("No")}
                className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-md overflow-hidden group relative
         ${
           needsTrial === "No"
             ? "border-gray-700/50 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 backdrop-blur-sm shadow-2xl shadow-gray-400/20 scale-[1.005]"
             : "bg-white border-gray-300 hover:border-gray-500 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5"
         }`}
              >
                {/* Ambient glow on selected */}
                {needsTrial === "No" && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400/5 via-gray-500/5 to-gray-600/5 blur-md"></div>
                )}
                <div className="relative flex items-center space-x-3">
                  <input
                    type="radio"
                    {...register("needs_trial")}
                    value="No"
                    checked={needsTrial === "No"}
                    readOnly
                    className="sr-only"
                  />
                  {needsTrial === "No" ? (
                    <CheckCircleIcon className="w-6 h-6 text-gray-700 drop-shadow-lg flex-shrink-0" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-400 group-hover:border-gray-700 flex-shrink-0 transition-colors"></div>
                  )}
                  <div>
                    <h4
                      className={`font-light text-lg ${
                        needsTrial === "No" ? "text-gray-900" : "text-gray-800 group-hover:text-gray-700"
                      }`}
                    >
                      No
                    </h4>
                    <p className={`text-sm font-light ${needsTrial === "No" ? "text-gray-700" : "text-gray-600"}`}>
                      No trial needed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trial Service Selection */}
        {needsTrial === "Yes" && (
          <div className="mb-12 sm:mb-16 p-6 sm:p-8 lg:p-10 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200 shadow-xl shadow-gray-200/40">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-2 md:mb-6">
              What trials does the bride need?
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6 font-light">
              Select the specific service for your trial session.
            </p>
            <div className="space-y-4">
              {/* Trial: Both Hair & Makeup */}
              <SelectCard
                value="Both Hair & Makeup"
                label="Both Hair & Makeup"
                subtext=""
                onClick={() => handleTrialServiceSelect("Both Hair & Makeup")}
                isSelected={trialService === "Both Hair & Makeup"}
                registerProps={register("trial_service")}
                isRadio={true}
              />

              {/* Trial: Hair Only */}
              <SelectCard
                value="Hair Only"
                label="Hair Only"
                subtext=""
                onClick={() => handleTrialServiceSelect("Hair Only")}
                isSelected={trialService === "Hair Only"}
                registerProps={register("trial_service")}
                isRadio={true}
              />

              {/* Trial: Makeup Only */}
              <SelectCard
                value="Makeup Only"
                label="Makeup Only"
                subtext=""
                onClick={() => handleTrialServiceSelect("Makeup Only")}
                isSelected={trialService === "Makeup Only"}
                registerProps={register("trial_service")}
                isRadio={true}
              />
            </div>
          </div>
        )}

        {/* Trial Date and Time Selection */}
        {needsTrial === "Yes" && trialService && (
          <div className="mb-12 sm:mb-16 p-6 sm:p-8 lg:p-10 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200 shadow-xl shadow-gray-200/40">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-2 md:mb-6">
              When would you like to schedule your trial?
            </h3>
            <p className="text-gray-600 mb-6 font-light">
              Please select your preferred date and time for the trial session.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Trial Date Input */}
              <div>
                <label htmlFor={trialDateId} className="block text-sm md:text-base font-light text-gray-900 mb-2">
                  Preferred Trial Date <span className="text-gray-700">*</span>
                </label>
                {/* Wrapper to make the entire DatePicker field clickable (using inputId in DatePicker) */}
                <div
                  onClick={() => {
                    // FIX: Ensure it triggers the external DatePicker's input
                    document.getElementById(trialDateId)?.focus()
                    document.getElementById(trialDateId)?.showPicker?.()
                  }}
                  className="cursor-pointer"
                >
                  <DatePicker
                    register={register}
                    name="trial_date"
                    label="" // Label is handled above
                    required={true}
                    error={errors.trial_date?.message}
                    // FIX: Pass the ID to the DatePicker component
                    inputId={trialDateId}
                    // ORIGINAL LOGIC RETAINED
                    maxDate={
                      watchedFields.event_date
                        ? (() => {
                            const eventDate = new Date(watchedFields.event_date)
                            eventDate.setDate(eventDate.getDate() - 1) // One day before event
                            return eventDate.toISOString().split("T")[0]
                          })()
                        : undefined
                    }
                    validate={{
                      beforeEventDate: (value) => {
                        const eventDate = watchedFields.event_date
                        if (!eventDate) return true
                        const trialDate = new Date(value)
                        const eventDateObj = new Date(eventDate)
                        return trialDate < eventDateObj || "Trial must be scheduled before the event date"
                      },
                    }}
                  />
                </div>
              </div>

              {/* Trial Time Input */}
              <div>
                <label htmlFor={trialTimeId} className="block text-sm md:text-base font-light text-gray-900 mb-2">
                  Preferred Trial Time <span className="text-gray-700">*</span>
                </label>

                {/* Wrapper to make the entire time field clickable */}
                <div
                  onClick={() => {
                    document.getElementById(trialTimeId)?.showPicker?.()
                    document.getElementById(trialTimeId)?.focus()
                  }}
                  className="cursor-pointer"
                >
                  <input
                    id={trialTimeId}
                    type="time"
                    {...register("trial_time", {
                      required: "Trial time is required",
                    })}
                    className="w-full px-4 py-2 md:px-5 md:py-3 rounded-xl transition-all duration-200 text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700/50 focus:border-gray-700 cursor-pointer"
                  />
                </div>

                {errors.trial_time && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg shadow-xl shadow-red-200/20">
                    <p className="text-sm text-red-800 font-light">{errors.trial_time.message}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Information Note */}
            <div className="mt-8 p-4 bg-gray-50 border border-gray-300 rounded-xl shadow-lg">
              <p className="text-gray-700 text-sm font-light">
                <strong>Note:</strong> Trial sessions typically take 1-2 hours. We recommend scheduling your trial at
                least 1-2 weeks before your event date.
              </p>
            </div>
          </div>
        )}

        {/* Error Messages */}
        {((!selectedService && errors.bride_service) ||
          (selectedService && needsTrial === "Yes" && !trialService) ||
          (needsTrial === "Yes" && trialService && (!trialDate || !trialTime))) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg shadow-xl shadow-red-200/20">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-800 text-sm font-light">
                {(!selectedService && "Please select a bridal service to continue.") ||
                  (selectedService &&
                    needsTrial === "Yes" &&
                    !trialService &&
                    "Please select the required trial services to continue.") ||
                  (needsTrial === "Yes" &&
                    trialService &&
                    (!trialDate || !trialTime) &&
                    "Please select trial date and time to continue.")}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 sm:pt-8 border-t border-gray-300 mt-4 md:mt-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="group relative px-5 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-light rounded-lg transition-all duration-300 overflow-hidden bg-gray-200 text-gray-900 shadow-md shadow-gray-400/20 hover:bg-gray-300 hover:scale-[1.02] active:scale-100 cursor-pointer border border-gray-400"
            style={{ letterSpacing: "0.05em" }}
          >
            <span className="relative">Back</span>
          </button>

          {/* Continue Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!isNextEnabled}
            className={`
       relative px-8 sm:px-10 py-2.5 sm:py-3 text-sm sm:text-base font-light rounded-lg transition-all duration-300 overflow-hidden
       bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-md shadow-gray-700/20 hover:shadow-lg hover:shadow-gray-700/30 hover:scale-[1.02] active:scale-100 cursor-pointer border border-gray-600
       ${
         isNextEnabled
           ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg shadow-gray-700/30 hover:shadow-2xl hover:shadow-gray-700/40 hover:scale-105 active:scale-100 cursor-pointer border border-gray-600/30"
           : "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-400/30"
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
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

// import React from 'react';
// import DatePicker from './DatePicker';

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

// export default function BrideServiceSelection({ register, watch, errors, onNext, onBack, setValue }) {
//   const watchedFields = watch();
//   const selectedService = watchedFields.bride_service;
//   const needsTrial = watchedFields.needs_trial;
//   const trialService = watchedFields.trial_service;
//   const trialDate = watchedFields.trial_date;
//   const trialTime = watchedFields.trial_time;

//   const handleServiceSelect = (service) => {
//     setValue('bride_service', service);
//   };

//   const handleTrialSelect = (needsTrial) => {
//     setValue('needs_trial', needsTrial);
//     if (needsTrial === 'No') {
//       setValue('trial_service', ''); // Clear trial service if no trial needed
//       setValue('trial_date', ''); // Clear trial date if no trial needed
//       setValue('trial_time', ''); // Clear trial time if no trial needed
//     }
//   };

//   const handleTrialServiceSelect = (service) => {
//     setValue('trial_service', service);
//   };

//   const handleNext = () => {
//     if (selectedService && needsTrial !== undefined &&
//         (needsTrial === 'No' || (trialService && trialDate && trialTime))) {
//       onNext();
//     }
//   };

//   const isNextEnabled = selectedService && needsTrial !== undefined &&
//                        (needsTrial === 'No' || (trialService && trialDate && trialTime));

//   // Helper component for consistent card styling
//   const SelectCard = ({ value, label, subtext, onClick, isSelected, registerProps, isRadio }) => (
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
//         <div className="flex items-center space-x-4">
//             {/* The hidden radio input is necessary to pass the value to react-hook-form */}
//             <input
//                 type={isRadio ? "radio" : "checkbox"}
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
//             <p className={`text-sm ${isSelected ? `text-${LIGHT_ACCENT_CLASS}` : 'text-gray-600'}`}>
//               {subtext}
//             </p>
//           </div>
//         </div>

//         <div className="text-right">
//             {isSelected ? (
//                 <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
//             ) : (
//                 <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 ${isSelected ? 'border-white' : 'border-gray-300'}`}></div>
//             )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     // Applied elegant container styling (max-w-6xl, shadow-2xl, increased padding)
//     <div className="max-w-sm md:max-w-2xl lg:max-w-6xl mx-auto px-4 py-4 md:py-8 lg:py-12">
//       <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 lg:p-14 border border-gray-50">

//         {/* Header Section: Applied elegant typography (font-light, larger size) */}
//         <div className="mb-6 md:mb-10 lg:mb-14">
//           <h2 className="text-lg md:text-2xl lg:text-4xl font-light text-gray-900 mb-2 md:mb-3 tracking-tight text-left">
//             Bridal Service Details
//           </h2>
//           <p className="text-gray-500 text-sm md:text-base lg:text-lg">Select the primary service and specify trial requirements.</p>
//         </div>

//         {/* Bride Service Selection */}
//         <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">

//             {/* Both Hair & Makeup */}
//             <SelectCard
//                 value="Both Hair & Makeup"
//                 label="Both Hair & Makeup"
//                 subtext="Complete bridal styling package"
//                 onClick={() => handleServiceSelect('Both Hair & Makeup')}
//                 isSelected={selectedService === 'Both Hair & Makeup'}
//                 registerProps={register('bride_service')}
//                 isRadio={true}
//             />

//             {/* Hair Only */}
//             <SelectCard
//                 value="Hair Only"
//                 label="Hair Only"
//                 subtext="Professional hair styling only"
//                 onClick={() => handleServiceSelect('Hair Only')}
//                 isSelected={selectedService === 'Hair Only'}
//                 registerProps={register('bride_service')}
//                 isRadio={true}
//             />

//             {/* Makeup Only */}
//             <SelectCard
//                 value="Makeup Only"
//                 label="Makeup Only"
//                 subtext="Professional makeup application only"
//                 onClick={() => handleServiceSelect('Makeup Only')}
//                 isSelected={selectedService === 'Makeup Only'}
//                 registerProps={register('bride_service')}
//                 isRadio={true}
//             />
//         </div>

//         {/* Trial Question */}
//         {selectedService && (
//           <div className="mb-8 md:mb-12 p-4 md:p-6 lg:p-8 bg-gray-50 rounded-xl border border-gray-200">
//             <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
//               Do you need a Bridal Trial?
//             </h3>
//             <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
//               *A trial allows you to test your look before the big day*
//             </p>

//             <div className="space-y-4 md:flex md:space-x-4 md:space-y-0"> {/* Styled options horizontally on desktop */}

//               {/* Trial: Yes */}
//               <div
//                 onClick={() => handleTrialSelect('Yes')}
//                 className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-sm
//                   ${needsTrial === 'Yes'
//                       ? `bg-${PRIMARY_COLOR_CLASS} border-${PRIMARY_COLOR_CLASS} text-white shadow-md`
//                       : 'bg-white border-gray-300 hover:border-gray-400'
//                   }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <input
//                     type="radio"
//                     {...register('needs_trial')}
//                     value="Yes"
//                     className={`w-5 h-5 text-${PRIMARY_COLOR_CLASS} border-gray-300 focus:ring-${PRIMARY_COLOR_CLASS} ${needsTrial === 'Yes' ? 'text-white border-white' : ''}`}
//                     checked={needsTrial === 'Yes'}
//                     readOnly
//                   />
//                   <div>
//                     <h4 className={`font-semibold ${needsTrial === 'Yes' ? 'text-white' : 'text-gray-900'}`}>Yes</h4>
//                     <p className={`text-sm ${needsTrial === 'Yes' ? `text-${LIGHT_ACCENT_CLASS}` : 'text-gray-600'}`}>I would like to add a trial</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Trial: No */}
//               <div
//                 onClick={() => handleTrialSelect('No')}
//                 className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-sm
//                   ${needsTrial === 'No'
//                       ? `bg-${PRIMARY_COLOR_CLASS} border-${PRIMARY_COLOR_CLASS} text-white shadow-md`
//                       : 'bg-white border-gray-300 hover:border-gray-400'
//                   }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <input
//                     type="radio"
//                     {...register('needs_trial')}
//                     value="No"
//                     className={`w-5 h-5 text-${PRIMARY_COLOR_CLASS} border-gray-300 focus:ring-${PRIMARY_COLOR_CLASS} ${needsTrial === 'No' ? 'text-white border-white' : ''}`}
//                     checked={needsTrial === 'No'}
//                     readOnly
//                   />
//                   <div>
//                     <h4 className={`font-semibold ${needsTrial === 'No' ? 'text-white' : 'text-gray-900'}`}>No</h4>
//                     <p className={`text-sm ${needsTrial === 'No' ? `text-${LIGHT_ACCENT_CLASS}` : 'text-gray-600'}`}>No trial needed</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Trial Service Selection */}
//         {needsTrial === 'Yes' && (
//           <div className="mb-8 md:mb-12 p-4 md:p-6 lg:p-8 bg-white rounded-xl border border-gray-200 shadow-lg"> {/* Highlighted box for important choice */}
//             <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 md:mb-6">
//               What trials does the bride need?
//             </h3>

//             <div className="space-y-4">

//               {/* Trial: Both Hair & Makeup */}
//               <SelectCard
//                   value="Both Hair & Makeup"
//                   label="Both Hair & Makeup"
//                   subtext=""
//                   onClick={() => handleTrialServiceSelect('Both Hair & Makeup')}
//                   isSelected={trialService === 'Both Hair & Makeup'}
//                   registerProps={register('trial_service')}
//                   isRadio={true}
//               />

//               {/* Trial: Hair Only */}
//               <SelectCard
//                   value="Hair Only"
//                   label="Hair Only"
//                   subtext=""
//                   onClick={() => handleTrialServiceSelect('Hair Only')}
//                   isSelected={trialService === 'Hair Only'}
//                   registerProps={register('trial_service')}
//                   isRadio={true}
//               />

//               {/* Trial: Makeup Only */}
//               <SelectCard
//                   value="Makeup Only"
//                   label="Makeup Only"
//                   subtext=""
//                   onClick={() => handleTrialServiceSelect('Makeup Only')}
//                   isSelected={trialService === 'Makeup Only'}
//                   registerProps={register('trial_service')}
//                   isRadio={true}
//               />
//             </div>
//           </div>
//         )}

//         {/* Trial Date and Time Selection */}
//         {needsTrial === 'Yes' && trialService && (
//           <div className="mb-8 md:mb-12 p-4 md:p-6 lg:p-8 bg-white rounded-xl border border-gray-200 shadow-lg">
//             <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 md:mb-6">
//               When would you like to schedule your trial?
//             </h3>
//             <p className="text-gray-600 mb-6">Please select your preferred date and time for the trial session.</p>

//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Trial Date */}
//               <div>
//                 <DatePicker
//                   register={register}
//                   name="trial_date"
//                   label="Preferred Trial Date"
//                   required={true}
//                   error={errors.trial_date?.message}
//                   maxDate={watchedFields.event_date ? (() => {
//                     const eventDate = new Date(watchedFields.event_date);
//                     eventDate.setDate(eventDate.getDate() - 1); // One day before event
//                     return eventDate.toISOString().split('T')[0];
//                   })() : undefined}
//                   validate={{
//                     beforeEventDate: (value) => {
//                       const eventDate = watchedFields.event_date;
//                       if (!eventDate) return true;
//                       const trialDate = new Date(value);
//                       const eventDateObj = new Date(eventDate);
//                       return trialDate < eventDateObj || 'Trial must be scheduled before the event date';
//                     }
//                   }}
//                 />
//               </div>

//               {/* Trial Time */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Preferred Trial Time *
//                 </label>
//                 <input
//                   type="time"
//                   {...register('trial_time', { required: 'Trial time is required' })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 {errors.trial_time && (
//                   <p className="text-red-600 text-sm mt-1">{errors.trial_time.message}</p>
//                 )}
//               </div>
//             </div>

//             <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//               <p className="text-blue-800 text-sm">
//                 <strong>Note:</strong> Trial sessions typically take 1-2 hours. We recommend scheduling your trial at least 1-2 weeks before your event date.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Error Messages: Applied clean, modern error styling */}
//         {(errors.bride?.service || (selectedService && needsTrial === 'Yes' && !trialService) ||
//           (needsTrial === 'Yes' && trialService && (!trialDate || !trialTime))) && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               {/* Displaying specific error message */}
//               <p className="text-red-800 text-sm font-medium">
//                   {errors.bride?.service?.message ||
//                    (selectedService && needsTrial === 'Yes' && !trialService && "Please select the required trial services to continue.") ||
//                    (needsTrial === 'Yes' && trialService && (!trialDate || !trialTime) && "Please select trial date and time to continue.")}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Action Buttons: Applied consistent, solid-fill styling */}
//         <div className="flex justify-between pt-6 md:pt-8 border-t border-gray-100 mt-4 md:mt-6">
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
//                 // Applied Indigo primary button style
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
