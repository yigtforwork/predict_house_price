package com.propertyportal.model;

public class PredictionRequest {

    private String id;
    private double square_footage;
    private int bedrooms;
    private double bathrooms;
    private int year_built;
    private double lot_size;
    private double distance_to_city_center;
    private double school_rating;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getSquare_footage() {
        return square_footage;
    }

    public void setSquare_footage(double value) {
        this.square_footage = value;
    }

    public int getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(int value) {
        this.bedrooms = value;
    }

    public double getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(double value) {
        this.bathrooms = value;
    }

    public int getYear_built() {
        return year_built;
    }

    public void setYear_built(int value) {
        this.year_built = value;
    }

    public double getLot_size() {
        return lot_size;
    }

    public void setLot_size(double value) {
        this.lot_size = value;
    }

    public double getDistance_to_city_center() {
        return distance_to_city_center;
    }

    public void setDistance_to_city_center(double value) {
        this.distance_to_city_center = value;
    }

    public double getSchool_rating() {
        return school_rating;
    }

    public void setSchool_rating(double value) {
        this.school_rating = value;
    }
}