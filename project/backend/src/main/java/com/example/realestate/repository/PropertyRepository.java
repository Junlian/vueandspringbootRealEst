package com.example.realestate.repository;

import com.example.realestate.model.mongodb.Property;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PropertyRepository extends MongoRepository<Property, String> {
    List<Property> findByPriceBetween(Double minPrice, Double maxPrice);
    List<Property> findByType(String type);
    
    @Query("{'location': {$regex: ?0, $options: 'i'}}")
    List<Property> findByLocationContainingIgnoreCase(String location);
}