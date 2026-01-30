// src/pages/PrivacyPolicy.jsx
// Privacy Policy - Legal compliance

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <p className="text-sm text-gray-600">
            <strong>Last Updated:</strong> January 30, 2026
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 mb-2">When you use SalaryCalc, we collect:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Personal Information:</strong> Name, email, phone number</li>
              <li><strong>Financial Information:</strong> CTC, salary details (for report generation only)</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited</li>
              <li><strong>Payment Information:</strong> Processed securely by Razorpay (we don't store card details)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Generate personalized salary and tax reports</li>
              <li>Process payments and deliver purchased products</li>
              <li>Send newsletters and updates (if you subscribe)</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Data Security</h2>
            <p className="text-gray-700">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure cloud storage with access controls</li>
              <li>Regular security audits</li>
              <li>Payment processing through PCI-compliant Razorpay</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Information Sharing</h2>
            <p className="text-gray-700 mb-2">
              We <strong>never sell</strong> your personal information. We may share data with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Service Providers:</strong> Razorpay (payments), SendGrid (emails), Claude AI (report generation)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Your Rights</h2>
            <p className="text-gray-700 mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing emails</li>
              <li>Withdraw consent for data processing</li>
            </ul>
            <p className="text-gray-700 mt-2">
              To exercise these rights, email: <a href="mailto:support.salarycalc@proton.me" className="text-blue-600 hover:underline">support.salarycalc@proton.me</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Cookies</h2>
            <p className="text-gray-700">
              We use cookies to improve your experience. These include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li><strong>Essential Cookies:</strong> Required for site functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand site usage</li>
            </ul>
            <p className="text-gray-700 mt-2">
              You can disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Data Retention</h2>
            <p className="text-gray-700">
              We retain your data for as long as necessary to provide services and comply with legal obligations. 
              Financial information used for report generation is deleted after 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. Children's Privacy</h2>
            <p className="text-gray-700">
              Our services are not intended for anyone under 18. We do not knowingly collect information from minors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">9. Changes to Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this policy periodically. Changes will be posted on this page with an updated "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">10. Contact Us</h2>
            <p className="text-gray-700">
              For privacy-related questions or concerns, contact us at:
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Email:</strong> <a href="mailto:support.salarycalc@proton.me" className="text-blue-600 hover:underline">support.salarycalc@proton.me</a>
            </p>
          </section>

          <div className="bg-blue-50 p-6 rounded-lg mt-8">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> This privacy policy is provided for informational purposes and does not constitute legal advice. 
              For specific legal questions, please consult a qualified attorney.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
