import { BookingStatus } from "../enums/FlightEnum";

interface Observer {
  update: (booking: any, eventType: string) => void;
}

export class MockNotificationManager {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(booking: any, eventType: string): void {
    console.log(`[MockNotificationManager] Notifying observers for booking ${booking.bookingId}, event: ${eventType}`);
    this.observers.forEach(observer => {
      // Check if observer implements update or is a direct notification service
      if (typeof observer.update === 'function') {
        observer.update(booking, eventType);
      } else if (typeof (observer as any).sendNotification === 'function') {
        const recipient = booking.contactEmail || booking.contactPhoneNumber || "unknown";
        const message = `Booking ${booking.bookingId} ${eventType}. Status: ${booking.status}`;
        (observer as any).sendNotification(recipient, message, eventType);
      }
    });
  }
}

// Mock for INotificationService (Email)
export class MockEmailNotificationService implements Observer {
  async sendNotification(recipient: string, message: string, type: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`[MockEmailNotificationService] Sending ${type} to ${recipient}: ${message.substring(0, 50)}...`);
        resolve(true);
      }, 200);
    });
  }

  update(booking: any, eventType: string): void {
    const recipient = booking.contactEmail || "unknown_email";
    const message = `Email: Your booking ${booking.bookingId} status is ${booking.status} due to ${eventType}.`;
    this.sendNotification(recipient, message, eventType);
  }
}

// Mock for INotificationService (SMS)
export class MockSmsNotificationService implements Observer {
  async sendNotification(recipient: string, message: string, type: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`[MockSmsNotificationService] Sending ${type} SMS to ${recipient}: ${message.substring(0, 50)}...`);
        resolve(true);
      }, 200);
    });
  }

  update(booking: any, eventType: string): void {
    const recipient = booking.contactPhoneNumber || "unknown_phone";
    const message = `SMS: Booking ${booking.bookingId} status: ${booking.status} (${eventType}).`;
    this.sendNotification(recipient, message, eventType);
  }
}