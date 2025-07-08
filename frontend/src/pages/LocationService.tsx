import { useEffect, useState } from 'react';
import { reverseGeocode } from '../utils/reverseGeocode';
import ServiceCard from '../components/ServiceCard';
import { fetchServicesByCity } from '../utils/fetchServicesByCity';


const servicesByCity: Record<string, string[]> = {
  Jaipur: ['Cab Booking', 'Hotel Reservation', 'Sightseeing'],
  Delhi: ['Flights', 'Cabs', 'Heritage Tours'],
  Mumbai: ['Beach Resorts', 'Cabs', 'Nightlife Tours'],
};

const LocationServices = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported by browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setCoords({ lat, lng });

        const location = await reverseGeocode(lat, lng);
        if (!location) {
          setError('Could not fetch your city.');
          return;
        }

        setCity(location.city);
        setState(location.state);

        const matchedServices = await fetchServicesByCity(location.city);

        setServices(matchedServices);
      },
      () => {
        setError('Permission denied. Enable location access.');
      }
    );
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nearby Services</h1>

      {error && <p className="text-red-500">{error}</p>}
      {!error && !city && <p className="text-gray-600">Detecting your location...</p>}

      {city && (
        <div>
          <p className="text-lg mb-4">
            Services in <strong>{city}</strong>, {state}
          </p>
          <div className="flex flex-wrap gap-4">
            {services.length ? (
              services.map((service) => <ServiceCard key={service} name={service} />)
            ) : (
              <p>No services found in your area.</p>
            )}
          </div>
        </div>
      )}

      {coords && (
        <div className="mt-6 p-4 bg-gray-100 rounded border border-gray-300">
          <h2 className="text-md font-semibold mb-2">🛠 Debug Info</h2>
          <p><strong>Latitude:</strong> {coords.lat}</p>
          <p><strong>Longitude:</strong> {coords.lng}</p>
          <p><strong>City:</strong> {city}</p>
          <p><strong>State:</strong> {state}</p>
        </div>
      )}
    </div>
  );
};

export default LocationServices;
