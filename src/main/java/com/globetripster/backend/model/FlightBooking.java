package com.globetripster.backend.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "flight_bookings")
public class FlightBooking extends Booking {

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private FlightResult flight;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "booking_id")
    private List<Ticket> tickets;

    private String travelClass; // Economy, Business, etc.


    public FlightBooking() {
    }

    public FlightBooking(String bookingId, String userId, String status,
                         java.time.LocalDateTime bookingDate, String paymentMethod, double totalAmount,
                         FlightResult flight, List<Ticket> tickets, String travelClass) {
        super(bookingId, userId, status, bookingDate, paymentMethod, totalAmount);
        this.flight = flight;
        this.tickets = tickets;
        this.travelClass = travelClass;
    }


    public FlightResult getFlight() {
        return flight;
    }

    public void setFlight(FlightResult flight) {
        this.flight = flight;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public String getTravelClass() {
        return travelClass;
    }

    public void setTravelClass(String travelClass) {
        this.travelClass = travelClass;
    }
}