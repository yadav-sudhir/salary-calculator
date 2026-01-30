// src/pages/products/NegotiationLetter.jsx
// Salary Negotiation Letter - ₹1,499

import React, { useState } from 'react';

export default function NegotiationLetter() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentCTC: '',
    targetCTC: '',
    city: 'Bangalore',
    experience: '',
    industry: 'IT/Software',
    designation: '',
    achievements: ''
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
      amount: 149900,
      currency: 'INR',
      name: 'SalaryCalc',
      description: 'Professional Salary Negotiation Letter',
      handler: function(response) {
        window.location.href = '/thank-you?product=negotiation';
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        product: 'NEGOTIATION_LETTER',
        currentCTC: formData.currentCTC,
        targetCTC: formData.targetCTC,
        city: formData.city,
        experience: formData.experience,
        industry: formData.industry,
        designation: formData.designation,
        achievements: formData.achievements
      },
      theme: { color: '#2563eb' }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Salary Negotiation Letter
          </h1>
          <p className="text-xl mb-6 opacity-90">
            Data-driven, personalized letter that helps you negotiate 15-30% higher salary
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span>💼 Used by 500+ professionals</span>
            <span>📈 Average 22% increase</span>
            <span>✍️ Written by AI experts</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Pricing */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 text-center border-4 border-indigo-600">
          <div className="text-gray-500 line-through mb-2">₹2,499</div>
          <div className="text-5xl font-bold text-indigo-600 mb-3">₹1,499</div>
          <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6">
            SAVE ₹1,000
          </div>
          <button
            onClick={handleBuyNow}
            className="w-full max-w-md bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
          >
            Get My Letter - ₹1,499
          </button>
          <p className="text-sm text-gray-600 mt-4">
            🔒 Personalized for you | ⚡ 2-minute delivery
          </p>
        </div>

        {/* What You Get */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8">Your Letter Includes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '📝', title: 'Professional Format', desc: 'Business-standard letter ready to send' },
              { icon: '📊', title: 'Market Data', desc: 'Industry benchmarks for your role' },
              { icon: '💡', title: 'Value Proposition', desc: 'Your unique strengths highlighted' },
              { icon: '🎯', title: 'Specific Ask', desc: 'Clear salary expectation with justification' },
              { icon: '📈', title: 'ROI Framework', desc: 'Show employer the return on investment' },
              { icon: '🤝', title: 'Negotiation Tips', desc: 'Bonus guide on how to present it' }
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

        {/* Success Stories */}
        <div className="bg-indigo-50 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Ankit Verma', increase: '₹4.2L', old: '₹8L', new: '₹12.2L', role: 'Senior Developer' },
              { name: 'Sneha Reddy', increase: '₹3.5L', old: '₹10L', new: '₹13.5L', role: 'Product Manager' },
              { name: 'Karan Singh', increase: '₹5L', old: '₹15L', new: '₹20L', role: 'Tech Lead' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="text-3xl mb-3">🎉</div>
                <div className="font-bold text-2xl text-green-600 mb-2">{s.increase}</div>
                <div className="text-sm text-gray-600 mb-3">
                  {s.old} → {s.new}
                </div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-gray-600">{s.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why It Works */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Why This Works</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex gap-4">
              <div className="text-3xl">1️⃣</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Data-Driven Approach</h3>
                <p className="text-gray-700">Uses real market data for your role, city, and experience level</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">2️⃣</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Personalized Content</h3>
                <p className="text-gray-700">Highlights YOUR specific achievements and value</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">3️⃣</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Professional Tone</h3>
                <p className="text-gray-700">Confident but not arrogant, persuasive but respectful</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">4️⃣</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Ready to Send</h3>
                <p className="text-gray-700">No editing needed - just add your signature and send</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div id="form" className="bg-white rounded-xl shadow-lg p-8 mb-12 border-2 border-indigo-600">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Information</h2>
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
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="currentCTC"
                  placeholder="Current CTC (Annual) *"
                  value={formData.currentCTC}
                  onChange={handleChange}
                  required
                  className="p-3 border-2 rounded-lg"
                />
                <input
                  type="number"
                  name="targetCTC"
                  placeholder="Target CTC *"
                  value={formData.targetCTC}
                  onChange={handleChange}
                  required
                  className="p-3 border-2 rounded-lg"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
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
                  placeholder="Experience (years)"
                  value={formData.experience}
                  onChange={handleChange}
                  className="p-3 border-2 rounded-lg"
                />
                <select name="industry" value={formData.industry} onChange={handleChange} className="p-3 border-2 rounded-lg">
                  <option>IT/Software</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Manufacturing</option>
                </select>
              </div>
              <input
                type="text"
                name="designation"
                placeholder="Current Designation *"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full p-3 border-2 rounded-lg"
              />
              <textarea
                name="achievements"
                placeholder="Key achievements (optional but recommended)"
                value={formData.achievements}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border-2 rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-lg transition"
              >
                Pay ₹1,499 & Get Letter
              </button>
              <p className="text-center text-sm text-gray-600">
                ✅ Personalized | ✅ Ready to send | ✅ Money-back guarantee
              </p>
            </form>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Negotiate Higher Salary?</h2>
          <p className="text-lg mb-6 opacity-90">Join 500+ professionals who increased their salary</p>
          <button
            onClick={handleBuyNow}
            className="bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            Get My Letter - ₹1,499
          </button>
        </div>
      </div>

      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}
