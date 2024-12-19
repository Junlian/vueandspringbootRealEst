package com.example.realestate.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;

@Data
public class PropertyDTO {
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @NotBlank(message = "Image URL is required")
    private String imageUrl;
    
    private List<String> features;
    
    @NotBlank(message = "Type is required")
    private String type;
}