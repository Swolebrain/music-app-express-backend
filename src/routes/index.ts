import express from 'express';

const router = express.Router();

// Sample route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the music app API' });
});

// Example of how to import and use other route modules
// import userRoutes from './user.routes';
// router.use('/users', userRoutes);

export const routes = router; 