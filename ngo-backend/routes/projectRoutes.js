const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/')
    .get(getProjects)
    .post(protect, checkPermission('manage_projects'), upload.single('image'), createProject);

router.route('/:id')
    .put(protect, checkPermission('manage_projects'), upload.single('image'), updateProject)
    .delete(protect, checkPermission('manage_projects'), deleteProject);

module.exports = router;
