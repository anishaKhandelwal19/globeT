package com.globetripster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globetripster.backend.model.FlightBooking;

public interface FlightBookingRepository extends JpaRepository<FlightBooking, String> {
}