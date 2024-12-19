package com.example.realestate.controller;

import com.example.realestate.dto.PropertyDTO;
import com.example.realestate.dto.SearchCriteriaDTO;
import com.example.realestate.model.mongodb.Property;
import com.example.realestate.service.PropertyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {
    private final PropertyService propertyService;
    
    @GetMapping
    public ResponseEntity<Page<Property>> searchProperties(SearchCriteriaDTO criteria) {
        Page<Property> results = propertyService.searchProperties(criteria);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable String id) {
        Property property = propertyService.getPropertyById(id);
        return ResponseEntity.ok(property);
    }

    @PostMapping
    public ResponseEntity<Property> createProperty(@Valid @RequestBody PropertyDTO propertyDTO) {
        Property created = propertyService.createProperty(propertyDTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable String id, @Valid @RequestBody PropertyDTO propertyDTO) {
        Property property = propertyService.updateProperty(id, propertyDTO);
        return ResponseEntity.ok(property);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable String id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.ok().build();
    }
}