const Content = require('../models/Content');

// @desc    Get content by key
// @route   GET /api/content/:key
// @access  Public
const getContent = async (req, res) => {
    try {
        const content = await Content.findOne({ key: req.params.key });
        if (content) {
            res.status(200).json(content.data);
        } else {
            // Return empty object or specific default if not found, rather than 404 for convenience
            res.status(200).json({});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update content by key
// @route   POST /api/content/:key
// @access  Private (Admin)
const updateContent = async (req, res) => {
    try {
        const { key } = req.params;
        const { data } = req.body;

        const content = await Content.findOneAndUpdate(
            { key },
            { data },
            { new: true, upsert: true } // Create if not exists
        );

        res.status(200).json(content.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getContent, updateContent };
