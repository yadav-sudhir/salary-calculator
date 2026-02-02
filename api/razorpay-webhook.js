// src/pages/api/razorpay-webhook.js
// MANUAL VERSION - Realistic delivery times
// CTC Report: 2 hours | Negotiation Letter: 2 hours | Tax Strategy: 3 hours

import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const { event, payload } = req.body;

    if (event !== 'payment.captured') {
      return res.status(200).json({ message: 'Event ignored' });
    }

    const payment = payload.payment.entity;
    const { amount, email, contact, notes } = payment;

    let productType, price, productName, deliveryTime;
    
    if (amount === 79900) {
      productType = 'CTC_REPORT';
      price = 799;
      productName = 'CTC Breakdown Report';
      deliveryTime = '2 hours';
    } else if (amount === 49900) {
      productType = 'NEGOTIATION_LETTER';
      price = 499;
      productName = 'Salary Negotiation Letter';
      deliveryTime = '2 hours';
    } else if (amount === 99900) {
      productType = 'TAX_STRATEGY';
      price = 999;
      productName = 'Tax-Saving Strategy Report';
      deliveryTime = '3 hours';
    } else {
      console.error('Unknown amount:', amount);
      await sgMail.send({
        to: 'yadavsudhir5850@gmail.com',
        from: 'support.salarycalc@proton.me',
        subject: '⚠️ Unknown Payment Amount',
        text: `Amount: ₹${amount/100}\nEmail: ${email}\nPayment ID: ${payment.id}`,
      });
      return res.status(400).json({ error: 'Unknown product' });
    }

    console.log(`Order: ${productType} - ₹${price} (Deliver in ${deliveryTime})`);

    await sendCustomerEmail(email, notes.name || 'Customer', productName, price, deliveryTime);
    await sendOwnerEmail(email, notes, productType, productName, price, deliveryTime, payment.id);

    return res.status(200).json({ success: true, product: productType });

  } catch (error) {
    console.error('Webhook error:', error);
    
    try {
      await sgMail.send({
        to: 'yadavsudhir5850@gmail.com',
        from: 'support.salarycalc@proton.me',
        subject: '🚨 Webhook Error',
        text: `Error: ${error.message}\n\nStack: ${error.stack}`,
      });
    } catch (e) {
      console.error('Failed to send error email:', e);
    }

    return res.status(500).json({ error: 'Internal error' });
  }
}

