import { type GenericBookingDetails } from "./BookingInterface";
import { BookingType } from "../enums/BookingType";

// Explicit structure for hotel search input
export interface HotelSearchCriteria {
  location: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  numberOfRooms: number;
}

export interface HotelReview {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}


// Room details object used within HotelResult and booking
export class RoomDetails {
  public roomId: string;
  public roomType: string;
  public capacity: number;
  public basePrice: number;

  constructor(
    roomId: string,
    roomType: string,
    capacity: number,
    basePrice: number
  ) {
    this.roomId = roomId;
    this.roomType = roomType;
    this.capacity = capacity;
    this.basePrice = basePrice;
  }
}

// Structure of hotel search result
export class HotelResult {
  public id: string;
  public hotelName: string;
  public address: string;
  public rating: number;
  public pricePerNight: number;
  public availableRooms: RoomDetails[];
  public amenities: string[];
  public imageUrls: string[];
  public description: string;
  public currency: string;
  public reviews: HotelReview[];

  constructor(
    id: string,
    hotelName: string,
    address: string,
    rating: number,
    pricePerNight: number,
    availableRooms: RoomDetails[],
    amenities: string[],
    imageUrls: string[],
    description: string,
    currency: string = "USD",
    reviews: HotelReview[] = []
  ) {
    this.id = id;
    this.hotelName = hotelName;
    this.address = address;
    this.rating = rating;
    this.pricePerNight = pricePerNight;
    this.availableRooms = availableRooms;
    this.amenities = amenities;
    this.imageUrls = imageUrls;
    this.description = description;
    this.currency = currency;
    this.reviews = reviews;
  }
}

// Booking details used for hotel reservations
export class HotelBookingDetails implements GenericBookingDetails {
  public bookingId: string;
  public userId: string;
  public totalPrice: number;
  public currency: string;
  public contactEmail: string;
  public contactPhoneNumber: string;
  public selectedHotelResult: HotelResult;
  public roomDetails: RoomDetails[];
  public guestDetails: { firstName: string; lastName: string }[];
  public address: string;
  public bookingDate: Date;
  public bookedEntityType: BookingType;

  constructor(
    bookingId: string,
    userId: string,
    totalPrice: number,
    currency: string,
    contactEmail: string,
    contactPhoneNumber: string,
    selectedHotelResult: HotelResult,
    roomDetails: RoomDetails[],
    guestDetails: { firstName: string; lastName: string }[],
    address: string
  ) {
    this.bookingId = bookingId;
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.currency = currency;
    this.contactEmail = contactEmail;
    this.contactPhoneNumber = contactPhoneNumber;
    this.selectedHotelResult = selectedHotelResult;
    this.roomDetails = roomDetails;
    this.guestDetails = guestDetails;
    this.address = address;
    this.bookingDate = new Date();
    this.bookedEntityType = BookingType.HOTEL;
  }

  isValidForBooking(): boolean {
    return (
      this.guestDetails.length > 0 &&
      this.selectedHotelResult !== null &&
      this.roomDetails.length > 0
    );
  }
}
