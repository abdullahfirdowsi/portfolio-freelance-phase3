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

    // Modern email template for the user
    const userEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for your inquiry</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background-color: #f9fafb; 
            padding: 20px 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff; 
            border-radius: 16px; 
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
            color: white; 
            padding: 40px 32px; 
            text-align: center; 
          }
          .header h1 { 
            font-size: 28px; 
            font-weight: 700; 
            margin-bottom: 8px; 
            letter-spacing: -0.025em;
          }
          .header p { 
            font-size: 16px; 
            opacity: 0.9; 
            font-weight: 400;
          }
          .content { 
            padding: 32px; 
          }
          .greeting { 
            font-size: 18px; 
            margin-bottom: 24px; 
            color: #1f2937;
          }
          .highlight-box { 
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); 
            padding: 24px; 
            border-radius: 12px; 
            border-left: 4px solid #2563eb; 
            margin: 24px 0; 
          }
          .highlight-box p { 
            font-size: 16px; 
            font-weight: 500; 
            color: #1e40af;
          }
          .details-card { 
            background-color: #f8fafc; 
            padding: 24px; 
            border-radius: 12px; 
            margin: 24px 0; 
            border: 1px solid #e2e8f0;
          }
          .details-card h3 { 
            color: #1f2937; 
            font-size: 18px; 
            font-weight: 600; 
            margin-bottom: 16px;
          }
          .detail-row { 
            display: flex; 
            margin-bottom: 12px; 
            align-items: flex-start;
          }
          .detail-label { 
            font-weight: 600; 
            color: #374151; 
            min-width: 100px; 
            margin-right: 12px;
          }
          .detail-value { 
            color: #1f2937; 
            flex: 1;
          }
          .message-box { 
            background: #ffffff; 
            padding: 16px; 
            border-radius: 8px; 
            border-left: 3px solid #2563eb; 
            font-style: italic; 
            color: #4b5563; 
            margin-top: 8px;
          }
          .cta-section { 
            text-align: center; 
            margin: 32px 0; 
            padding: 24px; 
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); 
            border-radius: 12px;
          }
          .cta-section h3 { 
            color: #166534; 
            font-size: 20px; 
            font-weight: 600; 
            margin-bottom: 16px;
          }
          .btn { 
            display: inline-block; 
            padding: 14px 28px; 
            margin: 8px; 
            border-radius: 8px; 
            text-decoration: none; 
            font-weight: 600; 
            font-size: 16px; 
            transition: all 0.2s ease;
          }
          .btn-whatsapp { 
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); 
            color: white; 
          }
          .btn-email { 
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
            color: white; 
          }
          .features-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 16px; 
            margin: 24px 0;
          }
          .feature-item { 
            background: #ffffff; 
            padding: 16px; 
            border-radius: 8px; 
            border: 1px solid #e5e7eb; 
            text-align: center;
          }
          .feature-item .icon { 
            width: 32px; 
            height: 32px; 
            margin: 0 auto 8px; 
            background: #eff6ff; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
          }
          .feature-item h4 { 
            font-size: 14px; 
            font-weight: 600; 
            color: #1f2937; 
            margin-bottom: 4px;
          }
          .feature-item p { 
            font-size: 12px; 
            color: #6b7280;
          }
          .signature { 
            margin-top: 32px; 
            padding-top: 24px; 
            border-top: 1px solid #e5e7eb;
          }
          .signature-name { 
            font-size: 18px; 
            font-weight: 700; 
            color: #1f2937; 
            margin-bottom: 4px;
          }
          .signature-title { 
            font-size: 14px; 
            color: #6b7280; 
            margin-bottom: 12px;
          }
          .contact-info { 
            font-size: 14px; 
            color: #6b7280;
          }
          .contact-info a { 
            color: #2563eb; 
            text-decoration: none;
          }
          .footer { 
            background-color: #f8fafc; 
            padding: 24px 32px; 
            text-align: center; 
            border-top: 1px solid #e5e7eb;
          }
          .footer p { 
            font-size: 12px; 
            color: #9ca3af; 
            margin-bottom: 4px;
          }
          @media (max-width: 600px) {
            .container { margin: 0 16px; }
            .content { padding: 24px; }
            .header { padding: 32px 24px; }
            .features-grid { grid-template-columns: 1fr; }
            .btn { display: block; margin: 8px 0; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You!</h1>
            <p>Abdullah Firdowsi - Project Development</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              Hi <strong>${contactData.name}</strong>,
            </div>
            
            <div class="highlight-box">
              <p>Thanks for reaching out! I received your <strong>${contactData.projectType}</strong> project inquiry and will respond within 24 hours.</p>
            </div>
            
            <div class="details-card">
              <h3>Your Inquiry Details</h3>
              <div class="detail-row">
                <span class="detail-label">Project:</span>
                <span class="detail-value">${contactData.projectType}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${contactData.email}</span>
              </div>
              ${contactData.phone ? `
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${contactData.phone}</span>
              </div>
              ` : ''}
              <div class="detail-row">
                <span class="detail-label">Submitted:</span>
                <span class="detail-value">${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
              ${contactData.message ? `
              <div class="detail-row">
                <span class="detail-label">Message:</span>
                <div class="detail-value">
                  <div class="message-box">${contactData.message}</div>
                </div>
              </div>
              ` : ''}
            </div>
            
            <div class="features-grid">
              <div class="feature-item">
                <div class="icon">
                  <svg width="16" height="16" fill="#2563eb" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4>Original Code</h4>
                <p>Clean documentation</p>
              </div>
              <div class="feature-item">
                <div class="icon">
                  <svg width="16" height="16" fill="#2563eb" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4>24/7 Support</h4>
                <p>WhatsApp assistance</p>
              </div>
              <div class="feature-item">
                <div class="icon">
                  <svg width="16" height="16" fill="#2563eb" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4>On-Time Delivery</h4>
                <p>Guaranteed timeline</p>
              </div>
              <div class="feature-item">
                <div class="icon">
                  <svg width="16" height="16" fill="#2563eb" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4>Viva Preparation</h4>
                <p>Complete guidance</p>
              </div>
            </div>
            
            <div class="cta-section">
              <h3>Need Immediate Help?</h3>
              <a href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I%20just%20submitted%20a%20contact%20form%20and%20need%20immediate%20help." class="btn btn-whatsapp">
                <svg width="16" height="16" fill="#ffffff" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp Me
              </a>
              <a href="mailto:abdullahfirdowsi@gmail.com" class="btn btn-email">
                <svg width="16" height="16" fill="#ffffff" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email Me
              </a>
            </div>
            
            <div class="signature">
              <div class="signature-name">Abdullah Firdowsi</div>
              <div class="signature-title">AI & Data Science Developer</div>
              <div class="contact-info">
                <svg width="14" height="14" fill="#6b7280" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:abdullahfirdowsi@gmail.com">abdullahfirdowsi@gmail.com</a><br>
                <svg width="14" height="14" fill="#6b7280" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +91-9943980796
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2025 Abdullah Firdowsi | Project Development</p>
            <p>This is an automated confirmation email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const userEmailText = `
Hi ${contactData.name},

Thanks for reaching out! I received your ${contactData.projectType} project inquiry and will respond within 24 hours.

Your Inquiry Details:
- Project: ${contactData.projectType}
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

What I Offer:
- Original code with documentation
- 24/7 WhatsApp support
- On-time delivery guaranteed
- Viva preparation help

Need immediate help?
WhatsApp: https://wa.me/919943980796
Email: abdullahfirdowsi@gmail.com

Best regards,
Abdullah Firdowsi
AI & Data Science Developer
Email: abdullahfirdowsi@gmail.com
Phone: +91-9943980796

© 2025 Abdullah Firdowsi | Project Development
    `;

    // Email options
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: contactData.email,
      subject: `Thank you for your ${contactData.projectType} project inquiry`,
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

    // Modern email template for admin notification
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #1f2937; 
            background-color: #f9fafb; 
            padding: 20px 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff; 
            border-radius: 16px; 
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); 
            color: white; 
            padding: 40px 32px; 
            text-align: center; 
          }
          .header h1 { 
            font-size: 28px; 
            font-weight: 700; 
            margin-bottom: 8px; 
            letter-spacing: -0.025em;
          }
          .header p { 
            font-size: 16px; 
            opacity: 0.9; 
            font-weight: 400;
          }
          .content { 
            padding: 32px; 
          }
          .alert-box { 
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); 
            padding: 20px; 
            border-radius: 12px; 
            border-left: 4px solid #dc2626; 
            margin-bottom: 24px; 
          }
          .alert-box h3 { 
            color: #dc2626; 
            font-size: 18px; 
            font-weight: 600; 
            margin-bottom: 8px;
          }
          .alert-box p { 
            color: #991b1b; 
            font-size: 14px;
          }
          .client-card { 
            background-color: #f8fafc; 
            padding: 24px; 
            border-radius: 12px; 
            margin: 24px 0; 
            border: 1px solid #e2e8f0;
          }
          .client-card h3 { 
            color: #1f2937; 
            font-size: 20px; 
            font-weight: 600; 
            margin-bottom: 20px;
          }
          .info-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 16px; 
            margin-bottom: 20px;
          }
          .info-item { 
            background: white; 
            padding: 16px; 
            border-radius: 8px; 
            border: 1px solid #e5e7eb;
          }
          .info-label { 
            font-size: 12px; 
            font-weight: 600; 
            color: #6b7280; 
            text-transform: uppercase; 
            letter-spacing: 0.05em; 
            margin-bottom: 4px;
          }
          .info-value { 
            font-size: 16px; 
            font-weight: 600; 
            color: #1f2937;
          }
          .info-value a { 
            color: #2563eb; 
            text-decoration: none;
          }
          .project-type { 
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); 
            color: #1e40af; 
            padding: 8px 16px; 
            border-radius: 20px; 
            font-weight: 600; 
            font-size: 14px; 
            display: inline-block;
          }
          .message-section { 
            margin-top: 20px;
          }
          .message-box { 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid #2563eb; 
            font-style: italic; 
            color: #4b5563; 
            line-height: 1.6;
          }
          .actions-section { 
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); 
            padding: 24px; 
            border-radius: 12px; 
            margin: 24px 0; 
            text-align: center;
          }
          .actions-section h3 { 
            color: #166534; 
            font-size: 20px; 
            font-weight: 600; 
            margin-bottom: 16px;
          }
          .btn { 
            display: inline-block; 
            padding: 12px 24px; 
            margin: 6px; 
            border-radius: 8px; 
            text-decoration: none; 
            font-weight: 600; 
            font-size: 14px; 
            transition: all 0.2s ease;
          }
          .btn-primary { 
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
            color: white; 
          }
          .btn-success { 
            background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); 
            color: white; 
          }
          .tips-section { 
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); 
            padding: 20px; 
            border-radius: 12px; 
            margin: 24px 0;
          }
          .tips-section h3 { 
            color: #d97706; 
            font-size: 18px; 
            font-weight: 600; 
            margin-bottom: 12px;
          }
          .tips-list { 
            list-style: none; 
            padding: 0;
          }
          .tips-list li { 
            color: #92400e; 
            font-size: 14px; 
            margin-bottom: 8px; 
            padding-left: 20px; 
            position: relative;
          }
          .tips-list li:before { 
            content: "✓"; 
            position: absolute; 
            left: 0; 
            color: #d97706; 
            font-weight: bold;
          }
          .footer { 
            background-color: #f8fafc; 
            padding: 24px 32px; 
            text-align: center; 
            border-top: 1px solid #e5e7eb;
          }
          .footer p { 
            font-size: 12px; 
            color: #9ca3af; 
            margin-bottom: 4px;
          }
          @media (max-width: 600px) {
            .container { margin: 0 16px; }
            .content { padding: 24px; }
            .header { padding: 32px 24px; }
            .info-grid { grid-template-columns: 1fr; }
            .btn { display: block; margin: 8px 0; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Inquiry Received</h1>
            <p>Portfolio Contact Form</p>
          </div>
          
          <div class="content">
            <div class="alert-box">
              <h3>Action Required</h3>
              <p>New contact form submission received. Please respond within 24 hours for best client experience.</p>
            </div>
            
            <div class="client-card">
              <h3>Client Information</h3>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Name</div>
                  <div class="info-value">${contactData.name}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Email</div>
                  <div class="info-value">
                    <a href="mailto:${contactData.email}">${contactData.email}</a>
                  </div>
                </div>
                ${contactData.phone ? `
                <div class="info-item">
                  <div class="info-label">Phone</div>
                  <div class="info-value">
                    <a href="tel:${contactData.phone}">${contactData.phone}</a>
                  </div>
                </div>
                ` : ''}
                <div class="info-item">
                  <div class="info-label">Submitted</div>
                  <div class="info-value">${new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</div>
                </div>
              </div>
              
              <div style="margin-bottom: 16px;">
                <div class="info-label">Project Type</div>
                <span class="project-type">${contactData.projectType}</span>
              </div>
              
              ${contactData.message ? `
              <div class="message-section">
                <div class="info-label">Project Details</div>
                <div class="message-box">${contactData.message}</div>
              </div>
              ` : ''}
            </div>
            
            <div class="actions-section">
              <h3>Quick Actions</h3>
              <a href="mailto:${contactData.email}?subject=Re: ${contactData.projectType} Project Inquiry&body=Hi ${contactData.name},%0D%0A%0D%0AThank you for your interest in ${contactData.projectType} project. I'd be happy to help you with your requirements.%0D%0A%0D%0ABest regards,%0D%0AAbdullah Firdowsi" class="btn btn-primary">
                <svg width="16" height="16" fill="#ffffff" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Reply via Email
              </a>
              ${contactData.phone ? `
              <a href="https://wa.me/${contactData.phone.replace(/\D/g, '')}?text=Hi%20${contactData.name},%20I%20received%20your%20inquiry%20about%20${contactData.projectType}%20project.%20I'd%20be%20happy%20to%20help%20you!" class="btn btn-success">
                <svg width="16" height="16" fill="#ffffff" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </a>
              ` : ''}
              <a href="${process.env.FRONTEND_URL}/admin/contacts" class="btn btn-primary">
                <svg width="16" height="16" fill="#ffffff" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Admin Panel
              </a>
            </div>
            
            <div class="tips-section">
              <h3>Response Tips</h3>
              <ul class="tips-list">
                <li>Respond within 2-4 hours for best impression</li>
                <li>Ask clarifying questions about requirements</li>
                <li>Provide timeline and cost estimate</li>
                <li>Suggest a brief call to discuss details</li>
                <li>Share relevant portfolio examples</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2025 Abdullah Firdowsi Portfolio Admin</p>
            <p>Automated notification from contact form</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version
    const adminEmailText = `
NEW CONTACT FORM SUBMISSION

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
- Respond within 2-4 hours for best impression
- Ask clarifying questions about requirements
- Provide timeline and cost estimate
- Suggest a brief call to discuss details
- Share relevant portfolio examples

© 2025 Abdullah Firdowsi Portfolio Admin
    `;

    // Email options for admin notification
    const adminMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: process.env.EMAIL_FROM_ADDRESS, // Send to yourself
      subject: `New ${contactData.projectType} inquiry from ${contactData.name}`,
      text: adminEmailText,
      html: adminEmailHtml,
    };

    // Send admin notification email
    const info = await transporter.sendMail(adminMailOptions);
    console.log('Admin notification email sent successfully:', info.messageId);
    
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
    console.error('Email configuration error:', error);
    return { success: false, error: error.message, message: 'Email configuration is invalid' };
  }
};