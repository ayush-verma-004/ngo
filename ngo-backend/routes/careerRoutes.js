const express = require('express');
const router = express.Router();
const { getCareers, addCareer, updateCareer, deleteCareer } = require('../controllers/careerController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

router.route('/')
    .get(getCareers)
    .post(protect, checkPermission('manage_careers'), addCareer);

router.route('/:id')
    .put(protect, checkPermission('manage_careers'), updateCareer)
    .delete(protect, checkPermission('manage_careers'), deleteCareer);

module.exports = router;
