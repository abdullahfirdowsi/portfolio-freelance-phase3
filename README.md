# Abdullah Firdowsi Portfolio

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) stack application designed as a professional portfolio website for a freelance project mentor and developer. It features a public-facing portfolio showcasing projects, pricing, and contact information, along with a secure admin dashboard for managing all content.

## 🚀 Technologies Used

**Frontend:**
*   **React.js**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool for modern web projects.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **Lucide React**: A collection of beautiful, pixel-perfect icons.
*   **React Router DOM**: For declarative routing in React applications.
*   **js-cookie**: For simple cookie manipulation.

**Backend:**
*   **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB**: A NoSQL database for storing data.
*   **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **JWT (JSON Web Tokens)**: For secure authentication.
*   **Bcrypt.js**: For hashing passwords.
*   **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
*   **Dotenv**: For loading environment variables from a `.env` file.
*   **AWS SDK (S3)**: For image storage on Amazon S3.
*   **Multer & Multer-S3**: For handling file uploads, especially to S3.

## ✨ Features

### Public Website
*   **Home Page**: Engaging introduction to services and expertise.
*   **Projects Section**: Showcase of completed projects with details, tech stack, and pricing.
*   **Pricing Section**: Transparent pricing tiers for various services with add-on options.
*   **About Page**: Detailed information about the developer's background, skills, and achievements.
*   **Contact Form**: Allows potential clients to send inquiries directly.
*   **WhatsApp Integration**: Quick contact buttons for instant communication.
*   **Responsive Design**: Optimized for various screen sizes (desktop, tablet, mobile).

### Admin Dashboard
*   **Secure Authentication**: JWT-based login for administrators.
*   **Dashboard Overview**: Centralized view of key metrics and quick actions.
*   **Project Management (CRUD)**:
    *   Create, Read, Update, and Delete portfolio projects.
    *   Upload project images directly to AWS S3.
    *   Manage project details, tech stack, features, and pricing.
*   **Pricing Management (CRUD)**:
    *   Create, Read, Update, and Delete pricing tiers.
    *   Manage tier names, prices, descriptions, features, and mark as "popular".
*   **Contact Message Management**:
    *   View and delete client inquiries submitted via the contact form.
    *   Access contact details and message content.
    *   Quick actions to reply via email or WhatsApp.
*   **Analytics**:
    *   Overview of total projects, pricing tiers, and contact messages.
    *   Total project views.
    *   Breakdown of contact messages by type, status, and priority.
    *   Project distribution by category.
    *   Contact growth trends.

## 🛠️ Setup Instructions

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd portfolio-freelance
```

### 2. Backend Setup

Navigate to the `backend` directory, install dependencies, and configure environment variables.

```bash
cd backend
npm install
```

#### Environment Variables (`backend/.env`)

Create a `.env` file in the `backend` directory by copying `.env.example` and filling in your details:

```bash
cp .env.example .env
```

Edit the `.env` file with your specific configurations:

```
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
AWS_REGION=ap-south-1 # e.g., ap-south-1, us-east-1
S3_BUCKET_NAME=your_s3_bucket_name_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Admin Credentials (for initial setup - used by the backend to create the first admin user if needed)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_admin_password_here
```

#### External Services Configuration

*   **MongoDB Atlas**:
    1.  Create an account at [MongoDB Atlas](https://www.mongodb.com/atlas).
    2.  Set up a new cluster.
    3.  Obtain your connection string and update `MONGO_URI` in your `backend/.env` file.
*   **AWS S3 (for image uploads)**:
    1.  Create an AWS account.
    2.  Create an S3 bucket (e.g., in `ap-south-1` region).
    3.  Create an IAM user with programmatic access and S3 permissions (e.g., `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`).
    4.  Update `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, and `S3_BUCKET_NAME` in your `backend/.env` file.

#### Run Backend Development Server

```bash
npm run dev
```

The backend server will start on `http://localhost:5000` (or your specified `PORT`).

### 3. Frontend Setup

Open a new terminal, navigate to the project root (where `package.json` for the frontend is), install dependencies, and configure environment variables.

```bash
cd .. # If you are still in the backend directory
npm install
```

#### Environment Variables (`.env`)

Create a `.env` file in the project root (frontend directory) by copying `.env.example` and filling in your details:

```bash
cp .env.example .env
```

Edit the `.env` file with your specific configurations:

```
VITE_API_BASE_URL=http://localhost:5000/api
```
**Note**: Ensure `VITE_API_BASE_URL` matches your backend server's address and port.

#### Run Frontend Development Server

```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 👨‍💻 How to Use

### Public Website
Open your browser and navigate to `http://localhost:5173`. You can explore the Home, Projects, Pricing, About, and Contact sections.

### Admin Dashboard
1.  Navigate to the admin login page: `http://localhost:5173/admin/login`
2.  Use the following demo credentials to log in:
    *   **Email**: `admin@example.com`
    *   **Password**: `admin123`
3.  Once logged in, you will be redirected to the admin dashboard where you can manage projects, pricing tiers, and contact messages.

## 🌐 API Endpoints

### Public Routes
*   `GET /api/projects` - Get all projects
*   `GET /api/pricing` - Get pricing tiers
*   `POST /api/contact` - Submit contact form

### Admin Routes (JWT Protected)
*   `POST /api/auth/login` - Admin login
*   `GET /api/admin/dashboard-stats` - Get dashboard analytics and statistics
*   `POST /api/admin/upload` - Upload image to S3
*   `POST /api/admin/projects` - Create project
*   `PUT /api/admin/projects/:id` - Update project
*   `DELETE /api/admin/projects/:id` - Delete project
*   `POST /api/admin/pricing` - Create pricing tier
*   `PUT /api/admin/pricing/:id` - Update pricing tier
*   `DELETE /api/admin/pricing/:id` - Delete pricing tier
*   `GET /api/admin/contacts` - Get all contact submissions
*   `GET /api/admin/contacts/:id` - Get a single contact submission by ID
*   `DELETE /api/admin/contacts/:id` - Delete a contact submission

## 🚀 Deployment

This application is structured for easy deployment:

*   **Frontend**: Can be deployed to static site hosting services like [Netlify](https://www.netlify.com/), Vercel, or GitHub Pages.
*   **Backend**: Can be deployed to cloud platforms like [Render](https://render.com/), Vercel (for serverless functions), AWS EC2/Lambda, or Heroku. Ensure your `MONGO_URI`, `JWT_SECRET`, AWS credentials, and `FRONTEND_URL` (for CORS) are correctly configured in the production environment variables.