package com.globetripster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.globetripster.backend.model.Route;

@Repository
public interface RouteRepository extends JpaRepository<Route, String> {
}