const GalleryItem = require('../models/GalleryItem');
const { cloudinary } = require('../config/cloudinary');

const getGallery = async (req, res) => {
    try {
        const gallery = await GalleryItem.find().sort({ createdAt: -1 });
        res.status(200).json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addGalleryItem = async (req, res) => {
    try {
        const { caption, category } = req.body;
        let imageUrl = '';

        if (req.file) {
            imageUrl = req.file.path;
        } else {
            return res.status(400).json({ message: 'Image is required' });
        }

        const item = await GalleryItem.create({
            image: imageUrl,
            caption,
            category
        });

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGalleryItem = async (req, res) => {
    try {
        const item = await GalleryItem.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await item.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getGallery, addGalleryItem, deleteGalleryItem };
