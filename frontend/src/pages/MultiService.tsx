import React, { useState } from 'react';
import FlightBookingPage from './FlightBookingPage';
import HotelBookingPage from './HotelBookingPage';
import ActivityBookingPage from './ActivityBookingPage';
import { BookingType } from '../enums/BookingType';

const MultiServiceBookingPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<BookingType>(BookingType.FLIGHT);

  const renderServicePage = () => {
    switch (selectedService) {
      case BookingType.FLIGHT:
        return <FlightBookingPage />;
      case BookingType.HOTEL:
        return <HotelBookingPage />;
      case BookingType.ACTIVITY:
        return <ActivityBookingPage />;
      default:
        return <FlightBookingPage />; // Default to Flight
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 font-sans text-gray-800">
      {/* Service Selector */}
      <div className="container mx-auto mt-8 p-4 bg-white rounded-2xl shadow-xl flex justify-center space-x-4">
        {Object.values(BookingType).map(type => (
          <button
            key={type}
            onClick={() => setSelectedService(type)}
            className={`py-3 px-6 rounded-lg font-semibold transition duration-300 ease-in-out
              ${selectedService === type
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {type} Booking
          </button>
        ))}
      </div>

      {/* Main Content Area - Renders selected service page */}
      <main className="container mx-auto p-6 mt-8">
        {renderServicePage()}
      </main>

      {/* Footer can be a common component or placed here */}
      <footer className="bg-white shadow-inner p-4 mt-8 rounded-t-xl">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Your Startup. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MultiServiceBookingPage;