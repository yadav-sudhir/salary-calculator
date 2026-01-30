// src/pages/About.jsx
// About SalaryCalc

import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About SalaryCalc</h1>
          <p className="text-xl text-gray-600">
            Helping Indians understand their salary and save on taxes
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            SalaryCalc was born from a simple observation: most salaried professionals in India 
            don't truly understand their CTC or how much they actually take home. We're on a mission 
            to change that by providing clear, accurate salary calculations and tax-saving strategies 
            tailored for the Indian workforce.
          </p>
        </div>

        {/* Story */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Started in 2024, SalaryCalc began as a simple calculator to help friends understand 
            their salary breakdowns. We quickly realized this was a problem millions of Indians faced.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Today, we've helped over 10,000+ professionals across India understand their salaries, 
            negotiate better offers, and save lakhs in taxes. Our AI-powered reports provide 
            personalized insights that would typically require expensive consultations with 
            CAs and financial advisors.
          </p>
        </div>

        {/* What We Do */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">What We Do</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="text-3xl">📊</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Salary Breakdowns</h3>
                <p className="text-gray-700">
                  Detailed CTC analysis showing exactly where your money goes
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">💼</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Negotiation Support</h3>
                <p className="text-gray-700">
                  Data-backed letters that help you negotiate higher salaries
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">💰</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Tax Optimization</h3>
                <p className="text-gray-700">
                  Personalized strategies to legally reduce your tax burden
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Free Calculators</h3>
                <p className="text-gray-700">
                  Easy-to-use tools for instant salary and tax calculations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Trust Us */}
        <div className="bg-blue-50 rounded-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Why Trust Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">✅ Accurate Calculations</h3>
              <p className="text-gray-700">
                Based on latest 2026 tax laws and verified by financial experts
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">🔒 Data Security</h3>
              <p className="text-gray-700">
                Your information is encrypted and never shared with third parties
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">⚡ Instant Results</h3>
              <p className="text-gray-700">
                AI-powered reports delivered to your email within 2 minutes
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">💯 Money-Back Guarantee</h3>
              <p className="text-gray-700">
                Not satisfied? Full refund within 7 days, no questions asked
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-700 leading-relaxed">
            We're a small team of engineers, financial experts, and AI specialists passionate about 
            making financial literacy accessible to every Indian. Our combined experience spans 
            software development, tax consulting, and personal finance education.
          </p>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="mb-6">We'd love to hear from you!</p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
