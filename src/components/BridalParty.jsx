"use client"

// Define the elegant color palette (Rose Glow Dark Mode theme)
const WARNING_COLOR_CLASS = "amber-300"

export default function BridalParty({ register, watch, errors, onNext, onBack, setValue }) {
  const watchedFields = watch()
  const bothCount = watchedFields.party_both_count ? Number.parseInt(watchedFields.party_both_count) : ""
  const makeupCount = watchedFields.party_makeup_count ? Number.parseInt(watchedFields.party_makeup_count) : ""
  const hairCount = watchedFields.party_hair_count ? Number.parseInt(watchedFields.party_hair_count) : ""
  const dupattaCount = watchedFields.party_dupatta_count ? Number.parseInt(watchedFields.party_dupatta_count) : ""
  const extensionsCount = watchedFields.party_extensions_count
    ? Number.parseInt(watchedFields.party_extensions_count)
    : ""
  const sareeDrapingCount = watchedFields.party_saree_draping_count
    ? Number.parseInt(watchedFields.party_saree_draping_count)
    : ""
  const hijabSettingCount = watchedFields.party_hijab_setting_count
    ? Number.parseInt(watchedFields.party_hijab_setting_count)
    : ""
  const airbrushCount = watchedFields.airbrush_count ? Number.parseInt(watchedFields.airbrush_count) : ""
  const hasAirbrush = watchedFields.has_party_airbrush === "Yes"

  const handleCountChange = (field, value) => {
    const newValue = value === "" ? "" : Number.parseInt(value) || ""
    setValue(`party_${field}_count`, newValue)

    // Update has_party_members based on total party count (Logic retained)
    const currentBoth =
      field === "both" ? newValue : watchedFields.party_both_count ? Number.parseInt(watchedFields.party_both_count) : 0
    const currentMakeup =
      field === "makeup"
        ? newValue
        : watchedFields.party_makeup_count
          ? Number.parseInt(watchedFields.party_makeup_count)
          : 0
    const currentHair =
      field === "hair" ? newValue : watchedFields.party_hair_count ? Number.parseInt(watchedFields.party_hair_count) : 0

    const totalParty = currentBoth + currentMakeup + currentHair
    if (totalParty > 0) {
      setValue("has_party_members", "Yes")
    }
  }

  const totalPartyMembers = (bothCount || 0) + (makeupCount || 0) + (hairCount || 0)
  // Next is always enabled in the original code, as party members are optional.
  const isNextEnabled = true

  // Helper component for radio options with charcoal light theme
  const RadioOption = ({ label, value, fieldName, isSelected }) => (
    <label
      className={`flex-1 flex items-center justify-center p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 shadow-xl overflow-hidden relative ${
        isSelected
          ? "border border-gray-400/50 bg-gradient-to-br from-gray-200/40 via-gray-300/40 to-gray-400/40 backdrop-blur-sm shadow-2xl shadow-gray-400/20 scale-[1.01]"
          : "border border-gray-300/50 bg-white/60 hover:border-gray-400/40 hover:bg-white/80"
      }`}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 via-gray-500/10 to-gray-600/10 blur-md"></div>
      )}
      <input type="radio" value={value} {...register(fieldName)} className="sr-only" />
      <span className="relative font-light text-gray-700">{label}</span>
    </label>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 sm:p-10 lg:p-14 border border-gray-300/50 shadow-2xl shadow-gray-400/20">
        {/* Header Section */}
        <div className="mb-10 sm:mb-14 text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-wide leading-tight"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Bridal Party Services
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 rounded-full mx-auto mb-5 opacity-80"></div>
          <p
            className="text-gray-600 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Aside from the bride, are there other members requiring hair and/or makeup services?
          </p>
        </div>

        {/* Initial Question */}
        <div className="mb-10 border border-gray-300/50 rounded-xl p-6 md:p-8 bg-gray-50/50 shadow-inner shadow-gray-300/20">
          <p className="text-base md:text-lg font-light text-gray-800 mb-6">
            Aside from the bride, are there other bridal party members also requiring hair and/or makeup services?
          </p>
          <div className="flex space-x-4">
            <RadioOption
              label="Yes"
              value="Yes"
              fieldName="has_party_members"
              isSelected={watchedFields.has_party_members === "Yes"}
            />
            <RadioOption
              label="No"
              value="No"
              fieldName="has_party_members"
              isSelected={watchedFields.has_party_members === "No"}
            />
          </div>
        </div>

        {watchedFields.has_party_members === "Yes" && (
          <div className="space-y-10 md:space-y-12 mb-8 md:mb-12">
            {/* Both Hair & Makeup - Section Box */}
            <div className="border border-gray-300/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-50/50 shadow-inner shadow-gray-300/20">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-light text-gray-800 mb-2">Need Both Hair & Makeup</h3>
                <p className="text-sm md:text-base text-gray-600 font-light">
                  Complete styling package. This does not include the bride.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm md:text-base font-light text-gray-800 min-w-[80px] md:min-w-[100px]">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={bothCount}
                  onChange={(e) => handleCountChange("both", e.target.value)}
                  min="0"
                  className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 transition-all text-gray-800 placeholder-gray-400 font-light min-w-[80px] md:min-w-[120px]"
                />
              </div>
            </div>

            {/* Makeup Only - Section Box */}
            <div className="border border-gray-300/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-50/50 shadow-inner shadow-gray-300/20">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-light text-gray-800 mb-2">Need Makeup Only</h3>
                <p className="text-sm md:text-base text-gray-600 font-light">
                  These people do not need hair done. This does not include the bride.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm md:text-base font-light text-gray-800 min-w-[80px] md:min-w-[100px]">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={makeupCount}
                  onChange={(e) => handleCountChange("makeup", e.target.value)}
                  min="0"
                  className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 transition-all text-gray-800 placeholder-gray-400 font-light min-w-[80px] md:min-w-[120px]"
                />
              </div>
            </div>

            {/* Hair Only - Section Box */}
            <div className="border border-gray-300/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-50/50 shadow-inner shadow-gray-300/20">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-light text-gray-800 mb-2">Need Hair Only</h3>
                <p className="text-sm md:text-base text-gray-600 font-light">
                  These people do not need makeup done. This does not include the bride.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm md:text-base font-light text-gray-800 min-w-[80px] md:min-w-[100px]">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={hairCount}
                  onChange={(e) => handleCountChange("hair", e.target.value)}
                  min="0"
                  className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 transition-all text-gray-800 placeholder-gray-400 font-light min-w-[80px] md:min-w-[120px]"
                />
              </div>
            </div>

            {/* Dupatta/Veil Setting - Section Box */}
            <div className="border border-gray-300/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-50/50 shadow-inner shadow-gray-300/20">
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-light text-gray-800 mb-2">Dupatta/Veil Setting</h3>
                <p className="text-sm md:text-base text-gray-600 font-light">
                  Professional assistance with dupatta or veil arrangement.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm md:text-base font-light text-gray-800 min-w-[80px] md:min-w-[100px]">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={dupattaCount}
                  onChange={(e) =>
                    setValue("party_dupatta_count", e.target.value === "" ? "" : Number.parseInt(e.target.value) || "")
                  }
                  min="0"
                  max={totalPartyMembers}
                  className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 transition-all text-gray-800 placeholder-gray-400 font-light min-w-[80px] md:min-w-[120px]"
                />
              </div>
            </div>

            {/* Hair Extensions Installation - Section Box */}
            <div className="border border-gray-300/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-50/50 shadow-inner shadow-gray-300/20">
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-light text-gray-800 mb-2">Hair Extensions Installation</h3>
                <p className="text-sm md:text-base text-gray-600 font-light mb-3">
                  Professional installation of hair extensions.
                </p>
                <p
                  className={`text-sm text-${WARNING_COLOR_CLASS} font-light p-3 bg-amber-900/40 rounded-xl border border-amber-800/60 shadow-lg shadow-amber-900/10`}
                >
                  *Note: We do not provide the hair extensions. Each person must have their own.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm md:text-base font-light text-gray-800 min-w-[80px] md:min-w-[100px]">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={extensionsCount}
                  onChange={(e) =>
                    setValue(
                      "party_extensions_count",
                      e.target.value === "" ? "" : Number.parseInt(e.target.value) || "",
                    )
                  }
                  min="0"
                  max={bothCount + hairCount}
                  className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 transition-all text-gray-800 placeholder-gray-400 font-light min-w-[80px] md:min-w-[120px]"
                />
              </div>
            </div>

            {/* Saree Draping - Section Box */}
            <div className="border border-gray-300/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-50/50 shadow-inner shadow-gray-300/20">
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-light text-gray-800 mb-2">Saree Draping</h3>
                <p className="text-sm md:text-base text-gray-600 font-light">
                  Traditional technique creating beautiful draping effect for dupatta or veil.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm md:text-base font-light text-gray-800 min-w-[80px] md:min-w-[100px]">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={sareeDrapingCount}
                  onChange={(e) =>
                    setValue(
                      "party_saree_draping_count",
                      e.target.value === "" ? "" : Number.parseInt(e.target.value) || "",
                    )
                  }
                  min="0"
                  max={totalPartyMembers}
                  className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 transition-all text-gray-800 placeholder-gray-400 font-light min-w-[80px] md:min-w-[120px]"
                />
              </div>
            </div>

            {/* Hijab Setting - Section Box */}
            <div className="border border-gray-300/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-50/50 shadow-inner shadow-gray-300/20">
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-light text-gray-800 mb-2">Hijab Setting</h3>
                <p className="text-sm md:text-base text-gray-600 font-light">
                  Professional assistance with hijab styling and arrangement.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <label className="text-sm md:text-base font-light text-gray-800 min-w-[80px] md:min-w-[100px]">
                  Quantity:
                </label>
                <input
                  type="number"
                  value={hijabSettingCount}
                  onChange={(e) =>
                    setValue(
                      "party_hijab_setting_count",
                      e.target.value === "" ? "" : Number.parseInt(e.target.value) || "",
                    )
                  }
                  min="0"
                  max={totalPartyMembers}
                  className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 transition-all text-gray-800 placeholder-gray-400 font-light min-w-[80px] md:min-w-[120px]"
                />
              </div>
            </div>

            {/* Airbrush Makeup Question */}
            <div className="border border-gray-300/50 rounded-xl p-6 md:p-8 bg-gray-50/50 shadow-inner shadow-gray-300/20">
              <p className="text-base md:text-lg font-light text-gray-800 mb-6">
                Do any bridal party members need airbrush makeup?
              </p>
              <div className="flex space-x-4">
                <RadioOption
                  label="Yes"
                  value="Yes"
                  fieldName="has_party_airbrush"
                  isSelected={watchedFields.has_party_airbrush === "Yes"}
                />
                <RadioOption
                  label="No"
                  value="No"
                  fieldName="has_party_airbrush"
                  isSelected={watchedFields.has_party_airbrush === "No"}
                />
              </div>
            </div>

            {/* Airbrush Makeup Application - Only show if yes */}
            {hasAirbrush && (
              <div className="border border-gray-300/50 rounded-xl p-6 md:p-8 lg:p-10 bg-gray-50/50 shadow-inner shadow-gray-300/20">
                <div className="mb-6">
                  <h3 className="text-lg md:text-xl font-light text-gray-800 mb-2">Airbrush Makeup Application</h3>
                  <p className="text-sm md:text-base text-gray-600 font-light">
                    Professional airbrush makeup application for a flawless finish.
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="text-sm md:text-base font-light text-gray-800 min-w-[80px] md:min-w-[100px]">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    value={airbrushCount}
                    onChange={(e) =>
                      setValue("airbrush_count", e.target.value === "" ? "" : Number.parseInt(e.target.value) || "")
                    }
                    min="0"
                    max={bothCount + makeupCount}
                    className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-600/50 focus:border-gray-600 transition-all text-gray-800 placeholder-gray-400 font-light min-w-[80px] md:min-w-[120px]"
                  />
                </div>
              </div>
            )}

            {/* Summary */}
            {totalPartyMembers > 0 && (
              <div className="pt-6 md:pt-8 border-t border-gray-300/50">
                <h4 className="text-base md:text-lg font-light text-gray-800 mb-3 tracking-wide">
                  Bridal Party Summary:
                </h4>
                <p className="text-sm md:text-base font-light text-gray-700 mb-4">
                  Total Members: <span className="text-gray-800 font-medium">{totalPartyMembers}</span>
                </p>
                <ul className="text-sm md:text-base text-gray-700 space-y-1 ml-4 list-disc marker:text-gray-600">
                  {bothCount > 0 && <li>{bothCount} member(s) - Both Hair & Makeup</li>}
                  {makeupCount > 0 && <li>{makeupCount} member(s) - Makeup Only</li>}
                  {hairCount > 0 && <li>{hairCount} member(s) - Hair Only</li>}
                </ul>
                {(dupattaCount > 0 ||
                  extensionsCount > 0 ||
                  sareeDrapingCount > 0 ||
                  hijabSettingCount > 0 ||
                  airbrushCount > 0) && (
                  <>
                    <h4 className="text-base md:text-lg font-light text-gray-800 mb-3 mt-6 tracking-wide">
                      Add-ons Summary:
                    </h4>
                    <ul className="text-sm md:text-base text-gray-700 space-y-1 ml-4 list-disc marker:text-gray-600">
                      {dupattaCount > 0 && <li>{dupattaCount} dupatta/veil setting(s)</li>}
                      {extensionsCount > 0 && <li>{extensionsCount} hair extension installation(s)</li>}
                      {sareeDrapingCount > 0 && <li>{sareeDrapingCount} saree draping(s)</li>}
                      {hijabSettingCount > 0 && <li>{hijabSettingCount} hijab setting(s)</li>}
                      {airbrushCount > 0 && <li>{airbrushCount} airbrush makeup application(s)</li>}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 sm:pt-8 border-t border-gray-300/50 mt-4 md:mt-6">
          <button
            type="button"
            onClick={onBack}
            className="group relative px-6 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden bg-gray-200/50 text-gray-700 shadow-lg shadow-gray-300/50 hover:bg-gray-300/50 hover:scale-[1.03] active:scale-100 cursor-pointer border border-gray-400/30"
            style={{ letterSpacing: "0.05em" }}
          >
            <span className="relative">Back</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!isNextEnabled}
            className={`relative px-10 sm:px-12 py-3.5 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden ${
              isNextEnabled
                ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg shadow-gray-700/30 hover:shadow-2xl hover:shadow-gray-700/40 hover:scale-105 active:scale-100 cursor-pointer border border-gray-600/30"
                : "bg-gray-300/50 text-gray-500 cursor-not-allowed border border-gray-400/30"
            }`}
            style={{ letterSpacing: "0.05em" }}
          >
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
