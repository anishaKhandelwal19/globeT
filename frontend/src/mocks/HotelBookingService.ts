import { MockAbstractBookingService } from "./AbstractBookingService";
import { MockHotelSearchProvider } from "./HotelSearchProvider";
import { MockPaymentProcessor } from "./PaymentProcessor";
import { MockNotificationManager } from "./NotificationServices";
import { MockBookingRepository } from "./BookingRepository";
import { type HotelSearchCriteria, HotelBookingDetails, HotelResult } from "../interfaces/HotelInterface";
import { type GenericBookingDetails } from "../interfaces/BookingInterface";

export class MockHotelBookingService extends MockAbstractBookingService {
    private hotelSearchProvider: MockHotelSearchProvider;
  constructor(
    hotelSearchProvider: MockHotelSearchProvider,
    paymentProcessor: MockPaymentProcessor,
    notificationManager: MockNotificationManager,
    bookingRepository: MockBookingRepository
  ) {
    super(paymentProcessor, notificationManager, bookingRepository);
    this.hotelSearchProvider = hotelSearchProvider;
    console.log("[MockHotelBookingService] Initialized.");
  }

  async search(criteria: HotelSearchCriteria): Promise<HotelResult[]> {
    console.log("[MockHotelBookingService] Searching hotels with criteria:", criteria);
    return this.hotelSearchProvider.fetchData(criteria);
  }

  protected validateBooking(details: GenericBookingDetails): boolean {
    const hotelDetails = details as HotelBookingDetails; // Cast for specific validation
    if (!hotelDetails || !hotelDetails.selectedHotelResult || hotelDetails.guestDetails.length === 0) {
      console.error("[HotelBookingService] Validation failed: Missing hotel result or guest details.");
      return false;
    }
    return hotelDetails.isValidForBooking();
  }
}