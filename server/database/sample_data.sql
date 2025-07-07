
-- ==========================================
-- SAMPLE DATA FOR TESTING
-- ==========================================

-- Note: Run this after creating a user through Supabase Auth
-- Replace the UUID with actual user IDs from auth.users table

-- Sample weather forecasts
INSERT INTO weather_forecasts (user_id, location, pin_code, date, weather_summary, high_temp, low_temp, humidity, rainfall, risk_level) VALUES
('00000000-0000-0000-0000-000000000001', 'Pune, Maharashtra', '411001', CURRENT_DATE, 'Partly cloudy with high humidity', 32.5, 22.0, 85, 2.5, 'Medium'),
('00000000-0000-0000-0000-000000000001', 'Pune, Maharashtra', '411001', CURRENT_DATE + 1, 'Heavy rain expected', 28.0, 20.0, 95, 15.0, 'High'),
('00000000-0000-0000-0000-000000000001', 'Pune, Maharashtra', '411001', CURRENT_DATE + 2, 'Clear skies', 35.0, 25.0, 60, 0.0, 'Low');

-- Sample crop scans
INSERT INTO crop_scans (user_id, crop_type, field_location, field_name, image_url, disease_detected, ai_result, confidence_score, is_healthy, risk_level, recommendations, action_taken) VALUES
('00000000-0000-0000-0000-000000000001', 'Tomato', 'North Field', 'Field A1', 'https://example.com/tomato1.jpg', 'Late Blight', 'Disease detected with high confidence', 92, false, 'High', ARRAY['Apply fungicide', 'Improve drainage', 'Remove affected plants'], 'Applied copper-based fungicide'),
('00000000-0000-0000-0000-000000000001', 'Wheat', 'South Field', 'Field B2', 'https://example.com/wheat1.jpg', null, 'Healthy crop detected', 95, true, 'Low', ARRAY['Continue regular monitoring', 'Maintain current care routine'], 'Continued monitoring'),
('00000000-0000-0000-0000-000000000001', 'Rice', 'East Field', 'Field C1', 'https://example.com/rice1.jpg', 'Blast Disease', 'Fungal infection detected', 88, false, 'Medium', ARRAY['Apply systemic fungicide', 'Reduce nitrogen fertilizer'], 'Reduced irrigation frequency');

-- Sample AI predictions
INSERT INTO ai_predictions (scan_id, predicted_disease, risk_level, expected_date, preventive_action, confidence_score) VALUES
((SELECT id FROM crop_scans WHERE crop_type = 'Tomato' LIMIT 1), 'Late Blight', 'High', CURRENT_DATE + 7, ARRAY['Preventive fungicide spray', 'Monitor weather conditions'], 85),
((SELECT id FROM crop_scans WHERE crop_type = 'Rice' LIMIT 1), 'Blast Disease', 'Medium', CURRENT_DATE + 14, ARRAY['Balanced fertilization', 'Proper field drainage'], 78);

-- Sample community posts
INSERT INTO community_posts (user_id, title, content, category, likes_count, comments_count) VALUES
('00000000-0000-0000-0000-000000000001', 'Best practices for tomato farming in monsoon', 'I''ve been growing tomatoes for 5 years and learned that proper drainage is crucial during monsoon season. Here are my top tips...', 'tips', 15, 8),
('00000000-0000-0000-0000-000000000001', 'Late blight outbreak in my area', 'Has anyone else noticed late blight affecting tomato crops in the Pune region? Looking for effective treatment options.', 'disease', 23, 12),
('00000000-0000-0000-0000-000000000001', 'Organic fertilizer recommendations', 'What are your favorite organic fertilizers for vegetable crops? I''m trying to transition to completely organic farming.', 'general', 31, 18);

-- Sample community comments
INSERT INTO community_comments (post_id, user_id, content, likes_count) VALUES
((SELECT id FROM community_posts WHERE title LIKE '%tomato farming%' LIMIT 1), '00000000-0000-0000-0000-000000000001', 'Great tips! I would also add that using mulch helps retain moisture and prevent soil-borne diseases.', 5),
((SELECT id FROM community_posts WHERE title LIKE '%Late blight%' LIMIT 1), '00000000-0000-0000-0000-000000000001', 'Yes, I''ve seen it too. Copper-based fungicides work well, but make sure to apply before symptoms appear.', 8),
((SELECT id FROM community_posts WHERE title LIKE '%Organic fertilizer%' LIMIT 1), '00000000-0000-0000-0000-000000000001', 'I use vermicompost and neem cake. Both give excellent results for my vegetable garden.', 12);

-- Sample analytics summary
INSERT INTO analytics_summary (user_id, week_start, week_end, total_scans, diseases_detected, healthy_scans, field_health_score, most_common_disease, risk_trend) VALUES
('00000000-0000-0000-0000-000000000001', CURRENT_DATE - 7, CURRENT_DATE, 12, 4, 8, 75.5, 'Late Blight', 'Stable'),
('00000000-0000-0000-0000-000000000001', CURRENT_DATE - 14, CURRENT_DATE - 7, 15, 2, 13, 85.2, 'Powdery Mildew', 'Improving');

-- Sample disease alerts
INSERT INTO disease_alerts (user_id, location, disease_name, severity, alert_date, description, recommended_actions, is_active) VALUES
('00000000-0000-0000-0000-000000000001', 'Pune, Maharashtra', 'Late Blight', 'High', CURRENT_DATE, 'Weather conditions favorable for late blight outbreak in tomato crops', ARRAY['Apply preventive fungicide', 'Improve field drainage', 'Monitor crops daily'], true),
('00000000-0000-0000-0000-000000000001', 'Pune, Maharashtra', 'Aphid Infestation', 'Medium', CURRENT_DATE + 1, 'Aphid population increasing due to warm weather', ARRAY['Use neem oil spray', 'Introduce beneficial insects', 'Monitor weekly'], true);

-- Note: Update the user_id values with actual UUIDs after creating real users
