import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { activityBookingService } from '../services'; // Import the service instance
import { type ActivitySearchCriteria, ActivityResult, ActivityBookingDetails } from '../interfaces/ActivityInterface';
import { BookingConfirmation } from '../interfaces/BookingInterface';
import { BookingType } from '../enums/BookingType';
import { BookingStatus } from '../enums/FlightEnum';

const ActivityBookingPage: React.FC = () => {
  const [location, setLocation] = useState('Paris');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [participants, setParticipants] = useState(1);
  const [activityType, setActivityType] = useState('Tour');
  const [searchResults, setSearchResults] = useState<ActivityResult[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [bookingConfirmation, setBookingConfirmation] = useState<BookingConfirmation | null>(null);
  const [participantName, setParticipantName] = useState('Chris Green'); // Simplified for demo
  const [contactEmail, setContactEmail] = useState('chris.green@example.com');
  const [contactPhone, setContactPhone] = useState('9876543210');


  const handleSearch = async () => {
    setLoading(true);
    setMessage('');
    setSearchResults([]);
    setSelectedActivity(null);
    setBookingConfirmation(null);

    const criteria: ActivitySearchCriteria = { location, date, numberOfParticipants: participants, activityType };
    try {
      const results = await activityBookingService.search(criteria);
      setSearchResults(results);
      if (results.length === 0) {
        setMessage('No activities found for your criteria.');
      }
    } catch (error) {
      console.error("Activity search failed:", error);
      setMessage('Error during activity search. Please try again.');
      toast.error("Activity search failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectActivity = (activity: ActivityResult) => {
    setSelectedActivity(activity);
    setMessage('');
  };

  const handleBookActivity = async () => {
    if (!selectedActivity) {
      setMessage('Please select an activity first.');
      return;
    }

    setLoading(true);
    setMessage('');
    setBookingConfirmation(null);

    const participantDetails = [{ name: participantName, age: 30 }];


    try {
      const bookingDetails = new ActivityBookingDetails(
        "tempActivityBookingId-" + Math.random().toString(36).substr(2, 9),
        "user123",
        selectedActivity.price * participants,
        selectedActivity.currency || "USD",
        contactEmail,
        contactPhone,
        selectedActivity,
        participantDetails,
      );

      const confirmation = await activityBookingService.book(bookingDetails);
      setBookingConfirmation(confirmation);
      if (confirmation.isConfirmed()) {
        setMessage('Activity booked successfully!');
        toast.success("Activity booked successfully!");
        setSelectedActivity(null);
        setSearchResults([]);
      } else {
        setMessage(`Booking failed: ${confirmation.message || 'Unknown error.'}`);
        toast.error(`Booking failed: ${confirmation.message || 'Unknown error.'}`);
      }
    } catch (error) {
      console.error("Activity booking failed:", error);
      setMessage('Error during activity booking. Please try again.');
      toast.error("Error during activity booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Find Your Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="activityLocation" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" id="activityLocation" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Paris" />
          </div>
          <div>
            <label htmlFor="activityDate" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" id="activityDate" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
            <input type="number" id="participants" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={participants} onChange={(e) => setParticipants(Math.max(1, parseInt(e.target.value) || 1))} min="1" />
          </div>
          <div>
            <label htmlFor="activityType" className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
            <input type="text" id="activityType" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={activityType} onChange={(e) => setActivityType(e.target.value)} placeholder="e.g., Tour, Class" />
          </div>
        </div>
        <button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" disabled={loading}>
          {loading ? 'Searching...' : 'Search Activities'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('Error') || message.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'} font-medium`}>
          {message}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Available Activities</h2>
          <div className="space-y-4">
            {searchResults.map(activity => (
              <div key={activity.id} className={`p-4 border rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                  selectedActivity && selectedActivity.id === activity.id
                    ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`} onClick={() => handleSelectActivity(activity)}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg text-blue-700">{activity.activityName}</span>
                  <span className="text-2xl font-bold text-green-600">${activity.price}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <p><strong>Location:</strong> {activity.location}</p>
                    <p><strong>Duration:</strong> {activity.durationMinutes} minutes</p>
                  </div>
                  <div>
                    <p><strong>Availability:</strong> {activity.availability} spots</p>
                    <p><strong>Description:</strong> {activity.description.substring(0, 50)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedActivity && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Confirm Your Selection</h3>
              <p className="text-gray-700 mb-2">You have selected: <span className="font-bold">{selectedActivity.activityName}</span> for ${selectedActivity.price * participants} total</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="participantName" className="block text-sm font-medium text-gray-700 mb-1">Primary Participant Name (Simplified)</label>
                  <input type="text" id="participantName" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200" value={participantName} onChange={(e) => setParticipantName(e.target.value)} placeholder="e.g., Chris Green" />
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
              <button onClick={handleBookActivity} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" disabled={loading}>
                {loading ? 'Booking...' : 'Book Selected Activity'}
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
              <p className="mt-4 text-xl font-semibold">Your Activity is Confirmed!</p>
              <pre className="mt-4 p-4 bg-gray-50 rounded-lg text-left text-sm font-mono whitespace-pre-wrap">
                {bookingConfirmation.toDisplayString()}
                {bookingConfirmation.travelerNames.length > 0 && `\nParticipant(s): ${bookingConfirmation.travelerNames.join(', ')}`}
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

export default ActivityBookingPage;