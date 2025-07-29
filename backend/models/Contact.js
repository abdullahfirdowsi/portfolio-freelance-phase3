import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  phone: {
    type: String,
    trim: true,
    match: [
      /^[\+]?[1-9][\d]{0,15}$/,
      'Please enter a valid phone number'
    ]
  },
  projectType: {
    type: String,
    required: [true, 'Project type is required'],
    enum: ['mini', 'major', 'ieee', 'web', 'ai-ml', 'data-science', 'mobile-app', 'custom'],
    trim: true
  },
  budget: {
    type: String,
    enum: ['under-5k', '5k-10k', '10k-20k', '20k-50k', 'above-50k', 'discuss'],
    default: 'discuss'
  },
  timeline: {
    type: String,
    enum: ['urgent', '1-week', '2-weeks', '1-month', 'flexible'],
    default: 'flexible'
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'in-progress', 'completed', 'archived'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['website', 'whatsapp', 'email', 'referral', 'social-media'],
    default: 'website'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  notes: [{
    content: {
      type: String,
      required: true,
      trim: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    addedBy: {
      type: String,
      default: 'admin'
    }
  }],
  followUpDate: {
    type: Date
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
contactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ projectType: 1, status: 1 });
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ priority: 1, status: 1 });

// Instance method to mark as read
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

// Instance method to add note
contactSchema.methods.addNote = function(content, addedBy = 'admin') {
  this.notes.push({
    content,
    addedBy,
    addedAt: new Date()
  });
  return this.save();
};

// Instance method to set follow-up date
contactSchema.methods.setFollowUp = function(date) {
  this.followUpDate = date;
  return this.save();
};

// Static method to get unread contacts
contactSchema.statics.getUnread = function() {
  return this.find({ status: 'new' }).sort({ createdAt: -1 });
};

// Static method to get contacts by status
contactSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to get contacts by project type
contactSchema.statics.getByProjectType = function(projectType) {
  return this.find({ projectType }).sort({ createdAt: -1 });
};

// Static method to get recent contacts
contactSchema.statics.getRecent = function(limit = 10) {
  return this.find({ isSpam: false })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get contacts requiring follow-up
contactSchema.statics.getFollowUps = function() {
  return this.find({
    followUpDate: { $lte: new Date() },
    status: { $in: ['read', 'replied', 'in-progress'] }
  }).sort({ followUpDate: 1 });
};

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;