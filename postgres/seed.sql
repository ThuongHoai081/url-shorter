-- ========================================
-- Seed users with username and hashed password
-- Passwords are hashed; original password in comment
-- ========================================
INSERT INTO users (id, "firstName", "lastName", "email", "username", "password", "createdAt", "updatedAt")
VALUES
    (1, 'Alice', 'Nguyen', 'alice@example.com', 'alice', '$2b$10$7f6qfE9tIYbW0hFzS4b1He7Nnq1Jf2E9YZ3tC5l8qfMvHZqGj1A6C', NOW(), NOW()), -- password: 123456
    (2, 'Bob', 'Tran', 'bob@example.com', 'bob', '$2b$10$F3j1kB5lHq9vU2pTz1nWdeK1Hf4Xc7M6Qp9LrA8oKfR1v5NwT2y6m', NOW(), NOW()), -- password: 123456
    (3, 'Charlie', 'Le', 'charlie@example.com', 'charlie', '$2b$10$Y2rT8mG7sUq9Lk3hJf1NeD5pVx2Qw7Z9Mn4HrS6tE1Gv5PbC3o8Zq', NOW(), NOW()), -- password: 123456
    (4, 'David', 'Pham', 'david@example.com', 'david', '$2b$10$Q1wE2rT3yU4iO5pA6sD7fG8hJ9kL0zX1cV2bN3mO4pQ5rS6tU7vW', NOW(), NOW()), -- password: 123456
    (5, 'Eva', 'Hoang', 'eva@example.com', 'eva', '$2b$10$L9mN8bV7cX6zA5sD4fG3hJ2kL1oP0qR9tS8uV7wX6yY5zZ4aB3cD', NOW(), NOW()), -- password: 123456
    (6, 'Frank', 'Vu', 'frank@example.com', 'frank', '$2b$10$P4oL3kJ2hG1fD0sA9wE8rT7yU6iO5pA4sD3fG2hJ1kL0qR9tS8uV', NOW(), NOW()), -- password: 123456
    (7, 'Grace', 'Do', 'grace@example.com', 'grace', '$2b$10$M1nO2pQ3rS4tU5vW6xY7zA8bC9dE0fG1hJ2kL3mN4oP5qR6sT7uV', NOW(), NOW()), -- password: 123456
    (8, 'Henry', 'Ngo', 'henry@example.com', 'henry', '$2b$10$Z9yX8wV7uT6sR5qP4oN3mL2kJ1hG0fD9sA8rT7yU6iO5pA4sD3fG', NOW(), NOW()), -- password: 123456
    (9, 'Isabel', 'Ly', 'isabel@example.com', 'isabel', '$2b$10$B2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ', NOW(), NOW()), -- password: 123456
    (10, 'Jack', 'Bui', 'jack@example.com', 'jack', '$2b$10$H1iJ2kL3mN4oP5qR6sT7uV8wX9yZ0aB1cD2eF3gH4iJ5kL6mN7oP', NOW(), NOW()) -- password: 123456
ON CONFLICT (id) DO NOTHING;
alter table urls alter column "domainId" drop not null;

-- ========================================
-- Seed urls (domainId để NULL trước)
-- ========================================
INSERT INTO urls (id, "originalUrl", "shortCode", "userId", "domainId", "visitCount", "createdAt", "updatedAt")
VALUES
    (1, 'https://google.com/search?q=nestjs', 'ggl111', 1, NULL, 123, NOW(), NOW()),
    (2, 'https://google.com/maps/place/hanoi', 'ggl222', 2, NULL, 56, NOW(), NOW()),
    (3, 'https://facebook.com/groups/dev', 'fbk333', 3, NULL, 78, NOW(), NOW()),
    (4, 'https://facebook.com/alice.nguyen', 'fbk444', 4, NULL, 34, NOW(), NOW()),
    (5, 'https://youtube.com/watch?v=abc123', 'ytb555', 5, NULL, 210, NOW(), NOW()),
    (6, 'https://youtube.com/shorts/xyz789', 'ytb666', 6, NULL, 92, NOW(), NOW()),
    (7, 'https://github.com/typeorm/typeorm', 'git777', 7, NULL, 15, NOW(), NOW()),
    (8, 'https://github.com/nestjs/nest', 'git888', 8, NULL, 45, NOW(), NOW()),
    (9, 'https://twitter.com/nestframework', 'twt999', 9, NULL, 67, NOW(), NOW()),
    (10, 'https://twitter.com/nodejs', 'twt101', 10, NULL, 12, NOW(), NOW()),
    (11, 'https://linkedin.com/in/alice-nguyen', 'lnk202', 1, NULL, 5, NOW(), NOW()),
    (12, 'https://linkedin.com/in/bob-tran', 'lnk303', 2, NULL, 19, NOW(), NOW()),
    (13, 'https://medium.com/@charlie-le', 'med404', 3, NULL, 8, NOW(), NOW()),
    (14, 'https://dev.to/david-pham', 'dev505', 4, NULL, 11, NOW(), NOW()),
    (15, 'https://stackoverflow.com/questions/12345', 'sof606', 5, NULL, 37, NOW(), NOW()),
    (16, 'https://stackoverflow.com/questions/67890', 'sof707', 6, NULL, 22, NOW(), NOW()),
    (17, 'https://reddit.com/r/programming', 'red808', 7, NULL, 99, NOW(), NOW()),
    (18, 'https://reddit.com/r/javascript', 'red909', 8, NULL, 66, NOW(), NOW()),
    (19, 'https://news.ycombinator.com/item?id=123', 'hnn111', 9, NULL, 41, NOW(), NOW()),
    (20, 'https://news.ycombinator.com/item?id=456', 'hnn222', 10, NULL, 17, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- Extract unique domains from urls
-- (PostgreSQL)
-- ========================================
INSERT INTO domains (name, "description", "createdAt", "updatedAt")
SELECT DISTINCT
    regexp_replace(regexp_replace("originalUrl", '^https?://', ''), '/.*$', '') AS domain,
    'Extracted domain',
    NOW(),
    NOW()
FROM urls
ON CONFLICT (name) DO NOTHING;

-- ========================================
-- Update urls.domainId để match domains
-- (PostgreSQL)
-- ========================================
UPDATE urls u
SET "domainId"  = d.id
FROM domains d
WHERE u."originalUrl"  LIKE '%' || d.name || '%';

alter table urls alter column "domainId" set not null;

