package com.example.realestate.dto;

import lombok.Data;

@Data
public class SearchCriteriaDTO {
    private Double minPrice;
    private Double maxPrice;
    private String location;
    private String type;
    private Integer page;
    private Integer size;
    private String sortBy;
    private String sortDirection;
}