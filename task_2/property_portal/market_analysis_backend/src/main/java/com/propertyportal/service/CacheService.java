package com.propertyportal.service;

import java.time.Duration;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class CacheService {

    private final RedisTemplate<String, Object> redisTemplate;

    public CacheService(
        RedisTemplate<String, Object> redisTemplate
    ) {
        this.redisTemplate = redisTemplate;
    }

    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void put(
        String key,
        Object value,
        Duration duration
    ) {
        redisTemplate.opsForValue().set(
            key,
            value,
            duration
        );
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }
}