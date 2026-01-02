const TeamMember = require('../models/TeamMember');
const { cloudinary } = require('../config/cloudinary');

const getTeam = async (req, res) => {
    try {
        const team = await TeamMember.find().sort({ createdAt: -1 });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTeamMember = async (req, res) => {
    try {
        const { name, role, bio, socialLinks } = req.body;
        let imageUrl = '';

        if (req.file) {
            imageUrl = req.file.path;
        } else {
            return res.status(400).json({ message: 'Image is required' });
        }

        // socialLinks might come as JSON string from frontend form-data
        let parsedLinks = {};
        if (socialLinks) {
            try {
                parsedLinks = JSON.parse(socialLinks);
            } catch (e) {
                parsedLinks = socialLinks; // Assume it's already an object if not string
            }
        }

        const member = await TeamMember.create({
            name,
            role,
            bio,
            image: imageUrl,
            socialLinks: parsedLinks
        });

        res.status(201).json(member);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        await member.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'Member removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTeam, addTeamMember, deleteTeamMember };
