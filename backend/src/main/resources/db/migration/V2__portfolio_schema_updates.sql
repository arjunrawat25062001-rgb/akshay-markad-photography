-- Add new columns for enhanced portfolio items and images
ALTER TABLE portfolio_items
  ADD COLUMN IF NOT EXISTS story TEXT,
  ADD COLUMN IF NOT EXISTS location VARCHAR(255),
  ADD COLUMN IF NOT EXISTS camera VARCHAR(255),
  ADD COLUMN IF NOT EXISTS lens VARCHAR(255),
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS tags VARCHAR(1000),
  ADD COLUMN IF NOT EXISTS cover_image_url VARCHAR(1000),
  ADD COLUMN IF NOT EXISTS created_at_ts TIMESTAMP DEFAULT now();

ALTER TABLE portfolio_images
  ADD COLUMN IF NOT EXISTS public_id VARCHAR(500),
  ADD COLUMN IF NOT EXISTS width INTEGER,
  ADD COLUMN IF NOT EXISTS height INTEGER;

-- Refresh tokens table
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id BIGSERIAL PRIMARY KEY,
  token VARCHAR(500) UNIQUE NOT NULL,
  expiry_date TIMESTAMP NOT NULL,
  user_id BIGINT
);

-- Ensure FK constraints where appropriate (optional)
ALTER TABLE IF EXISTS portfolio_items ADD CONSTRAINT IF NOT EXISTS fk_portfolio_items_category FOREIGN KEY (category_id) REFERENCES portfolio_categories(id);
ALTER TABLE IF EXISTS portfolio_images ADD CONSTRAINT IF NOT EXISTS fk_portfolio_images_item FOREIGN KEY (portfolio_item_id) REFERENCES portfolio_items(id);
ALTER TABLE IF EXISTS refresh_tokens ADD CONSTRAINT IF NOT EXISTS fk_refresh_tokens_user FOREIGN KEY (user_id) REFERENCES users(id);
