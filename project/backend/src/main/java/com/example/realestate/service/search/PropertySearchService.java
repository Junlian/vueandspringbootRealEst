package com.example.realestate.service.search;

import com.example.realestate.dto.SearchCriteriaDTO;
import com.example.realestate.model.mongodb.Property;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertySearchService {
    private final MongoTemplate mongoTemplate;

    public Page<Property> search(SearchCriteriaDTO criteria) {
        Query query = buildSearchQuery(criteria);
        return executeSearch(query, criteria);
    }

    private Query buildSearchQuery(SearchCriteriaDTO criteria) {
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();

        addPriceCriteria(criteriaList, criteria);
        addLocationCriteria(criteriaList, criteria);
        addTypeCriteria(criteriaList, criteria);

        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        applySorting(query, criteria);
        return query;
    }

    private void addPriceCriteria(List<Criteria> criteriaList, SearchCriteriaDTO criteria) {
        if (criteria.getMinPrice() != null && criteria.getMaxPrice() != null) {
            criteriaList.add(Criteria.where("price").gte(criteria.getMinPrice()).lte(criteria.getMaxPrice()));
        }
    }

    private void addLocationCriteria(List<Criteria> criteriaList, SearchCriteriaDTO criteria) {
        if (criteria.getLocation() != null) {
            criteriaList.add(Criteria.where("location").regex(criteria.getLocation(), "i"));
        }
    }

    private void addTypeCriteria(List<Criteria> criteriaList, SearchCriteriaDTO criteria) {
        if (criteria.getType() != null) {
            criteriaList.add(Criteria.where("type").is(criteria.getType()));
        }
    }

    private void applySorting(Query query, SearchCriteriaDTO criteria) {
        String sortBy = criteria.getSortBy() != null ? criteria.getSortBy() : "price";
        Sort.Direction direction = "desc".equalsIgnoreCase(criteria.getSortDirection()) 
            ? Sort.Direction.DESC : Sort.Direction.ASC;
        query.with(Sort.by(direction, sortBy));
    }

    private Page<Property> executeSearch(Query query, SearchCriteriaDTO criteria) {
        int page = criteria.getPage() != null ? criteria.getPage() : 0;
        int size = criteria.getSize() != null ? criteria.getSize() : 10;
        
        query.with(PageRequest.of(page, size));
        long total = mongoTemplate.count(query, Property.class);
        List<Property> properties = mongoTemplate.find(query, Property.class);
        
        return new PageImpl<>(properties, PageRequest.of(page, size), total);
    }
}