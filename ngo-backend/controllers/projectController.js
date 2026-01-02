const Project = require('../models/Project');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ date: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
    try {
        const { title, description, category, summary, date } = req.body;
        let imageUrl = '';

        if (req.file) {
            imageUrl = req.file.path; // Cloudinary URL from multer-storage-cloudinary
        } else {
            return res.status(400).json({ message: 'Image is required' });
        }

        const project = await Project.create({
            title,
            description,
            category,
            summary,
            date,
            image: imageUrl
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // If a new image is uploaded, use it. Otherwise keep old one.
        // Optional: Delete old image from Cloudinary (requires public_id storage)
        if (req.file) {
            project.image = req.file.path;
        }

        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.category = req.body.category || project.category;
        project.summary = req.body.summary || project.summary;
        project.date = req.body.date || project.date;

        const updatedProject = await project.save();
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};
