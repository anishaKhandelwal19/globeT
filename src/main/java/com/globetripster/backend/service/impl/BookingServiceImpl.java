package com.globetripster.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.globetripster.backend.model.FlightBooking;
import com.globetripster.backend.model.FlightResult;
import com.globetripster.backend.model.Ticket;
import com.globetripster.backend.repository.FlightBookingRepository;
import com.globetripster.backend.repository.FlightResultRepository;
import com.globetripster.backend.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private FlightResultRepository flightResultRepository;

    @Autowired
    private FlightBookingRepository flightBookingRepository;

    @Override
    public FlightBooking bookFlight(String flightId, String userId, List<Ticket> tickets, String travelClass) {
        FlightResult flight = flightResultRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found: " + flightId));

        String bookingId = UUID.randomUUID().toString();

        FlightBooking booking = new FlightBooking(
                bookingId,
                userId,
                "CONFIRMED",
                LocalDateTime.now(),
                "ONLINE",
                tickets.stream().mapToDouble(Ticket::getPrice).sum(),
                flight,
                tickets,
                travelClass);

        return flightBookingRepository.save(booking);
    }

    @Override
    public FlightBooking getBookingById(String bookingId) {
        return flightBookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));
    }
}