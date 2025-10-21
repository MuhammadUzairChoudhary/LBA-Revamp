import React, { useState } from "react";

// Icon for Error Messages
const ErrorIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

export default function EditBookingLookup({ onBookingLoaded, onBack }) {
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId.trim()) {
      setError("Please enter a booking ID");
      return;
    }

    setLoading(true);
    setError("");

    // --- LOGIC RETAINED: API CALL ---
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4000/api"
        }/bookings/lookup/${bookingId.trim()}`
      );
      if (!response.ok) {
        throw new Error("Booking not found");
      }
      const booking = await response.json();

      // Check payment status and redirect accordingly
      const paymentStatus = booking.payment_status;
      const remainingAmount = booking.pricing?.remaining_amount || 0;

      if (paymentStatus === "fully_paid" || remainingAmount === 0) {
        // Redirect to success page for fully paid bookings
        const qs = new URLSearchParams({
          booking_id: bookingId.trim(),
          fully_paid: "1",
        });
        window.location.replace(`/success?${qs.toString()}`);
        return;
      }

      if (paymentStatus === "deposit_paid") {
        // Redirect to remaining payment page for deposit paid bookings
        window.location.replace(
          `/remaining-payment?booking_id=${bookingId.trim()}`
        );
        return;
      }

      // Check if payment has been made - prevent editing if deposit paid but not fully paid
      if (Number(booking.pricing?.amount_paid || 0) > 0) {
        throw new Error(
          "This booking cannot be edited as payment has already been made. Please contact customer support for any changes."
        );
      }

      onBookingLoaded(booking);
    } catch (err) {
      setError(err.message || "Failed to load booking");
    } finally {
      setLoading(false);
    }
  };
  // --- END LOGIC RETAINED ---

  return (
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
            Edit Your Booking
          </h2>
          {/* Divider line matching standard */}
          <div className="h-0.5 w-20 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 rounded-full mx-auto mb-5 opacity-80"></div>
          <p
            className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed"
            style={{ letterSpacing: "0.01em" }}
          >
            Enter your booking ID to load and edit your booking details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 md:space-y-6 mb-8 md:mb-12 max-w-md mx-auto"
        >
          <div>
            {/* Label matching the text-white standard for visibility */}
            <label
              htmlFor="bookingId"
              className="block text-sm md:text-base font-light text-white mb-2"
            >
              Booking ID
            </label>
            <input
              type="text"
              id="bookingId"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              placeholder="e.g. BBabc123def"
              // Applied elegant Dark Mode input styling
              className={`
        w-full px-4 py-2 md:px-5 md:py-3 rounded-xl transition-all duration-200 text-neutral-200 
        bg-neutral-900 border ${error ? "border-red-700" : "border-neutral-700"}
        focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500
        font-light text-base md:text-lg placeholder-gray-500
       `}
              required
            />
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg shadow-xl shadow-red-900/20 flex items-center justify-center">
              <ErrorIcon className="w-5 h-5 text-red-300 mr-3 flex-shrink-0" />
              <p className="text-red-200 text-sm font-light text-center">
                {error}
              </p>
            </div>
          )}

          <div className="flex justify-between gap-4 pt-4">
            {/* Back Button (Secondary Style) */}
            <button
              type="button"
              onClick={onBack}
              className="group relative px-6 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden bg-gray-700/50 text-gray-200 shadow-lg shadow-gray-900/50 hover:bg-gray-700/80 hover:scale-[1.03] active:scale-100 cursor-pointer border border-gray-600/30"
              style={{ letterSpacing: "0.05em" }}
            >
              <span className="relative">Back</span>
            </button>

            {/* Load Booking Button (Primary Style - Rose Glow Gradient) */}
            <button
              type="submit"
              disabled={loading}
              className={`
        relative px-10 sm:px-12 py-3.5 sm:py-4 text-base sm:text-lg font-light rounded-xl transition-all duration-300 overflow-hidden
        ${
          loading
            ? "bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/30"
            : "bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:scale-105 active:scale-100 cursor-pointer border border-rose-400/30"
        }
       `}
              style={{ letterSpacing: "0.05em" }}
            >
              {/* Animated shimmer effect (Only on enabled state) */}
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              )}
              <span className="relative flex items-center justify-center gap-2.5">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  "Load Booking →"
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';

// export default function EditBookingLookup({ onBookingLoaded, onBack }) {
//   const [bookingId, setBookingId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!bookingId.trim()) {
//       setError('Please enter a booking ID');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/bookings/lookup/${bookingId.trim()}`);
//       if (!response.ok) {
//         throw new Error('Booking not found');
//       }
//       const booking = await response.json();

//       // Check payment status and redirect accordingly
//       const paymentStatus = booking.payment_status;
//       const remainingAmount = booking.pricing?.remaining_amount || 0;

//       if (paymentStatus === 'fully_paid' || remainingAmount === 0) {
//         // Redirect to success page for fully paid bookings
//         const qs = new URLSearchParams({
//           booking_id: bookingId.trim(),
//           fully_paid: '1'
//         });
//         window.location.replace(`/success?${qs.toString()}`);
//         return;
//       }

//       if (paymentStatus === 'deposit_paid') {
//         // Redirect to remaining payment page for deposit paid bookings
//         window.location.replace(`/remaining-payment?booking_id=${bookingId.trim()}`);
//         return;
//       }

//       // Check if payment has been made - prevent editing if deposit paid but not fully paid
//       if (Number(booking.pricing?.amount_paid || 0) > 0) {
//         throw new Error('This booking cannot be edited as payment has already been made. Please contact customer support for any changes.');
//       }

//       onBookingLoaded(booking);
//     } catch (err) {
//       setError(err.message || 'Failed to load booking');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm">
//       <div className="text-center mb-6 md:mb-8">
//         <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Edit Your Booking</h2>
//         <p className="text-sm md:text-base text-gray-600">Enter your booking ID to load and edit your booking details.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 mb-6 md:mb-8">
//         <div>
//           <label htmlFor="bookingId" className="block text-sm font-medium text-gray-700 mb-2">
//             Booking ID
//           </label>
//           <input
//             type="text"
//             id="bookingId"
//             value={bookingId}
//             onChange={(e) => setBookingId(e.target.value)}
//             placeholder="e.g. BBabc123def"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//         </div>

//         {error && (
//           <div className="text-red-600 text-sm text-center">
//             {error}
//           </div>
//         )}

//         <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
//           <button
//             type="button"
//             onClick={onBack}
//             className="px-4 py-2 md:px-6 md:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-sm md:text-base"
//           >
//             ← Back
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
//               loading
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
//             }`}
//           >
//             {loading ? 'Loading...' : 'Load Booking →'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
