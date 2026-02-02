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

    // Determine product type - UPDATED PRICES!
    let productType, price;
    
    if (amount === 79900) {
      productType = 'CTC_REPORT';
      price = 799;
    } else if (amount === 49900) {  // UPDATED: Was 149900
      productType = 'NEGOTIATION_LETTER';
      price = 499;  // UPDATED: Was 1499
    } else if (amount === 99900) {  // UPDATED: Was 249900
      productType = 'TAX_STRATEGY';
      price = 999;  // UPDATED: Was 2499
    } else {
      console.error('Unknown amount:', amount);
      // Still notify owner even if unknown amount
      await sgMail.send({
        to: 'yadavsudhir5850@gmail.com',
        from: 'support.salarycalc@proton.me',
        subject: '⚠️ Unknown Payment Amount Received',
        text: `Received payment with unknown amount!\n\nAmount: ₹${amount/100}\nEmail: ${email}\nContact: ${contact}\nPayment ID: ${payment.id}\n\nCheck Razorpay dashboard immediately!`,
      });
      return res.status(400).json({ error: 'Unknown product' });
    }

    console.log(`Processing ${productType} for ${email} - ₹${price}`);

    // Generate product using Claude
    const product = await generateProduct(productType, notes);

    // Send to customer
    await sendProductEmail(email, notes.name || 'Customer', productType, product, price);

    // Notify owner
    await notifyOwner(email, notes.name, productType, price, payment.id);

    console.log(`✅ Successfully processed ${productType} for ${email}`);

    return res.status(200).json({ 
      success: true, 
      product: productType,
      price: price
    });

  } catch (error) {
    console.error('Webhook error:', error);
    
    // Notify owner of error
    try {
      await sgMail.send({
        to: 'yadavsudhir5850@gmail.com',
        from: 'support.salarycalc@proton.me',
        subject: '🚨 Payment Webhook Error',
        html: `
          <div style="font-family: monospace; padding: 20px;">
            <h2 style="color: red;">⚠️ WEBHOOK ERROR</h2>
            <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN')}</p>
            <p><strong>Error:</strong> ${error.message}</p>
            <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto;">${error.stack}</pre>
            <hr>
            <p><strong>Request Body:</strong></p>
            <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto;">${JSON.stringify(req.body, null, 2)}</pre>
          </div>
        `,
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
Designation: ${data.designation || 'Professional'}

Include:
1. Executive Summary
2. CTC Breakdown (Basic, HRA, Special Allowances, Bonuses, Variables)
3. Deductions (EPF 12%, Income Tax, Professional Tax for ${data.city})
4. Monthly In-Hand Salary Calculation (exact amount)
5. Old vs New Tax Regime Comparison (which saves more?)
6. City-specific cost analysis for ${data.city} (rent, living expenses)
7. Tax optimization strategies (80C ₹1.5L, 80D ₹25K-1L, HRA exemption)
8. Salary benchmarking for ${data.designation} in ${data.industry}
9. 5-year salary growth projection
10. Financial planning recommendations

Use FY 2026-27 tax laws. All calculations must be accurate. Format: Professional report in Markdown with clear sections.`,

    NEGOTIATION_LETTER: `Generate a professional 3-page salary negotiation letter for:

Name: ${data.name}
Current CTC: ₹${data.ctc}
Experience: ${data.experience} years
Industry: ${data.industry}
City: ${data.city}
Designation: ${data.designation || 'Professional'}

Create a data-driven business letter with:

1. Professional Opening
   - Formal greeting
   - Purpose statement
   - Gratitude for current role

2. Value Proposition (Main Section)
   - Key achievements and contributions
   - Quantifiable results (projects, revenue, savings)
   - Skills developed
   - Additional responsibilities taken

3. Market Research & Justification
   - Industry salary benchmarks for ${data.designation} in ${data.industry}
   - Years of experience comparison
   - City-wise salary data for ${data.city}
   - Specific target CTC with 20-25% increase justification

4. ROI for Employer
   - How your work generates value
   - Cost-benefit analysis
   - Future contributions

5. Professional Closing
   - Open to discussion
   - Flexible timing
   - Appreciation

Tone: Confident, assertive but respectful, data-driven, professional. 
Format: Ready-to-send business letter. Include specific numbers and data points.`,

    TAX_STRATEGY: `Generate comprehensive 12-page tax-saving strategy report for:

Name: ${data.name}
Annual Income: ₹${data.ctc}
City: ${data.city}
Experience: ${data.experience} years
Industry: ${data.industry}

Create detailed strategy covering:

1. Current Tax Situation Analysis
   - Income breakdown
   - Current deductions
   - Tax liability under both regimes

2. Old vs New Regime Deep Analysis
   - Detailed comparison with YOUR numbers
   - Which regime saves more? By how much?
   - Breakeven analysis

3. Section 80C Optimization (₹1.5 Lakh limit)
   - EPF contribution
   - PPF investment strategy
   - ELSS mutual funds (best options)
   - Life insurance premium
   - Home loan principal repayment
   - NSC, tax-saving FDs
   - Recommended allocation based on risk profile

4. Section 80D - Health Insurance (₹25K-1L)
   - Self and family coverage
   - Parents coverage (additional ₹25K)
   - Senior citizen parents (₹50K)
   - Preventive health checkup
   - Optimal policy structure

5. HRA Exemption Maximization
   - Calculation for ${data.city} (metro/non-metro)
   - Rent receipt optimization
   - Maximum exemption strategies

6. NPS - National Pension System (₹50K)
   - Additional 80CCD(1B) deduction
   - Investment options
   - Long-term benefits

7. Home Loan Tax Benefits
   - Section 24(b) interest deduction (₹2L)
   - Section 80C principal repayment (₹1.5L)
   - First-time buyer benefits

8. Investment Recommendations
   - Tax-saving instruments comparison
   - Risk-adjusted allocation
   - Expected returns

9. Month-by-Month Action Plan
   - April: Open PPF/NPS accounts
   - June: Buy/renew health insurance
   - July-Nov: Monthly SIP in ELSS
   - December: Submit proofs to employer
   - January-February: Final investments
   - March: Last-minute planning
   - April-July: ITR filing

10. Lesser-Known Deductions
    - Section 80E (education loan interest)
    - Section 80G (donations)
    - Section 80TTA/80TTB (interest income)
    - Standard deduction optimization

11. Tax-Free Income Sources
    - Agricultural income
    - Dividend income (up to ₹10L)
    - Capital gains strategies
    - Long-term vs short-term

12. Compliance Checklist
    - Documents needed
    - Proof submission deadlines
    - Common mistakes to avoid
    - ITR filing guide

Use FY 2026-27 tax laws. Provide specific calculations and recommendations. Format: Professional report in Markdown.`,
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
    NEGOTIATION_LETTER: 'Professional Salary Negotiation Letter',
    TAX_STRATEGY: 'Complete Tax-Saving Strategy Report',
  };

  const productDescriptions = {
    CTC_REPORT: '8-page comprehensive breakdown of your salary with tax optimization',
    NEGOTIATION_LETTER: '3-page data-driven letter to negotiate 15-30% higher salary',
    TAX_STRATEGY: '12-page strategy to legally save ₹50,000+ annually on taxes',
  };

  const msg = {
    to: email,
    from: 'support.salarycalc@proton.me',
    subject: `✅ Your ${productNames[type]} is Ready!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background: white;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              🎉 Your Report is Ready!
            </h1>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #333; margin-bottom: 10px;">
              Hi <strong>${name}</strong>,
            </p>
            
            <p style="font-size: 16px; color: #666; line-height: 1.6; margin-bottom: 30px;">
              Thank you for your purchase! Your <strong>${productNames[type]}</strong> has been generated and is ready below.
            </p>
            
            <!-- Order Summary Box -->
            <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px; border-radius: 5px;">
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">📦 Order Summary</h3>
              <table style="width: 100%; font-size: 14px; color: #666;">
                <tr>
                  <td style="padding: 5px 0;"><strong>Product:</strong></td>
                  <td style="padding: 5px 0; text-align: right;">${productNames[type]}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;"><strong>Amount Paid:</strong></td>
                  <td style="padding: 5px 0; text-align: right;"><strong style="color: #10b981;">₹${price}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 5px 0;"><strong>Generated:</strong></td>
                  <td style="padding: 5px 0; text-align: right;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                </tr>
              </table>
            </div>
            
            <!-- Product Description -->
            <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 15px; border-radius: 5px; margin-bottom: 25px;">
              <p style="margin: 0; color: #047857; font-size: 14px;">
                ✨ <strong>What you're getting:</strong> ${productDescriptions[type]}
              </p>
            </div>
            
            <!-- Report Content -->
            <div style="background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 8px; margin-bottom: 30px; max-height: 500px; overflow-y: auto; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">
${content}
            </div>
            
            <!-- How to Use -->
            <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 25px; border-radius: 5px;">
              <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 16px;">💡 How to Use This Report</h3>
              <ol style="margin: 0; padding-left: 20px; color: #78350f; font-size: 14px; line-height: 1.8;">
                <li>Copy the entire report above (Ctrl+A, Ctrl+C)</li>
                <li>Paste into Google Docs or Microsoft Word</li>
                <li>Format as needed (the content is in Markdown format)</li>
                <li>Save for your records</li>
                <li>Implement the recommendations</li>
              </ol>
            </div>
            
            <!-- CTA Box -->
            <div style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 10px; margin-bottom: 25px;">
              <p style="color: white; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">
                🎁 Exclusive Offer: Save More!
              </p>
              <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; font-size: 14px;">
                Get our other reports at 30% discount. Use code: <strong>LOYAL30</strong>
              </p>
              <a href="https://salarycalc.in/products/ctc-report" style="display: inline-block; background: white; color: #667eea; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 14px;">
                View All Products →
              </a>
            </div>
            
            <!-- Support -->
            <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                Questions or feedback? We're here to help!
              </p>
              <p style="margin: 0;">
                <a href="mailto:support.salarycalc@proton.me" style="color: #667eea; text-decoration: none; font-weight: bold;">
                  support.salarycalc@proton.me
                </a>
              </p>
            </div>
            
            <!-- Disclaimer -->
            <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 15px; border-radius: 5px; margin-top: 25px;">
              <p style="margin: 0; font-size: 12px; color: #92400e; line-height: 1.5;">
                <strong>⚠️ Important Disclaimer:</strong> This report is for educational and informational purposes only. It should not be considered professional financial, tax, or legal advice. Tax laws change frequently. Always consult with a certified Chartered Accountant or tax professional before making financial decisions.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px;">
              You're receiving this because you purchased from <strong>SalaryCalc.in</strong>
            </p>
            <p style="margin: 0 0 15px 0; color: #9ca3af; font-size: 11px;">
              © ${new Date().getFullYear()} SalaryCalc India. All rights reserved.
            </p>
            <div style="margin-top: 15px;">
              <a href="https://salarycalc.in" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Website</a>
              <span style="color: #d1d5db;">•</span>
              <a href="https://salarycalc.in/blog" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Blog</a>
              <span style="color: #d1d5db;">•</span>
              <a href="https://salarycalc.in/privacy" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0 10px;">Privacy</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await sgMail.send(msg);
  console.log(`✅ Product email sent to ${email}`);
}

async function notifyOwner(customerEmail, customerName, productType, price, paymentId) {
  const productNames = {
    CTC_REPORT: 'CTC Report',
    NEGOTIATION_LETTER: 'Negotiation Letter',
    TAX_STRATEGY: 'Tax Strategy',
  };

  const emojis = {
    CTC_REPORT: '📊',
    NEGOTIATION_LETTER: '💼',
    TAX_STRATEGY: '💰',
  };

  const msg = {
    to: 'yadavsudhir5850@gmail.com',
    from: 'support.salarycalc@proton.me',
    subject: `🎉 KA-CHING! New Sale: ${productNames[productType]} - ₹${price}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="font-family: 'Courier New', monospace; background: #1a1a1a; color: #00ff00; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #0d0d0d; border: 2px solid #00ff00; padding: 30px; border-radius: 10px;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-size: 36px; margin: 0; color: #00ff00; text-shadow: 0 0 10px #00ff00;">
              💰 KA-CHING! 💰
            </h1>
            <p style="font-size: 24px; margin: 10px 0 0 0; color: #ffff00;">
              NEW SALE ALERT!
            </p>
          </div>
          
          <div style="background: #1a1a1a; border: 1px solid #00ff00; padding: 20px; margin-bottom: 20px; border-radius: 5px;">
            <table style="width: 100%; color: #00ff00; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px dashed #333;"><strong>PRODUCT:</strong></td>
                <td style="padding: 8px 0; text-align: right; border-bottom: 1px dashed #333;">${emojis[productType]} ${productNames[productType]}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px dashed #333;"><strong>AMOUNT:</strong></td>
                <td style="padding: 8px 0; text-align: right; border-bottom: 1px dashed #333; color: #ffff00; font-size: 18px; font-weight: bold;">₹${price}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px dashed #333;"><strong>CUSTOMER:</strong></td>
                <td style="padding: 8px 0; text-align: right; border-bottom: 1px dashed #333;">${customerName || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px dashed #333;"><strong>EMAIL:</strong></td>
                <td style="padding: 8px 0; text-align: right; border-bottom: 1px dashed #333;">${customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px dashed #333;"><strong>PAYMENT ID:</strong></td>
                <td style="padding: 8px 0; text-align: right; border-bottom: 1px dashed #333; font-size: 11px;">${paymentId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>TIME:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #1a3a1a; border: 1px solid #00ff00; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
            <h3 style="margin: 0 0 10px 0; color: #00ff00; font-size: 16px;">✅ AUTOMATED ACTIONS COMPLETED:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #00ff00; font-size: 13px; line-height: 1.8;">
              <li>✅ Payment verified via Razorpay webhook</li>
              <li>✅ Product generated using Claude AI</li>
              <li>✅ Email sent to customer with full report</li>
              <li>✅ Order logged in system</li>
            </ul>
          </div>
          
          <div style="text-align: center; background: #3a1a1a; padding: 20px; border-radius: 5px; border: 1px solid #ff0000;">
            <p style="margin: 0; color: #ff6666; font-size: 14px; font-weight: bold;">
              🚀 NO ACTION NEEDED FROM YOU!
            </p>
            <p style="margin: 5px 0 0 0; color: #ff9999; font-size: 12px;">
              Everything is automated. Just watch the money roll in! 💸
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <a href="https://dashboard.razorpay.com" style="display: inline-block; background: #00ff00; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px;">
              View in Razorpay Dashboard →
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; text-align: center;">
            <p style="margin: 0; color: #666; font-size: 11px;">
              SalaryCalc.in Automated Sales System
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await sgMail.send(msg);
  console.log(`✅ Owner notification sent for ${productType} sale`);
}
