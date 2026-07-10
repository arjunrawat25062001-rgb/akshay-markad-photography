-- Flyway baseline migration: create simple tables
CREATE TABLE IF NOT EXISTS roles (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(500) NOT NULL,
  email VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id BIGINT NOT NULL,
  role_id BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio_categories (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio_items (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  slug VARCHAR(500),
  created_at DATE,
  category_id BIGINT
);

CREATE TABLE IF NOT EXISTS portfolio_images (
  id BIGSERIAL PRIMARY KEY,
  url VARCHAR(1000),
  alt_text VARCHAR(500),
  portfolio_item_id BIGINT
);

CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price NUMERIC
);

CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  booking_date TIMESTAMP,
  service_id BIGINT
);

CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  author VARCHAR(255),
  message TEXT
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  received_at TIMESTAMP
);
