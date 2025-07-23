
package com.globetripster.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.globetripster.backend.model.FlightResult;
import com.globetripster.backend.repository.FlightResultRepository;
import com.globetripster.backend.service.FlightService;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightResultRepository flightResultRepository;

    @Override
    public List<FlightResult> searchFlights(String sourceCity, String destinationCity, LocalDateTime date) {
        return flightResultRepository.findAll().stream()
                .filter(flight -> flight.getDepartureAirport().getCity().equalsIgnoreCase(sourceCity)
                        && flight.getArrivalAirport().getCity().equalsIgnoreCase(destinationCity)
                        && flight.getDepartureTime().toLocalDate().equals(date.toLocalDate()))
                .collect(Collectors.toList());
    }

    @Override
    public FlightResult getFlightById(String flightId) {
        return flightResultRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found: " + flightId));
    }
}
