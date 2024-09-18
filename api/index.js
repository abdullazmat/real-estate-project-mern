import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from "./routes/user.route.js";

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


app.use("/api/user", UserRouter)