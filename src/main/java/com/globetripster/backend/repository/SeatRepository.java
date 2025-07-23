package com.globetripster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globetripster.backend.model.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long> {
}