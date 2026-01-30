// src/pages/products/TaxStrategy.jsx
// Tax-Saving Strategy Report - ₹2,499

import React, { useState } from 'react';

export default function TaxStrategy() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    annualIncome: '',
    city: 'Bangalore',
    experience: '',
    hasHomeLoan: 'no',
    dependents: '0'
  });
  const [showForm, setShowForm] = useState(false);

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
    
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: 249900,
      currency: 'INR',
      name: 'SalaryCalc',
      description: 'Complete Tax-Saving Strategy Report',
      handler: function(response) {
        window.location.href = '/thank-you?product=tax';
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        product: 'TAX_STRATEGY',
        annualIncome: formData.annualIncome,
        city: formData.city,
        experience: formData.experience,
        hasHomeLoan: formData.hasHomeLoan,
        dependents: formData.dependents
      },
      theme: { color: '#2563eb' }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Save ₹50,000+ on Your Taxes Legally
          </h1>
          <p className="text-xl mb-6 opacity-90">
            12-page personalized tax strategy with investment recommendations and month-by-month action plan
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span>💰 Avg ₹65K saved</span>
            <span>📋 12-page report</span>
            <span>✅ 2026 tax laws</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Pricing */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 text-center border-4 border-emerald-600">
          <div className="text-gray-500 line-through mb-2">₹3,999</div>
          <div className="text-5xl font-bold text-emerald-600 mb-3">₹2,499</div>
          <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6">
            SAVE ₹1,500
          </div>
          <button
            onClick={handleBuyNow}
            className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
          >
            Get My Strategy - ₹2,499
          </button>
          <p className="text-sm text-gray-600 mt-4">
            💡 Can save you ₹50,000+ in taxes
          </p>
        </div>

        {/* Insurance Affiliate CTA - Prime Position */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-8 mb-12 shadow-xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">💡 The ₹25,000 Tax Secret Your CA Missed</h3>
            <p className="text-lg mb-4 opacity-95">
              Most people only focus on Section 80C and miss out on Section 80D. This little-known 
              health insurance loophole can legally save you an extra ₹25,000+ on your taxes this year.
            </p>
            <div className="bg-white/10 p-4 rounded-lg mb-4">
              <p className="text-sm mb-2">Section 80D Tax Benefits:</p>
              <ul className="text-sm space-y-1">
                <li>✓ ₹25,000 deduction for self & family health insurance</li>
                <li>✓ ₹25,000 additional for parents (₹50,000 if senior citizens)</li>
                <li>✓ ₹5,000 for preventive health checkups</li>
                <li>✓ <strong>Total potential savings: ₹25,000-₹80,000</strong></li>
              </ul>
            </div>
            <a 
              href="YOUR_BAJAJ_ALLIANZ_AFFILIATE_LINK_HERE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition shadow-lg"
            >
              Get Free Quote & Tax Estimate →
            </a>
            <p className="text-sm mt-3 opacity-80">
              ⚡ Instant quotes | 💯 Zero paperwork | 🔒 Secure process
            </p>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8">Complete Tax-Saving Strategy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '📊', title: 'Tax Analysis', desc: 'Old vs New regime comparison with recommendations' },
              { icon: '💰', title: 'Section 80C', desc: 'Optimize ₹1.5L limit across EPF, ELSS, insurance' },
              { icon: '🏥', title: 'Section 80D', desc: 'Health insurance strategy saving ₹25K-₹80K' },
              { icon: '🏠', title: 'HRA Optimization', desc: 'Maximize tax-free HRA benefits' },
              { icon: '📈', title: 'Investment Plan', desc: 'Tax-saving instruments with returns comparison' },
              { icon: '📅', title: 'Action Calendar', desc: 'Month-by-month implementation timeline' },
              { icon: '💡', title: 'Advanced Tips', desc: 'NPS, home loan, education loan deductions' },
              { icon: '🎯', title: 'Personalized', desc: 'Based on YOUR income, city, and situation' }
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

        {/* Savings Calculator */}
        <div className="bg-emerald-50 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Potential Tax Savings</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">₹1.5L</div>
                  <div className="text-sm text-gray-600">Section 80C<br />(EPF, ELSS, Insurance)</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">₹50K</div>
                  <div className="text-sm text-gray-600">Section 80D<br />(Health Insurance)</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">₹50K</div>
                  <div className="text-sm text-gray-600">NPS (80CCD)<br />(Retirement)</div>
                </div>
              </div>
              <div className="border-t mt-6 pt-6 text-center">
                <div className="text-5xl font-bold text-emerald-600 mb-2">₹2.5L+</div>
                <div className="text-gray-700 font-semibold">Total Deductions Available</div>
                <div className="text-sm text-gray-600 mt-2">
                  At 30% tax bracket = <strong className="text-emerald-600">₹75,000 saved!</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Customer Results</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Vikram Mehta', saved: '₹82,000', income: '₹15L', city: 'Mumbai' },
              { name: 'Deepa Nair', saved: '₹54,000', income: '₹10L', city: 'Bangalore' },
              { name: 'Rohit Sharma', saved: '₹1.2L', income: '₹25L', city: 'Delhi' }
            ].map((t, i) => (
              <div key={i} className="bg-emerald-50 p-6 rounded-lg text-center">
                <div className="text-4xl mb-3">💰</div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">{t.saved}</div>
                <div className="text-sm text-gray-600 mb-3">Saved in taxes</div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-600">{t.income} income, {t.city}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div id="form" className="bg-white rounded-xl shadow-lg p-8 mb-12 border-2 border-emerald-600">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Tax Profile</h2>
            <form onSubmit={handlePayment} className="max-w-2xl mx-auto space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 rounded-lg"
              />
              <input
                type="number"
                name="annualIncome"
                placeholder="Annual Income (Gross) *"
                value={formData.annualIncome}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 rounded-lg"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <select name="city" value={formData.city} onChange={handleChange} className="p-3 border-2 rounded-lg">
                  <option>Bangalore</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Pune</option>
                  <option>Hyderabad</option>
                </select>
                <input
                  type="number"
                  name="experience"
                  placeholder="Work Experience (years)"
                  value={formData.experience}
                  onChange={handleChange}
                  className="p-3 border-2 rounded-lg"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select name="hasHomeLoan" value={formData.hasHomeLoan} onChange={handleChange} className="p-3 border-2 rounded-lg">
                  <option value="no">No Home Loan</option>
                  <option value="yes">Have Home Loan</option>
                </select>
                <select name="dependents" value={formData.dependents} onChange={handleChange} className="p-3 border-2 rounded-lg">
                  <option value="0">No Dependents</option>
                  <option value="1">1 Dependent</option>
                  <option value="2">2 Dependents</option>
                  <option value="3+">3+ Dependents</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-lg transition"
              >
                Pay ₹2,499 & Get Strategy
              </button>
              <p className="text-center text-sm text-gray-600">
                ✅ Can save ₹50K+ | ✅ 2-min delivery | ✅ Money-back guarantee
              </p>
            </form>
          </div>
        )}

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Saving on Taxes Today</h2>
          <p className="text-lg mb-6 opacity-90">Investment: ₹2,499 | Potential Savings: ₹50,000+</p>
          <button
            onClick={handleBuyNow}
            className="bg-white text-emerald-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            Get My Strategy - ₹2,499
          </button>
        </div>
      </div>

      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}
