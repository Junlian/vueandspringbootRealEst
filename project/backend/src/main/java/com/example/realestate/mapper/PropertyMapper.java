package com.example.realestate.mapper;

import com.example.realestate.dto.PropertyDTO;
import com.example.realestate.model.mongodb.Property;
import org.springframework.stereotype.Component;

@Component
public class PropertyMapper {
    public Property toEntity(PropertyDTO dto) {
        Property property = new Property();
        property.setTitle(dto.getTitle());
        property.setDescription(dto.getDescription());
        property.setPrice(dto.getPrice());
        property.setLocation(dto.getLocation());
        property.setImageUrl(dto.getImageUrl());
        property.setFeatures(dto.getFeatures());
        property.setType(dto.getType());
        return property;
    }

    public void updateEntity(Property property, PropertyDTO dto) {
        property.setTitle(dto.getTitle());
        property.setDescription(dto.getDescription());
        property.setPrice(dto.getPrice());
        property.setLocation(dto.getLocation());
        property.setImageUrl(dto.getImageUrl());
        property.setFeatures(dto.getFeatures());
        property.setType(dto.getType());
    }
}