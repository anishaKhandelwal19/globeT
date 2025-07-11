import {
  BookingStatus,
} from "../enums/FlightEnum"; 
import { BookingType } from "../enums/BookingType";
import { PaymentMethodType } from "../enums/PaymentEnum";

export class BookingConfirmation {
  public bookingId: string;
  public status: BookingStatus;
  public confirmationNumber: string;
  public bookedEntityType: BookingType;
  public totalAmountPaid: number;
  public currency: string;
  public bookingDate: Date;
  public pnr: string | null;
  public travelerNames: string[];
  public message?: string;

  constructor(
    bookingId: string,
    status: BookingStatus,
    confirmationNumber: string,
    bookedEntityType: BookingType,
    totalAmountPaid: number,
    currency: string,
    bookingDate: Date,
    pnr: string | null,
    travelerNames: string[],
     message?: string 
  ) {
    this.bookingId = bookingId;
    this.status = status;
    this.confirmationNumber = confirmationNumber;
    this.bookedEntityType = bookedEntityType;
    this.totalAmountPaid = totalAmountPaid;
    this.currency = currency;
    this.bookingDate = bookingDate;
    this.pnr = pnr;
    this.travelerNames = travelerNames;
    this.message = message ?? "";
  }

  isConfirmed(): boolean {
    return this.status === BookingStatus.CONFIRMED;
  }

  toDisplayString(): string {
    return `Booking ID: ${this.bookingId}\nConfirmation: ${this.confirmationNumber}\nStatus: ${this.status}\nAmount: ${this.currency} ${this.totalAmountPaid}`;
  }
}


export class PaymentResult {
  public success: boolean;
  public transactionId: string;
  public amount: number;
  public currency: string;
  public message: string;
  public paymentMethodType: PaymentMethodType;
  public errorCode: string | null;
  public timestamp: Date;

  constructor(
    success: boolean,
    transactionId: string,
    amount: number,
    currency: string,
    message: string,
    paymentMethodType: PaymentMethodType,
    errorCode: string | null = null
  ) {
    this.success = success;
    this.transactionId = transactionId;
    this.amount = amount;
    this.currency = currency;
    this.message = message;
    this.paymentMethodType = paymentMethodType;
    this.errorCode = errorCode;
    this.timestamp = new Date();
  }
}


// Generic structure for booking details passed to the service
export interface GenericBookingDetails {
  bookingId: string;
  userId: string;
  totalPrice: number;
  currency: string;
  bookingDate: Date;
  contactEmail: string;
  contactPhoneNumber: string;
  passengerDetails?: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    nationality: string;
  }[];
  guestDetails?: {
    firstName: string;
    lastName: string;
  }[];
  participantDetails?: {
    name: string;
    age: number;
  }[];
  bookedEntityType: BookingType;
  isValidForBooking(): boolean;
}
