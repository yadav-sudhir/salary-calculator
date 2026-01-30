// src/pages/Contact.jsx
// Contact page

import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      alert('Failed to send message. Please email us directly at support.salarycalc@proton.me');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent!</h3>
                <p className="text-gray-700">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 rounded-lg"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 rounded-lg"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border-2 rounded-lg"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-question">Product Question</option>
                    <option value="refund">Refund Request</option>
                    <option value="technical">Technical Issue</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full p-3 border-2 rounded-lg"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:bg-gray-400"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            
            {/* Email */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">📧</div>
                <div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p className="text-gray-600">We typically respond within 24 hours</p>
                </div>
              </div>
              <a 
                href="mailto:support.salarycalc@proton.me"
                className="text-blue-600 hover:underline font-semibold"
              >
                support.salarycalc@proton.me
              </a>
            </div>

            {/* Support Hours */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">🕐</div>
                <div>
                  <h3 className="font-bold text-lg">Support Hours</h3>
                  <p className="text-gray-600">Monday - Saturday</p>
                </div>
              </div>
              <p className="font-semibold">10:00 AM - 7:00 PM IST</p>
              <p className="text-sm text-gray-600 mt-2">
                Closed on Sundays and national holidays
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">📚 Quick Answers</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-sm">How fast will I get my report?</p>
                  <p className="text-sm text-gray-700">Within 2 minutes via email</p>
                </div>
                <div>
                  <p className="font-semibold text-sm">Can I get a refund?</p>
                  <p className="text-sm text-gray-700">Yes, 7-day money-back guarantee</p>
                </div>
                <div>
                  <p className="font-semibold text-sm">Is my data secure?</p>
                  <p className="text-sm text-gray-700">Yes, bank-grade encryption</p>
                </div>
              </div>
            </div>

            {/* Social (Optional) */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-blue-600 hover:text-blue-700 text-2xl">
                  LinkedIn
                </a>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-2xl">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Contact */}
        <div className="bg-white rounded-xl shadow-md p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="text-gray-700 mb-6">
            For urgent issues, email us directly and we'll prioritize your request
          </p>
          <a
            href="mailto:support.salarycalc@proton.me"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
}
