// Connect to MongoDB
const conn = new Mongo();
const db = conn.getDB("real_estate");

// Drop existing collections to start fresh
db.properties.drop();

// Create properties collection with schema validation
db.createCollection("properties", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["title", "description", "price", "location", "imageUrl", "type"],
         properties: {
            title: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            description: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            price: {
               bsonType: "double",
               description: "must be a double and is required"
            },
            location: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            imageUrl: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            features: {
               bsonType: "array",
               items: {
                  bsonType: "string"
               }
            },
            type: {
               enum: ["sale", "rent"],
               description: "must be either 'sale' or 'rent' and is required"
            }
         }
      }
   }
});

// Insert sample properties
const sampleProperties = [
   {
      title: "Modern Downtown Apartment",
      description: "Luxurious 2-bedroom apartment with city views",
      price: 500000.00,
      location: "Downtown Manhattan",
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      features: ["2 Bedrooms", "2 Bathrooms", "Parking", "Gym Access"],
      type: "sale"
   },
   {
      title: "Cozy Studio in Brooklyn",
      description: "Perfect starter home in trendy neighborhood",
      price: 2500.00,
      location: "Brooklyn Heights",
      imageUrl: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9",
      features: ["Studio", "1 Bathroom", "Furnished", "Utilities Included"],
      type: "rent"
   },
   {
      title: "Luxury Waterfront Villa",
      description: "Spectacular 4-bedroom villa with ocean views",
      price: 2500000.00,
      location: "Miami Beach",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      features: ["4 Bedrooms", "5 Bathrooms", "Pool", "Private Beach Access"],
      type: "sale"
   },
   {
      title: "Urban Loft Apartment",
      description: "Industrial-style loft in arts district",
      price: 3200.00,
      location: "SoHo",
      imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
      features: ["1 Bedroom", "2 Bathrooms", "High Ceilings", "Artist Studio"],
      type: "rent"
   },
   {
      title: "Family Home in Suburbs",
      description: "Spacious 5-bedroom house with large backyard",
      price: 850000.00,
      location: "Westchester",
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      features: ["5 Bedrooms", "3 Bathrooms", "Garden", "Garage"],
      type: "sale"
   }
];

// Insert the sample data
db.properties.insertMany(sampleProperties);

// Create indexes for better query performance
db.properties.createIndex({ location: "text" });
db.properties.createIndex({ price: 1 });
db.properties.createIndex({ type: 1 });

// Print confirmation
print("MongoDB setup completed successfully!");
print(`Inserted ${db.properties.count()} properties`); 