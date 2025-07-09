
--- Create DB and select it
CREATE DATABASE IF NOT EXISTS agrosaarthi;
USE agrosaarthi;

-- ===============================
-- 1. USERS (Profiles)
-- ===============================
DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20)
);

-- ===============================
-- 2. CROP SCANS
-- ===============================
DROP TABLE IF EXISTS crop_scans;

CREATE TABLE crop_scans (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  crop_type VARCHAR(50) NOT NULL,
  upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  field_location VARCHAR(100),
  field_name VARCHAR(100),
  image_url TEXT NOT NULL,
  disease_detected VARCHAR(100),
  ai_result TEXT NOT NULL,
  confidence_score INT CHECK (confidence_score BETWEEN 0 AND 100),
  is_healthy BOOLEAN DEFAULT FALSE,
  risk_level ENUM('Low', 'Medium', 'High') DEFAULT 'Low',
  recommendations TEXT,
  action_taken TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);

-- ===============================
-- 3. AI PREDICTIONS
-- ===============================
DROP TABLE IF EXISTS ai_predictions;

CREATE TABLE ai_predictions (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  scan_id CHAR(36) UNIQUE NOT NULL,
  predicted_disease VARCHAR(100) NOT NULL,
  risk_level ENUM('Low', 'Medium', 'High') NOT NULL,
  expected_date DATE,
  preventive_action TEXT,
  confidence_score INT CHECK (confidence_score BETWEEN 0 AND 100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (scan_id) REFERENCES crop_scans(id) ON DELETE CASCADE
);

-- ===============================
-- 4. WEATHER FORECASTS
-- ===============================
DROP TABLE IF EXISTS weather_forecasts;

CREATE TABLE weather_forecasts (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  location VARCHAR(100) NOT NULL,
  pin_code VARCHAR(10),
  date DATE NOT NULL,
  weather_summary TEXT,
  high_temp DECIMAL(5,2),
  low_temp DECIMAL(5,2),
  humidity INT CHECK (humidity BETWEEN 0 AND 100),
  rainfall DECIMAL(5,2) DEFAULT 0,
  wind_speed DECIMAL(5,2),
  risk_level ENUM('Low', 'Medium', 'High') DEFAULT 'Low',
  disease_risk_factors TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_forecast (user_id, location, date),
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);

-- ===============================
-- 5. COMMUNITY POSTS
-- ===============================
DROP TABLE IF EXISTS community_posts;

CREATE TABLE community_posts (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category ENUM('general', 'disease', 'weather', 'tips', 'marketplace') DEFAULT 'general',
  image_url TEXT,
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);

-- ===============================
-- 6. COMMUNITY COMMENTS
-- ===============================
DROP TABLE IF EXISTS community_comments;

CREATE TABLE community_comments (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  post_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  content TEXT NOT NULL,
  parent_comment_id CHAR(36),
  likes_count INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES profiles(id),
  FOREIGN KEY (parent_comment_id) REFERENCES community_comments(id) ON DELETE CASCADE
);

-- ===============================
-- 7. ANALYTICS SUMMARY
-- ===============================
DROP TABLE IF EXISTS analytics_summary;

CREATE TABLE analytics_summary (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  total_scans INT DEFAULT 0,
  diseases_detected INT DEFAULT 0,
  healthy_scans INT DEFAULT 0,
  field_health_score DECIMAL(5,2) CHECK (field_health_score BETWEEN 0 AND 100),
  most_common_disease VARCHAR(100),
  risk_trend ENUM('Improving', 'Stable', 'Declining'),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_analytics (user_id, week_start),
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);

-- ===============================
-- 8. DISEASE ALERTS
-- ===============================
DROP TABLE IF EXISTS disease_alerts;

CREATE TABLE disease_alerts (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  location VARCHAR(100) NOT NULL,
  disease_name VARCHAR(100) NOT NULL,
  severity ENUM('Low', 'Medium', 'High', 'Critical'),
  alert_date DATE NOT NULL,
  description TEXT,
  recommended_actions TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id)
);


