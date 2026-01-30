// src/pages/api/razorpay-webhook.js
// Payment webhook handler - processes payments and triggers product generation

import crypto from 'crypto';
import Anthropic from '@anthropic-ai/sdk';
import sgMail from '@sendgrid/mail';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify signature
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

    // Determine product type
    let productType, price;
    
    if (amount === 79900) {
      productType = 'CTC_REPORT';
      price = 799;
    } else if (amount === 149900) {
      productType = 'NEGOTIATION_LETTER';
      price = 1499;
    } else if (amount === 249900) {
      productType = 'TAX_STRATEGY';
      price = 2499;
    } else {
      console.error('Unknown amount:', amount);
      return res.status(400).json({ error: 'Unknown product' });
    }

    console.log(`Processing ${productType} for ${email}`);

    // Generate product using Claude
    const product = await generateProduct(productType, notes);

    // Send to customer
    await sendProductEmail(email, notes.name || 'Customer', productType, product, price);

    // Notify owner
    await notifyOwner(email, notes.name, productType, price);

    return res.status(200).json({ 
      success: true, 
      product: productType 
    });

  } catch (error) {
    console.error('Webhook error:', error);
    
    // Notify owner of error
    try {
      await sgMail.send({
        to: 'yadavsudhir5850@gmail.com',
        from: 'support.salarycalc@proton.me',
        subject: '🚨 Payment Webhook Error',
        text: `Error: ${error.message}\n\nStack: ${error.stack}`,
      });
    } catch (e) {
      console.error('Failed to send error email:', e);
    }

    return res.status(500).json({ error: 'Internal error' });
  }
}

async function generateProduct(type, data) {
  const prompts = {
    CTC_REPORT: `Generate a comprehensive 8-page CTC breakdown report for:

Name: ${data.name}
Current CTC: ₹${data.ctc}
City: ${data.city}
Experience: ${data.experience} years
Industry: ${data.industry}
Designation: ${data.designation}

Include:
1. Executive Summary
2. CTC Breakdown (Basic, HRA, Allowances, Bonuses)
3. Deductions (PF, Tax, Professional Tax)
4. Monthly Salary Calculation
5. City-specific cost analysis for ${data.city}
6. Tax optimization (80C, 80D, HRA)
7. Salary benchmarking for ${data.designation}
8. Financial planning recommendations

Use 2026 tax laws. All calculations must be accurate. Format: Professional report in Markdown.`,

    NEGOTIATION_LETTER: `Generate a professional salary negotiation letter for:

Name: ${data.name}
Current CTC: ₹${data.currentCTC}
Target CTC: ₹${data.targetCTC}
Experience: ${data.experience} years
Industry: ${data.industry}
Designation: ${data.designation}
Achievements: ${data.achievements || 'Standard performance'}

Create 3-page letter with:
1. Professional greeting
2. Value proposition highlighting achievements
3. Market research data for ${data.designation} in ${data.city}
4. Specific ask with justification
5. ROI for employer
6. Flexible closing

Tone: Confident, data-driven, respectful. Format: Business letter ready to send.`,

    TAX_STRATEGY: `Generate comprehensive 12-page tax strategy for:

Name: ${data.name}
Annual Income: ₹${data.annualIncome}
City: ${data.city}
Home Loan: ${data.hasHomeLoan}
Dependents: ${data.dependents}

Include:
1. Tax analysis (old vs new regime)
2. Section 80C optimization (₹1.5L)
3. Section 80D health insurance (₹25K-80K)
4. HRA optimization
5. NPS deduction (₹50K)
6. Home loan interest (if applicable)
7. Investment recommendations
8. Month-by-month action plan
9. Capital gains planning
10. Retirement planning
11. Tax-free income sources
12. Compliance checklist

Use 2026 tax laws. Specific calculations. Format: Professional report in Markdown.`,
  };

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [{
      role: 'user',
      content: prompts[type],
    }],
  });

  return message.content[0].text;
}

async function sendProductEmail(email, name, type, content, price) {
  const productNames = {
    CTC_REPORT: 'CTC to In-Hand Salary Report',
    NEGOTIATION_LETTER: 'Salary Negotiation Letter',
    TAX_STRATEGY: 'Tax-Saving Strategy Report',
  };

  const msg = {
    to: email,
    from: 'support.salarycalc@proton.me',
    subject: `Your ${productNames[type]} is Ready!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Thank you, ${name}! 🎉</h2>
        
        <p>Your <strong>${productNames[type]}</strong> has been generated and is ready.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Product Details:</h3>
          <ul>
            <li><strong>Product:</strong> ${productNames[type]}</li>
            <li><strong>Amount Paid:</strong> ₹${price}</li>
            <li><strong>Generated:</strong> ${new Date().toLocaleString('en-IN')}</li>
          </ul>
        </div>
        
        <div style="background: #e8f4f8; padding: 15px; border-left: 4px solid #0066cc; margin: 20px 0; max-height: 400px; overflow-y: auto; white-space: pre-wrap; font-family: monospace; font-size: 12px;">
${content.substring(0, 3000)}...

[Full report - ${Math.round(content.length / 1000)}KB]
        </div>
        
        <h3>What's Next?</h3>
        <ol>
          <li>Review your personalized report above</li>
          <li>Save this email for records</li>
          <li>Implement the recommendations</li>
        </ol>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>💡 Pro Tip:</strong> Copy the content and paste into a document editor for better formatting.
        </div>
        
        <p style="font-size: 12px; color: #666; margin-top: 30px;">
          <strong>Disclaimer:</strong> For informational purposes only. Consult a certified financial advisor for personalized guidance.
        </p>
        
        <p style="font-size: 12px; color: #666;">
          Questions? Reply to this email or contact support.salarycalc@proton.me
        </p>
        
        <p style="font-size: 12px; color: #999;">
          SalaryCalc.in - Your Salary & Tax Planning Partner<br>
          ${new Date().toLocaleString('en-IN')}
        </p>
      </div>
    `,
  };

  await sgMail.send(msg);
}

async function notifyOwner(customerEmail, customerName, productType, price) {
  const productNames = {
    CTC_REPORT: 'CTC Report',
    NEGOTIATION_LETTER: 'Negotiation Letter',
    TAX_STRATEGY: 'Tax Strategy',
  };

  const msg = {
    to: 'yadavsudhir5850@gmail.com',
    from: 'support.salarycalc@proton.me',
    subject: `💰 New Sale: ${productNames[productType]} - ₹${price}`,
    text: `
🎉 NEW SALE!

Product: ${productNames[productType]}
Amount: ₹${price}
Customer: ${customerName}
Email: ${customerEmail}

Product generated and delivered automatically.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTIONS TAKEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Payment verified
✅ Product generated by Claude AI
✅ Email delivered to customer

No action needed from you! 🚀

Date: ${new Date().toLocaleString('en-IN')}
    `,
  };

  await sgMail.send(msg);
}
