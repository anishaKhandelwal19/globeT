package com.globetripster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.globetripster.backend.model.Aircraft;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, String> {
}