// src/pages/products/TaxStrategy.jsx
// Complete Tax-Saving Strategy Report - ₹999 (REDUCED FROM ₹2,499)
// FULLY OPTIMIZED for maximum conversions

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, TrendingDown, PiggyBank, FileText, Lock, Zap, Shield, Users, Clock } from 'lucide-react';

export default function TaxStrategy() {
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
    
    if (!scriptLoaded || typeof window.Razorpay === 'undefined') {
      alert('Payment system is still loading. Please wait a moment and try again.');
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      alert('Payment system configuration error. Please contact support.');
      console.error('VITE_RAZORPAY_KEY_ID not found');
      return;
    }

    setLoading(true);

    const options = {
      key: razorpayKey,
      amount: 99900, // ₹999 in paise (REDUCED PRICE!)
      currency: 'INR',
      name: 'SalaryCalc',
      description: 'Complete Tax-Saving Strategy Report',
      handler: function(response) {
        console.log('Payment successful:', response);
        window.location.href = '/thank-you?product=tax-strategy';
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        product: 'TAX_STRATEGY',
        annualIncome: formData.ctc,
        city: formData.city,
        experience: formData.experience,
        industry: formData.industry
      },
      theme: { color: '#7c3aed' },
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
        <title>Tax-Saving Strategy Report - ₹999 | Save ₹50,000+ Annually | SalaryCalc</title>
        <meta name="description" content="Comprehensive 12-page tax strategy with Section 80C, 80D optimization, regime comparison, and month-by-month action plan for FY 2026-27. Legal tax savings guaranteed." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
              <PiggyBank className="w-4 h-4" />
              184+ people saved ₹50,000+ this year
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Stop Overpaying Taxes.<br />
              <span className="text-yellow-300">Save ₹50,000+ Legally</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
              Complete 12-page tax-saving strategy report with Section 80C, 80D optimization, regime comparison, and month-by-month action plan for FY 2026-27.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm mb-8">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                <span>Average ₹65K saved</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>2-min delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>184+ users</span>
              </div>
            </div>

            <button
              onClick={handleBuyNow}
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-purple-700 font-bold px-10 py-5 rounded-xl text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
            >
              <FileText className="w-6 h-6" />
              Get My Tax Strategy - ₹999
              <TrendingDown className="w-5 h-5" />
            </button>
            
            <p className="text-sm mt-4 opacity-90">⚡ Instant delivery • Average ₹65K saved</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Pricing Box */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl p-10 mb-16 text-center border-2 border-purple-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200/30 rounded-full -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg animate-pulse">
              🔥 LIMITED: 60% OFF!
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-2xl text-gray-400 line-through">₹2,499</span>
              <span className="text-6xl md:text-7xl font-extrabold text-purple-600">₹999</span>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-bold text-sm">
                SAVE<br/>₹1,500
              </div>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              Save ₹65K annually = 65x ROI
            </p>
            
            <button
              onClick={handleBuyNow}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold py-5 px-8 rounded-xl text-2xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 mb-4"
            >
              Get Strategy Now - ₹999 →
            </button>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>Instant</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-2xl shadow-lg p-10 mb-16">
          <h2 className="text-4xl font-bold mb-3 text-center text-gray-900">Complete Tax-Saving Blueprint</h2>
          <p className="text-center text-gray-600 mb-10">12-page strategy + Excel calculator + action plan</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '⚖️', title: 'Both Regimes Analyzed', desc: 'Deep comparison with YOUR exact deductions. Which saves more and why.' },
              { icon: '💰', title: 'Section 80C Optimization', desc: '₹1.5L strategies - PPF, ELSS, insurance. Best mix for your goals.' },
              { icon: '🏥', title: 'Section 80D Maximization', desc: 'Health insurance strategies to claim ₹25K-₹1L deduction.' },
              { icon: '🏠', title: 'HRA Exemption Guide', desc: 'Metro vs non-metro. How to maximize HRA benefit legally.' },
              { icon: '🏡', title: 'Home Loan Benefits', desc: 'Section 24(b) interest + 80C principal. ₹2L+ deduction.' },
              { icon: '📊', title: 'Investment Recommendations', desc: 'Tax-saving instruments ranked by returns and risk.' },
              { icon: '📅', title: 'Month-by-Month Plan', desc: 'What to do each month. Never miss a deadline.' },
              { icon: '🎯', title: 'Salary Restructuring', desc: 'How to optimize CTC components for minimum tax.' },
              { icon: '💡', title: 'Lesser-Known Deductions', desc: 'Section 80E, 80G, 80TTA. Most people miss these.' },
              { icon: '📱', title: 'Excel Calculator', desc: 'Test scenarios. Change investments, see instant impact.' },
              { icon: '⚠️', title: 'Avoid Common Mistakes', desc: 'What NOT to do. How to stay compliant.' },
              { icon: '🔄', title: 'Lifetime Updates', desc: 'Free updates when tax laws change. FY 2026-27 current.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
                <div className="text-4xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-10 mb-16 border border-purple-100">
          <h2 className="text-4xl font-bold mb-3 text-center text-gray-900">Real Tax Savings</h2>
          <p className="text-center text-gray-600 mb-10">See how much they saved</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Aditya Gupta', 
                role: 'Software Architect', 
                image: 'A',
                salary: '₹32 LPA',
                saved: '₹82,000',
                text: 'Was using new regime blindly. This report showed old regime saves ₹82K annually! Best ₹999 spent.' 
              },
              { 
                name: 'Meera Iyer', 
                role: 'Finance Manager', 
                image: 'M',
                salary: '₹18 LPA',
                saved: '₹54,000',
                text: 'The month-by-month plan made it so easy. Saved ₹54K in first year. Now I follow this every year.' 
              },
              { 
                name: 'Rohit Malhotra', 
                role: 'Senior Consultant', 
                image: 'R',
                salary: '₹25 LPA',
                saved: '₹68,000',
                text: 'Lesser-known deductions section was gold! Section 80D for parents saved ₹50K. Total ₹68K saved!' 
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {t.image}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.role}</div>
                    <div className="text-xs text-gray-500">{t.salary}</div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-center">
                  <div className="text-xs text-gray-600 mb-1">Tax Saved</div>
                  <div className="text-3xl font-extrabold text-green-600">{t.saved}</div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div id="form" className="bg-white rounded-2xl shadow-2xl p-10 mb-16 border-2 border-purple-600">
            <h2 className="text-4xl font-bold mb-3 text-center text-gray-900">Get Your Tax Strategy</h2>
            <p className="text-center text-gray-600 mb-8">Personalized 12-page report in 2 minutes</p>
            
            <form onSubmit={handlePayment} className="max-w-2xl mx-auto space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none transition-all text-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none transition-all text-lg"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none transition-all text-lg"
                />
                <input
                  type="number"
                  name="ctc"
                  placeholder="Annual Income (₹) *"
                  value={formData.ctc}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none transition-all text-lg"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-5">
                <select 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  className="p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none transition-all text-lg"
                >
                  <option>Bangalore</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Pune</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                  <option>Other</option>
                </select>
                
                <input
                  type="number"
                  name="experience"
                  placeholder="Experience (years)"
                  value={formData.experience}
                  onChange={handleChange}
                  className="p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none transition-all text-lg"
                />
                
                <select 
                  name="industry" 
                  value={formData.industry} 
                  onChange={handleChange} 
                  className="p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none transition-all text-lg"
                >
                  <option>IT/Software</option>
                  <option>Finance</option>
                  <option>Consulting</option>
                  <option>Healthcare</option>
                  <option>Other</option>
                </select>
              </div>
              
              <input
                type="text"
                name="designation"
                placeholder="Designation (Optional)"
                value={formData.designation}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none transition-all text-lg"
              />
              
              <button
                type="submit"
                disabled={loading || !scriptLoaded}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-5 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                {loading ? 'Processing...' : !scriptLoaded ? 'Loading...' : '💳 Pay ₹999 & Get Strategy'}
              </button>
              
              <p className="text-center text-sm text-gray-600 pt-2">
                🔒 Secure • ⚡ 2-min delivery • 💯 Money-back
              </p>
            </form>
          </div>
        )}

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Common Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { 
                q: 'Will this really save me ₹50,000+?', 
                a: 'People earning ₹15L+ typically save ₹50K-₹1L annually. Even at ₹10L you can save ₹30K-40K. Strategies are proven and legal.' 
              },
              { 
                q: 'Is this only for people with home loans?', 
                a: 'No! Home loans are just ONE strategy. We cover 80C, 80D, HRA, regime selection, and 10+ ways to save. Everyone benefits.' 
              },
              { 
                q: 'How is this different from a CA?', 
                a: 'Costs ₹999 vs ₹3K-5K for CA. Instant access vs appointments. Personalized to YOUR situation.' 
              },
              { 
                q: 'What if tax laws change?', 
                a: 'Free lifetime updates! Budget 2027 changes? We send updated strategy at no cost.' 
              }
            ].map((faq, i) => (
              <div key={i} className="pb-6 border-b border-gray-200 last:border-0">
                <h3 className="font-bold text-lg mb-3 text-purple-600">Q: {faq.q}</h3>
                <p className="text-gray-700 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <button
            onClick={handleBuyNow}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-bold px-12 py-6 rounded-xl text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
          >
            <FileText className="w-6 h-6" />
            Get Strategy - ₹999 (Save ₹1,500!)
          </button>
          <p className="text-gray-600 mt-4">Average ₹65K saved = 65x ROI</p>
        </div>
      </div>
    </div>
  );
}
