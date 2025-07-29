```javascript
import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Project from '../models/Project.js';
import Pricing from '../models/Pricing.js';
import Contact from '../models/Contact.js';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

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

    // Calculate growth metrics (comparing last 30 days vs previous 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const [recentContacts, previousContacts] = await Promise.all([
      Contact.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      Contact.countDocuments({ 
        createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } 
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
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Configure Multer for S3 upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read', // Make uploaded files publicly readable
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname); // Unique file name
    },
  }),
});

// @route   POST /api/admin/upload
// @desc    Upload image to S3
// @access  Private (Admin)
router.post('/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({ imageUrl: req.file.location, message: 'Image uploaded successfully' });
});

// Project Routes
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
    const contacts = await Contact.find().sort({ date: -1 }); // Sort by newest first
    res.json(contacts);
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

export default router;
```