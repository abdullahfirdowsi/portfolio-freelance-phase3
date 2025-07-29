# Abdullah Firdowsi Portfolio - Backend API

This is the backend API for Abdullah Firdowsi's freelance portfolio website.

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your actual values:

```bash
cp .env.example .env
```

### 2. Required External Services

Before running the backend, you need to set up:

#### MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGO_URI` in `.env`

#### AWS S3 (for image uploads)
1. Create AWS account
2. Create S3 bucket in `ap-south-1` region
3. Create IAM user with S3 permissions
4. Update AWS credentials in `.env`

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Public Routes
- `GET /` - Server status
- `GET /api/health` - Health check
- `GET /api/projects` - Get all projects
- `GET /api/pricing` - Get pricing tiers
- `POST /api/contact` - Submit contact form

### Admin Routes (JWT Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard stats
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `POST /api/admin/upload` - Upload image to S3

## Environment Variables Explained

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - AWS region (ap-south-1)
- `S3_BUCKET_NAME` - S3 bucket name
- `FRONTEND_URL` - Frontend URL for CORS
- `ADMIN_EMAIL` - Admin email for initial setup
- `ADMIN_PASSWORD` - Admin password for initial setup