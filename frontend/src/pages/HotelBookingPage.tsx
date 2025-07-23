import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { hotelBookingService } from '../services'; // Import the service instance
import { type HotelSearchCriteria, HotelResult, HotelBookingDetails } from '../interfaces/HotelInterface';
import { BookingConfirmation } from '../interfaces/BookingInterface';
import { BookingType } from '../enums/BookingType';
import { BookingStatus } from '../enums/FlightEnum';


const HotelBookingPage: React.FC = () => {
  const [location, setLocation] = useState('New York');
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [searchResults, setSearchResults] = useState<HotelResult[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<HotelResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [bookingConfirmation, setBookingConfirmation] = useState<BookingConfirmation | null>(null);
  const [guestName, setGuestName] = useState('Jane Smith'); // Simplified for demo
  const [contactEmail, setContactEmail] = useState('jane.smith@example.com');
  const [contactPhone, setContactPhone] = useState('9876543210');


  const handleSearch = async () => {
    setLoading(true);
    setMessage('');
    setSearchResults([]);
    setSelectedHotel(null);
    setBookingConfirmation(null);

    const criteria: HotelSearchCriteria = { location, checkInDate, checkOutDate, numberOfGuests: guests, numberOfRooms: rooms };
    try {
      const results = await hotelBookingService.search(criteria);
      setSearchResults(results);
      if (results.length === 0) {
        setMessage('No hotels found for your criteria.');
      }
    } catch (error) {
      console.error("Hotel search failed:", error);
      setMessage('Error during hotel search. Please try again.');
      toast.error("Hotel search failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHotel = (hotel: HotelResult) => {
    setSelectedHotel(hotel);
    setMessage('');
  };

  const handleBookHotel = async () => {
    if (!selectedHotel) {
      setMessage('Please select a hotel first.');
      return;
    }

    setLoading(true);
    setMessage('');
    setBookingConfirmation(null);

    const guestDetails = [{ firstName: guestName.split(' ')[0], lastName: guestName.split(' ')[1] || '' }];
    const numNights = (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24);
    const calculatedPrice = selectedHotel.pricePerNight * rooms * numNights;
    const roomDetails = selectedHotel.availableRooms.slice(0, rooms).map(room => ({
      roomType: room.roomType,
      quantity: 1,
      roomId: room.roomId,
      capacity: room.capacity,
      basePrice: room.basePrice
    }));


    try {
      const bookingDetails = new HotelBookingDetails(
        "tempHotelBookingId-" + Math.random().toString(36).substr(2, 9),
        "user123",
        calculatedPrice,
        selectedHotel.currency || "USD",
        contactEmail,
        contactPhone,
        selectedHotel,
        roomDetails,
        guestDetails,
        selectedHotel.address,
      );

      const confirmation = await hotelBookingService.book(bookingDetails);
      setBookingConfirmation(confirmation);
      if (confirmation.isConfirmed()) {
        setMessage('Hotel booked successfully!');
        toast.success("Hotel booked successfully!");
        setSelectedHotel(null);
        setSearchResults([]);
      } else {
        setMessage(`Booking failed: ${confirmation.message || 'Unknown error.'}`);
        toast.error(`Booking failed: ${confirmation.message || 'Unknown error.'}`);
      }
    } catch (error) {
      console.error("Hotel booking failed:", error);
      setMessage('Error during hotel booking. Please try again.');
      toast.error("Error during hotel booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Find Your Hotel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" id="location" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., New York" />
          </div>
          <div>
            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
            <input type="date" id="checkInDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
          </div>
          <div>
            <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
            <input type="date" id="checkOutDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
          </div>
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
            <input type="number" id="guests" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={guests} onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))} min="1" />
          </div>
          <div>
            <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
            <input type="number" id="rooms" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={rooms} onChange={(e) => setRooms(Math.max(1, parseInt(e.target.value) || 1))} min="1" />
          </div>
        </div>
        <button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" disabled={loading}>
          {loading ? 'Searching...' : 'Search Hotels'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') || message.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'} font-medium`}>
          {message}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Available Hotels</h2>
          <div className="space-y-4">
            {searchResults.map(hotel => (
              <div key={hotel.id} className={`p-4 border rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                  selectedHotel && selectedHotel.id === hotel.id
                    ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`} onClick={() => handleSelectHotel(hotel)}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg text-blue-700">{hotel.hotelName}</span>
                  <span className="text-2xl font-bold text-green-600">${hotel.pricePerNight} / night</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <p><strong>Address:</strong> {hotel.address}</p>
                    <p><strong>Rating:</strong> {hotel.rating} / 5</p>
                  </div>
                  <div>
                    <p><strong>Rooms Available:</strong> {hotel.availableRooms.map(r => r.roomType).join(', ')}</p>
                    <p><strong>Amenities:</strong> {hotel.amenities.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedHotel && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Confirm Your Selection</h3>
              <p className="text-gray-700 mb-2">You have selected: <span className="font-bold">{selectedHotel.hotelName}</span> for ${selectedHotel.pricePerNight * rooms * ((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))} total</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1">Primary Guest Name (Simplified)</label>
                  <input type="text" id="guestName" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="e.g., Jane Smith" />
                </div>
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input type="email" id="contactEmail" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="email@example.com" />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input type="tel" id="contactPhone" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="e.g., 9876543210" />
                </div>
              </div>
              <button onClick={handleBookHotel} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" disabled={loading}>
                {loading ? 'Booking...' : 'Book Selected Hotel'}
              </button>
            </div>
          )}
        </div>
      )}

      {bookingConfirmation && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Booking Confirmation</h2>
          {bookingConfirmation.isConfirmed() ? (
            <div className="text-center text-green-700">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-xl font-semibold">Your Hotel is Confirmed!</p>
              <pre className="mt-4 p-4 bg-gray-50 rounded-lg text-left text-sm font-mono whitespace-pre-wrap">
                {bookingConfirmation.toDisplayString()}
                {bookingConfirmation.travelerNames.length > 0 && `\nGuest(s): ${bookingConfirmation.travelerNames.join(', ')}`}
              </pre>
            </div>
          ) : (
            <div className="text-center text-red-700">
              <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-xl font-semibold">Booking Failed!</p>
              <p className="mt-2 text-base">{bookingConfirmation.message || 'Please try again or contact support.'}</p>
            </div>
          )}
          <button onClick={() => setBookingConfirmation(null)} className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            Start New Search
          </button>
        </div>
      )}
    </>
  );
};

export default HotelBookingPage;