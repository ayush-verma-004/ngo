const express = require('express');
const router = express.Router();
const { getInitiatives, createInitiative, updateInitiative, deleteInitiative } = require('../controllers/initiativeController');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/')
    .get(getInitiatives)
    .post(protect, checkPermission('manage_content'), upload.single('image'), createInitiative);

router.route('/:id')
    .put(protect, checkPermission('manage_content'), upload.single('image'), updateInitiative)
    .delete(protect, checkPermission('manage_content'), deleteInitiative);

module.exports = router;
