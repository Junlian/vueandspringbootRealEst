package com.example.realestate.model.mongodb;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "properties")
public class Property {
    @Id
    private String id;
    private String title;
    private String description;
    private Double price;
    private String location;
    private String imageUrl;
    private List<String> features;
    private String type;
}