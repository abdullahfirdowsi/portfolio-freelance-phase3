import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send confirmation email to the user who submitted the contact form
export const sendContactConfirmationEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    // Email template for the user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Abdullah Firdowsi</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 5px 0 0 0; opacity: 0.9; }
          .content { padding: 0 10px; }
          .highlight { background-color: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0; }
          .project-details { background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .project-details h3 { color: #2563eb; margin-top: 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          .contact-info { background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .contact-info h3 { color: #16a34a; margin-top: 0; }
          .btn { display: inline-block; background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 5px; }
          .btn:hover { background: linear-gradient(135deg, #15803d, #166534); }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Inquiry!</h1>
            <p>Abdullah Firdowsi - Project Development Specialist</p>
          </div>
          
          <div class="content">
            <p>Dear <strong>${contactData.name}</strong>,</p>
            
            <div class="highlight">
              <p><strong>Thank you for reaching out!</strong> I have received your inquiry about <strong>${contactData.projectType}</strong> project and will get back to you within 24 hours.</p>
            </div>
            
            <div class="project-details">
              <h3>📋 Your Inquiry Details:</h3>
              <p><strong>Project Type:</strong> ${contactData.projectType}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
              ${contactData.message ? `<p><strong>Message:</strong></p><p style="background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #2563eb;">${contactData.message}</p>` : ''}
              <p><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            
            <div class="contact-info">
              <h3>🚀 What's Next?</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>I'll review your requirements carefully</li>
                <li>Prepare a detailed project proposal</li>
                <li>Send you a custom quote within 24 hours</li>
                <li>Schedule a call if needed to discuss further</li>
              </ul>
            </div>
            
            <p style="text-align: center; margin: 30px 0;">
              <strong>Need immediate assistance?</strong><br>
              <a href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I%20just%20submitted%20a%20contact%20form%20and%20need%20immediate%20help." class="btn">💬 WhatsApp Me</a>
              <a href="mailto:abdullahfirdowsi@gmail.com" class="btn">📧 Email Me</a>
            </p>
            
            <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2563eb; margin-top: 0;">🎯 Why Choose Me?</h3>
              <ul style="margin: 10px 0; padding-left: 20px; color: #374151;">
                <li>✅ Original code with clear documentation</li>
                <li>✅ Help with viva preparation</li>
                <li>✅ 24/7 WhatsApp support</li>
                <li>✅ Affordable pricing for students</li>
                <li>✅ On-time delivery guaranteed</li>
              </ul>
            </div>
            
            <p>Looking forward to working with you!</p>
            
            <p>Best regards,<br>
            <strong>Abdullah Firdowsi</strong><br>
            <em>AI & Data Science Specialist</em><br>
            📧 abdullahfirdowsi@gmail.com<br>
            📱 +91-9943980796</p>
          </div>
          
          <div class="footer">
            <p>© 2025 Abdullah Firdowsi | Project Development Specialist</p>
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const userEmailText = `
Dear ${contactData.name},

Thank you for reaching out! I have received your inquiry about ${contactData.projectType} project and will get back to you within 24 hours.

Your Inquiry Details:
- Project Type: ${contactData.projectType}
- Email: ${contactData.email}
${contactData.phone ? `- Phone: ${contactData.phone}` : ''}
${contactData.message ? `- Message: ${contactData.message}` : ''}
- Submitted: ${new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

What's Next?
- I'll review your requirements carefully
- Prepare a detailed project proposal  
- Send you a custom quote within 24 hours
- Schedule a call if needed to discuss further

Need immediate assistance?
WhatsApp: https://wa.me/919943980796
Email: abdullahfirdowsi@gmail.com

Why Choose Me?
✅ Original code with clear documentation
✅ Help with viva preparation
✅ 24/7 WhatsApp support
✅ Affordable pricing for students
✅ On-time delivery guaranteed

Looking forward to working with you!

Best regards,
Abdullah Firdowsi
AI & Data Science Specialist
📧 abdullahfirdowsi@gmail.com
📱 +91-9943980796

© 2025 Abdullah Firdowsi | Project Development Specialist
This is an automated confirmation email.
    `;

    // Email options
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: contactData.email,
      subject: `Thank you for your ${contactData.projectType} project inquiry - Abdullah Firdowsi`,
      text: userEmailText,
      html: userEmailHtml,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent successfully:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      message: 'Confirmation email sent successfully'
    };

  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to send confirmation email'
    };
  }
};

