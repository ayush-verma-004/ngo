const Career = require('../models/Career');

const getCareers = async (req, res) => {
    try {
        const careers = await Career.find().sort({ createdAt: -1 });
        res.status(200).json(careers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCareer = async (req, res) => {
    try {
        const { title, description, location, type } = req.body;

        const career = await Career.create({
            title,
            description,
            location,
            type
        });

        res.status(201).json(career);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);

        if (!career) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const updatedCareer = await Career.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedCareer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);

        if (!career) {
            return res.status(404).json({ message: 'Job not found' });
        }

        await career.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCareers, addCareer, updateCareer, deleteCareer };
