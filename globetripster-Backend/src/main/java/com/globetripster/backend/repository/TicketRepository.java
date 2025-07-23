package com.globetripster.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.globetripster.backend.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}