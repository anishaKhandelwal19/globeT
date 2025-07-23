package com.globetripster.backend.model;

public abstract class SearchResult {

    protected double price;

    protected double rating; // Out of 5

    protected boolean available;

    protected String providerName; // Airline, Hotel Chain, etc.


    public SearchResult() {
    }

    public SearchResult(double price, double rating, boolean available, String providerName) {
        this.price = price;
        this.rating = rating;
        this.available = available;
        this.providerName = providerName;
    }


    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }
}