import { type ActivitySearchCriteria, ActivityResult } from "../interfaces/ActivityInterface";

export class MockActivitySearchProvider {
  async fetchData(criteria: ActivitySearchCriteria): Promise<ActivityResult[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("[MockActivitySearchProvider] Fetching data for criteria:", criteria);
        const dummyResults: ActivityResult[] = [
          {
              id: "ACT001", activityName: "City Tour", location: "Downtown", price: 50, durationMinutes: 180, availability: 10, reviews: [], description: 'Explore the city', imageUrls: [],
              currency: ""
          },
          {
              id: "ACT002", activityName: "Cooking Class", location: "Market District", price: 75, durationMinutes: 240, availability: 5, reviews: [], description: 'Learn local cuisine', imageUrls: [],
              currency: ""
          },
        ];
        resolve(dummyResults);
      }, 800);
    });
  }
}