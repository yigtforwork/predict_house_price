package com.propertyportal.service;

import com.propertyportal.model.House;
import com.propertyportal.model.PredictionRequest;
import com.propertyportal.model.PredictionResult;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ModelServerClient {

    private final RestClient restClient;

    public ModelServerClient(
        @Value("${model.server.url}") String modelServerUrl
    ) {
        this.restClient = RestClient.builder()
            .baseUrl(modelServerUrl)
            .build();
    }

    public List<House> getDataset() {
        House[] result = restClient
            .get()
            .uri("/dataset")
            .retrieve()
            .body(House[].class);

        return result == null
            ? List.of()
            : Arrays.asList(result);
    }

    public PredictionResult predict(
        PredictionRequest request
    ) {
        PredictionResult[] result = restClient
            .post()
            .uri("/predict")
            .body(List.of(request))
            .retrieve()
            .body(PredictionResult[].class);

        if (result == null || result.length == 0) {
            throw new IllegalStateException(
                "Model server returned no prediction."
            );
        }

        return result[0];
    }

    public boolean isHealthy() {
        try {
            restClient
                .get()
                .uri("/health")
                .retrieve()
                .toBodilessEntity();

            return true;
        } catch (Exception exception) {
            return false;
        }
    }
}