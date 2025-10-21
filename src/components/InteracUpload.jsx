import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

// API instance remains unchanged
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

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

// Icon for Success Messages
const SuccessIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export default function InteracUpload() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState(null);
  const [interacInfo, setInteracInfo] = useState(null);
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState("lookup"); // 'lookup', 'upload'

  // --- LOGIC RETAINED ---
  useEffect(() => {
    const bookingIdFromUrl = searchParams.get("booking_id");
    if (bookingIdFromUrl) {
      setBookingId(bookingIdFromUrl);
      handleBookingLookup(bookingIdFromUrl);
    }
  }, [searchParams]);

  const handleBookingLookup = async (bid = bookingId) => {
    if (!bid.trim()) {
      setError("Please enter a booking ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Check if booking has remaining payment
      const remainingResponse = await api.get(
        `/interac/check-remaining/${bid}`
      );

      if (!remainingResponse.data.hasRemainingPayment) {
        setError(
          "This booking has no remaining payment or is already fully paid."
        );
        return;
      }

      // Get booking details
      const bookingResponse = await api.get(`/quote/${bid}`);
      setBooking(bookingResponse.data);

      // Get Interac payment info
      const interacResponse = await api.get(`/interac/payment-info/${bid}`);
      setInteracInfo(interacResponse.data);

      setStep("upload");
    } catch (error) {
      setError(error.response?.data?.error || "Booking not found or invalid");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setScreenshot(file);
      setError("");
    }
  };

  const uploadScreenshot = async () => {
    if (!screenshot) {
      setError("Please select a screenshot to upload");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("screenshot", screenshot);
      formData.append("bookingId", bookingId);
      formData.append("paymentType", determinePaymentType());

      await api.post("/interac/upload-screenshot", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(
        "Screenshot uploaded successfully! The admin will verify your payment shortly."
      );
      setScreenshot(null);

      // Refresh Interac info
      const interacResponse = await api.get(
        `/interac/payment-info/${bookingId}`
      );
      setInteracInfo(interacResponse.data);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to upload screenshot");
    } finally {
      setUploading(false);
    }
  };

  const determinePaymentType = () => {
    if (!interacInfo || !booking) return "deposit";

    // Check actual payment status from booking
    const paymentStatus = booking.payment_status;

    // If payment status is pending, user needs to pay deposit
    if (paymentStatus === "pending") return "deposit";

    // If deposit is paid, user needs to pay final amount
    if (paymentStatus === "deposit_paid") return "final";

    // If fully paid, shouldn't reach here but default to final
    if (paymentStatus === "fully_paid") return "final";

    // Fallback logic based on amounts
    if (interacInfo.amountPaid === 0) return "deposit";
    if (interacInfo.remainingAmount > 0) return "final";

    return "deposit";
  };

  const getPaymentTypeLabel = () => {
    const type = determinePaymentType();
    return type === "deposit" ? "Deposit Payment" : "Final Payment";
  };

  const getPaymentAmount = () => {
    if (!interacInfo) return 0;

    const type = determinePaymentType();
    return type === "deposit"
      ? interacInfo.depositAmount
      : interacInfo.remainingAmount;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-CA");
  };
  // --- END LOGIC RETAINED ---

  if (step === "lookup") {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide leading-tight">
              Upload Payment Screenshot
            </h1>
            <div className="h-0.5 w-20 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 rounded-full mx-auto mb-5 opacity-80"></div>
            <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Upload your Interac e-transfer payment screenshot.
            </p>
          </div>

          {/* Lookup Card */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-2xl shadow-gray-900/50 p-7 border border-gray-700/50">
            <h2 className="text-xl font-light text-white mb-6">
              Enter Your Booking ID
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg shadow-xl shadow-red-900/20 flex items-center">
                <ErrorIcon className="w-5 h-5 text-red-300 mr-3 flex-shrink-0" />
                <p className="text-red-200 text-sm font-light">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="booking-id"
                  className="block text-sm font-light text-white mb-2"
                >
                  Booking ID
                </label>
                <input
                  id="booking-id"
                  type="text"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="Enter your booking ID"
                  // Applied elegant Dark Mode input styling
                  className="w-full px-4 py-2 md:px-5 md:py-3 rounded-xl transition-all duration-200 text-neutral-200 bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 font-light text-base md:text-lg placeholder-gray-500"
                />
              </div>

              {/* Continue Button (Primary Style - Rose Glow Gradient) */}
              <button
                onClick={() => handleBookingLookup()}
                disabled={loading || !bookingId.trim()}
                className={`w-full relative px-4 py-3 rounded-xl font-light text-base md:text-lg transition-all duration-300 overflow-hidden flex items-center justify-center ${
                  loading || !bookingId.trim()
                    ? "bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/30"
                    : "bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:scale-[1.01] cursor-pointer border border-rose-400/30"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Looking up booking...
                  </>
                ) : (
                  "Load Booking"
                )}
              </button>
              {/* Back Button */}
              <button
                onClick={() => navigate("/")}
                className="w-full px-4 py-3 mt-4 bg-gray-700/50 text-gray-200 rounded-xl hover:bg-gray-700/80 transition-colors cursor-pointer text-sm md:text-base font-light border border-gray-600/30"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide leading-tight">
            Upload Payment Screenshot
          </h1>
          <div className="h-0.5 w-20 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 rounded-full mx-auto mb-5 opacity-80"></div>
          <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Review your payment details and upload your Interac e-transfer
            screenshot.
          </p>
        </div>

        {/* Back Button (Styled to fit layout) */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-700/50 text-gray-200 rounded-xl hover:bg-gray-700/80 transition-colors cursor-pointer text-sm md:text-base font-light border border-gray-600/30"
          >
            Back to Home
          </button>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg shadow-xl shadow-red-900/20 flex items-center">
            <ErrorIcon className="w-5 h-5 text-red-300 mr-3 flex-shrink-0" />
            <p className="text-red-200 text-sm font-light">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg shadow-xl shadow-green-900/20 flex items-center">
            <SuccessIcon className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" />
            <p className="text-green-200 text-sm font-light">{success}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Booking Summary */}
          {booking && (
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-gray-700/50">
              <h2 className="text-xl font-light text-white mb-4">
                Booking Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <span className="font-medium text-rose-300">Booking ID:</span>
                  <span className="ml-2 text-white">
                    {bookingId ||
                      booking?.booking_id ||
                      booking?.unique_id ||
                      "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-rose-300">Client:</span>
                  <span className="ml-2 text-white">{booking.name}</span>
                </div>
                <div>
                  <span className="font-medium text-rose-300">Event Date:</span>
                  <span className="ml-2 text-white">
                    {formatDate(booking.event_date)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-rose-300">
                    Service Type:
                  </span>
                  <span className="ml-2 text-white">
                    {booking.service_type}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Information */}
          {interacInfo && booking && (
            <>
              {booking.payment_status === "fully_paid" ? (
                <div className="bg-green-900/50 border border-green-700 rounded-lg p-6 shadow-xl shadow-green-900/20">
                  <div className="flex items-center">
                    <SuccessIcon className="w-6 h-6 text-green-300 mr-3" />
                    <h3 className="text-lg font-light text-green-300">
                      Payment Completed
                    </h3>
                  </div>
                  <p className="text-green-200 mt-2 text-sm font-light">
                    All payments for this booking have been completed. No
                    additional payment is required.
                  </p>
                </div>
              ) : (
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-xl shadow-gray-900/20">
                  <h3 className="text-lg font-light text-rose-300 mb-4">
                    {getPaymentTypeLabel()} - Interac E-Transfer
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="font-light text-gray-400">
                        Send payment to:
                      </span>
                      <span className="text-rose-200 font-mono bg-neutral-900 px-2 py-1 rounded-md text-sm">
                        {interacInfo.interacEmail}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-light text-gray-400">
                        Amount to pay:
                      </span>
                      <span className="text-2xl font-light text-rose-400">
                        ${getPaymentAmount().toFixed(2)} CAD
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-neutral-900 rounded-md border border-gray-700">
                    <p className="text-sm text-gray-300 font-light">
                      <strong>Instructions:</strong> Send the{" "}
                      {getPaymentTypeLabel().toLowerCase()} via Interac
                      e-transfer to the email above, then upload a screenshot of
                      the payment confirmation below.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Screenshot Upload - Only show if not fully paid */}
          {booking && booking.payment_status !== "fully_paid" && (
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-gray-700/50">
              <h3 className="text-lg font-light text-white mb-4">
                Upload Payment Screenshot
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-light text-white mb-2">
                    Payment Screenshot (Max 5MB)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    // Styling file input for dark theme (complex, using file:: prefix)
                    className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-light file:bg-gray-700 file:text-white hover:file:bg-gray-600 file:cursor-pointer transition-colors text-gray-300 border border-gray-700 rounded-xl bg-neutral-900 p-2"
                  />
                  {screenshot && (
                    <p className="mt-2 text-sm text-rose-200 font-light">
                      Selected: {screenshot.name}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500 font-light">
                    Accepted formats: JPG, PNG, GIF.
                  </p>
                </div>

                {/* Upload Button (Primary Style - Rose Glow Gradient) */}
                <button
                  onClick={uploadScreenshot}
                  disabled={uploading || !screenshot}
                  className={`w-full relative px-4 py-3 rounded-xl font-light text-base md:text-lg transition-all duration-300 overflow-hidden flex items-center justify-center ${
                    uploading || !screenshot
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/30"
                      : "bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/40 hover:scale-[1.01] cursor-pointer border border-rose-400/30"
                  }`}
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Uploading Screenshot...
                    </>
                  ) : (
                    "Upload Payment Screenshot"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Previously Uploaded Screenshots */}
          {interacInfo?.screenshots && interacInfo.screenshots.length > 0 && (
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-gray-700/50">
              <h3 className="text-lg font-light text-white mb-4">
                Uploaded Screenshots
              </h3>
              <div className="space-y-3">
                {interacInfo.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      screenshot.admin_verified
                        ? "bg-green-900/50 border-green-700/60 shadow-xl shadow-green-900/20"
                        : "bg-amber-900/40 border-amber-800/60 shadow-xl shadow-amber-900/20"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`font-medium text-sm ${
                          screenshot.admin_verified
                            ? "text-green-300"
                            : "text-gray-300"
                        }`}
                      >
                        {screenshot.payment_type === "deposit"
                          ? "Deposit"
                          : "Final"}{" "}
                        Payment
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          screenshot.admin_verified
                            ? "bg-green-700/50 text-green-100"
                            : "bg-yellow-700/50 text-yellow-100"
                        }`}
                      >
                        {screenshot.admin_verified
                          ? "Verified ✓"
                          : "Pending Review"}
                      </span>
                    </div>
                    <p className={`text-sm text-gray-400 font-light`}>
                      Uploaded:{" "}
                      {new Date(screenshot.uploaded_at).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </p>
                    {screenshot.admin_verified && (
                      <p className="text-sm text-green-400 mt-1 font-light">
                        Verified by admin on{" "}
                        {new Date(screenshot.verified_at).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
// });

// export default function InteracUpload() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [bookingId, setBookingId] = useState('');
//   const [booking, setBooking] = useState(null);
//   const [interacInfo, setInteracInfo] = useState(null);
//   const [screenshot, setScreenshot] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [step, setStep] = useState('lookup'); // 'lookup', 'upload'

//   // Check if booking ID is provided in URL
//   useEffect(() => {
//     const bookingIdFromUrl = searchParams.get('booking_id');
//     if (bookingIdFromUrl) {
//       setBookingId(bookingIdFromUrl);
//       handleBookingLookup(bookingIdFromUrl);
//     }
//   }, [searchParams]);

//   const handleBookingLookup = async (bid = bookingId) => {
//     if (!bid.trim()) {
//       setError('Please enter a booking ID');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       // Check if booking has remaining payment
//       const remainingResponse = await api.get(`/interac/check-remaining/${bid}`);

//       if (!remainingResponse.data.hasRemainingPayment) {
//         setError('This booking has no remaining payment or is already fully paid.');
//         return;
//       }

//       // Get booking details
//       const bookingResponse = await api.get(`/quote/${bid}`);
//       setBooking(bookingResponse.data);

//       // Get Interac payment info
//       const interacResponse = await api.get(`/interac/payment-info/${bid}`);
//       setInteracInfo(interacResponse.data);

//       setStep('upload');
//     } catch (error) {
//       setError(error.response?.data?.error || 'Booking not found or invalid');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         setError('Please select an image file');
//         return;
//       }

//       if (file.size > 5 * 1024 * 1024) {
//         setError('File size must be less than 5MB');
//         return;
//       }

//       setScreenshot(file);
//       setError('');
//     }
//   };

//   const uploadScreenshot = async () => {
//     if (!screenshot) {
//       setError('Please select a screenshot to upload');
//       return;
//     }

//     setUploading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const formData = new FormData();
//       formData.append('screenshot', screenshot);
//       formData.append('bookingId', bookingId);
//       formData.append('paymentType', determinePaymentType());

//       await api.post('/interac/upload-screenshot', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setSuccess('Screenshot uploaded successfully! The admin will verify your payment shortly.');
//       setScreenshot(null);

//       // Refresh Interac info
//       const interacResponse = await api.get(`/interac/payment-info/${bookingId}`);
//       setInteracInfo(interacResponse.data);
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to upload screenshot');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const determinePaymentType = () => {
//     if (!interacInfo || !booking) return 'deposit';

//     // Check actual payment status from booking
//     const paymentStatus = booking.payment_status;

//     // If payment status is pending, user needs to pay deposit
//     if (paymentStatus === 'pending') return 'deposit';

//     // If deposit is paid, user needs to pay final amount
//     if (paymentStatus === 'deposit_paid') return 'final';

//     // If fully paid, shouldn't reach here but default to final
//     if (paymentStatus === 'fully_paid') return 'final';

//     // Fallback logic based on amounts
//     if (interacInfo.amountPaid === 0) return 'deposit';
//     if (interacInfo.remainingAmount > 0) return 'final';

//     return 'deposit';
//   };

//   const getPaymentTypeLabel = () => {
//     const type = determinePaymentType();
//     return type === 'deposit' ? 'Deposit Payment' : 'Final Payment';
//   };

//   const getPaymentAmount = () => {
//     if (!interacInfo) return 0;

//     const type = determinePaymentType();
//     return type === 'deposit' ? interacInfo.depositAmount : interacInfo.remainingAmount;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-CA');
//   };

//   if (step === 'lookup') {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-md mx-auto px-4">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Payment Screenshot</h1>
//             <p className="text-gray-600">Upload your Interac e-transfer payment screenshot</p>
//           </div>

//           {/* Back Button */}
//           <div className="mb-6">
//             <button
//               onClick={() => navigate('/')}
//               className="px-4 py-2 md:px-6 md:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer text-sm md:text-base"
//             >
//               ← Back to Home
//             </button>
//           </div>

//           {/* Lookup Form */}
//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Enter Your Booking ID</h2>

//             {error && (
//               <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//                 <p className="text-red-800 text-sm">{error}</p>
//               </div>
//             )}

//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="booking-id" className="block text-sm font-medium text-gray-700 mb-2">
//                   Booking ID
//                 </label>
//                 <input
//                   id="booking-id"
//                   type="text"
//                   value={bookingId}
//                   onChange={(e) => setBookingId(e.target.value)}
//                   placeholder="Enter your booking ID"
//                   className="w-full px-3 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>

//               <button
//                 onClick={() => handleBookingLookup()}
//                 disabled={loading || !bookingId.trim()}
//                 className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Looking up booking...
//                   </>
//                 ) : (
//                   'Continue'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Payment Screenshot</h1>
//           <p className="text-gray-600">Upload your Interac e-transfer payment screenshot</p>
//         </div>

//         {/* Back Button */}
//         <div className="mb-6">
//           <button
//             onClick={() => navigate('/')}
//             className="px-4 py-2 md:px-6 md:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer text-sm md:text-base"
//           >
//             ← Back to Search
//           </button>
//         </div>

//         {/* Success/Error Messages */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-800 text-sm">{error}</p>
//           </div>
//         )}

//         {success && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//             <p className="text-green-800 text-sm">{success}</p>
//           </div>
//         )}

//         <div className="space-y-6">
//           {/* Booking Summary */}
//           {booking && (
//             <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="font-medium text-gray-700">Booking ID:</span>
//                   <span className="ml-2 text-gray-900">{bookingId || booking?.booking_id || booking?.unique_id || 'N/A'}</span>
//                 </div>
//                 <div>
//                   <span className="font-medium text-gray-700">Client:</span>
//                   <span className="ml-2 text-gray-900">{booking.name}</span>
//                 </div>
//                 <div>
//                   <span className="font-medium text-gray-700">Event Date:</span>
//                   <span className="ml-2 text-gray-900">{formatDate(booking.event_date)}</span>
//                 </div>
//                 <div>
//                   <span className="font-medium text-gray-700">Service Type:</span>
//                   <span className="ml-2 text-gray-900">{booking.service_type}</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Payment Information */}
//           {interacInfo && booking && (
//             <>
//               {booking.payment_status === 'fully_paid' ? (
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//                   <div className="flex items-center">
//                     <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <h3 className="text-lg font-semibold text-green-800">
//                       Payment Completed
//                     </h3>
//                   </div>
//                   <p className="text-green-700 mt-2">
//                     All payments for this booking have been completed. No additional payment is required.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//                   <h3 className="text-lg font-semibold text-blue-400 mb-4">
//                     {getPaymentTypeLabel()} - Interac E-Transfer
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-center">
//                       <span className="font-medium text-blue-600">Send payment to:</span>
//                       <span className="text-blue-900 font-mono bg-blue-100 px-2 py-1 rounded">
//                         {interacInfo.interacEmail}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="font-medium text-blue-600">Amount to pay:</span>
//                       <span className="text-xl font-bold text-blue-600">
//                         ${getPaymentAmount().toFixed(2)} CAD
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mt-4 p-3 bg-blue-100 rounded-md">
//                     <p className="text-sm text-black">
//                       <strong>Instructions:</strong> Send the {getPaymentTypeLabel().toLowerCase()} via Interac e-transfer to the email above,
//                       then upload a screenshot of the payment confirmation below.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}

//           {/* Screenshot Upload - Only show if not fully paid */}
//           {booking && booking.payment_status !== 'fully_paid' && (
//             <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Payment Screenshot</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Payment Screenshot
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-900 hover:file:bg-gray-200 transition-colors"
//                 />
//                 {screenshot && (
//                   <p className="mt-2 text-sm text-gray-600">
//                     Selected: {screenshot.name}
//                   </p>
//                 )}
//                 <p className="mt-2 text-xs text-gray-500">
//                   Accepted formats: JPG, PNG, GIF. Maximum size: 5MB
//                 </p>
//               </div>

//               <button
//                 onClick={uploadScreenshot}
//                 disabled={uploading || !screenshot}
//                 className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {uploading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Uploading Screenshot...
//                   </>
//                 ) : (
//                   'Upload Payment Screenshot'
//                 )}
//               </button>
//             </div>
//           </div>
//           )}

//           {/* Previously Uploaded Screenshots */}
//           {interacInfo?.screenshots && interacInfo.screenshots.length > 0 && (
//             <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Uploaded Screenshots
//               </h3>
//               <div className="space-y-3">
//                 {interacInfo.screenshots.map((screenshot, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-lg border ${
//                       screenshot.admin_verified
//                         ? 'bg-green-50 border-green-200'
//                         : 'bg-yellow-50 border-yellow-200'
//                     }`}
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <span className={`font-medium text-sm ${
//                         screenshot.admin_verified ? 'text-green-800' : 'text-gray-800'
//                       }`}>
//                         {screenshot.payment_type === 'deposit' ? 'Deposit' : 'Final'} Payment
//                       </span>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           screenshot.admin_verified
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-yellow-100 text-gray-500'
//                         }`}
//                       >
//                         {screenshot.admin_verified ? 'Verified ✓' : 'Pending Review'}
//                       </span>
//                     </div>
//                     <p className={`text-sm ${
//                       screenshot.admin_verified ? 'text-green-700' : 'text-yellow-700'
//                     }`}>
//                       Uploaded: {new Date(screenshot.uploaded_at).toLocaleString('en-US', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric',
//                         hour: 'numeric',
//                         minute: '2-digit',
//                         hour12: true
//                       })}
//                     </p>
//                     {screenshot.admin_verified && (
//                       <p className="text-sm text-green-700 mt-1">
//                         Verified by admin on {new Date(screenshot.verified_at).toLocaleString('en-US', {
//                           year: 'numeric',
//                           month: 'short',
//                           day: 'numeric',
//                           hour: 'numeric',
//                           minute: '2-digit',
//                           hour12: true
//                         })}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
