-- ========================================
-- Seed users
-- ========================================
INSERT INTO users (id, "firstName", "lastName", "email", "createdAt", "updatedAt")
VALUES
    (1, 'Alice', 'Nguyen', 'alice@example.com', NOW(), NOW()),
    (2, 'Bob', 'Tran', 'bob@example.com', NOW(), NOW()),
    (3, 'Charlie', 'Le', 'charlie@example.com', NOW(), NOW()),
    (4, 'David', 'Pham', 'david@example.com', NOW(), NOW()),
    (5, 'Eva', 'Hoang', 'eva@example.com', NOW(), NOW()),
    (6, 'Frank', 'Vu', 'frank@example.com', NOW(), NOW()),
    (7, 'Grace', 'Do', 'grace@example.com', NOW(), NOW()),
    (8, 'Henry', 'Ngo', 'henry@example.com', NOW(), NOW()),
    (9, 'Isabel', 'Ly', 'isabel@example.com', NOW(), NOW()),
    (10, 'Jack', 'Bui', 'jack@example.com', NOW(), NOW())
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

