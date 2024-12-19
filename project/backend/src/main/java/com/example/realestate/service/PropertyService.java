package com.example.realestate.service;

import com.example.realestate.dto.PropertyDTO;
import com.example.realestate.dto.SearchCriteriaDTO;
import com.example.realestate.exception.PropertyNotFoundException;
import com.example.realestate.mapper.PropertyMapper;
import com.example.realestate.model.mongodb.Property;
import com.example.realestate.repository.PropertyRepository;
import com.example.realestate.service.search.PropertySearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PropertyService {
    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;
    private final PropertySearchService searchService;

    public Page<Property> searchProperties(SearchCriteriaDTO criteria) {
        return searchService.search(criteria);
    }

    @Transactional
    public Property createProperty(PropertyDTO propertyDTO) {
        Property property = propertyMapper.toEntity(propertyDTO);
        return propertyRepository.save(property);
    }

    @Transactional
    public Property updateProperty(String id, PropertyDTO propertyDTO) {
        Property property = propertyRepository.findById(id)
            .orElseThrow(() -> new PropertyNotFoundException(id));
        
        propertyMapper.updateEntity(property, propertyDTO);
        return propertyRepository.save(property);
    }

    @Transactional
    public void deleteProperty(String id) {
        if (!propertyRepository.existsById(id)) {
            throw new PropertyNotFoundException(id);
        }
        propertyRepository.deleteById(id);
    }

    public Property getPropertyById(String id) {
        return propertyRepository.findById(id)
            .orElseThrow(() -> new PropertyNotFoundException(id));
    }
}