// src/pages/products/CTCReport.jsx
// CTC to In-Hand Salary Report - ₹799
// FIXED: Razorpay script loading + Affiliate link added

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function CTCReport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ctc: '',
    city: 'Bangalore',
    experience: '',
    industry: 'IT/Software',
    designation: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      setScriptLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      alert('Payment system failed to load. Please refresh the page.');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBuyNow = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    // Check if Razorpay script is loaded
    if (!scriptLoaded || typeof window.Razorpay === 'undefined') {
      alert('Payment system is still loading. Please wait a moment and try again.');
      return;
    }

    // Check if key is available
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      alert('Payment system configuration error. Please contact support.');
      console.error('VITE_RAZORPAY_KEY_ID not found');
      return;
    }

    setLoading(true);

    const options = {
      key: razorpayKey,
      amount: 100, // ₹1 in paise (TESTING)
      currency: 'INR',
      name: 'SalaryCalc',
      description: 'CTC to In-Hand Report',
      handler: function(response) {
        console.log('Payment successful:', response);
        window.location.href = '/thank-you?product=ctc';
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        product: 'CTC_REPORT',
        ctc: formData.ctc,
        city: formData.city,
        experience: formData.experience,
        industry: formData.industry,
        designation: formData.designation
      },
      theme: { color: '#2563eb' },
      modal: {
        ondismiss: function() {
          setLoading(false);
          console.log('Payment cancelled');
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error('Razorpay error:', error);
      alert('Failed to open payment window. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>CTC Breakdown Report - ₹799 | SalaryCalc</title>
        <meta name="description" content="Get detailed 8-page CTC breakdown report with monthly in-hand salary calculation, tax optimization, and financial planning." />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Know Your Exact Take-Home Salary
          </h1>
          <p className="text-xl mb-6 opacity-90">
            Get a detailed breakdown of your CTC showing every deduction and your actual monthly in-hand amount
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span>⭐ 847+ customers</span>
            <span>⚡ 2-min delivery</span>
            <span>💯 Money-back guarantee</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Pricing Box */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 text-center border-4 border-blue-600">
          <div className="text-gray-500 line-through mb-2">₹1,299</div>
          <div className="text-5xl font-bold text-blue-600 mb-3">₹799</div>
          <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6">
            SAVE ₹500 TODAY
          </div>
          <button
            onClick={handleBuyNow}
            className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
          >
            Get My Report Now - ₹799
          </button>
          <p className="text-sm text-gray-600 mt-4">
            🔒 Secure payment | ⚡ Instant delivery
          </p>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '📊', title: 'Complete CTC Breakdown', desc: 'Every component explained in detail' },
              { icon: '💰', title: 'Monthly In-Hand', desc: 'Exact amount in your account' },
              { icon: '📉', title: 'All Deductions', desc: 'PF, Tax, Professional Tax listed' },
              { icon: '🏙️', title: 'City Analysis', desc: 'Cost of living for your city' },
              { icon: '💡', title: 'Tax Tips', desc: 'Legal ways to save on taxes' },
              { icon: '📈', title: 'Benchmarking', desc: 'How you compare with peers' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Insurance CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold mb-3">💡 The ₹25,000 Tax Secret Your CA Missed</h3>
          <p className="mb-4 opacity-90">
            Most people only focus on Section 80C. Discover the little-known Section 80D loophole 
            that can legally save you an extra ₹25,000+ on your taxes this year.
          </p>
          <a 
            href="https://track.vcommission.com/click?campaign_id=12825&pub_id=125411"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-purple-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
          >
            Unlock Extra Tax Savings →
          </a>
          <p className="text-sm mt-2 opacity-75">Limited time: Free quote + instant tax estimate</p>
        </div>

        {/* Testimonials */}
        <div className="bg-blue-50 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Rajesh Kumar', role: 'Software Engineer, Bangalore', text: 'Finally understood where my money goes! Helped me negotiate 15% raise.' },
              { name: 'Priya Sharma', role: 'HR Manager, Mumbai', text: 'Super detailed. Worth every rupee. Got it in 2 minutes!' },
              { name: 'Amit Patel', role: 'Product Manager, Pune', text: 'Tax tips alone saved me ₹50,000. Highly recommend!' }
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
                <p className="text-sm italic mb-4">"{t.text}"</p>
                <div className="font-semibold text-blue-600">{t.name}</div>
                <div className="text-xs text-gray-600">{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div id="form" className="bg-white rounded-xl shadow-lg p-8 mb-12 border-2 border-blue-600">
            <h2 className="text-3xl font-bold mb-6 text-center">Enter Your Details</h2>
            <form onSubmit={handlePayment} className="max-w-2xl mx-auto space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
              <input
                type="number"
                name="ctc"
                placeholder="Current CTC (Annual) *"
                value={formData.ctc}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 rounded-lg focus:border-blue-500 outline-none"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <select 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  className="p-3 border-2 rounded-lg focus:border-blue-500 outline-none"
                >
                  <option>Bangalore</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Pune</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                </select>
                <input
                  type="number"
                  name="experience"
                  placeholder="Experience (years)"
                  value={formData.experience}
                  onChange={handleChange}
                  className="p-3 border-2 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select 
                  name="industry" 
                  value={formData.industry} 
                  onChange={handleChange} 
                  className="p-3 border-2 rounded-lg focus:border-blue-500 outline-none"
                >
                  <option>IT/Software</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Manufacturing</option>
                  <option>Retail</option>
                </select>
                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="p-3 border-2 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !scriptLoaded}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg text-lg transition"
              >
                {loading ? 'Processing...' : !scriptLoaded ? 'Loading Payment...' : 'Pay ₹799 & Get Report'}
              </button>
              <p className="text-center text-sm text-gray-600">
                ✅ Secure payment | ✅ 2-min delivery | ✅ Money-back guarantee
              </p>
            </form>
          </div>
        )}

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Questions?</h2>
          {[
            { q: 'How fast will I get my report?', a: 'Within 2 minutes via email after payment.' },
            { q: 'Is my data secure?', a: 'Yes, bank-grade encryption. We never share your data.' },
            { q: 'Money-back guarantee?', a: '7 days, 100% refund if not satisfied.' },
            { q: 'How accurate are calculations?', a: 'Based on 2026 tax laws, verified by experts.' }
          ].map((faq, i) => (
            <div key={i} className="mb-6 pb-6 border-b last:border-0">
              <h3 className="font-semibold text-lg mb-2 text-blue-600">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
