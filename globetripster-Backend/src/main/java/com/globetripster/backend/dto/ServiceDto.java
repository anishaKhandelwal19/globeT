package com.globetripster.backend.dto;

public class ServiceDto {
    private String name;

    public ServiceDto() {}

    public ServiceDto(String name) {
        this.name = name;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
