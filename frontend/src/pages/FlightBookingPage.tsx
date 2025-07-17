import React, { useState } from "react";
import { toast } from "react-toastify";
import { flightBookingService } from "../services";
import { FlightClassType, SeatType } from "../enums/FlightEnum";
import {
  FlightSearchCriteria,
  FlightResult,
  FlightBookingDetails,
} from "../interfaces/FlightInterface";
import { BookingConfirmation } from "../interfaces/BookingInterface";
import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const FlightBookingPage: React.FC = () => {
  const [origin, setOrigin] = useState("DEL");
  const [destination, setDestination] = useState("BOM");
  const [departureDate, setDepartureDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState<FlightClassType>(
    FlightClassType.ECONOMY
  );
  const [searchResults, setSearchResults] = useState<FlightResult[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<FlightResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookingConfirmation, setBookingConfirmation] =
    useState<BookingConfirmation | null>(null);
  const [passengerName, setPassengerName] = useState("John Doe");
  const [contactEmail, setContactEmail] = useState("john.doe@example.com");
  const [contactPhone, setContactPhone] = useState("9876543210");

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleSearch = async () => {
    setLoading(true);
    setMessage("");
    setSearchResults([]);
    setSelectedFlight(null);
    setBookingConfirmation(null);

    const criteria = new FlightSearchCriteria(
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      flightClass
    );

    try {
      const results = await flightBookingService.search(criteria);
      setSearchResults(results);
    } catch (error) {
      console.error("Flight search failed:", error);
      toast.error("Failed to search flights.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFlight = (flight: FlightResult) => {
    setSelectedFlight(flight);
    setMessage("");
  };

  const handleBookFlight = async () => {
    if (!selectedFlight) {
      setMessage("Please select a flight first.");
      return;
    }

    setLoading(true);
    setMessage("");
    setBookingConfirmation(null);

    const passengerDetails = [
      {
        firstName: passengerName.split(" ")[0],
        lastName: passengerName.split(" ")[1] || "",
        dateOfBirth: new Date("1990-01-01"),
        gender: "Male",
        nationality: "US",
      },
    ];

    const selectedSeats = [
      {
        seatNumber: "12A",
        isAvailable: true,
        flightClass: FlightClassType.ECONOMY,
        row: 12,
        column: "A",
        seatType: SeatType.AISLE,
      },
    ];

    try {
      const bookingDetails: FlightBookingDetails =
        selectedFlight.toBookingDetails(
          passengerDetails,
          selectedSeats,
          flightClass,
          contactEmail,
          contactPhone
        );

      const confirmation = await flightBookingService.book(bookingDetails);

      if (!confirmation.isConfirmed()) {
        setMessage(
          `Booking failed: ${confirmation.message || "Unknown error."}`
        );
        toast.error(
          `Booking failed: ${confirmation.message || "Unknown error."}`
        );
        return;
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

      const { data: orderData } = await axios.post(
        "http://localhost:8080/api/payment/create-order",
        { amount: selectedFlight.price }
      );

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Flight Booking",
        description: `${selectedFlight.airline.name} - ${selectedFlight.flightNumber}`,
        order_id: orderData.id,
        handler: function (response: any) {
          toast.success("Payment successful!");
          setBookingConfirmation(confirmation);
          setMessage("Flight booked & payment successful!");
          setSelectedFlight(null);
          setSearchResults([]);
        },
        prefill: {
          name: passengerName,
          email: contactEmail,
          contact: contactPhone,
        },
        notes: {
          flightId: selectedFlight.id,
        },
        theme: {
          color: "#1e40af",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Booking or Payment failed:", error);
      setMessage("Error during flight booking or payment. Please try again.");
      toast.error("Error during flight booking or payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">
          Find Your Flight
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          <div>
            <label
              htmlFor="origin"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Origin
            </label>
            <input
              type="text"
              id="origin"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g., DEL"
            />
          </div>
          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., BOM"
            />
          </div>
          <div>
            <label
              htmlFor="departureDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Departure Date
            </label>
            <input
              type="date"
              id="departureDate"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="returnDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Return Date (Optional)
            </label>
            <input
              type="date"
              id="returnDate"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="passengers"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Passengers
            </label>
            <input
              type="number"
              id="passengers"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={passengers}
              onChange={(e) =>
                setPassengers(Math.max(1, parseInt(e.target.value) || 1))
              }
              min="1"
            />
          </div>
          <div>
            <label
              htmlFor="flightClass"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Class
            </label>
            <select
              id="flightClass"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={flightClass}
              onChange={(e) =>
                setFlightClass(e.target.value as FlightClassType)
              }
            >
              {Object.values(FlightClassType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            message.includes("Error") || message.includes("failed")
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          } font-medium`}
        >
          {message}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">
            Available Flights
          </h2>
          <div className="space-y-4">
            {searchResults.map((flight) => (
              <div
                key={flight.id}
                className={`p-4 border rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                  selectedFlight && selectedFlight.id === flight.id
                    ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                }`}
                onClick={() => handleSelectFlight(flight)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg text-blue-700">
                    {flight.airline.name} - {flight.flightNumber}
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ${flight.price}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <p>
                      <strong>Departure:</strong>{" "}
                      {flight.departureAirport.iataCode} at{" "}
                      {flight.departureTime.toLocaleTimeString()}
                    </p>
                    <p>
                      <strong>Arrival:</strong> {flight.arrivalAirport.iataCode}{" "}
                      at {flight.arrivalTime.toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Duration:</strong>{" "}
                      {formatDuration(flight.durationMinutes)}
                    </p>
                    <p>
                      <strong>Available Seats:</strong> {flight.availableSeats}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedFlight && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Confirm Your Selection
              </h3>
              <p className="text-gray-700 mb-2">
                You have selected:{" "}
                <span className="font-bold">
                  {selectedFlight.airline.name} - {selectedFlight.flightNumber}
                </span>{" "}
                for ${selectedFlight.price}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="passengerName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Passenger Name (Simplified)
                  </label>
                  <input
                    type="text"
                    id="passengerName"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    placeholder="e.g., Jane Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactPhone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="e.g., 9876543210"
                  />
                </div>
              </div>
              <button
                onClick={handleBookFlight}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                disabled={loading}
              >
                {loading ? "Booking..." : "Book Selected Flight"}
              </button>
            </div>
          )}
        </div>
      )}

      {bookingConfirmation && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">
            Booking Confirmation
          </h2>
          {bookingConfirmation.isConfirmed() ? (
            <div className="text-center text-green-700">
              <svg
                className="mx-auto h-16 w-16 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-4 text-xl font-semibold">
                Your Flight is Confirmed!
              </p>
              <pre className="mt-4 p-4 bg-gray-50 rounded-lg text-left text-sm font-mono whitespace-pre-wrap">
                {bookingConfirmation.toDisplayString()}
                {bookingConfirmation.pnr && `\nPNR: ${bookingConfirmation.pnr}`}
                {bookingConfirmation.travelerNames.length > 0 &&
                  `\nTraveler(s): ${bookingConfirmation.travelerNames.join(
                    ", "
                  )}`}
              </pre>
            </div>
          ) : (
            <div className="text-center text-red-700">
              <svg
                className="mx-auto h-16 w-16 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-4 text-xl font-semibold">Booking Failed!</p>
              <p className="mt-2 text-base">
                {bookingConfirmation.message ||
                  "Please try again or contact support."}
              </p>
            </div>
          )}
          <button
            onClick={() => setBookingConfirmation(null)}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Start New Search
          </button>
        </div>
      )}
    </>
  );
};

export default FlightBookingPage;
