package com.globetripster.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "routes")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "source_airport_code")
    private Airport source;

    @ManyToOne
    @JoinColumn(name = "destination_airport_code")
    private Airport destination;

    private String category; // LEISURE, BUSINESS, FAMILY, etc.

    private double averageDistance; // in KM

    private String popularAirline; // Jet, Indigo, etc.


    public Route() {
    }

    public Route(Airport source, Airport destination, String category,
                 double averageDistance, String popularAirline) {
        this.source = source;
        this.destination = destination;
        this.category = category;
        this.averageDistance = averageDistance;
        this.popularAirline = popularAirline;
    }


    public Long getId() {
        return id;
    }

    public Airport getSource() {
        return source;
    }

    public void setSource(Airport source) {
        this.source = source;
    }

    public Airport getDestination() {
        return destination;
    }

    public void setDestination(Airport destination) {
        this.destination = destination;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getAverageDistance() {
        return averageDistance;
    }

    public void setAverageDistance(double averageDistance) {
        this.averageDistance = averageDistance;
    }

    public String getPopularAirline() {
        return popularAirline;
    }

    public void setPopularAirline(String popularAirline) {
        this.popularAirline = popularAirline;
    }
}