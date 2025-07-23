package com.globetripster.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.globetripster.backend.model.FlightBooking;
import com.globetripster.backend.model.Ticket;
import com.globetripster.backend.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/flight")
    public FlightBooking bookFlight(
            @RequestParam String flightId,
            @RequestParam String userId,
            @RequestParam String travelClass,
            @RequestBody List<Ticket> tickets) {
        return bookingService.bookFlight(flightId, userId, tickets, travelClass);
    }

    @GetMapping("/{id}")
    public FlightBooking getBookingById(@PathVariable String id) {
        return bookingService.getBookingById(id);
    }
}