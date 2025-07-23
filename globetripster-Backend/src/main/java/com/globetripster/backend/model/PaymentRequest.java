package com.globetripster.backend.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class PaymentRequest {
    @NotNull
    @Positive
    private Double amount;

    @NotNull
    @Size(min = 3, max = 3)
    private String currency;

    @NotNull
    private String paymentMethod; // "PAYPAL" or "APPLE_PAY"

    private String description;

    // Constructors, getters, and setters
    public PaymentRequest() {}

    public PaymentRequest(Double amount, String currency, String paymentMethod, String description) {
        this.amount = amount;
        this.currency = currency;
        this.paymentMethod = paymentMethod;
        this.description = description;
    }

    // Getters and setters
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}