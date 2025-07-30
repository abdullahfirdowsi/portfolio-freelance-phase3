import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Project from '../models/Project.js';
import Pricing from '../models/Pricing.js';
import Contact from '../models/Contact.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const router = express.Router();

// @route   GET /api/admin/dashboard-stats
// @desc    Get dashboard analytics and statistics
// @access  Private (Admin)
router.get('/dashboard-stats', auth, async (req, res) => {
  try {
    // Get basic counts
    const [projectCount, pricingCount, contactCount] = await Promise.all([
      Project.countDocuments(),
      Pricing.countDocuments(),
      Contact.countDocuments()
    ]);

    // Get total project views
    const projectViewsResult = await Project.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    const totalProjectViews = projectViewsResult.length > 0 ? projectViewsResult[0].totalViews : 0;

    // Get contact messages by project type
    const contactsByType = await Contact.aggregate([
      { $group: { _id: '$projectType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get contact messages by status
    const contactsByStatus = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get recent contacts (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentContactsCount = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Get most popular project categories
    const projectsByCategory = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 }, totalViews: { $sum: '$views' } } },
      { $sort: { count: -1 } }
    ]);

    // Get contact messages by priority
    const contactsByPriority = await Contact.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Calculate growth metrics (comparing last 24 hours vs previous 24 hours)
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const [recentContacts, previousContacts] = await Promise.all([
      Contact.countDocuments({ createdAt: { $gte: oneDayAgo } }),
      Contact.countDocuments({ 
        createdAt: { $gte: twoDaysAgo, $lt: oneDayAgo } 
      })
    ]);

    const contactGrowth = previousContacts > 0 
      ? ((recentContacts - previousContacts) / previousContacts * 100).toFixed(1)
      : 0;

    const stats = {
      overview: {
        totalProjects: projectCount,
        totalPricingTiers: pricingCount,
        totalContacts: contactCount,
        totalProjectViews,
        recentContactsCount,
        contactGrowth: parseFloat(contactGrowth)
      },
      contactsByType: contactsByType.map(item => ({
        type: item._id,
        count: item.count
      })),
      contactsByStatus: contactsByStatus.map(item => ({
        status: item._id,
        count: item.count
      })),
      contactsByPriority: contactsByPriority.map(item => ({
        priority: item._id,
        count: item.count
      })),
      projectsByCategory: projectsByCategory.map(item => ({
        category: item._id,
        count: item.count,
        totalViews: item.totalViews
      }))
    };

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Configure AWS S3
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

// Configure Multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// @route   POST /api/admin/upload
// @desc    Upload image to S3
// @access  Private (Admin)
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Generate unique filename
    const fileExtension = req.file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${fileExtension}`;

    // Upload parameters
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      CacheControl: 'max-age=31536000',
      // Note: ACL is not supported in this version, using bucket policy instead
    };

    // Upload to S3
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    // Construct the public URL
    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    res.json({ 
      imageUrl, 
      message: 'Image uploaded successfully',
      fileName: fileName 
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Failed to upload image',
      error: error.message 
    });
  }
});

// Project Routes
// @route   GET /api/admin/projects/:id
// @desc    Get a single project by ID
// @access  Private (Admin)
router.get('/projects/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST /api/admin/projects
// @desc    Create a new project
// @access  Private (Admin)
router.post('/projects', auth, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const project = await newProject.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/projects/:id
// @desc    Update a project
// @access  Private (Admin)
router.put('/projects/:id', auth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project = await Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/projects/:id
// @desc    Delete a project
// @access  Private (Admin)
router.delete('/projects/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Pricing Routes
// @route   GET /api/admin/pricing/:id
// @desc    Get a single pricing tier by ID
// @access  Private (Admin)
router.get('/pricing/:id', auth, async (req, res) => {
  try {
    const pricing = await Pricing.findById(req.params.id);
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing tier not found' });
    }
    res.json(pricing);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Pricing tier not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST /api/admin/pricing
// @desc    Create a new pricing tier
// @access  Private (Admin)
router.post('/pricing', auth, async (req, res) => {
  try {
    const newPricing = new Pricing(req.body);
    const pricing = await newPricing.save();
    res.status(201).json(pricing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/pricing/:id
// @desc    Update a pricing tier
// @access  Private (Admin)
router.put('/pricing/:id', auth, async (req, res) => {
  try {
    let pricing = await Pricing.findById(req.params.id);
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing tier not found' });
    }
    pricing = await Pricing.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(pricing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/pricing/:id
// @desc    Delete a pricing tier
// @access  Private (Admin)
router.delete('/pricing/:id', auth, async (req, res) => {
  try {
    const pricing = await Pricing.findById(req.params.id);
    if (!pricing) {
      return res.status(404).json({ message: 'Pricing tier not found' });
    }
    await Pricing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pricing tier removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Contact Routes
// @route   GET /api/admin/contacts
// @desc    Get all contact submissions
// @access  Private (Admin)
router.get('/contacts', auth, async (req, res) => {
  try {
    const { search, page = 1, limit = 10, status } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build search and filter query
    let query = {};
    
    // Add status filter
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { projectType: { $regex: search, $options: 'i' } }
      ];
    }

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Contact.countDocuments(query)
    ]);

    res.json({
      contacts,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/admin/contacts/:id
// @desc    Get a single contact submission by ID
// @access  Private (Admin)
router.get('/contacts/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/admin/contacts/:id
// @desc    Delete a contact submission
// @access  Private (Admin)
router.delete('/contacts/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact submission removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/contacts/:id/status
// @desc    Update contact status
// @access  Private (Admin)
router.put('/contacts/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    contact.status = status;
    await contact.save();
    
    res.json({ message: 'Contact status updated successfully', contact });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/admin/contacts/:id/priority
// @desc    Update contact priority
// @access  Private (Admin)
router.put('/contacts/:id/priority', auth, async (req, res) => {
  try {
    const { priority } = req.body;
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    contact.priority = priority;
    await contact.save();
    
    res.json({ message: 'Contact priority updated successfully', contact });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/admin/contacts/:id/notes
// @desc    Add note to contact
// @access  Private (Admin)
router.post('/contacts/:id/notes', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    await contact.addNote(content);
    
    res.json({ message: 'Note added successfully', contact });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
