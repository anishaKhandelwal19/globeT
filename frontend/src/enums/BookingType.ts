export const BookingType = {
  FLIGHT: "Flight",
  HOTEL: "Hotel",
  ACTIVITY: "Activity"
} as const;

export type BookingType = (typeof BookingType)[keyof typeof BookingType];
