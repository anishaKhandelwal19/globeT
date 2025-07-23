package com.globetripster.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "flight_booking_details")
public class FlightBookingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seatPreference; // Aisle, Window, Middle

    private String mealPreference; // Veg, Non-Veg, Vegan, etc.

    private double extraLuggageWeight; // in KG

    private String passportNumber;

    private String nationality;

    @OneToOne
    @JoinColumn(name = "flight_booking_id")
    private FlightBooking flightBooking;


    public FlightBookingDetails() {
    }

    public FlightBookingDetails(String seatPreference, String mealPreference, double extraLuggageWeight,
                                String passportNumber, String nationality, FlightBooking flightBooking) {
        this.seatPreference = seatPreference;
        this.mealPreference = mealPreference;
        this.extraLuggageWeight = extraLuggageWeight;
        this.passportNumber = passportNumber;
        this.nationality = nationality;
        this.flightBooking = flightBooking;
    }


    public Long getId() {
        return id;
    }

    public String getSeatPreference() {
        return seatPreference;
    }

    public void setSeatPreference(String seatPreference) {
        this.seatPreference = seatPreference;
    }

    public String getMealPreference() {
        return mealPreference;
    }

    public void setMealPreference(String mealPreference) {
        this.mealPreference = mealPreference;
    }

    public double getExtraLuggageWeight() {
        return extraLuggageWeight;
    }

    public void setExtraLuggageWeight(double extraLuggageWeight) {
        this.extraLuggageWeight = extraLuggageWeight;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public FlightBooking getFlightBooking() {
        return flightBooking;
    }

    public void setFlightBooking(FlightBooking flightBooking) {
        this.flightBooking = flightBooking;
    }
}