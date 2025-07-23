import { FlightClassType, SeatType } from "../enums/FlightEnum";
import { BookingType } from "../enums/BookingType";
import { type GenericBookingDetails } from "./BookingInterface";

export interface FareDetails {
  title: string;
  price: number;
  baggage: string;
  flexibility: string;
  meals: string;
  seats: string;
}


export class FlightSearchCriteria {
  public origin: string;
  public destination: string;
  public departureDate: string;
  public returnDate: string;
  public numberOfPassengers: number;
  public flightClass: FlightClassType;
  public userId: string;
  public timestamp: Date;

  constructor(
    origin: string,
    destination: string,
    departureDate: string,
    returnDate: string,
    numberOfPassengers: number,
    flightClass: FlightClassType,
    userId: string = "user123",
    timestamp: Date = new Date()
  ) {
    this.origin = origin;
    this.destination = destination;
    this.departureDate = departureDate;
    this.returnDate = returnDate;
    this.numberOfPassengers = numberOfPassengers;
    this.flightClass = flightClass;
    this.userId = userId;
    this.timestamp = timestamp;
  }
}

export class FlightResult {
  public id: string;
  public flightNumber: string;
  public airline: { name: string };
  public departureAirport: { iataCode: string };
  public arrivalAirport: { iataCode: string };
  public departureTime: Date;
  public arrivalTime: Date;
  public price: number;
  public durationMinutes: number;
  public availableSeats: number;
  public currency: string;
  public providerName: string;
  public lastUpdated: Date;
  public route: string;
  public fareDetails: FareDetails[]; // ✅ NEW

  constructor(
    id: string,
    flightNumber: string,
    airlineName: string,
    departureAirport: string,
    arrivalAirport: string,
    departureTime: string,
    arrivalTime: string,
    price: number,
    durationMinutes: number,
    availableSeats: number,
    fareDetails: FareDetails[] = [] // ✅ NEW
  ) {
    this.id = id;
    this.flightNumber = flightNumber;
    this.airline = { name: airlineName };
    this.departureAirport = { iataCode: departureAirport };
    this.arrivalAirport = { iataCode: arrivalAirport };
    this.departureTime = new Date(departureTime);
    this.arrivalTime = new Date(arrivalTime);
    this.price = price;
    this.durationMinutes = durationMinutes;
    this.availableSeats = availableSeats;
    this.currency = "USD";
    this.providerName = "SimulatedAPI";
    this.lastUpdated = new Date();
    this.route = `${departureAirport}-${arrivalAirport}`;

    this.fareDetails = fareDetails; // ✅ NEW
  }

  toBookingDetails(
    passengerDetails: {
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
      gender: string;
      nationality: string;
    }[],
    selectedSeats: {
      seatNumber: string;
      isAvailable: boolean;
      flightClass: FlightClassType;
      row: number;
      column: string;
      seatType: SeatType;
    }[],
    chosenFlightClass: FlightClassType,
    contactEmail: string,
    contactPhoneNumber: string,
    selectedFare: FareDetails
  ): FlightBookingDetails {
    return new FlightBookingDetails(
      "tempBookingId-" + Math.random().toString(36).substr(2, 9),
      "user123",
      this.price,
      this.currency,
      contactEmail,
      contactPhoneNumber,
      this,
      passengerDetails,
      selectedSeats,
      chosenFlightClass,
      this.route,
      selectedFare
    );
  }
}





export class FlightBookingDetails implements GenericBookingDetails {
  public bookingId: string;
  public userId: string;
  public totalPrice: number;
  public currency: string;
  public contactEmail: string;
  public contactPhoneNumber: string;
  public selectedFlightResult: FlightResult;
  public passengerDetails: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    nationality: string;
  }[];
  public selectedSeats: {
    seatNumber: string;
    isAvailable: boolean;
    flightClass: FlightClassType;
    row: number;
    column: string;
    seatType: SeatType;
  }[];
  public chosenFlightClass: FlightClassType;
  public route: string;
  public bookingDate: Date;
  public bookedEntityType: BookingType;
  public selectedFare: FareDetails;

  constructor(
    bookingId: string,
    userId: string,
    totalPrice: number,
    currency: string,
    contactEmail: string,
    contactPhoneNumber: string,
    selectedFlightResult: FlightResult,
    passengerDetails: {
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
      gender: string;
      nationality: string;
    }[],
    selectedSeats: {
      seatNumber: string;
      isAvailable: boolean;
      flightClass: FlightClassType;
      row: number;
      column: string;
      seatType: SeatType;
    }[],
    chosenFlightClass: FlightClassType,
    route: string,
     selectedFare: FareDetails
  ) {
    this.bookingId = bookingId;
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.currency = currency;
    this.contactEmail = contactEmail;
    this.contactPhoneNumber = contactPhoneNumber;
    this.selectedFlightResult = selectedFlightResult;
    this.passengerDetails = passengerDetails;
    this.selectedSeats = selectedSeats;
    this.chosenFlightClass = chosenFlightClass;
    this.route = route;
    this.bookingDate = new Date();
    this.bookedEntityType = BookingType.FLIGHT;
    this.selectedFare = selectedFare;
  }

  isValidForBooking(): boolean {
    return this.passengerDetails.length > 0 && this.selectedFlightResult !== null;
  }
}