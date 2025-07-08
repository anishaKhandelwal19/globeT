package com.globetripster.backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "service_entity")
public class ServiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "services")
    private List<City> cities;

    public ServiceEntity() {}

    public ServiceEntity(String cabBooking, City jaipur) {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<City> getCities() {
        return cities;
    }

    public void setCities(List<City> cities) {
        this.cities = cities;
    }
}