async function sendCustomerEmail(email, name, productName, price, deliveryTime) {
  const msg = {
    to: email,
    from: 'support.salarycalc@proton.me',
    subject: `🎉 Payment Received - Your ${productName} is Being Prepared`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
        <div style="max-width:600px;margin:0 auto;background:#fff;">
          
          <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px 20px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:28px;">✅ Payment Received!</h1>
          </div>
          
          <div style="padding:40px 30px;">
            <p style="font-size:18px;color:#333;margin-bottom:10px;">Hi <strong>${name}</strong>,</p>
            
            <p style="font-size:16px;color:#666;line-height:1.6;margin-bottom:30px;">
              Thank you for your purchase! Your payment of <strong style="color:#10b981;">₹${price}</strong> has been successfully received.
            </p>
            
            <div style="background:#f8f9fa;border-left:4px solid #667eea;padding:20px;margin-bottom:30px;border-radius:5px;">
              <h3 style="margin:0 0 15px 0;color:#333;font-size:16px;">📦 Order Summary</h3>
              <table style="width:100%;font-size:14px;color:#666;">
                <tr><td style="padding:5px 0;"><strong>Product:</strong></td><td style="text-align:right;">${productName}</td></tr>
                <tr><td style="padding:5px 0;"><strong>Amount:</strong></td><td style="text-align:right;color:#10b981;"><strong>₹${price}</strong></td></tr>
                <tr><td style="padding:5px 0;"><strong>Delivery:</strong></td><td style="text-align:right;color:#f59e0b;"><strong>Within ${deliveryTime}</strong></td></tr>
              </table>
            </div>
            
            <div style="background:linear-gradient(135deg,#fef3c7 0%,#fde68a 100%);border:2px solid #f59e0b;padding:25px;border-radius:10px;margin-bottom:25px;text-align:center;">
              <div style="font-size:48px;margin-bottom:10px;">⏰</div>
              <h2 style="color:#92400e;margin:0 0 10px 0;font-size:22px;">Report Ready Within ${deliveryTime}</h2>
              <p style="margin:0;color:#78350f;font-size:15px;">
                Your personalized ${productName} is being prepared by our team. You'll receive it at <strong>${email}</strong>
              </p>
            </div>
            
            <div style="background:#eff6ff;border-left:4px solid #3b82f6;padding:20px;margin-bottom:25px;border-radius:5px;">
              <h3 style="margin:0 0 15px 0;color:#1e40af;font-size:16px;">💡 While You Wait</h3>
              <ul style="margin:0;padding-left:20px;color:#1e3a8a;font-size:14px;line-height:1.8;">
                <li>Check your spam/junk folder</li>
                <li>Add <strong>support.salarycalc@proton.me</strong> to contacts</li>
                <li>Report will come as detailed document</li>
              </ul>
            </div>
            
            <div style="background:#fef2f2;border:1px solid #ef4444;padding:15px;border-radius:5px;margin-bottom:25px;">
              <p style="margin:0;color:#991b1b;font-size:13px;">
                <strong>📧 Important:</strong> Your report will be sent from <strong>support.salarycalc@proton.me</strong> within ${deliveryTime}.
              </p>
            </div>
            
            <div style="text-align:center;padding:20px 0;border-top:1px solid #e5e7eb;">
              <p style="color:#6b7280;font-size:14px;margin:0 0 10px 0;">Questions?</p>
              <p style="margin:0;"><a href="mailto:support.salarycalc@proton.me" style="color:#667eea;font-weight:bold;text-decoration:none;">support.salarycalc@proton.me</a></p>
            </div>
          </div>
          
          <div style="background:#f9fafb;padding:30px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#6b7280;font-size:12px;">© ${new Date().getFullYear()} SalaryCalc India</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await sgMail.send(msg);
  console.log(`✅ Customer email sent (ETA: ${deliveryTime})`);
}

async function sendOwnerEmail(customerEmail, customerData, productType, productName, price, deliveryTime, paymentId) {
  const emojis = { CTC_REPORT: '📊', NEGOTIATION_LETTER: '💼', TAX_STRATEGY: '💰' };

  const msg = {
    to: 'yadavsudhir5850@gmail.com',
    from: 'support.salarycalc@proton.me',
    subject: `🎉 NEW ORDER: ${productName} - ₹${price} [${deliveryTime.toUpperCase()}]`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family:Courier,monospace;background:#000;color:#00ff00;padding:20px;margin:0;">
        <div style="max-width:700px;margin:0 auto;background:#0a0a0a;border:3px solid #00ff00;padding:30px;border-radius:10px;">
          
          <div style="text-align:center;margin-bottom:30px;border-bottom:2px solid #00ff00;padding-bottom:20px;">
            <div style="font-size:48px;">💰💰💰</div>
            <h1 style="font-size:32px;margin:0;color:#00ff00;">NEW ORDER!</h1>
            <div style="font-size:48px;">💰💰💰</div>
          </div>
          
          <div style="background:#ff6600;color:#fff;padding:20px;margin-bottom:25px;border-radius:8px;text-align:center;border:3px solid #fff;">
            <div style="font-size:32px;margin-bottom:10px;">⏰</div>
            <h2 style="margin:0;font-size:24px;">DELIVER WITHIN ${deliveryTime.toUpperCase()}</h2>
            <p style="margin:10px 0 0;">Customer promised ${deliveryTime}</p>
          </div>
          
          <div style="background:#0f0f0f;border:2px solid #00ff00;padding:25px;margin-bottom:25px;border-radius:8px;">
            <h2 style="color:#ffff00;margin:0 0 20px;text-align:center;">ORDER DETAILS</h2>
            <table style="width:100%;color:#00ff00;font-size:15px;">
              <tr><td style="padding:10px 0;"><strong>PRODUCT:</strong></td><td style="text-align:right;">${emojis[productType]} ${productName}</td></tr>
              <tr><td style="padding:10px 0;"><strong>AMOUNT:</strong></td><td style="text-align:right;color:#ffff00;font-size:20px;"><strong>₹${price}</strong></td></tr>
              <tr><td style="padding:10px 0;"><strong>DEADLINE:</strong></td><td style="text-align:right;color:#ff6666;"><strong>${deliveryTime}</strong></td></tr>
              <tr><td style="padding:10px 0;"><strong>PAYMENT ID:</strong></td><td style="text-align:right;font-size:12px;">${paymentId}</td></tr>
              <tr><td style="padding:10px 0;"><strong>TIME:</strong></td><td style="text-align:right;">${new Date().toLocaleString('en-IN')}</td></tr>
            </table>
          </div>
          
          <div style="background:#0f0f0f;border:2px solid #ffff00;padding:25px;margin-bottom:25px;border-radius:8px;">
            <h2 style="color:#ffff00;margin:0 0 20px;text-align:center;">CUSTOMER INFO</h2>
            <table style="width:100%;color:#00ff00;font-size:14px;">
              <tr><td style="padding:8px 0;"><strong>Name:</strong></td><td style="text-align:right;">${customerData.name || 'Not provided'}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Email:</strong></td><td style="text-align:right;color:#ffff00;">${customerEmail}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Phone:</strong></td><td style="text-align:right;">${customerData.contact || 'Not provided'}</td></tr>
              <tr><td style="padding:8px 0;"><strong>CTC/Income:</strong></td><td style="text-align:right;color:#ffff00;">₹${customerData.ctc || customerData.annualIncome || 'N/A'}</td></tr>
              <tr><td style="padding:8px 0;"><strong>City:</strong></td><td style="text-align:right;">${customerData.city || 'N/A'}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Experience:</strong></td><td style="text-align:right;">${customerData.experience || 'N/A'} yrs</td></tr>
              <tr><td style="padding:8px 0;"><strong>Industry:</strong></td><td style="text-align:right;">${customerData.industry || 'N/A'}</td></tr>
              <tr><td style="padding:8px 0;"><strong>Designation:</strong></td><td style="text-align:right;">${customerData.designation || 'N/A'}</td></tr>
            </table>
          </div>
          
          <div style="background:#1a0000;border:3px solid #ff0000;padding:25px;margin-bottom:25px;border-radius:8px;">
            <h2 style="color:#ff0000;margin:0 0 20px;text-align:center;">⚠️ ACTION STEPS ⚠️</h2>
            <div style="color:#ff9999;font-size:15px;background:#000;padding:20px;border-radius:5px;">
              <p style="margin:10px 0;"><strong style="color:#ffff00;">1.</strong> Open Claude.ai</p>
              <p style="margin:10px 0;"><strong style="color:#ffff00;">2.</strong> Generate ${productName}</p>
              <p style="margin:10px 0;"><strong style="color:#ffff00;">3.</strong> Copy report</p>
              <p style="margin:10px 0;"><strong style="color:#ffff00;">4.</strong> Email to: <span style="color:#00ff00;">${customerEmail}</span></p>
            </div>
          </div>
          
          <div style="text-align:center;padding:20px 0;border-top:2px solid #00ff00;">
            <a href="https://claude.ai" style="display:inline-block;background:#00ff00;color:#000;padding:15px 30px;text-decoration:none;border-radius:5px;font-weight:bold;margin:10px;">🤖 OPEN CLAUDE</a>
          </div>
          
          <div style="background:#0f0f0f;border:1px solid #666;padding:20px;margin-top:25px;border-radius:5px;">
            <h3 style="color:#00ff00;margin:0 0 15px;font-size:14px;">📧 EMAIL TEMPLATE:</h3>
            <div style="background:#000;padding:20px;border-radius:5px;color:#ccc;font-size:13px;font-family:Arial;">
              <p><strong>Subject:</strong> Your ${productName} is Ready!</p>
              <p>Hi ${customerData.name || 'there'},</p>
              <p>Your ${productName} is ready:</p>
              <p><strong>[PASTE REPORT HERE]</strong></p>
              <p>Questions? Just reply!</p>
              <p>Best,<br>Sudhir<br>SalaryCalc</p>
            </div>
          </div>
          
          <div style="margin-top:30px;padding-top:20px;border-top:1px solid #333;text-align:center;">
            <p style="margin:0;color:#666;font-size:11px;">SalaryCalc Manual Processing</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await sgMail.send(msg);
  console.log(`✅ Owner notified (Deadline: ${deliveryTime})`);
}
