import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pricing tier name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  price: {
    type: String,
    required: [true, 'Price is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  features: [{
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Feature cannot exceed 100 characters']
  }],
  popular: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'border-gray-200',
    trim: true
  },
  category: {
    type: String,
    enum: ['mini', 'major', 'ieee', 'web', 'custom'],
    required: [true, 'Category is required']
  },
  deliveryTime: {
    type: String,
    required: [true, 'Delivery time is required'],
    trim: true
  },
  revisions: {
    type: Number,
    default: 1,
    min: [0, 'Revisions cannot be negative']
  },
  support: {
    type: String,
    enum: ['basic', 'standard', 'premium'],
    default: 'standard'
  },
  addOns: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
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
pricingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure only one pricing tier is marked as popular per category
pricingSchema.pre('save', async function(next) {
  if (this.popular && this.isModified('popular')) {
    // Remove popular flag from other tiers in the same category
    await this.constructor.updateMany(
      { category: this.category, _id: { $ne: this._id } },
      { popular: false }
    );
  }
  next();
});

// Index for better query performance
pricingSchema.index({ category: 1, isActive: 1, order: 1 });
pricingSchema.index({ popular: 1, isActive: 1 });

// Static method to get active pricing tiers
pricingSchema.statics.getActive = function() {
  return this.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
};

// Static method to get pricing by category
pricingSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ order: 1 });
};

// Static method to get popular pricing tier
pricingSchema.statics.getPopular = function() {
  return this.findOne({ popular: true, isActive: true });
};

const Pricing = mongoose.model('Pricing', pricingSchema);

export default Pricing;