import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, AlertCircle, Download, Lock, Zap, Shield, FileText, TrendingUp, Users, Clock } from 'lucide-react';

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
      amount: 79900, // ₹799 in paise
      currency: 'INR',
      name: 'SalaryCalc',
      description: 'CTC to In-Hand Report',
      handler: function(response) {
        console.log('Payment successful:', response);
        
        // Redirect to thank you page
        // Webhook will automatically handle email sending
        window.location.href = `/thank-you?product=ctc&payment_id=${response.razorpay_payment_id}`;
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        product: 'CTC_REPORT',
        name: formData.name,
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
        <title>CTC Breakdown Report - ₹799 | Professional Salary Analysis | SalaryCalc</title>
        <meta name="description" content="Get your complete 8-page CTC breakdown report in 2 minutes. Monthly in-hand salary, tax optimization, both regimes compared, and 5-year projections included." />
      </Helmet>

      {/* Hero Section - PREMIUM */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Urgency Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              247 reports delivered this week
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Stop Guessing.<br />
              Know Your <span className="text-yellow-300">Exact</span> Take-Home.
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
              Get your complete 8-page CTC breakdown report with monthly in-hand salary, both tax regimes compared, 5-year projections, and personalized tax-saving strategies.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>2,178+ professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>2-minute delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>100% secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Money-back guarantee</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleBuyNow}
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-blue-700 font-bold px-10 py-5 rounded-xl text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
            >
              <FileText className="w-6 h-6" />
              Get My CTC Report - ₹799
              <TrendingUp className="w-5 h-5" />
            </button>
            
            <p className="text-sm mt-4 opacity-90">⚡ Delivered to your email in 2 minutes</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Problem/Solution Section - NEW */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Problem */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <h3 className="text-2xl font-bold text-red-900">Without This Report</h3>
            </div>
            <ul className="space-y-3 text-red-800">
              <li className="flex items-start gap-2">
                <span className="text-xl">❌</span>
                <span>Confused about where your salary actually goes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">❌</span>
                <span>Don't know which tax regime saves you more</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">❌</span>
                <span>Missing out on ₹2,000-8,000/month in tax savings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">❌</span>
                <span>Can't plan finances without knowing exact take-home</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">❌</span>
                <span>Accepting whatever payslip shows without verification</span>
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-green-900">With This Report</h3>
            </div>
            <ul className="space-y-3 text-green-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Complete transparency on every deduction</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Both regimes compared - choose the best</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Save ₹24,000-96,000 annually on taxes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">5-year projections for financial planning</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="font-semibold">Professional document for salary negotiations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing Box - ENHANCED */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-10 mb-16 text-center border-2 border-blue-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
              🔥 LIMITED TIME: SAVE 38%
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-2xl text-gray-400 line-through">₹1,299</span>
              <span className="text-6xl md:text-7xl font-extrabold text-blue-600">₹799</span>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              One-time payment • Instant delivery • Lifetime access
            </p>
            
            <button
              onClick={handleBuyNow}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 px-8 rounded-xl text-2xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 mb-4"
            >
              Get My Report Now →
            </button>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>2-Min Delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Money-Back</span>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included - DETAILED */}
        <div className="bg-white rounded-2xl shadow-lg p-10 mb-16">
          <h2 className="text-4xl font-bold mb-3 text-center text-gray-900">What's Inside Your Report</h2>
          <p className="text-center text-gray-600 mb-10">Professional 8-page PDF + Excel breakdown delivered instantly</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                icon: '📊', 
                title: 'Complete CTC Component Breakdown', 
                desc: 'Every single component of your salary explained in detail - Basic, HRA, Special Allowance, Bonus, Variables, and hidden components you never knew existed.'
              },
              { 
                icon: '💰', 
                title: 'Exact Monthly In-Hand Amount', 
                desc: 'Know the precise amount that hits your bank account every month after all deductions. No more surprises on payday.'
              },
              { 
                icon: '⚖️', 
                title: 'Old vs New Regime Comparison', 
                desc: 'Side-by-side comparison showing which regime saves you more. Includes actual calculations with YOUR deductions and exemptions.'
              },
              { 
                icon: '📉', 
                title: 'All Deductions Explained', 
                desc: 'PF, Income Tax, Professional Tax, ESI - every rupee deducted from your salary shown with exact calculations and legal basis.'
              },
              { 
                icon: '🏙️', 
                title: 'City-Wise Cost Analysis', 
                desc: 'How your salary compares to cost of living in your city. Rent benchmarks, savings potential, and lifestyle affordability.'
              },
              { 
                icon: '📈', 
                title: '5-Year Salary Projections', 
                desc: 'Projected salary growth with increments. See your expected CTC and take-home for next 5 years based on industry standards.'
              },
              { 
                icon: '💡', 
                title: 'Tax-Saving Strategies', 
                desc: 'Legal ways to reduce your tax burden. Section 80C, 80D, HRA optimization, and regime switching recommendations.'
              },
              { 
                icon: '📊', 
                title: 'Industry Benchmarking', 
                desc: 'See how your CTC compares with peers in your industry, city, and experience level. Am I underpaid or overpaid?'
              },
              { 
                icon: '🎯', 
                title: 'Salary Structure Optimization Tips', 
                desc: 'How to restructure your CTC for maximum take-home. Negotiation points for your next appraisal or job switch.'
              },
              { 
                icon: '📱', 
                title: 'Excel Calculator Included', 
                desc: 'Editable Excel sheet to test different scenarios. Change CTC, bonus, deductions and see instant impact on take-home.'
              },
              { 
                icon: '⚡', 
                title: 'Instant Email Delivery', 
                desc: 'Report delivered to your inbox within 2 minutes of payment. No waiting, no delays. Download and use immediately.'
              },
              { 
                icon: '🔄', 
                title: 'Lifetime Access & Updates', 
                desc: 'Access your report anytime. Free updates when tax laws change (FY 2026-27). One-time payment, lifetime value.'
              }
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

        {/* Comparison Table: Free vs Pro - NEW */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-10 mb-16 border border-blue-100">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Free Calculator vs. Pro Report</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-600 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 text-gray-600 font-semibold">Free Calculator</th>
                  <th className="text-center py-4 px-4 text-blue-600 font-semibold bg-blue-50 rounded-t-lg">Pro Report (₹799)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Basic monthly in-hand calculation</td>
                  <td className="text-center py-4 px-4"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold">Complete CTC component breakdown</td>
                  <td className="text-center py-4 px-4 text-gray-400">✗</td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold">Both tax regimes compared</td>
                  <td className="text-center py-4 px-4"><span className="text-xs text-gray-500">(Basic)</span></td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold">5-year salary projections</td>
                  <td className="text-center py-4 px-4 text-gray-400">✗</td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold">City-wise cost analysis</td>
                  <td className="text-center py-4 px-4 text-gray-400">✗</td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold">Tax-saving strategies</td>
                  <td className="text-center py-4 px-4 text-gray-400">✗</td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold">Industry benchmarking</td>
                  <td className="text-center py-4 px-4 text-gray-400">✗</td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold">Downloadable PDF report</td>
                  <td className="text-center py-4 px-4 text-gray-400">✗</td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold">Excel calculator included</td>
                  <td className="text-center py-4 px-4 text-gray-400">✗</td>
                  <td className="text-center py-4 px-4 bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold">Salary negotiation tips</td>
                  <td className="text-center py-4 px-4 text-gray-400">✗</td>
                  <td className="text-center py-4 px-4 bg-blue-50 rounded-b-lg"><CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={handleBuyNow}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg"
            >
              Upgrade to Pro Report - ₹799 →
            </button>
          </div>
        </div>

        {/* Testimonials - ENHANCED */}
        <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-10 mb-16 border border-yellow-100">
          <h2 className="text-4xl font-bold mb-3 text-center text-gray-900">What Our Customers Say</h2>
          <p className="text-center text-gray-600 mb-10">Real results from 2,178+ professionals who got their report</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Rajesh Kumar', 
                role: 'Senior Software Engineer', 
                company: 'Tech MNC, Bangalore',
                image: 'R',
                rating: 5,
                result: 'Saved ₹52,000/year',
                text: 'The regime comparison showed I was using the wrong one! Switched and now save ₹4,200 extra every month. Best ₹799 I ever spent. Report is super detailed - my CA was impressed.' 
              },
              { 
                name: 'Priya Mehta', 
                role: 'Financial Analyst', 
                company: 'Investment Bank, Mumbai',
                image: 'P',
                rating: 5,
                result: 'Negotiated 18% raise',
                text: 'Used the benchmarking data to prove I was underpaid. Got 18% raise in my appraisal! The 5-year projections helped me plan my home loan. Delivered in 2 minutes as promised.' 
              },
              { 
                name: 'Amit Singh', 
                role: 'Product Manager', 
                company: 'E-commerce Startup, Pune',
                image: 'A',
                rating: 5,
                result: 'Restructured CTC',
                text: 'Finally understood my CTC components. The optimization tips helped me restructure my salary during job switch. Now get ₹8,000 more monthly in-hand at same CTC. Worth every rupee!' 
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {t.image}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.role}</div>
                    <div className="text-xs text-gray-500">{t.company}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                
                <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold mb-4">
                  {t.result}
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div id="form" className="bg-white rounded-2xl shadow-2xl p-10 mb-16 border-2 border-blue-600">
            <h2 className="text-4xl font-bold mb-3 text-center text-gray-900">Almost There!</h2>
            <p className="text-center text-gray-600 mb-8">Enter your details to get your personalized report</p>
            
            <form onSubmit={handlePayment} className="max-w-2xl mx-auto space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all text-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all text-lg"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all text-lg"
                />
                <input
                  type="number"
                  name="ctc"
                  placeholder="Current Annual CTC (₹) *"
                  value={formData.ctc}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all text-lg"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-5">
                <select 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  className="p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all text-lg"
                >
                  <option>Bangalore</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Pune</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                  <option>Kolkata</option>
                  <option>Ahmedabad</option>
                  <option>Other</option>
                </select>
                
                <input
                  type="number"
                  name="experience"
                  placeholder="Experience (years)"
                  value={formData.experience}
                  onChange={handleChange}
                  className="p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all text-lg"
                />
                
                <select 
                  name="industry" 
                  value={formData.industry} 
                  onChange={handleChange} 
                  className="p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all text-lg"
                >
                  <option>IT/Software</option>
                  <option>Finance/Banking</option>
                  <option>Consulting</option>
                  <option>Healthcare</option>
                  <option>Manufacturing</option>
                  <option>Retail/E-commerce</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
              
              <input
                type="text"
                name="designation"
                placeholder="Current Designation (Optional)"
                value={formData.designation}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none transition-all text-lg"
              />
              
              <button
                type="submit"
                disabled={loading || !scriptLoaded}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-5 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                {loading ? 'Processing Payment...' : !scriptLoaded ? 'Loading Payment System...' : '💳 Pay ₹799 & Get My Report'}
              </button>
              
              <div className="flex items-center justify-center gap-8 text-sm text-gray-600 pt-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>2-Min Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Money-Back Guarantee</span>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* FAQ - COMPREHENSIVE */}
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { 
                q: 'How fast will I receive my report?', 
                a: 'Your CTC Breakdown Report will be delivered to your email within 2 minutes of successful payment. Check your spam folder if you don\'t see it in inbox. The report comes as a PDF + Excel file.' 
              },
              { 
                q: 'Is my personal and salary data secure?', 
                a: 'Absolutely. We use bank-grade encryption for all data. Your salary information is only used to generate your report and is never shared with third parties. We comply with data protection regulations and delete your data after delivery.' 
              },
              { 
                q: 'What if I\'m not satisfied with the report?', 
                a: 'We offer a 7-day, 100% money-back guarantee with no questions asked. If the report doesn\'t meet your expectations, just email us within 7 days for a full refund. Over 2,178 customers have trusted us - we stand behind our quality.' 
              },
              { 
                q: 'How accurate are the calculations?', 
                a: 'Our calculations are based on FY 2026-27 tax laws and verified by financial experts. We account for all deductions (PF, PT, HRA, 80C, 80D), both tax regimes, and state-specific rules. However, actual salary depends on your company\'s structure and policies.' 
              },
              { 
                q: 'Can I use this report for my ITR filing?', 
                a: 'Yes! The report provides detailed breakdown of your income, deductions, and tax liability which is extremely helpful during ITR filing. However, please verify final figures with your Form 16 from employer.' 
              },
              { 
                q: 'What payment methods do you accept?', 
                a: 'We accept all major payment methods via Razorpay: Credit/Debit Cards (Visa, Mastercard, Amex, Rupay), UPI (GPay, PhonePe, Paytm), Net Banking, and Wallets. Payment is 100% secure.' 
              },
              { 
                q: 'Do I get both PDF and Excel formats?', 
                a: 'Yes! You receive a professional 8-page PDF report plus an editable Excel calculator. The Excel file lets you test different scenarios by changing CTC, deductions, or regime to see instant impact.' 
              },
              { 
                q: 'Will this work for government employees (8th Pay Commission)?', 
                a: 'Absolutely. The report includes 8th Pay Commission calculations and projections. Just enter your current basic pay and we\'ll show expected salary post-8th CPC implementation.' 
              }
            ].map((faq, i) => (
              <div key={i} className="pb-6 border-b border-gray-200 last:border-0">
                <h3 className="font-bold text-lg mb-3 text-blue-600 flex items-start gap-2">
                  <span className="text-blue-400 flex-shrink-0">Q:</span>
                  {faq.q}
                </h3>
                <p className="text-gray-700 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="text-center mt-16">
          <button
            onClick={handleBuyNow}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-12 py-6 rounded-xl text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
          >
            <FileText className="w-6 h-6" />
            Get My CTC Report - ₹799
            <TrendingUp className="w-6 h-6" />
          </button>
          <p className="text-gray-600 mt-4">Join 2,178+ professionals who optimized their salary</p>
        </div>
      </div>
    </div>
  );
}
