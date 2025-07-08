// src/utils/fetchServicesByCity.ts

export const fetchServicesByCity = async (city: string): Promise<string[]> => {
  try {
    const res = await fetch(`http://localhost:8080/api/services/${city}`);
    const data = await res.json();

    return data.map((s: { name: string }) => s.name);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
};