// Send notification email to admin (you) when someone submits contact form
export const sendAdminNotificationEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    // Email template for admin notification
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px; }
          .header h1 { margin: 0; font-size: 24px; }
          .urgent { background-color: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626; margin: 20px 0; }
          .contact-details { background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 15px 0; }
          .contact-details h3 { color: #2563eb; margin-top: 0; }
          .quick-actions { background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .btn { display: inline-block; background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 5px; }
          .btn-primary { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 New Contact Form Submission</h1>
            <p>Someone is interested in your services!</p>
          </div>
          
          <div class="urgent">
            <p><strong>⏰ Action Required:</strong> A potential client has submitted a contact form. Please respond within 24 hours to maintain your professional reputation.</p>
          </div>
          
          <div class="contact-details">
            <h3>👤 Client Information:</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            ${contactData.phone ? `<p><strong>Phone:</strong> <a href="tel:${contactData.phone}">${contactData.phone}</a></p>` : ''}
            <p><strong>Project Type:</strong> <span style="background: #eff6ff; color: #2563eb; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${contactData.projectType}</span></p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            
            ${contactData.message ? `
            <div style="margin-top: 15px;">
              <p><strong>📝 Project Details:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb; font-style: italic;">
                "${contactData.message}"
              </div>
            </div>
            ` : ''}
          </div>
          
          <div class="quick-actions">
            <h3 style="color: #16a34a; margin-top: 0;">🚀 Quick Actions:</h3>
            <a href="mailto:${contactData.email}?subject=Re: ${contactData.projectType} Project Inquiry&body=Hi ${contactData.name},%0D%0A%0D%0AThank you for your interest in ${contactData.projectType} project. I'd be happy to help you with your requirements.%0D%0A%0D%0ABest regards,%0D%0AAbdullah Firdowsi" class="btn btn-primary">📧 Reply via Email</a>
            ${contactData.phone ? `<a href="https://wa.me/${contactData.phone.replace(/\D/g, '')}?text=Hi%20${contactData.name},%20I%20received%20your%20inquiry%20about%20${contactData.projectType}%20project.%20I'd%20be%20happy%20to%20help%20you!" class="btn">💬 WhatsApp</a>` : ''}
            <a href="${process.env.FRONTEND_URL}/admin/contacts" class="btn btn-primary">🔍 View in Admin Panel</a>
          </div>
          
          <div style="background-color: #fffbeb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #d97706; margin-top: 0;">💡 Response Tips:</h3>
            <ul style="margin: 10px 0; padding-left: 20px; color: #374151;">
              <li>Respond within 2-4 hours for best impression</li>
              <li>Ask clarifying questions about their requirements</li>
              <li>Provide a rough timeline and cost estimate</li>
              <li>Suggest a brief call to discuss details</li>
              <li>Share relevant portfolio examples</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p>© 2025 Abdullah Firdowsi Portfolio Admin System</p>
          <p>This is an automated notification from your contact form.</p>
        </div>
      </body>
      </html>
    `;

    // Plain text version
    const adminEmailText = `
🚨 NEW CONTACT FORM SUBMISSION

Client Information:
- Name: ${contactData.name}
- Email: ${contactData.email}
${contactData.phone ? `- Phone: ${contactData.phone}` : ''}
- Project Type: ${contactData.projectType}
- Submitted: ${new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

${contactData.message ? `Project Details: "${contactData.message}"` : ''}

Quick Actions:
- Reply: mailto:${contactData.email}
${contactData.phone ? `- WhatsApp: https://wa.me/${contactData.phone.replace(/\D/g, '')}` : ''}
- Admin Panel: ${process.env.FRONTEND_URL}/admin/contacts

Response Tips:
✅ Respond within 2-4 hours for best impression
✅ Ask clarifying questions about requirements
✅ Provide timeline and cost estimate
✅ Suggest a brief call to discuss details
✅ Share relevant portfolio examples

© 2025 Abdullah Firdowsi Portfolio Admin System
    `;

    // Email options for admin notification
    const adminMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: process.env.EMAIL_FROM_ADDRESS, // Send to yourself
      subject: `🚨 New ${contactData.projectType} inquiry from ${contactData.name}`,
      text: adminEmailText,
      html: adminEmailHtml,
    };

    // Send admin notification email
    const info = await transporter.sendMail(adminMailOptions);
    console.log('✅ Admin notification email sent successfully:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      message: 'Admin notification email sent successfully'
    };

  } catch (error) {
    console.error('❌ Error sending admin notification email:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to send admin notification email'
    };
  }
};

// Test email configuration
export const testEmailConfiguration = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return { success: true, message: 'Email configuration is valid' };
  } catch (error) {
    console.error('❌ Email configuration error:', error);
    return { success: false, error: error.message, message: 'Email configuration is invalid' };
  }
};