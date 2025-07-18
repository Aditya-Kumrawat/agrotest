
-- CREATE DATABASE IF NOT EXISTS agrosaarthi;
-- USE agrosaarthi;
--
-- DROP TABLE IF EXISTS profiles;
-- CREATE TABLE profiles (
--   id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--   name VARCHAR(255) NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   phone VARCHAR(20)
-- );
--
-- DROP TABLE IF EXISTS crop_scans;
-- CREATE TABLE crop_scans (
--   id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--   user_id CHAR(36) NOT NULL,
--   crop_type VARCHAR(50) NOT NULL,
--   upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
--   field_location VARCHAR(100),
--   field_name VARCHAR(100),
--   image_url TEXT NOT NULL,
--   disease_detected VARCHAR(100),
--   ai_result TEXT NOT NULL,
--   confidence_score INT CHECK (confidence_score BETWEEN 0 AND 100),
--   is_healthy BOOLEAN DEFAULT FALSE,
--   risk_level ENUM('Low', 'Medium', 'High') DEFAULT 'Low',
--   recommendations TEXT,
--   action_taken TEXT,
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES profiles(id)
-- );
--
-- DROP TABLE IF EXISTS ai_predictions;
-- CREATE TABLE ai_predictions (
--   id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
--   scan_id CHAR(36) UNIQUE NOT NULL,
--   predicted_disease VARCHAR(100) NOT NULL,
--   risk_level ENUM('Low', 'Medium', 'High') NOT NULL,
--   expected_date DATE,
--   preventive_action TEXT,
--   confidence_score INT CHECK (confidence_score BETWEEN 0 AND 100),
--   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (scan_id) REFERENCES crop_scans(id) ON DELETE CASCADE
-- );
--
-- (Commented out all MySQL schema definitions)


