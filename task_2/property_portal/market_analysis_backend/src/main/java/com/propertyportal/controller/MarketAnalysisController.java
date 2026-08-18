package com.propertyportal.controller;

import com.propertyportal.model.House;
import com.propertyportal.model.MarketStatistics;
import com.propertyportal.model.PredictionRequest;
import com.propertyportal.model.PredictionResult;
import com.propertyportal.service.MarketAnalysisService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/market")
public class MarketAnalysisController {

    private final MarketAnalysisService service;

    public MarketAnalysisController(
        MarketAnalysisService service
    ) {
        this.service = service;
    }

    @GetMapping("/properties")
    public List<House> getProperties() {
        return service.getProperties();
    }

    @GetMapping("/statistics")
    public MarketStatistics getStatistics() {
        return service.getStatistics();
    }

    @PostMapping("/predict")
    public PredictionResult predict(
        @RequestBody PredictionRequest request
    ) {
        return service.predict(request);
    }
}