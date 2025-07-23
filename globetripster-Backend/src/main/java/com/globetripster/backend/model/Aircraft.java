package com.globetripster.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "aircrafts")
public class Aircraft {

    @Id
    private String modelId;

    private String modelName;

    private int seats;

    @Column(name = "`range`") // 🛠️ Escaped reserved keyword
    private double range;

    public Aircraft() {
    }

    public Aircraft(String modelId, String modelName, int seats, double range) {
        this.modelId = modelId;
        this.modelName = modelName;
        this.seats = seats;
        this.range = range;
    }

    public String getModelId() {
        return modelId;
    }

    public void setModelId(String modelId) {
        this.modelId = modelId;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public double getRange() {
        return range;
    }

    public void setRange(double range) {
        this.range = range;
    }
}
