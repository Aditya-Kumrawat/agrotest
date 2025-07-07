
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- ==========================================
-- 1. USERS (Profiles) - Enhanced
-- ==========================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  location TEXT,
  pin_code VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 2. CROP SCANS - Enhanced
-- ==========================================
CREATE TABLE crop_scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  crop_type TEXT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  field_location TEXT,
  field_name TEXT,
  image_url TEXT NOT NULL,
  disease_detected TEXT,
  ai_result TEXT NOT NULL,
  confidence_score INTEGER NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 100),
  is_healthy BOOLEAN DEFAULT FALSE,
  risk_level TEXT CHECK (risk_level IN ('Low', 'Medium', 'High')) DEFAULT 'Low',
  recommendations TEXT[],
  action_taken TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 3. AI PREDICTIONS - New table
-- ==========================================
CREATE TABLE ai_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  scan_id UUID REFERENCES crop_scans(id) ON DELETE CASCADE UNIQUE,
  predicted_disease TEXT NOT NULL,
  risk_level TEXT CHECK (risk_level IN ('Low', 'Medium', 'High')) NOT NULL,
  expected_date DATE,
  preventive_action TEXT[],
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 4. WEATHER FORECASTS - New table
-- ==========================================
CREATE TABLE weather_forecasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  location TEXT NOT NULL,
  pin_code VARCHAR(10),
  date DATE NOT NULL,
  weather_summary TEXT,
  high_temp DECIMAL(5,2),
  low_temp DECIMAL(5,2),
  humidity INTEGER CHECK (humidity >= 0 AND humidity <= 100),
  rainfall DECIMAL(5,2) DEFAULT 0,
  wind_speed DECIMAL(5,2),
  risk_level TEXT CHECK (risk_level IN ('Low', 'Medium', 'High')) DEFAULT 'Low',
  disease_risk_factors TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, location, date)
);

-- ==========================================
-- 5. COMMUNITY POSTS - Enhanced
-- ==========================================
CREATE TABLE community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general' CHECK (category IN ('general', 'disease', 'weather', 'tips', 'marketplace')),
  image_url TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 6. COMMUNITY COMMENTS - Enhanced
-- ==========================================
CREATE TABLE community_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  parent_comment_id UUID REFERENCES community_comments(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 7. ANALYTICS SUMMARY - New table
-- ==========================================
CREATE TABLE analytics_summary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  total_scans INTEGER DEFAULT 0,
  diseases_detected INTEGER DEFAULT 0,
  healthy_scans INTEGER DEFAULT 0,
  field_health_score DECIMAL(5,2) CHECK (field_health_score >= 0 AND field_health_score <= 100),
  most_common_disease TEXT,
  risk_trend TEXT CHECK (risk_trend IN ('Improving', 'Stable', 'Declining')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, week_start)
);

-- ==========================================
-- 8. DISEASE ALERTS - Additional table
-- ==========================================
CREATE TABLE disease_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  location TEXT NOT NULL,
  disease_name TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
  alert_date DATE NOT NULL,
  description TEXT,
  recommended_actions TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================

-- User-related indexes
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_location ON profiles(location);

-- Crop scans indexes
CREATE INDEX idx_crop_scans_user_id ON crop_scans(user_id);
CREATE INDEX idx_crop_scans_upload_date ON crop_scans(upload_date DESC);
CREATE INDEX idx_crop_scans_crop_type ON crop_scans(crop_type);
CREATE INDEX idx_crop_scans_disease ON crop_scans(disease_detected);
CREATE INDEX idx_crop_scans_risk_level ON crop_scans(risk_level);

-- Weather forecasts indexes
CREATE INDEX idx_weather_user_location ON weather_forecasts(user_id, location);
CREATE INDEX idx_weather_date ON weather_forecasts(date DESC);

-- Community indexes
CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX idx_community_posts_category ON community_posts(category);
CREATE INDEX idx_community_comments_post_id ON community_comments(post_id);
CREATE INDEX idx_community_comments_user_id ON community_comments(user_id);

-- Analytics indexes
CREATE INDEX idx_analytics_user_week ON analytics_summary(user_id, week_start DESC);

-- ==========================================
-- ROW LEVEL SECURITY POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE disease_alerts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Crop scans policies
CREATE POLICY "Users can view own scans" ON crop_scans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scans" ON crop_scans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scans" ON crop_scans
  FOR UPDATE USING (auth.uid() = user_id);

-- AI predictions policies
CREATE POLICY "Users can view own predictions" ON ai_predictions
  FOR SELECT USING (auth.uid() = (SELECT user_id FROM crop_scans WHERE id = scan_id));

CREATE POLICY "Users can insert own predictions" ON ai_predictions
  FOR INSERT WITH CHECK (auth.uid() = (SELECT user_id FROM crop_scans WHERE id = scan_id));

-- Weather forecasts policies
CREATE POLICY "Users can view own forecasts" ON weather_forecasts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own forecasts" ON weather_forecasts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Community posts policies
CREATE POLICY "Anyone can view posts" ON community_posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts" ON community_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own posts" ON community_posts
  FOR UPDATE USING (auth.uid() = user_id);

-- Community comments policies
CREATE POLICY "Anyone can view comments" ON community_comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON community_comments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own comments" ON community_comments
  FOR UPDATE USING (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "Users can view own analytics" ON analytics_summary
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics" ON analytics_summary
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Disease alerts policies
CREATE POLICY "Users can view own alerts" ON disease_alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own alerts" ON disease_alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- STORAGE BUCKET SETUP
-- ==========================================

-- Create storage bucket for crop images
INSERT INTO storage.buckets (id, name, public) VALUES ('crop-images', 'crop-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view crop images" ON storage.objects
  FOR SELECT USING (bucket_id = 'crop-images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'crop-images' AND auth.role() = 'authenticated');

-- ==========================================
-- FUNCTIONS AND TRIGGERS
-- ==========================================

-- Function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email, phone)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), 
    NEW.email,
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update community post comment count
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts 
    SET comments_count = comments_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for comment count updates
CREATE TRIGGER update_comment_count_trigger
  AFTER INSERT OR DELETE ON community_comments
  FOR EACH ROW EXECUTE FUNCTION update_post_comment_count();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crop_scans_updated_at BEFORE UPDATE ON crop_scans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON community_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_comments_updated_at BEFORE UPDATE ON community_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
