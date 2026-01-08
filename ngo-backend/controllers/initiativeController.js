const Initiative = require('../models/Initiative');

// @desc    Get all initiatives
// @route   GET /api/initiatives
// @access  Public
const getInitiatives = async (req, res) => {
    try {
        const initiatives = await Initiative.find().sort({ createdAt: -1 });
        res.status(200).json(initiatives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an initiative
// @route   POST /api/initiatives
// @access  Private (Admin)
const createInitiative = async (req, res) => {
    try {
        const { title, description } = req.body;
        let imageUrl = '';

        if (req.file) {
            imageUrl = req.file.path;
        } else if (req.body.image) {
            // Allow direct URL if provided (e.g. from existing unsplash list)
            imageUrl = req.body.image;
        } else {
            return res.status(400).json({ message: 'Image is required' });
        }

        const initiative = await Initiative.create({
            title,
            description,
            image: imageUrl
        });

        res.status(201).json(initiative);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an initiative
// @route   PUT /api/initiatives/:id
// @access  Private (Admin)
const updateInitiative = async (req, res) => {
    try {
        const initiative = await Initiative.findById(req.params.id);

        if (!initiative) {
            return res.status(404).json({ message: 'Initiative not found' });
        }

        if (req.file) {
            initiative.image = req.file.path;
        } else if (req.body.image) {
            initiative.image = req.body.image;
        }

        initiative.title = req.body.title || initiative.title;
        initiative.description = req.body.description || initiative.description;

        const updatedInitiative = await initiative.save();
        res.status(200).json(updatedInitiative);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an initiative
// @route   DELETE /api/initiatives/:id
// @access  Private (Admin)
const deleteInitiative = async (req, res) => {
    try {
        const initiative = await Initiative.findById(req.params.id);

        if (!initiative) {
            return res.status(404).json({ message: 'Initiative not found' });
        }

        await initiative.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Initiative removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getInitiatives,
    createInitiative,
    updateInitiative,
    deleteInitiative
};
