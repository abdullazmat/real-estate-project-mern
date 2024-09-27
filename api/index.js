import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import UserRouter from "./routes/user.route.js";
import Authrouter from './routes/auth.route.js';  

dotenv.config();  // Load environment variables from .env file

const mongoURI = process.env.MONGO;
if (!mongoURI) {
  console.error('MONGO environment variable is not set');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your React app
}));

// Middleware to use JSON
app.use(express.json());

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

// Add routes
app.use("/api/user", UserRouter);
app.use("/api/auth", Authrouter);


// Middle Ware Error Handling
app.use((err, req, res, next) => {

   const statuscode = err.statuscode || 500;
   const message = err.message || 'Internal Server Error'
   return res.status(statuscode).json({
    success : false,
    statuscode, 
    message
   });
});