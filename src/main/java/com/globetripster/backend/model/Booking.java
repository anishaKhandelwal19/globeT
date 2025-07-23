package com.globetripster.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Booking {

    @Id
    private String bookingId;

    private String userId;

    private String status; //e.g "PENDING", "CONFIRMED", "CANCELLED"

    private LocalDateTime bookingDate;

    private String paymentMethod;

    private double totalAmount;


    public Booking() {
    }

    public Booking(String bookingId, String userId, String status, LocalDateTime bookingDate,
                   String paymentMethod, double totalAmount) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.status = status;
        this.bookingDate = bookingDate;
        this.paymentMethod = paymentMethod;
        this.totalAmount = totalAmount;
    }


    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}