package com.propertyportal.model;

public class MarketStatistics {

    private long count;
    private double averagePrice;
    private double medianPrice;
    private double averageSquareFootage;
    private double averageBedrooms;
    private double averageBathrooms;
    private double averageSchoolRating;

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public double getMedianPrice() {
        return medianPrice;
    }

    public void setMedianPrice(double medianPrice) {
        this.medianPrice = medianPrice;
    }

    public double getAverageSquareFootage() {
        return averageSquareFootage;
    }

    public void setAverageSquareFootage(
        double averageSquareFootage
    ) {
        this.averageSquareFootage =
            averageSquareFootage;
    }

    public double getAverageBedrooms() {
        return averageBedrooms;
    }

    public void setAverageBedrooms(double averageBedrooms) {
        this.averageBedrooms = averageBedrooms;
    }

    public double getAverageBathrooms() {
        return averageBathrooms;
    }

    public void setAverageBathrooms(double averageBathrooms) {
        this.averageBathrooms = averageBathrooms;
    }

    public double getAverageSchoolRating() {
        return averageSchoolRating;
    }

    public void setAverageSchoolRating(
        double averageSchoolRating
    ) {
        this.averageSchoolRating =
            averageSchoolRating;
    }
}