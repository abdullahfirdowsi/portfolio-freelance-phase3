```javascript
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // Import the database connection

dotenv.config(); // Load environment variables

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Backend is healthy' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```