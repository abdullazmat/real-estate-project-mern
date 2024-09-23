import express from 'express';
import { test } from '../controllers/user.controller.js';

const UserRouter  = express.Router();

// Define your routes
UserRouter.get('/test', test);

// Export the router
export default UserRouter;
