package com.globetripster.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String passengerName;

    private String gender;

    private int age;

    private String seatNumber;

    private String seatClass; // ECONOMY, BUSINESS, etc.

    private double price;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private FlightBooking booking;


    public Ticket() {
    }

    public Ticket(String passengerName, String gender, int age, String seatNumber,
                  String seatClass, double price, FlightBooking booking) {
        this.passengerName = passengerName;
        this.gender = gender;
        this.age = age;
        this.seatNumber = seatNumber;
        this.seatClass = seatClass;
        this.price = price;
        this.booking = booking;
    }


    public Long getId() {
        return id;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(String seatClass) {
        this.seatClass = seatClass;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public FlightBooking getBooking() {
        return booking;
    }

    public void setBooking(FlightBooking booking) {
        this.booking = booking;
    }
}