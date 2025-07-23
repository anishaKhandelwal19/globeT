package com.globetripster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.globetripster.backend.model.FlightResult;

@Repository
public interface FlightResultRepository extends JpaRepository<FlightResult, String> {
    // Custom queries can be added here later
}