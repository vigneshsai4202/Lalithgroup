import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export const sendInquiryEmails = async (inquiry) => {
  // Admin notification
  await transporter.sendMail({
    from: `"Lalith Group" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Inquiry from ${inquiry.name}`,
    html: `
      <h2>New Inquiry Received</h2>
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Email:</strong> ${inquiry.email}</p>
      <p><strong>Phone:</strong> ${inquiry.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${inquiry.company || 'N/A'}</p>
      <p><strong>Product:</strong> ${inquiry.product || 'N/A'}</p>
      <p><strong>Quantity:</strong> ${inquiry.quantity || 'N/A'}</p>
      <p><strong>Delivery Location:</strong> ${inquiry.deliveryLocation || 'N/A'}</p>
      <p><strong>Message:</strong> ${inquiry.message || 'N/A'}</p>
    `,
  });

  // Auto-reply to customer
  await transporter.sendMail({
    from: `"Lalith Group" <${process.env.SMTP_USER}>`,
    to: inquiry.email,
    subject: 'Thank you for contacting Lalith Group',
    html: `
      <h2>Thank you, ${inquiry.name}!</h2>
      <p>We have received your inquiry and our team will get back to you within 24 hours.</p>
      <p>For urgent queries, call us at <strong>+91 98481 93511</strong> or WhatsApp us.</p>
      <br/>
      <p>Warm regards,<br/><strong>Lalith Group Team</strong><br/>Lalith Innovation Food Technology Pvt. Ltd.<br/>SF No. 463/1A, 9A, Guntakindapalli, Srikalahasti, Chittoor, AP — 517644<br/>Phone: +91 98481 93511 | +91 95532 79111</p>
    `,
  });
};
