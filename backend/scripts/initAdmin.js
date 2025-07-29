import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';

dotenv.config();

const initializeAdmin = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log(`⚠️  Admin user already exists with email: ${adminEmail}`);
      console.log('🔑 You can login using your existing credentials');
      process.exit(0);
    }

    // Create new admin user
    const adminUser = new User({
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    await adminUser.save();
    
    console.log('🎉 Admin user created successfully!');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔐 Password: ${adminPassword}`);
    console.log('');
    console.log('🚀 You can now login to the admin dashboard at:');
    console.log('   http://localhost:5173/admin/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
};

initializeAdmin();
