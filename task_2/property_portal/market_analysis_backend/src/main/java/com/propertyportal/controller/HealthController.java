package com.propertyportal.controller;

import com.propertyportal.service.ModelServerClient;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    private final ModelServerClient modelServerClient;

    public HealthController(
        ModelServerClient modelServerClient
    ) {
        this.modelServerClient = modelServerClient;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        boolean modelServer =
            modelServerClient.isHealthy();

        return Map.of(
            "status",
            modelServer ? "UP" : "DEGRADED",
            "modelServer",
            modelServer
        );
    }
}