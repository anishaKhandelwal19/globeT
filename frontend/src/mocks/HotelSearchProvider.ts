import { type HotelSearchCriteria, HotelResult, RoomDetails } from "../interfaces/HotelInterface";
import { type HotelReview } from "../interfaces/HotelInterface"; // Assuming reviews are typed

export class MockHotelSearchProvider {
  /**
   * Simulates fetching hotel search results based on criteria.
   * @param criteria The search parameters provided by the user.
   * @returns A promise resolving to an array of HotelResult objects.
   */
  async fetchData(criteria: HotelSearchCriteria): Promise<HotelResult[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("[MockHotelSearchProvider] Fetching data for criteria:", criteria);

        const dummyRooms1: RoomDetails[] = [
          {
            roomId: "R1",
            roomType: "DELUXE",
            capacity: 2,
            basePrice: 250
          }
        ];

        const dummyRooms2: RoomDetails[] = [
          {
            roomId: "R2",
            roomType: "STANDARD",
            capacity: 2,
            basePrice: 120
          }
        ];

        const dummyReviews: HotelReview[] = []; // Optional: Add dummy review data

        const dummyResults: HotelResult[] = [
          new HotelResult(
            "HTL001",
            "Grand Hyatt",
            "123 Main St, City",
            4.5,
            250,
            dummyRooms1,
            ["Pool", "Gym", "Wifi"],
            [],
            "Luxury hotel",
            "USD",
            dummyReviews
          ),
          new HotelResult(
            "HTL002",
            "City Inn",
            "456 Oak Ave, City",
            3.8,
            120,
            dummyRooms2,
            ["Wifi", "Breakfast"],
            [],
            "Budget friendly",
            "USD",
            dummyReviews
          )
        ];

        resolve(dummyResults);
      }, 1200); // Simulated delay
    });
  }
}
