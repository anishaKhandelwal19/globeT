package com.globetripster.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.globetripster.backend.model.Airport;

@Repository
public interface AirportRepository extends JpaRepository<Airport, String> {
    Optional<Airport> findByCode(String code);
}