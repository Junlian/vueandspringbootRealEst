-- Drop database if exists and create new one
DROP DATABASE IF EXISTS real_estate;
CREATE DATABASE real_estate;
USE real_estate;

-- Create users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create favorite_properties table (for many-to-many relationship)
CREATE TABLE favorite_properties (
    user_id BIGINT NOT NULL,
    property_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, property_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample users (passwords are hashed - these are examples)
INSERT INTO users (email, password) VALUES
('john.doe@example.com', '$2a$10$xPJ5sYwZNrHJ7Qz6CJX7EOzxzQHjk9LlZxEKQMhLx.TUc1xNCeNK2'),
('jane.smith@example.com', '$2a$10$5DgqK8LYC1XZhB1LD8XDOe9D.QE1yQn.mwqy6iQhqEO0K.qH7h2Zy'),
('bob.wilson@example.com', '$2a$10$8KzQ9xkYZ2L5VQH9PxYCZe.P.JqF9FHJZJYd.CCn1oXrsFUYPHKRi');

-- Insert sample favorite properties
INSERT INTO favorite_properties (user_id, property_id) VALUES
(1, '1'),  -- John likes property 1
(1, '2'),  -- John likes property 2
(2, '2'),  -- Jane likes property 2
(3, '3');  -- Bob likes property 3

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_favorites_user ON favorite_properties(user_id);
CREATE INDEX idx_favorites_property ON favorite_properties(property_id); 