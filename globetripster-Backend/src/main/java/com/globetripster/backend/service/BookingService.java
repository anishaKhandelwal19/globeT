
package com.globetripster.backend.service;

import java.util.List;

import com.globetripster.backend.model.FlightBooking;
import com.globetripster.backend.model.Ticket;

public interface BookingService {
    FlightBooking bookFlight(String flightId, String userId, List<Ticket> tickets, String travelClass);

    FlightBooking getBookingById(String bookingId);
}
