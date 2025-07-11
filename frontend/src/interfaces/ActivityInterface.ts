import { type GenericBookingDetails } from "./BookingInterface.ts";
import { BookingType } from "../enums/BookingType";

// Search criteria for finding activities
export interface ActivitySearchCriteria {
  location: string;
  date: string;
  numberOfParticipants: number;
  activityType: string;
}

// Result returned when searching for an activity
export class ActivityResult {
  public id: string;
  public activityName: string;
  public location: string;
  public price: number;
  public durationMinutes: number;
  public availability: number;
  public reviews: any[]; // Can be typed more strictly if needed
  public description: string;
  public imageUrls: string[];
  public currency: string;

  constructor(
    id: string,
    activityName: string,
    location: string,
    price: number,
    durationMinutes: number,
    availability: number,
    reviews: any[],
    description: string,
    imageUrls: string[],
    currency: string = "USD"
  ) {
    this.id = id;
    this.activityName = activityName;
    this.location = location;
    this.price = price;
    this.durationMinutes = durationMinutes;
    this.availability = availability;
    this.reviews = reviews;
    this.description = description;
    this.imageUrls = imageUrls;
    this.currency = currency;
  }
}

// Booking details for activity-based experiences
export class ActivityBookingDetails implements GenericBookingDetails {
  public bookingId: string;
  public userId: string;
  public totalPrice: number;
  public currency: string;
  public contactEmail: string;
  public contactPhoneNumber: string;
  public selectedActivityResult: ActivityResult;
  public participantDetails: { name: string; age: number }[];
  public bookingDate: Date;
  public bookedEntityType: BookingType;

  constructor(
    bookingId: string,
    userId: string,
    totalPrice: number,
    currency: string,
    contactEmail: string,
    contactPhoneNumber: string,
    selectedActivityResult: ActivityResult,
    participantDetails: { name: string; age: number }[]
  ) {
    this.bookingId = bookingId;
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.currency = currency;
    this.contactEmail = contactEmail;
    this.contactPhoneNumber = contactPhoneNumber;
    this.selectedActivityResult = selectedActivityResult;
    this.participantDetails = participantDetails;
    this.bookingDate = new Date();
    this.bookedEntityType = BookingType.ACTIVITY;
  }

  isValidForBooking(): boolean {
    return (
      this.participantDetails.length > 0 &&
      this.selectedActivityResult !== null
    );
  }
}
