const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'real_estate';

async function setupDatabase() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);

        // Drop existing collection
        try {
            await db.collection('properties').drop();
            console.log('Dropped existing properties collection');
        } catch (e) {
            console.log('No existing properties collection to drop');
        }

        // Create collection with schema validation
        await db.createCollection('properties', {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["title", "description", "price", "location", "imageUrl", "type"],
                    properties: {
                        title: {
                            bsonType: "string"
                        },
                        description: {
                            bsonType: "string"
                        },
                        price: {
                            bsonType: ["double", "int"]
                        },
                        location: {
                            bsonType: "string"
                        },
                        imageUrl: {
                            bsonType: "string"
                        },
                        features: {
                            bsonType: "array",
                            items: {
                                bsonType: "string"
                            }
                        },
                        type: {
                            enum: ["sale", "rent"]
                        }
                    }
                }
            }
        });

        // Sample properties data
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
            }
        ];

        // Insert sample data
        const result = await db.collection('properties').insertMany(sampleProperties);
        console.log(`Inserted ${result.insertedCount} properties`);

        // Create indexes
        await db.collection('properties').createIndex({ location: "text" });
        await db.collection('properties').createIndex({ price: 1 });
        await db.collection('properties').createIndex({ type: 1 });
        console.log('Created indexes');

        console.log('Database setup completed successfully!');
    } catch (err) {
        console.error('Error setting up database:', err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

setupDatabase(); 