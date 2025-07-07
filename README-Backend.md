
# AgroSaarthi Backend

Complete Node.js + Express backend with Supabase integration for the AgroSaarthi agricultural platform.

## Features

- 🔐 **Authentication**: Email/password signup, login, logout
- 🌱 **Crop Scanning**: Image upload, AI diagnosis, scan history
- 📊 **Dashboard**: Crop count, disease risk, local disease map
- 💬 **Community**: Discussion forum with posts and comments
- 📈 **Analytics**: Disease trends, field health score, weekly data
- 🌤️ **Weather Forecast**: 7-day weather with disease risk prediction
- 💬 **Chatbot**: Rule-based agricultural assistant
- 🔄 **Realtime**: Live updates for dashboard and community

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

### 2. Supabase Setup

1. Create a new Supabase project
2. Run the SQL schema from `server/database/schema.sql` in Supabase SQL Editor
3. Create a storage bucket named `crop-images`
4. Copy your project URL and keys to `.env`

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Crop Management
- `POST /api/crops/scan` - Upload crop image for AI diagnosis
- `GET /api/crops/history` - Get scan history with filters
- `PATCH /api/crops/scan/:id/action` - Update action taken

### Dashboard
- `GET /api/dashboard` - Get dashboard data (crop count, risk level, latest scan)

### Community
- `GET /api/community/posts` - Get all community posts
- `POST /api/community/posts` - Create new post
- `POST /api/community/posts/:id/comments` - Add comment to post

### Analytics
- `GET /api/analytics` - Get analytics data (weekly trends, field health)

### Weather Forecast
- `GET /api/forecast?lat=X&lng=Y` - Get 7-day weather forecast and disease risk

### Chatbot
- `POST /api/chatbot/chat` - Chat with agricultural assistant

## Database Schema

- **profiles**: User profile information
- **crop_scans**: Crop scan records with AI results
- **community_posts**: Community forum posts
- **community_comments**: Comments on community posts

## Storage

- **crop-images**: Bucket for storing uploaded crop images

## Authentication

All endpoints except auth and public community viewing require Bearer token authentication:

```
Authorization: Bearer <supabase_access_token>
```

## Realtime Features

- Live dashboard updates when new scans are added
- Real-time community post notifications
- Automatic disease risk recalculation

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message"
}
```

## Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Community posts are publicly readable
- Image uploads are scoped to authenticated users
