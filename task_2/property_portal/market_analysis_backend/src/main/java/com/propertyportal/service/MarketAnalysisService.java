package com.propertyportal.service;

import com.propertyportal.model.House;
import com.propertyportal.model.MarketStatistics;
import com.propertyportal.model.PredictionRequest;
import com.propertyportal.model.PredictionResult;

import java.time.Duration;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class MarketAnalysisService {

    private static final String DATASET_KEY =
        "market:dataset";

    private static final String STATISTICS_KEY =
        "market:statistics";

    private final ModelServerClient modelServerClient;
    private final CacheService cacheService;

    public MarketAnalysisService(
        ModelServerClient modelServerClient,
        CacheService cacheService
    ) {
        this.modelServerClient = modelServerClient;
        this.cacheService = cacheService;
    }

    @SuppressWarnings("unchecked")
    public List<House> getProperties() {

        Object cached =
            cacheService.get(DATASET_KEY);

        if (cached instanceof List<?>) {
            return (List<House>) cached;
        }

        List<House> data =
            modelServerClient.getDataset();

        cacheService.put(
            DATASET_KEY,
            data,
            Duration.ofMinutes(10)
        );

        return data;
    }

    public MarketStatistics getStatistics() {

        Object cached =
            cacheService.get(STATISTICS_KEY);

        if (cached instanceof MarketStatistics) {
            return (MarketStatistics) cached;
        }

        List<House> houses = getProperties();

        MarketStatistics result =
            calculateStatistics(houses);

        cacheService.put(
            STATISTICS_KEY,
            result,
            Duration.ofMinutes(10)
        );

        return result;
    }

    public PredictionResult predict(
        PredictionRequest request
    ) {
        return modelServerClient.predict(request);
    }

    private MarketStatistics calculateStatistics(
        List<House> houses
    ) {
        MarketStatistics statistics =
            new MarketStatistics();

        if (houses.isEmpty()) {
            return statistics;
        }

        statistics.setCount(houses.size());

        statistics.setAveragePrice(
            houses.stream()
                .mapToDouble(House::getPrice)
                .average()
                .orElse(0)
        );

        statistics.setAverageSquareFootage(
            houses.stream()
                .mapToDouble(House::getSquare_footage)
                .average()
                .orElse(0)
        );

        statistics.setAverageBedrooms(
            houses.stream()
                .mapToInt(House::getBedrooms)
                .average()
                .orElse(0)
        );

        statistics.setAverageBathrooms(
            houses.stream()
                .mapToDouble(House::getBathrooms)
                .average()
                .orElse(0)
        );

        statistics.setAverageSchoolRating(
            houses.stream()
                .mapToDouble(House::getSchool_rating)
                .average()
                .orElse(0)
        );

        List<Double> prices =
            houses.stream()
                .map(House::getPrice)
                .sorted(Comparator.naturalOrder())
                .toList();

        int middle = prices.size() / 2;

        double median;

        if (prices.size() % 2 == 0) {
            median =
                (prices.get(middle - 1) +
                 prices.get(middle)) / 2.0;
        } else {
            median = prices.get(middle);
        }

        statistics.setMedianPrice(median);

        return statistics;
    }
}