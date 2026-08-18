package com.propertyportal.model;

public class PredictionResult {

    private String id;
    private double price;

    public PredictionResult() {
    }

    public PredictionResult(String id, double price) {
        this.id = id;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}