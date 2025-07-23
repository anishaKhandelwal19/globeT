package com.globetripster.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.globetripster.backend.model.FlightResult;

public interface FlightService {
    List<FlightResult> searchFlights(String sourceCity, String destinationCity, LocalDateTime date);

    FlightResult getFlightById(String flightId);
}