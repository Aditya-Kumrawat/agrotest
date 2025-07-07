-- Enable Row Level Security
-- Create users table if it doesn't exist
-- Note: Removed incorrect 'ALTER DATABASE postgres SET "app.jwt_secret" ...' line from here.
-- JWT secrets are managed in Supabase project settings.

CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own data
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Create policy for users to insert their own data
CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policy for users to update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create crop_scans table
CREATE TABLE IF NOT EXISTS public.crop_scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  -- Fields used in server/routes/crops.ts
  crop_type VARCHAR(255),
  location TEXT,
  field_name VARCHAR(255),
  ai_result TEXT,                 -- Corresponds to disease_name or the result of AI
  confidence_score DECIMAL(5,2),  -- Corresponds to confidence
  is_healthy BOOLEAN,
  recommendations TEXT,           -- Corresponds to treatment_recommendation
  action_taken TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  -- Original fields (disease_name, confidence, treatment_recommendation) are now covered by the fields above.
  -- If there was a distinct purpose, they could be added back or the new fields adjusted.
  -- For now, this matches the code's usage.
);

-- Enable RLS on crop_scans
ALTER TABLE public.crop_scans ENABLE ROW LEVEL SECURITY;

-- Create policies for crop_scans
CREATE POLICY "Users can view own scans" ON public.crop_scans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scans" ON public.crop_scans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create community_posts table
CREATE TABLE IF NOT EXISTS public.community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category VARCHAR(255), -- Added category field
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on community_posts
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for community_posts
CREATE POLICY "Anyone can view posts" ON public.community_posts
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own posts" ON public.community_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON public.community_posts
  FOR UPDATE USING (auth.uid() = user_id);

-- Create community_comments table
CREATE TABLE IF NOT EXISTS public.community_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on community_comments
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for community_comments
CREATE POLICY "Anyone can view comments" ON public.community_comments
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own comments" ON public.community_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for crop images
INSERT INTO storage.buckets (id, name, public) VALUES ('crop-images', 'crop-images', true);

-- Create storage policies
CREATE POLICY "Users can upload crop images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'crop-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view crop images" ON storage.objects
  FOR SELECT USING (bucket_id = 'crop-images');

CREATE POLICY "Users can delete own crop images" ON storage.objects
  FOR DELETE USING (bucket_id = 'crop-images' AND auth.uid()::text = (storage.foldername(name))[1]);