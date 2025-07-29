import { S3Client, PutBucketPolicyCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const bucketPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: `arn:aws:s3:::${process.env.S3_BUCKET_NAME}/*`
    }
  ]
};

const setBucketPolicy = async () => {
  try {
    const command = new PutBucketPolicyCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Policy: JSON.stringify(bucketPolicy)
    });

    const result = await s3.send(command);
    console.log('✅ Bucket policy set successfully!');
    console.log('🔓 Your S3 bucket now allows public read access');
    console.log(`📷 Images uploaded to: ${process.env.S3_BUCKET_NAME}`);
    
  } catch (error) {
    console.error('❌ Error setting bucket policy:', error.message);
    console.log('\n🔧 Manual Steps:');
    console.log('1. Go to AWS S3 Console');
    console.log('2. Select your bucket:', process.env.S3_BUCKET_NAME);
    console.log('3. Go to Permissions tab');
    console.log('4. Edit Bucket Policy and paste the following:');
    console.log('\n' + JSON.stringify(bucketPolicy, null, 2));
  }
};

setBucketPolicy();
