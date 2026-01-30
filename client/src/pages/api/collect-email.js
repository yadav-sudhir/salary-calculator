// src/pages/api/collect-email.js
// Newsletter signup handler

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, source } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Send welcome email
    await sgMail.send({
      to: email,
      from: 'support.salarycalc@proton.me',
      subject: 'Welcome to SalaryCalc! Here\'s Your Free Guide',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome ${name || 'there'}! 👋</h2>
          
          <p>Thanks for subscribing to SalaryCalc. You're now part of a community helping Indians make smarter salary and tax decisions.</p>
          
          <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>🎁 Your Free Gift:</h3>
            <p><strong>"10 Tax-Saving Strategies Most People Miss"</strong></p>
            <ul style="line-height: 1.8;">
              <li>Save ₹25,000+ with Section 80D</li>
              <li>Optimize HRA for maximum benefit</li>
              <li>NPS ₹50,000 extra deduction</li>
              <li>And 7 more strategies...</li>
            </ul>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>💡 Special Offer:</strong> Get 40% OFF on all our reports this week only!
            <br><br>
            <a href="https://salarycalc.in/products/ctc-report" style="color: #0066cc; text-decoration: none; font-weight: bold;">
              View Products →
            </a>
          </div>
          
          <h3>What's Coming Next:</h3>
          <p>Over the next 7 days, you'll receive:</p>
          <ul>
            <li>Day 2: How to calculate your real take-home salary</li>
            <li>Day 3: Negotiation tips that work in India</li>
            <li>Day 4: Old vs New tax regime (which to choose?)</li>
            <li>Day 7: Exclusive 40% discount on premium reports</li>
          </ul>
          
          <p>Have questions? Just reply to this email!</p>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            You're receiving this because you signed up at SalaryCalc.in<br>
            <a href="https://salarycalc.in/unsubscribe?email=${email}" style="color: #666;">Unsubscribe</a>
          </p>
        </div>
      `,
    });

    // Notify owner
    await sgMail.send({
      to: 'yadavsudhir5850@gmail.com',
      from: 'support.salarycalc@proton.me',
      subject: '📧 New Newsletter Signup',
      text: `New subscriber!\n\nEmail: ${email}\nName: ${name || 'Not provided'}\nSource: ${source || 'Website'}\n\nDate: ${new Date().toLocaleString('en-IN')}`,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Email collection error:', error);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
