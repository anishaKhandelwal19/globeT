import { FlightSearchCriteria, FlightResult } from "../interfaces/FlightInterface";

export class MockFlightSearchProvider {
  async fetchData(criteria: FlightSearchCriteria): Promise<FlightResult[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("[MockFlightSearchProvider] Fetching data for criteria:", criteria);
        const dummyResults = [
          new FlightResult("FL001", "AI-101", "Air India", "DEL", "BOM", "2025-08-01T10:00:00Z", "2025-08-01T12:00:00Z", 150, 120, 50),
          new FlightResult("FL002", "6E-202", "IndiGo", "DEL", "BOM", "2025-08-01T14:00:00Z", "2025-08-01T16:00:00Z", 120, 120, 30),
          new FlightResult("FL003", "UK-303", "Vistara", "DEL", "BOM", "2025-08-01T18:00:00Z", "2025-08-01T20:00:00Z", 180, 120, 20),
        ];
        resolve(dummyResults);
      }, 1000); // Simulate network delay
    });
  }
}