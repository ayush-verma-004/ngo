const express = require('express');
const router = express.Router();
const { getGallery, addGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/')
    .get(getGallery)
    .post(protect, checkPermission('manage_gallery'), upload.single('image'), addGalleryItem);

router.route('/:id')
    .delete(protect, checkPermission('manage_gallery'), deleteGalleryItem);

module.exports = router;
