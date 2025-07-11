import { MockPaymentProcessor } from "./PaymentProcessor";
import { MockNotificationManager } from "./NotificationServices";
import { MockBookingRepository } from "./BookingRepository";
import { BookingConfirmation, type GenericBookingDetails, PaymentResult } from "../interfaces/BookingInterface";
import { BookingStatus } from "../enums/FlightEnum";
import { BookingType } from "../enums/BookingType";

export abstract class MockAbstractBookingService {
  protected paymentProcessor: MockPaymentProcessor;
  protected notificationManager: MockNotificationManager;
  protected bookingRepository: MockBookingRepository;

  constructor(
    paymentProcessor: MockPaymentProcessor,
    notificationManager: MockNotificationManager,
    bookingRepository: MockBookingRepository
  ) {
    this.paymentProcessor = paymentProcessor;
    this.notificationManager = notificationManager;
    this.bookingRepository = bookingRepository;
  }
  protected abstract validateBooking(details: GenericBookingDetails): boolean;

  async book(bookingDetails: GenericBookingDetails): Promise<BookingConfirmation> {
    console.log(`[AbstractBookingService - ${bookingDetails.bookedEntityType}] Attempting to book:`, bookingDetails);

    if (!this.validateBooking(bookingDetails)) {
      console.error(`[AbstractBookingService - ${bookingDetails.bookedEntityType}] Booking details validation failed.`);
      return new BookingConfirmation(
        bookingDetails.bookingId,
        BookingStatus.FAILED,
        "N/A",
        bookingDetails.bookedEntityType,
        bookingDetails.totalPrice,
        bookingDetails.currency,
        new Date(),
        null,
        [],
      );
    }

    const paymentInfo = { /* actual payment info from UI, simplified */ };
    const paymentResult: PaymentResult = await this.paymentProcessor.processPayment(bookingDetails.totalPrice, paymentInfo);

    if (!paymentResult.success) {
      console.error(`[AbstractBookingService - ${bookingDetails.bookedEntityType}] Payment failed:`, paymentResult.message);
      const mockBookingForNotification = {
        bookingId: bookingDetails.bookingId,
        status: BookingStatus.FAILED,
        contactEmail: bookingDetails.contactEmail,
        contactPhoneNumber: bookingDetails.contactPhoneNumber
      };
      this.notificationManager.notifyObservers(mockBookingForNotification, "PAYMENT_FAILED");
      return new BookingConfirmation(
        bookingDetails.bookingId,
        BookingStatus.FAILED,
        "N/A",
        bookingDetails.bookedEntityType,
        bookingDetails.totalPrice,
        bookingDetails.currency,
        new Date(),
        null,
        []
      );
    }

    const confirmationNumber = `CONF-${Math.random().toString(36).substr(2, 9)}`;
    // For traveler names, we'll try to extract them based on common properties
    const travelerNames = bookingDetails.passengerDetails?.map(p => `${p.firstName} ${p.lastName}`) ||
                          bookingDetails.guestDetails?.map(g => `${g.firstName} ${g.lastName}`) ||
                          bookingDetails.participantDetails?.map(p => p.name) ||
                          ['Guest'];

    const genericBooking = {
      bookingId: bookingDetails.bookingId,
      userId: bookingDetails.userId,
      status: BookingStatus.CONFIRMED,
      bookingDate: new Date(),
      totalPrice: bookingDetails.totalPrice,
      currency: bookingDetails.currency,
      bookedEntityType: bookingDetails.bookedEntityType,
      bookingDetails: bookingDetails, // Store the specific details
      contactEmail: bookingDetails.contactEmail,
      contactPhoneNumber: bookingDetails.contactPhoneNumber,
      paymentTransactionId: paymentResult.transactionId // Store transaction ID
    };

    await this.bookingRepository.saveBooking(genericBooking);

    const bookingConfirmation = new BookingConfirmation(
      bookingDetails.bookingId,
      BookingStatus.CONFIRMED,
      confirmationNumber,
      bookingDetails.bookedEntityType,
      bookingDetails.totalPrice,
      bookingDetails.currency,
      new Date(),
      (bookingDetails.bookedEntityType === BookingType.FLIGHT) ? `PNR-${Math.random().toString(36).substr(2, 5)}` : null, // PNR specific to flights
      travelerNames
    );

    this.notificationManager.notifyObservers(genericBooking, "CONFIRMED");
    console.log(`[AbstractBookingService - ${bookingDetails.bookedEntityType}] Booking confirmed:`, bookingConfirmation);
    return bookingConfirmation;
  }

  async cancel(bookingId: string): Promise<boolean> {
    console.log("[AbstractBookingService] Attempting to cancel booking:", bookingId);
    const booking = await this.bookingRepository.getBookingById(bookingId);
    if (!booking || booking.status === BookingStatus.CANCELLED) {
      console.warn("[AbstractBookingService] Booking not found or already cancelled.");
      return false;
    }

    const refundResult = await this.paymentProcessor.refundPayment(booking.paymentTransactionId || "mock-txn", booking.totalPrice);

    if (!refundResult.success) {
      console.error("[AbstractBookingService] Refund failed during cancellation:", refundResult.message);
      return false;
    }

    booking.status = BookingStatus.CANCELLED;
    await this.bookingRepository.saveBooking(booking);
    this.notificationManager.notifyObservers(booking, "CANCELLED");
    console.log("[AbstractBookingService] Booking cancelled:", bookingId);
    return true;
  }

  async getBookingDetails(bookingId: string): Promise<GenericBookingDetails | null> {
    console.log("[AbstractBookingService] Fetching booking details for:", bookingId);
    const booking = await this.bookingRepository.getBookingById(bookingId);
    return booking ? booking.bookingDetails : null;
  }
}