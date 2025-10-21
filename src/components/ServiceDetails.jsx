"use client"

export default function ServiceDetails({ register, watch, errors, onNext, onBack }) {
  const watchedFields = watch()
  const serviceType = watchedFields.service?.type

  const PartyMemberSelector = ({ name, label, price }) => (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-gray-800">{label}</h4>
        <span className="text-gray-600 font-medium">${price}</span>
      </div>
      <div className="flex items-center space-x-4">
        <label className="text-sm text-gray-600">Quantity:</label>
        <select
          {...register(`service.${name}`)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-200 focus:border-gray-500"
        >
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Details</h2>
        <p className="text-gray-600">Select the services you need for your special day</p>
      </div>

      {/* Bridal Services */}
      {serviceType === "bridal" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Bridal Services</h3>

          <PartyMemberSelector name="bride_makeup" label="Bride - Makeup Only" price="250" />

          <PartyMemberSelector name="bride_hair_makeup" label="Bride - Hair + Makeup" price="350" />

          <PartyMemberSelector name="bridesmaid_makeup" label="Bridesmaid - Makeup Only" price="100" />

          <PartyMemberSelector name="bridesmaid_hair_makeup" label="Bridesmaid - Hair + Makeup" price="150" />

          <PartyMemberSelector name="mother_makeup" label="Mother - Makeup Only" price="120" />

          <PartyMemberSelector name="mother_hair_makeup" label="Mother - Hair + Makeup" price="180" />

          <PartyMemberSelector name="flower_girl_makeup" label="Flower Girl - Makeup Only" price="75" />

          <PartyMemberSelector name="flower_girl_hair_makeup" label="Flower Girl - Hair + Makeup" price="125" />
        </div>
      )}

      {/* Semi Bridal Services */}
      {serviceType === "semi_bridal" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Semi Bridal Services</h3>

          <PartyMemberSelector name="semi_bridal_makeup" label="Semi Bridal - Makeup Only" price="200" />

          <PartyMemberSelector name="semi_bridal_hair_makeup" label="Semi Bridal - Hair + Makeup" price="280" />

          <PartyMemberSelector name="party_member_makeup" label="Party Member - Makeup Only" price="100" />

          <PartyMemberSelector name="party_member_hair_makeup" label="Party Member - Hair + Makeup" price="150" />
        </div>
      )}

      {/* Non-Bridal/Photoshoot Services */}
      {serviceType === "non_bridal" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Non-Bridal / Photoshoot Services
          </h3>

          <PartyMemberSelector name="photoshoot_makeup" label="Photoshoot - Makeup Only" price="150" />

          <PartyMemberSelector name="photoshoot_hair_makeup" label="Photoshoot - Hair + Makeup" price="220" />

          <PartyMemberSelector name="event_makeup" label="Event - Makeup Only" price="120" />

          <PartyMemberSelector name="event_hair_makeup" label="Event - Hair + Makeup" price="180" />
        </div>
      )}

      {/* Add-ons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Add-ons</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("service.airbrush")}
                className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
              <div className="flex-1 flex justify-between">
                <label className="text-sm font-medium text-gray-700">Airbrush</label>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("service.extensions")}
                className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
              <div className="flex-1 flex justify-between">
                <label className="text-sm font-medium text-gray-700">Extensions</label>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("service.jewelry_setting")}
                className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
              <div className="flex-1 flex justify-between">
                <label className="text-sm font-medium text-gray-700">Jewelry Setting</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trial Services */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Trial Services</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("service.trial_makeup")}
                className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
              <div className="flex-1 flex justify-between">
                <label className="text-sm font-medium text-gray-700">Trial - Makeup Only</label>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register("service.trial_hair_makeup")}
                className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
              />
              <div className="flex-1 flex justify-between">
                <label className="text-sm font-medium text-gray-700">Trial - Hair + Makeup</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
