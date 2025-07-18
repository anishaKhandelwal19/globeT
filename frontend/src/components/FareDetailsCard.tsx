import React from 'react';
import { type FareDetails } from '../interfaces/FlightInterface';

interface FareDetailsCardProps {
  fareOptions: FareDetails[];
  onSelectFare?: (fare: FareDetails) => void;
  onClose: () => void;
}

const FareDetailsCard: React.FC<FareDetailsCardProps> = ({ fareOptions, onClose, onSelectFare }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[95%] max-w-5xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-6 text-center text-blue-800">Flight Details and Fare Options</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fareOptions.map((fare, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-5 shadow-md hover:shadow-xl transition relative flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-semibold text-gray-800 mb-1">₹{fare.price} <span className="text-sm text-gray-500">per adult</span></div>
                <h4 className="text-lg font-bold text-blue-700 uppercase mb-3">{fare.title}</h4>

                <div className="text-sm text-gray-700 space-y-2">
                  <div>
                    <strong className="text-gray-900">🧳 Baggage:</strong>
                    <div>{fare.baggage}</div>
                  </div>
                  <div>
                    <strong className="text-gray-900">🔁 Flexibility:</strong>
                    <div>{fare.flexibility}</div>
                  </div>
                  <div>
                    <strong className="text-gray-900">🍱 Meals:</strong>
                    <div>{fare.meals}</div>
                  </div>
                  <div>
                    <strong className="text-gray-900">💺 Seats:</strong>
                    <div>{fare.seats}</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-between gap-2">
                <button
                  className="w-1/2 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition text-sm"
                  onClick={() => onSelectFare?.(fare)}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FareDetailsCard;