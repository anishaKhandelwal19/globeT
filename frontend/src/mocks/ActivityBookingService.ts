import { MockAbstractBookingService } from "./AbstractBookingService";
import { MockActivitySearchProvider } from "./ActivitySearchProvider";
import { MockPaymentProcessor } from "./PaymentProcessor";
import { MockNotificationManager } from "./NotificationServices";
import { MockBookingRepository } from "./BookingRepository";
import { type ActivitySearchCriteria, ActivityBookingDetails, ActivityResult } from "../interfaces/ActivityInterface";
import { type GenericBookingDetails } from "../interfaces/BookingInterface";

export class MockActivityBookingService extends MockAbstractBookingService {
    private activitySearchProvider: MockActivitySearchProvider;
  constructor(
    activitySearchProvider: MockActivitySearchProvider,
    paymentProcessor: MockPaymentProcessor,
    notificationManager: MockNotificationManager,
    bookingRepository: MockBookingRepository
  ) {
    super(paymentProcessor, notificationManager, bookingRepository);
    this.activitySearchProvider = activitySearchProvider;
    console.log("[MockActivityBookingService] Initialized.");
  }

  async search(criteria: ActivitySearchCriteria): Promise<ActivityResult[]> {
    console.log("[MockActivityBookingService] Searching activities with criteria:", criteria);
    return this.activitySearchProvider.fetchData(criteria);
  }

  protected validateBooking(details: GenericBookingDetails): boolean {
    const activityDetails = details as ActivityBookingDetails; // Cast for specific validation
    if (!activityDetails || !activityDetails.selectedActivityResult || activityDetails.participantDetails.length === 0) {
      console.error("[ActivityBookingService] Validation failed: Missing activity result or participant details.");
      return false;
    }
    return activityDetails.isValidForBooking();
  }
}