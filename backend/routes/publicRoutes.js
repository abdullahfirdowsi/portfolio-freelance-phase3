import express from 'express';
import Project from '../models/Project.js';
import Pricing from '../models/Pricing.js';
import Contact from '../models/Contact.js';
import { sendContactConfirmationEmail, sendAdminNotificationEmail } from '../utils/emailService.js';

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
  const { name, email, phone, projectType, message } = req.body;

  try {
    // Save contact to database
    const newContact = new Contact({
      name,
      email,
      phone,
      projectType,
      message,
    });

    const savedContact = await newContact.save();
    
    // Send confirmation email to user (non-blocking)
    sendContactConfirmationEmail({
      name,
      email,
      phone,
      projectType,
      message
    }).then(result => {
      if (result.success) {
        console.log('✅ Confirmation email sent to user:', email);
      } else {
        console.error('❌ Failed to send confirmation email:', result.error);
      }
    }).catch(error => {
      console.error('❌ Error in confirmation email process:', error);
    });
    
    // Send notification email to admin (non-blocking)
    sendAdminNotificationEmail({
      name,
      email,
      phone,
      projectType,
      message
    }).then(result => {
      if (result.success) {
        console.log('✅ Admin notification email sent');
      } else {
        console.error('❌ Failed to send admin notification:', result.error);
      }
    }).catch(error => {
      console.error('❌ Error in admin notification process:', error);
    });
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully! You will receive a confirmation email shortly.' 
    });
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
