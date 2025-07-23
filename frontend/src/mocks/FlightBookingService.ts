import { MockAbstractBookingService } from "./AbstractBookingService";
import { MockFlightSearchProvider } from "./FlightSearchProvider";
import { MockPaymentProcessor } from "./PaymentProcessor";
import { MockNotificationManager } from "./NotificationServices";
import { MockBookingRepository } from "./BookingRepository";
import {
  FlightSearchCriteria,
  FlightBookingDetails,
  FlightResult,
  type FareDetails, // Make sure to import FareDetails interface
} from "../interfaces/FlightInterface";
import { type GenericBookingDetails } from "../interfaces/BookingInterface";

export class MockFlightBookingService extends MockAbstractBookingService {
  private flightSearchProvider: MockFlightSearchProvider;

  constructor(
    flightSearchProvider: MockFlightSearchProvider,
    paymentProcessor: MockPaymentProcessor,
    notificationManager: MockNotificationManager,
    bookingRepository: MockBookingRepository
  ) {
    super(paymentProcessor, notificationManager, bookingRepository);
    this.flightSearchProvider = flightSearchProvider;
    console.log("[MockFlightBookingService] Initialized.");
  }

  /**
   * Simulates a flight search using mock provider and enriches results with fare details.
   */
  async search(criteria: FlightSearchCriteria): Promise<FlightResult[]> {
    console.log(
      "[MockFlightBookingService] Searching flights with criteria:",
      criteria
    );

    // 1. Fetch the raw flight results from the provider
    const rawResults = await this.flightSearchProvider.fetchData(criteria);

    // 2. Map over the raw results to enrich them with mock fare details
    const enrichedResults: FlightResult[] = rawResults.map((flight) => {
      // Create mock fare details for each flight
      const mockFareOptions: FareDetails[] = [
        {
          title: 'Basic Economy',
          price: flight.price, // Use the flight's base price
          baggage: '1 personal item, no carry-on',
          flexibility: 'No changes, non-refundable',
          meals: 'Not included',
          seats: 'Assigned at check-in (charge for selection)'
        },
        {
          title: 'Standard Fare',
          price: flight.price + 50, // Slightly higher price
          baggage: '1 carry-on + 1 checked bag (20kg)',
          flexibility: 'Changes with fee, non-refundable',
          meals: 'Snack and non-alcoholic beverages',
          seats: 'Standard seat selection included'
        },
        {
          title: 'Premium Flex',
          price: flight.price + 150, // Significantly higher price
          baggage: '2 checked bags (25kg each)',
          flexibility: 'Free changes, refundable with fee',
          meals: 'Full meal service with alcoholic beverages',
          seats: 'Preferred seat selection included'
        }
      ];

      // Assuming FlightResult is a class (as per previous discussion)
      // You need to pass all constructor arguments, including the new fareDetails
      // Adjust the constructor arguments based on your actual FlightResult class definition.
      return new FlightResult(
        flight.id,
        flight.flightNumber,
        flight.airline.name,
        flight.departureAirport.iataCode,
        flight.departureTime.toISOString(),
        flight.arrivalAirport.iataCode,
        flight.arrivalTime.toISOString(),
        flight.durationMinutes,
        flight.price,
        flight.availableSeats,
        mockFareOptions // Pass the generated mock fare options here
      );
    });

    return enrichedResults;
  }

  /**
   * Validates flight booking details.
   */
  protected validateBooking(details: GenericBookingDetails): boolean {
    const flightDetails = details as FlightBookingDetails;
    if (
      !flightDetails ||
      !flightDetails.selectedFlightResult ||
      flightDetails.passengerDetails.length === 0
    ) {
      console.error(
        "[FlightBookingService] Validation failed: Missing flight result or passenger details."
      );
      return false;
    }
    // Ensure that isValidForBooking is properly implemented in your FlightBookingDetails
    return flightDetails.isValidForBooking();
  }
}