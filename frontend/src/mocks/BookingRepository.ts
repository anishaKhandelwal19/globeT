import { type GenericBookingDetails, BookingConfirmation } from "../interfaces/BookingInterface";
import { BookingStatus } from "../enums/FlightEnum";
export class MockBookingRepository {
  private bookings = new Map<string, any>(); // Stores a simplified generic booking object

  async saveBooking(booking: any): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.bookings.set(booking.bookingId, booking);
        console.log(`[MockBookingRepository] Booking ${booking.bookingId} saved.`);
        resolve(true);
      }, 500);
    });
  }

  async getBookingById(bookingId: string): Promise<any | undefined> {
    return new Promise(resolve => {
      setTimeout(() => {
        const booking = this.bookings.get(bookingId);
        console.log(`[MockBookingRepository] Fetched booking ${bookingId}:`, booking);
        resolve(booking);
      }, 300);
    });
  }
}