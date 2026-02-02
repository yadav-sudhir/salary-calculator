// src/pages/products/NegotiationLetter.jsx
// Professional Salary Negotiation Letter - ₹499 (REDUCED FROM ₹1,499)
// FULLY OPTIMIZED for maximum conversions

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, TrendingUp, Target, Briefcase, Award, Lock, Zap, Shield, FileText, DollarSign, Users, Clock } from 'lucide-react';

export default function NegotiationLetter() {
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
      amount: 49900, // ₹499 in paise (REDUCED PRICE!)
      currency: 'INR',
      name: 'SalaryCalc',
      description: 'Professional Salary Negotiation Letter',
      handler: function(response) {
        console.log('Payment successful:', response);
        window.location.href = '/thank-you?product=negotiation';
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        product: 'NEGOTIATION_LETTER',
        currentCTC: formData.ctc,
        targetCTC: formData.ctc * 1.25,
        city: formData.city,
        experience: formData.experience,
        industry: formData.industry,
        designation: formData.designation
      },
      theme: { color: '#16a34a' },
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
        <title>Professional Salary Negotiation Letter - ₹499 | Negotiate 15-30% Higher | SalaryCalc</title>
        <meta name="description" content="Get a data-driven professional negotiation letter that helps you get 15-30% higher salary. Includes market research, benchmarking, and ROI justification. Instant delivery." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
              <TrendingUp className="w-4 h-4" />
              456 professionals negotiated higher salaries this month
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Negotiate 15-30% Higher<br />
              <span className="text-yellow-300">Without Awkward Conversations</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto leading-relaxed">
              Professional, data-driven business letter that makes your case for a salary increase. Includes market research, benchmarking data, and ROI justification your employer can't ignore.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm mb-8">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>Average 22% increase</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Ready in 2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>456+ success stories</span>
              </div>
            </div>

            <button
              onClick={handleBuyNow}
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-green-700 font-bold px-10 py-5 rounded-xl text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
            >
              <Briefcase className="w-6 h-6" />
              Get My Negotiation Letter - ₹499
              <TrendingUp className="w-5 h-5" />
            </button>
            
            <p className="text-sm mt-4 opacity-90">⚡ Delivered instantly • Average ₹2.5L annual increase</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Results Banner - NEW */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl p-8 mb-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Real Results from Real People</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl font-extrabold text-green-600 mb-2">₹2.5L</div>
              <div className="text-gray-700 font-semibold">Average Annual Increase</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-green-600 mb-2">22%</div>
              <div className="text-gray-700 font-semibold">Average Salary Hike</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-green-600 mb-2">456+</div>
              <div className="text-gray-700 font-semibold">Successful Negotiations</div>
            </div>
          </div>
        </div>

        {/* Pricing Box - NEW LOW PRICE */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-2xl p-10 mb-16 text-center border-2 border-green-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-200/30 rounded-full -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 shadow-lg animate-pulse">
              🔥 PRICE DROP: WAS ₹1,499 - NOW ₹499!
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-2xl text-gray-400 line-through">₹1,499</span>
              <span className="text-6xl md:text-7xl font-extrabold text-green-600">₹499</span>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-sm">
                SAVE<br/>₹1,000
              </div>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              One negotiation = ₹2.5L extra annually = 500x ROI
            </p>
            
            <button
              onClick={handleBuyNow}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 px-8 rounded-xl text-2xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 mb-4"
            >
              Get My Letter Now - ₹499 →
            </button>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Money-Back</span>
              </div>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <div className="bg-white rounded-2xl shadow-lg p-10 mb-16">
          <h2 className="text-4xl font-bold mb-3 text-center text-gray-900">What's In Your Negotiation Letter</h2>
          <p className="text-center text-gray-600 mb-10">Professional 3-page business letter + supporting data</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                icon: '📊', 
                title: 'Market Benchmarking Data', 
                desc: 'Salary data from your industry, role, city, and experience level. Shows what your peers are earning - proves you\'re underpaid if true.'
              },
              { 
                icon: '💼', 
                title: 'Your Value Proposition', 
                desc: 'Professionally written highlights of your contributions, achievements, and value you bring to the company. Makes your case compelling.'
              },
              { 
                icon: '📈', 
                title: 'ROI Justification', 
                desc: 'Shows how your work generates value for the company. Proves that investing in your salary increase is profitable for them.'
              },
              { 
                icon: '🎯', 
                title: 'Specific Salary Request', 
                desc: 'Data-driven target CTC with justification. Not just "I want more" - shows exactly why you deserve 15-30% more.'
              },
              { 
                icon: '📝', 
                title: 'Professional Business Format', 
                desc: 'Proper business letter format that HR and managers respect. Polite, assertive tone that gets taken seriously.'
              },
              { 
                icon: '🔄', 
                title: 'Multiple Use Cases', 
                desc: 'Works for appraisals, promotions, counter-offers, job switches. Adaptable template you can customize.'
              },
              { 
                icon: '⚡', 
                title: 'Ready to Send', 
                desc: 'Just add your manager\'s name and send. No editing needed. Saves hours of writing and research.'
              },
              { 
                icon: '📧', 
                title: 'Email + PDF Formats', 
                desc: 'Get both email version (copy-paste ready) and formal PDF letter. Use whichever works better for your company culture.'
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

        {/* Success Stories */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-10 mb-16 border border-green-100">
          <h2 className="text-4xl font-bold mb-3 text-center text-gray-900">Success Stories</h2>
          <p className="text-center text-gray-600 mb-10">Real professionals who got what they deserved</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Vikram Reddy', 
                role: 'DevOps Engineer', 
                company: 'Product Company, Bangalore',
                image: 'V',
                before: '₹18 LPA',
                after: '₹22 LPA',
                increase: '22%',
                text: 'Used this letter during my appraisal. The data was so solid, my manager couldn\'t argue. Got 22% raise instead of standard 8%. Best ₹499 investment ever!' 
              },
              { 
                name: 'Sneha Kapoor', 
                role: 'Marketing Manager', 
                company: 'SaaS Startup, Gurgaon',
                image: 'S',
                before: '₹12 LPA',
                after: '₹16 LPA',
                increase: '33%',
                text: 'Was nervous about asking for raise. This letter did the heavy lifting for me. Presented it professionally and got 33% increase! Manager appreciated the data-driven approach.' 
              },
              { 
                name: 'Karthik Iyer', 
                role: 'Senior Consultant', 
                company: 'Consulting Firm, Mumbai',
                image: 'K',
                before: '₹25 LPA',
                after: '₹31 LPA',
                increase: '24%',
                text: 'Had competing offer but wanted to stay. Used this letter to counter-negotiate. Got 24% bump + promotion! The ROI justification section was killer.' 
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {t.image}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.role}</div>
                    <div className="text-xs text-gray-500">{t.company}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-red-50 rounded">
                    <div className="text-xs text-gray-600">Before</div>
                    <div className="font-bold text-red-600">{t.before}</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-xs text-gray-600">After</div>
                    <div className="font-bold text-green-600">{t.after}</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-xs text-gray-600">Increase</div>
                    <div className="font-bold text-blue-600">+{t.increase}</div>
                  </div>
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

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-10 mb-16">
          <h2 className="text-4xl font-bold mb-10 text-center text-gray-900">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', icon: '📝', title: 'Enter Details', desc: 'Current CTC, role, experience' },
              { step: '2', icon: '⚡', title: 'Get Letter', desc: 'Delivered in 2 minutes via email' },
              { step: '3', icon: '✏️', title: 'Customize', desc: 'Add manager name, minor edits' },
              { step: '4', icon: '📧', title: 'Send & Win', desc: 'Present to manager, get raise!' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
                  {item.icon}
                </div>
                <div className="text-green-600 font-bold mb-2">Step {item.step}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why This Works */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-10 mb-16 border border-blue-100">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Why This Works</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Data beats emotions</h3>
                <p className="text-gray-600">Instead of "I deserve more", you show market data proving you're underpaid. Managers can't argue with numbers.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Professional format commands respect</h3>
                <p className="text-gray-600">A well-written business letter gets taken seriously. Shows you're serious and professional about your career.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">ROI justification makes it easy to say yes</h3>
                <p className="text-gray-600">When you show how your work generates value, approving your raise becomes a smart business decision.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Removes awkwardness</h3>
                <p className="text-gray-600">No uncomfortable face-to-face negotiation. Present your case in writing, let the data speak for you.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div id="form" className="bg-white rounded-2xl shadow-2xl p-10 mb-16 border-2 border-green-600">
            <h2 className="text-4xl font-bold mb-3 text-center text-gray-900">Get Your Negotiation Letter</h2>
            <p className="text-center text-gray-600 mb-8">Enter your details for personalized letter</p>
            
            <form onSubmit={handlePayment} className="max-w-2xl mx-auto space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none transition-all text-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none transition-all text-lg"
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
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none transition-all text-lg"
                />
                <input
                  type="number"
                  name="ctc"
                  placeholder="Current Annual CTC (₹) *"
                  value={formData.ctc}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none transition-all text-lg"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-5">
                <select 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  className="p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none transition-all text-lg"
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
                  placeholder="Experience (years) *"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none transition-all text-lg"
                />
                
                <select 
                  name="industry" 
                  value={formData.industry} 
                  onChange={handleChange} 
                  className="p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none transition-all text-lg"
                >
                  <option>IT/Software</option>
                  <option>Finance/Banking</option>
                  <option>Consulting</option>
                  <option>Healthcare</option>
                  <option>Other</option>
                </select>
              </div>
              
              <input
                type="text"
                name="designation"
                placeholder="Current Designation *"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none transition-all text-lg"
              />
              
              <button
                type="submit"
                disabled={loading || !scriptLoaded}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-5 rounded-xl text-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
              >
                {loading ? 'Processing...' : !scriptLoaded ? 'Loading...' : '💳 Pay ₹499 & Get My Letter'}
              </button>
              
              <p className="text-center text-sm text-gray-600 pt-2">
                🔒 Secure payment • ⚡ 2-min delivery • 💯 Money-back guarantee
              </p>
            </form>
          </div>
        )}

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Questions?</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { 
                q: 'Will this really help me get a raise?', 
                a: '456 professionals have used this letter successfully with average 22% increase. It works because it\'s data-driven and professional. However, results depend on your company\'s policies and budget.' 
              },
              { 
                q: 'Can I customize the letter?', 
                a: 'Absolutely! You get an editable version. The core structure and data stays, but you can add your specific achievements, change tone, or adjust the target salary.' 
              },
              { 
                q: 'What if my company says no?', 
                a: 'Then you have a professional document proving your market value - perfect for your next job interview! Plus, 7-day money-back guarantee if not satisfied.' 
              },
              { 
                q: 'Is this only for IT professionals?', 
                a: 'No! Works for ANY industry - finance, consulting, healthcare, manufacturing, retail. We customize based on YOUR industry and role.' 
              }
            ].map((faq, i) => (
              <div key={i} className="pb-6 border-b border-gray-200 last:border-0">
                <h3 className="font-bold text-lg mb-3 text-green-600">Q: {faq.q}</h3>
                <p className="text-gray-700 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <button
            onClick={handleBuyNow}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-12 py-6 rounded-xl text-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
          >
            <Briefcase className="w-6 h-6" />
            Get My Letter - ₹499 (Save ₹1,000!)
          </button>
          <p className="text-gray-600 mt-4">Average ₹2.5L annual increase = 500x ROI</p>
        </div>
      </div>
    </div>
  );
}
