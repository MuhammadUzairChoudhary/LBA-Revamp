import React from "react";

// Define the elegant color palette (Rose Glow Dark Mode theme)
const WARNING_COLOR_CLASS = "amber-300";

export default function SemiBridalParty({
  register,
  watch,
  errors,
  onNext,
  onBack,
  setValue,
}) {
  const watchedFields = watch();
  const hairCount = watchedFields.party_hair_count
    ? parseInt(watchedFields.party_hair_count)
    : "";
  const makeupCount = watchedFields.party_makeup_count
    ? parseInt(watchedFields.party_makeup_count)
    : "";
  const bothCount = watchedFields.party_both_count
    ? parseInt(watchedFields.party_both_count)
    : "";

  // Add-ons counts
  const dupattaCount = watchedFields.party_dupatta_count
    ? parseInt(watchedFields.party_dupatta_count)
    : "";
  const extensionsCount = watchedFields.party_extensions_count
    ? parseInt(watchedFields.party_extensions_count)
    : "";
  const sareeDrapingCount = watchedFields.party_saree_draping_count
    ? parseInt(watchedFields.party_saree_draping_count)
    : "";
  const hijabSettingCount = watchedFields.party_hijab_setting_count
    ? parseInt(watchedFields.party_hijab_setting_count)
    : "";
  const airbrushCount = watchedFields.airbrush_count
    ? parseInt(watchedFields.airbrush_count)
    : "";

  // Calculate total people who will have hair done (hair only + both)
  const totalHairCount = (hairCount || 0) + (bothCount || 0);
  const totalPartyMembers =
    (hairCount || 0) + (makeupCount || 0) + (bothCount || 0);

  // Calculate maximum extension count (limited to people getting hair)
  const maxExtensions = totalHairCount;

  const handleCountChange = (field, value) => {
    const newValue = value === "" ? "" : parseInt(value) || "";
    setValue(`party_${field}_count`, newValue);

    // Update has_party_members based on total party count
    const currentBoth =
      field === "both"
        ? newValue
        : watchedFields.party_both_count
        ? parseInt(watchedFields.party_both_count)
        : 0;
    const currentMakeup =
      field === "makeup"
        ? newValue
        : watchedFields.party_makeup_count
        ? parseInt(watchedFields.party_makeup_count)
        : 0;
    const currentHair =
      field === "hair"
        ? newValue
        : watchedFields.party_hair_count
        ? parseInt(watchedFields.party_hair_count)
        : 0;

    const totalParty = currentBoth + currentMakeup + currentHair;
    if (totalParty > 0) {
      setValue("has_party_members", "Yes");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-7 sm:p-10 lg:p-14 border border-gray-700/50 shadow-2xl shadow-gray-900/50">
        {/* Header Section */}
        <div className="mb-10 sm:mb-14 text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide leading-tight"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Semi Bridal Party Services
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 rounded-full mx-auto mb-5 opacity-80"></div>
          <p
            className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Aside from the bride, are there other bridal party members also
            requiring hair and/or makeup services?
          </p>
        </div>

        <div className="space-y-8 md:space-y-10 mb-12">
          {/* Has Party Members */}
          <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
            <div className="flex space-x-6 md:space-x-8">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  {...register("has_party_members")}
                  value="Yes"
                  className="w-5 h-5 text-rose-500 border-gray-600 focus:ring-rose-500 focus:ring-2 bg-gray-800"
                />
                <span className="ml-3 text-gray-200 text-base md:text-lg font-light group-hover:text-rose-400 transition-colors">
                  Yes
                </span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  {...register("has_party_members")}
                  value="No"
                  className="w-5 h-5 text-rose-500 border-gray-600 focus:ring-rose-500 focus:ring-2 bg-gray-800"
                />
                <span className="ml-3 text-gray-200 text-base md:text-lg font-light group-hover:text-rose-400 transition-colors">
                  No
                </span>
              </label>
            </div>
          </div>

          {/* Party Details - Only show if has_party_members is Yes */}
          {watchedFields.has_party_members === "Yes" && (
            <>
              {/* Both Hair & Makeup Count */}
              <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                    Both Hair & Makeup Services
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-light mb-4">
                    How many bridal party members need both hair & makeup?
                  </p>
                  <p
                    className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10`}
                  >
                    *This does not include the bride.
                  </p>
                </div>

                <input
                  type="number"
                  {...register("party_both_count", {
                    valueAsNumber: true,
                    min: 0,
                    max: 20,
                  })}
                  onChange={(e) => handleCountChange("both", e.target.value)}
                  min="0"
                  max="20"
                  className="w-full px-4 py-3 md:py-4 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-400/50 transition-all shadow-lg backdrop-blur-sm placeholder-gray-500"
                  placeholder="Enter number (0-20)"
                />
                {errors.party_both_count && (
                  <p className="mt-3 text-sm text-rose-400 font-light">
                    {errors.party_both_count.message}
                  </p>
                )}
              </div>

              {/* Makeup Only Count */}
              <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                    Makeup Only Services
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-light mb-4">
                    How many bridal party members need makeup done only?
                  </p>
                  <p
                    className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10`}
                  >
                    *These people do not need hair done. This does not include
                    the bride.
                  </p>
                </div>

                <input
                  type="number"
                  {...register("party_makeup_count", {
                    valueAsNumber: true,
                    min: 0,
                    max: 20,
                  })}
                  onChange={(e) => handleCountChange("makeup", e.target.value)}
                  min="0"
                  max="20"
                  className="w-full px-4 py-3 md:py-4 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-400/50 transition-all shadow-lg backdrop-blur-sm placeholder-gray-500"
                  placeholder="Enter number (0-20)"
                />
                {errors.party_makeup_count && (
                  <p className="mt-3 text-sm text-rose-400 font-light">
                    {errors.party_makeup_count.message}
                  </p>
                )}
              </div>

              {/* Hair Only Count */}
              <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                    Hair Only Services
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-light mb-4">
                    How many bridal party members need hair done only?
                  </p>
                  <p
                    className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10`}
                  >
                    *These people do not need makeup done. This does not include
                    the bride.
                  </p>
                </div>

                <input
                  type="number"
                  {...register("party_hair_count", {
                    valueAsNumber: true,
                    min: 0,
                    max: 20,
                  })}
                  onChange={(e) => handleCountChange("hair", e.target.value)}
                  min="0"
                  max="20"
                  className="w-full px-4 py-3 md:py-4 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-400/50 transition-all shadow-lg backdrop-blur-sm placeholder-gray-500"
                  placeholder="Enter number (0-20)"
                />
                {errors.party_hair_count && (
                  <p className="mt-3 text-sm text-rose-400 font-light">
                    {errors.party_hair_count.message}
                  </p>
                )}
              </div>

              {/* Dupatta Setting */}
              <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                    Dupatta/Veil Setting
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-light mb-4">
                    How many bridal party members need dupatta/veil setting?
                  </p>
                  <p
                    className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10`}
                  >
                    *This does not include the bride.
                  </p>
                </div>

                <input
                  type="number"
                  {...register("party_dupatta_count", {
                    valueAsNumber: true,
                    min: 0,
                    max: totalPartyMembers,
                  })}
                  min="0"
                  max={totalPartyMembers}
                  className="w-full px-4 py-3 md:py-4 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-400/50 transition-all shadow-lg backdrop-blur-sm placeholder-gray-500"
                  placeholder="Enter number"
                />
                {errors.party_dupatta_count && (
                  <p className="mt-3 text-sm text-rose-400 font-light">
                    {errors.party_dupatta_count.message}
                  </p>
                )}
              </div>

              {/* Hair Extensions */}
              <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                    Hair Extensions Installation
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-light mb-4">
                    How many bridal party members need hair extensions
                    installed?
                  </p>
                  <p
                    className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10`}
                  >
                    *We do not provide the hair extensions. They must have their
                    own. This does not include the bride.
                  </p>
                </div>

                <input
                  type="number"
                  {...register("party_extensions_count", {
                    valueAsNumber: true,
                    min: 0,
                    max: maxExtensions,
                  })}
                  min="0"
                  max={maxExtensions}
                  className="w-full px-4 py-3 md:py-4 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-400/50 transition-all shadow-lg backdrop-blur-sm placeholder-gray-500"
                  placeholder="Enter number"
                />
                {errors.party_extensions_count && (
                  <p className="mt-3 text-sm text-rose-400 font-light">
                    {errors.party_extensions_count.message}
                  </p>
                )}
              </div>

              {/* Saree Draping */}
              <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                    Saree Draping
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-light mb-4">
                    How many bridal party members need saree draping?
                  </p>
                  <p
                    className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10`}
                  >
                    *Traditional technique creating beautiful draping effect for
                    dupatta or veil. This does not include the bride.
                  </p>
                </div>

                <input
                  type="number"
                  {...register("party_saree_draping_count", {
                    valueAsNumber: true,
                    min: 0,
                    max: totalPartyMembers,
                  })}
                  min="0"
                  max={totalPartyMembers}
                  className="w-full px-4 py-3 md:py-4 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-400/50 transition-all shadow-lg backdrop-blur-sm placeholder-gray-500"
                  placeholder="Enter number"
                />
                {errors.party_saree_draping_count && (
                  <p className="mt-3 text-sm text-rose-400 font-light">
                    {errors.party_saree_draping_count.message}
                  </p>
                )}
              </div>

              {/* Hijab Setting */}
              <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                    Hijab Setting
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-light mb-4">
                    How many bridal party members need hijab setting?
                  </p>
                  <p
                    className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10`}
                  >
                    *Professional assistance with hijab styling and arrangement.
                    This does not include the bride.
                  </p>
                </div>

                <input
                  type="number"
                  {...register("party_hijab_setting_count", {
                    valueAsNumber: true,
                    min: 0,
                    max: totalPartyMembers,
                  })}
                  min="0"
                  max={totalPartyMembers}
                  className="w-full px-4 py-3 md:py-4 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-400/50 transition-all shadow-lg backdrop-blur-sm placeholder-gray-500"
                  placeholder="Enter number"
                />
                {errors.party_hijab_setting_count && (
                  <p className="mt-3 text-sm text-rose-400 font-light">
                    {errors.party_hijab_setting_count.message}
                  </p>
                )}
              </div>

              {/* Airbrush Makeup */}
              <div className="border border-gray-700/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-800/50 shadow-inner shadow-gray-900/30">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                    Airbrush Makeup Services
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base font-light mb-4">
                    Do any bridal party members need airbrush makeup?
                  </p>
                </div>

                <div className="flex space-x-6 md:space-x-8 mb-6">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      {...register("has_airbrush")}
                      value="Yes"
                      className="w-5 h-5 text-rose-500 border-gray-600 focus:ring-rose-500 focus:ring-2 bg-gray-800"
                    />
                    <span className="ml-3 text-gray-200 text-base md:text-lg font-light group-hover:text-rose-400 transition-colors">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      {...register("has_airbrush")}
                      value="No"
                      className="w-5 h-5 text-rose-500 border-gray-600 focus:ring-rose-500 focus:ring-2 bg-gray-800"
                    />
                    <span className="ml-3 text-gray-200 text-base md:text-lg font-light group-hover:text-rose-400 transition-colors">
                      No
                    </span>
                  </label>
                </div>

                {watchedFields.has_airbrush === "Yes" && (
                  <div className="mt-6 border-t border-gray-700/50 pt-6">
                    <h4 className="text-base md:text-lg font-light text-white mb-3">
                      How many bridal party members need airbrush makeup?
                    </h4>
                    <p
                      className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10 mb-4`}
                    >
                      *This is an upgrade for makeup services. This does not
                      include the bride.
                    </p>
                    <input
                      type="number"
                      {...register("airbrush_count", {
                        valueAsNumber: true,
                        min: 0,
                        max: bothCount + makeupCount,
                      })}
                      min="0"
                      max={bothCount + makeupCount}
                      className="w-full px-4 py-3 md:py-4 bg-gray-900/60 border border-gray-700/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-400/50 transition-all shadow-lg backdrop-blur-sm placeholder-gray-500"
                      placeholder="Enter number"
                    />
                    {errors.airbrush_count && (
                      <p className="mt-3 text-sm text-rose-400 font-light">
                        {errors.airbrush_count.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        {totalPartyMembers > 0 && (
          <div className="pt-6 md:pt-8 border-t border-gray-700/50 mt-6">
            <h4 className="text-base md:text-lg font-light text-white mb-3 tracking-wide">
              Bridal Party Summary:
            </h4>
            <p className="text-sm md:text-base font-light text-gray-300 mb-3">
              Total Members:{" "}
              <span className="text-rose-300 font-semibold">
                {totalPartyMembers}
              </span>
            </p>
            <ul className="text-sm md:text-base text-gray-300 space-y-1 ml-4 list-disc marker:text-rose-400">
              {bothCount > 0 && (
                <li>{bothCount} member(s) - Both Hair & Makeup</li>
              )}
              {makeupCount > 0 && (
                <li>{makeupCount} member(s) - Makeup Only</li>
              )}
              {hairCount > 0 && <li>{hairCount} member(s) - Hair Only</li>}
            </ul>
            {(dupattaCount > 0 ||
              extensionsCount > 0 ||
              sareeDrapingCount > 0 ||
              hijabSettingCount > 0 ||
              airbrushCount > 0) && (
              <>
                <h4 className="text-base md:text-lg font-light text-white mb-3 mt-6 tracking-wide">
                  Add-ons Summary:
                </h4>
                <ul className="text-sm md:text-base text-gray-300 space-y-1 ml-4 list-disc marker:text-rose-400">
                  {dupattaCount > 0 && (
                    <li>{dupattaCount} dupatta/veil setting(s)</li>
                  )}
                  {extensionsCount > 0 && (
                    <li>{extensionsCount} hair extension installation(s)</li>
                  )}
                  {sareeDrapingCount > 0 && (
                    <li>{sareeDrapingCount} saree draping(s)</li>
                  )}
                  {hijabSettingCount > 0 && (
                    <li>{hijabSettingCount} hijab setting(s)</li>
                  )}
                  {airbrushCount > 0 && (
                    <li>{airbrushCount} airbrush makeup application(s)</li>
                  )}
                </ul>
              </>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 sm:pt-8 border-t border-gray-700/50 mt-4 md:mt-6">
          <button
            type="button"
            onClick={onBack}
            className="group relative px-6 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden bg-gray-700/50 text-gray-200 shadow-lg shadow-gray-900/50 hover:bg-gray-700/80 hover:scale-[1.03] active:scale-100 cursor-pointer border border-gray-600/30"
            style={{ letterSpacing: "0.05em" }}
          >
            <span className="relative">Back</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="relative px-10 sm:px-12 py-3.5 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:scale-105 active:scale-100 cursor-pointer border border-rose-400/30"
            style={{ letterSpacing: "0.05em" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out"></div>
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

// export default function SemiBridalParty({
//   register,
//   watch,
//   errors,
//   onNext,
//   onBack,
//   setValue,
// }) {
//   const watchedFields = watch();
//   const hairCount = watchedFields.party_hair_count
//     ? parseInt(watchedFields.party_hair_count)
//     : "";
//   const makeupCount = watchedFields.party_makeup_count
//     ? parseInt(watchedFields.party_makeup_count)
//     : "";
//   const bothCount = watchedFields.party_both_count
//     ? parseInt(watchedFields.party_both_count)
//     : "";

//   const dupattaCount = watchedFields.party_dupatta_count
//     ? parseInt(watchedFields.party_dupatta_count)
//     : "";
//   const extensionsCount = watchedFields.party_extensions_count
//     ? parseInt(watchedFields.party_extensions_count)
//     : "";
//   const airbrushCount = watchedFields.airbrush_count
//     ? parseInt(watchedFields.airbrush_count)
//     : "";

//   const totalHairCount = (hairCount || 0) + (bothCount || 0);
//   const totalPartyMembers =
//     (hairCount || 0) + (makeupCount || 0) + (bothCount || 0);
//   const maxExtensions = totalHairCount;

//   const handleCountChange = (field, value) => {
//     const newValue = value === "" ? "" : parseInt(value) || "";
//     setValue(`party_${field}_count`, newValue);

//     const currentBoth =
//       field === "both"
//         ? newValue
//         : watchedFields.party_both_count
//         ? parseInt(watchedFields.party_both_count)
//         : 0;
//     const currentMakeup =
//       field === "makeup"
//         ? newValue
//         : watchedFields.party_makeup_count
//         ? parseInt(watchedFields.party_makeup_count)
//         : 0;
//     const currentHair =
//       field === "hair"
//         ? newValue
//         : watchedFields.party_hair_count
//         ? parseInt(watchedFields.party_hair_count)
//         : 0;

//     const totalParty = currentBoth + currentMakeup + currentHair;
//     if (totalParty > 0) {
//       setValue("has_party_members", "Yes");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
//       <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-7 sm:p-10 lg:p-14 border border-gray-700/50 shadow-2xl shadow-gray-900/50">
//         <div className="mb-10 sm:mb-14 text-left">
//           <h2
//             className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide leading-tight"
//             style={{
//               fontFamily: "system-ui, -apple-system, sans-serif",
//               letterSpacing: "0.02em",
//             }}
//           >
//             Semi Bridal Party Services
//           </h2>
//           <p
//             className="text-gray-300 text-base sm:text-lg font-light max-w-2xl leading-relaxed"
//             style={{ letterSpacing: "0.01em" }}
//           >
//             Aside from the bride, are there other bridal party members also
//             requiring hair and/or makeup services?
//           </p>
//         </div>

//         <div className="mb-10 sm:mb-14">
//           <p
//             className="text-base sm:text-lg font-light text-white mb-4"
//             style={{ letterSpacing: "0.01em" }}
//           >
//             Aside from the bride, are there other bridal party members also
//             requiring hair and/or makeup services?
//           </p>
//           <div className="flex space-x-6">
//             <label className="flex items-center cursor-pointer text-gray-300 hover:text-rose-400 transition-colors duration-300">
//               <input
//                 type="radio"
//                 value="Yes"
//                 {...register("has_party_members")}
//                 className="mr-3 w-5 h-5 rounded border-gray-600 bg-gray-700 focus:ring-rose-400 cursor-pointer"
//               />
//               Yes
//             </label>
//             <label className="flex items-center cursor-pointer text-gray-300 hover:text-rose-400 transition-colors duration-300">
//               <input
//                 type="radio"
//                 value="No"
//                 {...register("has_party_members")}
//                 className="mr-3 w-5 h-5 rounded border-gray-600 bg-gray-700 focus:ring-rose-400 cursor-pointer"
//               />
//               No
//             </label>
//           </div>
//         </div>

//         {watchedFields.has_party_members === "Yes" && (
//           <div className="space-y-8 mb-14">
//             {[
//               {
//                 title: "Need Both Hair & Makeup",
//                 desc: "Complete styling package. This does not include the bride.",
//                 value: bothCount,
//                 field: "both",
//               },
//               {
//                 title: "Need Makeup Only",
//                 desc: "These people do not need hair done. This does not include the bride.",
//                 value: makeupCount,
//                 field: "makeup",
//               },
//               {
//                 title: "Need Hair Only",
//                 desc: "These people do not need makeup done. This does not include the bride.",
//                 value: hairCount,
//                 field: "hair",
//               },
//               {
//                 title: "Dupatta/Veil Setting",
//                 desc: "Professional assistance with dupatta or veil arrangement.",
//                 value: dupattaCount,
//                 field: "dupatta",
//                 maxVal: totalPartyMembers,
//                 isManualSetValue: true,
//               },
//               {
//                 title: "Hair Extensions Installation",
//                 desc: "Professional installation of hair extensions.",
//                 note: "Note: We do not provide the hair extensions. Each person must have their own.",
//                 value: extensionsCount,
//                 field: "extensions",
//                 maxVal: maxExtensions,
//                 isManualSetValue: true,
//                 warning: true,
//               },
//             ].map(
//               ({
//                 title,
//                 desc,
//                 value,
//                 field,
//                 maxVal,
//                 isManualSetValue,
//                 note,
//               }) => (
//                 <div
//                   key={field}
//                   className="border border-gray-700/50 rounded-2xl p-7 sm:p-8 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-fuchsia-500/10 shadow-inner"
//                 >
//                   <h3 className="text-xl sm:text-2xl font-light text-white mb-2">
//                     {title}
//                   </h3>
//                   <p className="text-gray-300 text-base font-light mb-4">
//                     {desc}
//                   </p>
//                   {note && (
//                     <p className="text-rose-300 font-medium p-3 bg-rose-900/10 rounded-lg border border-rose-700 mb-4">
//                       {note}
//                     </p>
//                   )}
//                   <div className="flex items-center space-x-6 max-w-[320px]">
//                     <label className="min-w-[100px] text-gray-300 font-light text-base">
//                       Quantity:
//                     </label>
//                     <input
//                       type="number"
//                       value={value}
//                       onChange={(e) => {
//                         const val =
//                           e.target.value === ""
//                             ? ""
//                             : parseInt(e.target.value) || "";
//                         if (isManualSetValue) {
//                           setValue(`party_${field}_count`, val);
//                         } else {
//                           handleCountChange(field, e.target.value);
//                         }
//                       }}
//                       min="0"
//                       max={maxVal}
//                       className="w-full max-w-[100px] px-5 py-3 rounded-2xl bg-transparent border border-gray-600 text-white placeholder-gray-500 font-light text-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>
//               )
//             )}

//             <div className="border border-gray-700/50 rounded-2xl p-7 sm:p-8 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-fuchsia-500/10 shadow-inner">
//               <p className="text-white text-lg font-light mb-6">
//                 Do any bridal party members need airbrush makeup?
//               </p>
//               <div className="flex space-x-6">
//                 {["Yes", "No"].map((val) => (
//                   <label
//                     key={val}
//                     className="flex items-center cursor-pointer text-gray-300 hover:text-rose-400 transition-colors duration-300"
//                   >
//                     <input
//                       type="radio"
//                       value={val}
//                       {...register("has_airbrush")}
//                       className="mr-3 w-5 h-5 rounded border-gray-600 bg-gray-700 focus:ring-rose-400 cursor-pointer"
//                     />
//                     {val}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {watchedFields.has_airbrush === "Yes" && (
//               <div className="border border-gray-700/50 rounded-2xl p-7 sm:p-8 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-fuchsia-500/10 shadow-inner">
//                 <h3 className="text-xl sm:text-2xl font-light text-white mb-2">
//                   Airbrush Makeup Application
//                 </h3>
//                 <p className="text-gray-300 text-base font-light mb-4">
//                   Professional airbrush makeup application for a flawless
//                   finish.
//                 </p>
//                 <div className="flex items-center space-x-6 max-w-[320px]">
//                   <label className="min-w-[100px] text-gray-300 font-light text-base">
//                     Quantity:
//                   </label>
//                   <input
//                     type="number"
//                     value={airbrushCount}
//                     onChange={(e) =>
//                       setValue(
//                         "airbrush_count",
//                         e.target.value === ""
//                           ? ""
//                           : parseInt(e.target.value) || ""
//                       )
//                     }
//                     min="0"
//                     max={bothCount + makeupCount}
//                     className="w-full max-w-[100px] px-5 py-3 rounded-2xl bg-transparent border border-gray-600 text-white placeholder-gray-500 font-light text-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
//                     placeholder="0"
//                   />
//                 </div>
//               </div>
//             )}

//             {totalPartyMembers > 0 && (
//               <div className="pt-6 border-t border-gray-700/50">
//                 <h4 className="text-lg font-light text-white mb-4">
//                   Bridal Party Summary:
//                 </h4>
//                 <p className="text-white font-light text-base mb-4">
//                   Total Members:{" "}
//                   <span className="text-rose-400 font-semibold">
//                     {totalPartyMembers}
//                   </span>
//                 </p>
//                 <ul className="text-gray-400 list-disc ml-6 space-y-1 mb-6">
//                   {bothCount > 0 && (
//                     <li>{bothCount} member(s) - Both Hair & Makeup</li>
//                   )}
//                   {makeupCount > 0 && (
//                     <li>{makeupCount} member(s) - Makeup Only</li>
//                   )}
//                   {hairCount > 0 && <li>{hairCount} member(s) - Hair Only</li>}
//                 </ul>
//                 {(dupattaCount > 0 ||
//                   extensionsCount > 0 ||
//                   airbrushCount > 0) && (
//                   <>
//                     <h4 className="text-lg font-light text-white mb-4">
//                       Add-ons Summary:
//                     </h4>
//                     <ul className="text-gray-400 list-disc ml-6 space-y-1">
//                       {dupattaCount > 0 && (
//                         <li>{dupattaCount} dupatta/veil setting(s)</li>
//                       )}
//                       {extensionsCount > 0 && (
//                         <li>
//                           {extensionsCount} hair extension installation(s)
//                         </li>
//                       )}
//                       {airbrushCount > 0 && (
//                         <li>{airbrushCount} airbrush makeup application(s)</li>
//                       )}
//                     </ul>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         <div className="flex justify-between items-center pt-6 border-t border-gray-700/50 mt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             className="relative px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white font-light text-lg shadow-lg shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:scale-[1.05] transition-transform duration-300 cursor-pointer border border-rose-400/30 overflow-hidden"
//             style={{ letterSpacing: "0.05em" }}
//           >
//             Back
//           </button>
//           <button
//             type="button"
//             onClick={onNext}
//             className="relative px-10 py-4 rounded-2xl font-light text-lg shadow-lg transition-transform duration-300 overflow-hidden border bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:scale-[1.05] cursor-pointer border-rose-400/30"
//             style={{ letterSpacing: "0.05em" }}
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
