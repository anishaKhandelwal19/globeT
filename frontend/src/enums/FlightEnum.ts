// FlightEnums.ts

export const FlightClassType = {
  ECONOMY: "Economy",
  PREMIUM_ECONOMY: "Premium Economy",
  BUSINESS: "Business",
  FIRST: "First"
} as const;
export type FlightClassType = (typeof FlightClassType)[keyof typeof FlightClassType];

export const BookingStatus = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  FAILED: "Failed"
} as const;
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export const SeatType = {
  WINDOW: "Window",
  AISLE: "Aisle",
  MIDDLE: "Middle"
} as const;
export type SeatType = (typeof SeatType)[keyof typeof SeatType];
