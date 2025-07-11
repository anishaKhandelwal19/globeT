// This file initializes and exports your service instances.
// In a real application, these would be instances of your actual API clients.
// For now, they are instances of your mock services.

import { MockBookingRepository } from "../mocks/BookingRepository";
import { MockNotificationManager, MockEmailNotificationService, MockSmsNotificationService } from "../mocks/NotificationServices";
import { MockPaymentProcessor } from "../mocks/PaymentProcessor";
import { MockFlightSearchProvider } from "../mocks/FlightSearchProvider";
import { MockHotelSearchProvider } from "../mocks/HotelSearchProvider";
import { MockActivitySearchProvider } from "../mocks/ActivitySearchProvider";
import { MockFlightBookingService } from "../mocks/FlightBookingService";
import { MockHotelBookingService } from "../mocks/HotelBookingService";
import { MockActivityBookingService } from "../mocks/ActivityBookingService";
import { PaymentMethodType } from "../enums/PaymentEnum";


// Initialize core mocks
const mockBookingRepository = new MockBookingRepository();
const mockNotificationManager = new MockNotificationManager();
const mockEmailNotifier = new MockEmailNotificationService();
const mockSmsNotifier = new MockSmsNotificationService();

// Register observers
mockNotificationManager.addObserver(mockEmailNotifier);
mockNotificationManager.addObserver(mockSmsNotifier);

// Initialize payment processors
const mockCreditCardProcessor = new MockPaymentProcessor(PaymentMethodType.CARD);
// const mockPayPalProcessor = new MockPaymentProcessor(PaymentMethodType.PAYPAL);
// const mockUpiProcessor = new MockPaymentProcessor(PaymentMethodType.UPI);

// Initialize search providers
const mockFlightSearchProvider = new MockFlightSearchProvider();
const mockHotelSearchProvider = new MockHotelSearchProvider();
const mockActivitySearchProvider = new MockActivitySearchProvider();

// Initialize booking services (injecting dependencies)
export const flightBookingService = new MockFlightBookingService(
  mockFlightSearchProvider,
  mockCreditCardProcessor,
  mockNotificationManager,
  mockBookingRepository
);

export const hotelBookingService = new MockHotelBookingService(
  mockHotelSearchProvider,
  mockCreditCardProcessor,
  mockNotificationManager,
  mockBookingRepository
);

export const activityBookingService = new MockActivityBookingService(
  mockActivitySearchProvider,
  mockCreditCardProcessor,
  mockNotificationManager,
  mockBookingRepository
);

// You can export these services to be used throughout your application
// For a real app, you might use a context provider or a dedicated DI system for these.