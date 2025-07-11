import { MockAbstractBookingService } from "./AbstractBookingService";
import { MockFlightSearchProvider } from "./FlightSearchProvider";
import { MockPaymentProcessor } from "./PaymentProcessor";
import { MockNotificationManager } from "./NotificationServices";
import { MockBookingRepository } from "./BookingRepository";
import {
  FlightSearchCriteria,
  FlightBookingDetails,
  FlightResult,
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
    this.flightSearchProvider = flightSearchProvider; // ✅ Assign property
    console.log("[MockFlightBookingService] Initialized.");
  }

  /**
   * Simulates a flight search using mock provider.
   */
  async search(criteria: FlightSearchCriteria): Promise<FlightResult[]> {
    console.log(
      "[MockFlightBookingService] Searching flights with criteria:",
      criteria
    );
    return this.flightSearchProvider.fetchData(criteria);
  }

  /**
   * Validates flight booking details.
   */
  protected validateBooking(details: GenericBookingDetails): boolean {
    const flightDetails = details as FlightBookingDetails; // Cast for specific validation
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
    return flightDetails.isValidForBooking(); // Use interface method
  }
}
