const express = require('express');
const router = express.Router();
const { getTeam, addTeamMember, deleteTeamMember } = require('../controllers/teamController');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/')
    .get(getTeam)
    .post(protect, checkPermission('manage_team'), upload.single('image'), addTeamMember);

router.route('/:id')
    .delete(protect, checkPermission('manage_team'), deleteTeamMember);

module.exports = router;
