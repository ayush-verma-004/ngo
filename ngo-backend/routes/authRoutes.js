const express = require('express');
const router = express.Router();
const { loginUser, registerUser, updateProfile, getAdmins, deleteAdmin, updateAdmin } = require('../controllers/authController');
const { protect, superAdmin } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', protect, superAdmin, registerUser);
router.get('/', protect, superAdmin, getAdmins);
router.put('/profile', protect, updateProfile);
router.put('/:id', protect, superAdmin, updateAdmin);
router.delete('/:id', protect, superAdmin, deleteAdmin);

module.exports = router;
