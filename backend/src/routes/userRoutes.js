const express = require('express');
const { registerUser, loginUser, getUserData, updateUserData } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserData);
router.put('/update', authenticateToken, updateUserData);

module.exports = router;
