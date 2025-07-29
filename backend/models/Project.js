import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    enum: ['AI/ML', 'Web Development', 'Data Science', 'IoT', 'Mobile App', 'Other'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  techStack: [{
    type: String,
    required: true,
    trim: true
  }],
  price: {
    type: String,
    required: [true, 'Project price is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Project image URL is required'],
    trim: true
  },
  features: [{
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Feature description cannot exceed 100 characters']
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'featured'],
    default: 'active'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  duration: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  liveUrl: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
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
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better search performance
projectSchema.index({ title: 'text', description: 'text', category: 1 });
projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ createdAt: -1 });

// Instance method to increment views
projectSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to increment likes
projectSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save();
};

// Static method to get projects by category
projectSchema.statics.getByCategory = function(category) {
  return this.find({ category, status: 'active' }).sort({ createdAt: -1 });
};

// Static method to get featured projects
projectSchema.statics.getFeatured = function() {
  return this.find({ status: 'featured' }).sort({ createdAt: -1 });
};

const Project = mongoose.model('Project', projectSchema);

export default Project;