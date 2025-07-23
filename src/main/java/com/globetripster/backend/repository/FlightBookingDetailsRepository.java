package com.globetripster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globetripster.backend.model.FlightBookingDetails;

public interface FlightBookingDetailsRepository extends JpaRepository<FlightBookingDetails, Long> {
}