import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers); 

// Test protected route
router.get('/user/profile', protect, (req, res) => {
  res.json({ message: 'User Profile', user: req.user });
});

// Admin-only route
router.get('/admin/dashboard', protect, authorizeRoles('admin'), (req, res) => {
  res.json({
    message: 'Welcome to Admin Dashboard',
    user: req.user,
  });
});


export default router;
