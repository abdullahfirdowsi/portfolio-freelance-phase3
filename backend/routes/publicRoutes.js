import express from 'express';
import Project from '../models/Project.js';
import Pricing from '../models/Pricing.js';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/projects', async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build search query
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Project.countDocuments(query)
    ]);

    res.json({
      projects,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/pricing
// @desc    Get all pricing tiers
// @access  Public
router.get('/pricing', async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build search query
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [pricing, total] = await Promise.all([
      Pricing.find(query)
        .sort({ order: 1, createdAt: 1 })
        .skip(skip)
        .limit(limitNum),
      Pricing.countDocuments(query)
    ]);

    res.json({
      pricing,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/contact', async (req, res) => {
  const { name, email, projectType, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      projectType,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/projects/:id/view
// @desc    Increment project view count
// @access  Public
router.put('/projects/:id/view', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.incrementViews();
    res.json({ message: 'View count updated', views: project.views });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
