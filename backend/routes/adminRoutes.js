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