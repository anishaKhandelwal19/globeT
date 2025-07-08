export const reverseGeocode = async (
  lat: number,
  lng: number
): Promise<{ city: string; state: string } | null> => {
  try {
    const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    const components = data?.results?.[0]?.components;
    const city = components?.city || components?.town || components?.village || '';
    const state = components?.state || '';

    return { city, state };
  } catch (err) {
    console.error('Reverse geocoding failed', err);
    return null;
  }
};
