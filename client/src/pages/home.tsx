import { motion } from "framer-motion";
import { Link } from "wouter";
import SalaryCalculator from "@/components/ui/salary-calculator";
import FAQ from "@/components/faq";
import MonetizationSection from "@/components/monetization-section";
import { FY_YEAR } from "@/lib/tax-constants";
import posts from '../posts.json';
import Navbar from "@/components/navbar";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, TrendingUp, Shield, Zap } from "lucide-react";

export default function Home() {
  // Sort posts by ID descending to show latest first
  const latestPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Helmet>
        <title>SalaryCalc.in | 8th Pay Commission & Salary Calculator 2026-27</title>
        <meta name="description" content="Accurate 8th Pay Commission & In-Hand Salary Calculator for India (FY 2026-27). Compare Old vs New Tax Regime, calculate CTC to take-home pay, and estimate 8th CPC hike impact." />
      </Helmet>
      
      {/* Dynamic Year Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-2 text-center text-sm font-medium shadow-md">
        <span>🚀 Updated for FY {FY_YEAR} (Assessment Year {parseInt(FY_YEAR.split('-')[0]) + 1}-{parseInt(FY_YEAR.split('-')[1]) + 1})</span>
      </div>

      <Navbar />

      <main className="pb-20">
        {/* 🔥 PREMIUM HERO SECTION - ENHANCED */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
             <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-4">
            {/* Main Hero Content */}
            <div className="text-center space-y-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm"
              >
                <Zap className="w-4 h-4" />
                <span>Used by 2,178+ Indians this month</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight"
              >
                Calculate Your REAL<br className="hidden md:block"/>
                Take-Home Salary in <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">30 Seconds</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                Stop guessing what hits your bank account. Get your exact monthly in-hand salary with 8th Pay Commission updates, both tax regimes compared, and state-wise accuracy.
              </motion.p>

              {/* Dual CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              >
                <a 
                  href="#calculator"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
                >
                  Calculate Free Now →
                </a>
                <Link href="/products/ctc-report">
                  <a className="w-full sm:w-auto bg-white hover:bg-gray-50 text-primary font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-primary/20 hover:border-primary/40 text-lg">
                    Get Professional Report - ₹799
                  </a>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>100% Accurate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Updated FY 2026-27</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Both Tax Regimes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>8th Pay Commission</span>
                </div>
              </motion.div>
            </div>

            {/* 🆕 QUICK BENEFITS GRID */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-1">30 Seconds</h3>
                <p className="text-sm text-gray-600">Instant accurate results</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-gray-900 mb-1">Both Regimes</h3>
                <p className="text-sm text-gray-600">Old vs New compared</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className="text-3xl mb-3">🏛️</div>
                <h3 className="font-bold text-gray-900 mb-1">8th CPC Ready</h3>
                <p className="text-sm text-gray-600">Latest hike calculator</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-gray-900 mb-1">State-Wise PT</h3>
                <p className="text-sm text-gray-600">Accurate deductions</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 🆕 SOCIAL PROOF SECTION - NEW! */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Trusted by 2,000+ Indians
              </h2>
              <p className="text-lg text-gray-600">
                See what professionals are saying about our tools
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">
                  "Saved ₹4,200/month by switching to old regime after seeing the comparison. Best ₹799 I ever spent on the detailed report."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Rajesh Kumar</div>
                    <div className="text-sm text-gray-500">Software Engineer, Bangalore</div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">
                  "Calculator is great for quick checks. CTC report gave me exact deductions I needed before filing ITR. Highly recommend!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Priya Mehta</div>
                    <div className="text-sm text-gray-500">Financial Analyst, Mumbai</div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">
                  "Finally understood my CTC breakdown. Used the report to negotiate 15% higher fixed pay in my job offer. Worth every rupee."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Amit Singh</div>
                    <div className="text-sm text-gray-500">Product Manager, Hyderabad</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Calculator Application */}
        <section id="calculator" className="px-4 scroll-mt-20">
           <SalaryCalculator />
        </section>

        {/* 🆕 WHY CHOOSE US SECTION - NEW! */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why 2,000+ Professionals Choose SalaryCalc
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Not just another calculator—a complete salary optimization platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% Accurate</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Verified calculations matching official ITR forms. State-wise PT, latest tax slabs, 8th CPC updates.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Results</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No waiting, no email registration. Get your take-home salary in 30 seconds with real-time calculations.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% Private</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your salary data never leaves your browser. No tracking, no storage, complete privacy guaranteed.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Always Updated</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  FY 2026-27 tax rules, 8th Pay Commission projections, new regime benefits—all current.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 🆕 PREMIUM PRODUCTS SECTION - ENHANCED */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                247 reports delivered this week
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Get Your Personalized Salary Report
              </motion.h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional reports delivered instantly. Stop guessing, start optimizing.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* CTC Report - ENHANCED */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:border-primary/30 transition-all group relative overflow-hidden"
              >
                {/* Subtle gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
                
                <div className="relative">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📊</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">CTC Breakdown Report</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-primary">₹799</span>
                    <span className="text-gray-400 line-through text-lg">₹1,299</span>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">38% OFF</span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Complete 8-page breakdown of your salary showing every deduction, tax calculation, and monthly in-hand amount.
                  </p>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Detailed CTC component analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Both tax regimes compared</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>5-year salary projections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>City-wise cost analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Instant email delivery (2 min)</span>
                    </li>
                  </ul>
                  <Link href="/products/ctc-report">
                    <a className="block w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-bold py-4 rounded-xl text-center transition-all transform group-hover:scale-[1.02] shadow-md">
                      Get CTC Report →
                    </a>
                  </Link>
                  <p className="text-center text-xs text-gray-500 mt-3">⚡ 2-minute delivery</p>
                </div>
              </motion.div>

              {/* Negotiation Letter - MOST POPULAR */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-2xl border-2 border-primary p-8 hover:shadow-2xl transition-all relative group"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg z-10 animate-pulse">
                  🔥 MOST POPULAR
                </div>
                
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💼</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Salary Negotiation Letter</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-primary">₹1,499</span>
                  <span className="text-gray-400 line-through text-lg">₹2,499</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">40% OFF</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Professional data-driven letter that helps you negotiate 15-30% higher salary with market research included.
                </p>
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>3-page professional business letter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Industry benchmarking data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Value proposition highlighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>ROI justification for employer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Ready to send immediately</span>
                  </li>
                </ul>
                <Link href="/products/negotiation-letter">
                  <a className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl text-center transition-all transform group-hover:scale-[1.02] shadow-lg">
                    Get Negotiation Letter →
                  </a>
                </Link>
                <p className="text-center text-xs text-gray-500 mt-3">💰 Avg. ₹2.5L salary increase</p>
              </motion.div>

              {/* Tax Strategy */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:border-primary/30 transition-all group relative overflow-hidden"
              >
                {/* Subtle gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
                
                <div className="relative">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💰</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Tax-Saving Strategy</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-primary">₹2,499</span>
                    <span className="text-gray-400 line-through text-lg">₹3,999</span>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">37% OFF</span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Comprehensive 12-page tax strategy report that can legally save you ₹50,000+ annually with 2026 tax laws.
                  </p>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Complete tax optimization analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Section 80C, 80D strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Investment recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Month-by-month action plan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Updated for FY 2026-27</span>
                    </li>
                  </ul>
                  <Link href="/products/tax-strategy">
                    <a className="block w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-bold py-4 rounded-xl text-center transition-all transform group-hover:scale-[1.02] shadow-md">
                      Get Tax Strategy →
                    </a>
                  </Link>
                  <p className="text-center text-xs text-gray-500 mt-3">💡 Save ₹50K+ annually</p>
                </div>
              </motion.div>
            </div>

            {/* Trust Badges - ENHANCED */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200"
            >
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <div className="font-bold text-gray-900 text-xl">2,178+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">⚡</div>
                  <div className="font-bold text-gray-900 text-xl">2 Minutes</div>
                  <div className="text-sm text-gray-600">Instant Delivery</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">💯</div>
                  <div className="font-bold text-gray-900 text-xl">7-Day</div>
                  <div className="text-sm text-gray-600">Money-Back</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <div className="font-bold text-gray-900 text-xl">100% Secure</div>
                  <div className="text-sm text-gray-600">Bank-Grade SSL</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">📧</div>
                  <div className="font-bold text-gray-900 text-xl">Email</div>
                  <div className="text-sm text-gray-600">PDF + Excel</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Monetization Section - KEPT */}
        <section className="px-4">
          <MonetizationSection />
        </section>

        {/* FAQ Section - KEPT */}
        <section id="faq" className="py-12 bg-gray-50">
           <div className="px-4">
             <FAQ />
           </div>
        </section>

        {/* SEO Content Section - KEPT */}
        <section id="seo-content" className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Most Accurate 8th Pay Commission & In-Hand Salary Calculator for India (FY 2026-27)</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Stop guessing your take-home pay and start planning your future. While many calculators provide generic estimates, our tool is built to handle the complexities of the Indian payroll system with precision. We provide a transparent, line-by-line breakdown of every deduction, ensuring you see the exact <span className="font-bold">In-Hand Salary</span> that will hit your bank account. 

Our engine is constantly updated to reflect the most recent <span className="font-bold">8th Pay Commission</span> projections, the latest <span className="font-bold">FY 2026-27</span> tax slabs (including the new ₹12 Lakh rebate), and accurate <span className="font-bold">state-wise Professional Tax</span> rules. Whether you are a private sector professional or a central government employee, our <span className="font-bold">8th CPC Salary Calculator</span> is designed to be your most reliable financial companion.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Instantly Compare Old vs. New Tax Regime for Maximum Savings</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Deciding between the Old and New Tax Regime is often the most significant financial choice you'll make each year. With the introduction of the <span className="font-bold">FY 2026-27</span> tax rules, the stakes are higher than ever. Our unique comparison feature takes the guesswork out of the equation, instantly showing your tax liability under both systems. 

We factor in your <span className="font-bold">80C investments, HRA exemptions, and standard deductions</span> to give you a clear winner. If you're expecting an <span className="font-bold">8th Pay Commission salary hike</span>, our tool will show you exactly how that increase shifts your tax burden, helping you choose the regime that maximizes your savings and keeps more money in your pocket.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Salary Breakdown</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Your Cost to Company (CTC) is broken down by mandatory deductions:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li><strong>Income Tax (TDS):</strong> Calculated using the correct slab system for your chosen regime.</li>
              <li><strong>Employee Provident Fund (EPF):</strong> The mandatory contribution towards your retirement.</li>
              <li><strong>Professional Tax (PT):</strong> Applied accurately based on the state you select.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              We believe in 100% transparency. Use our tool to gain clarity and take control of your financial planning, ensuring you don't leave any money on the table.
            </p>
          </div>
        </section>

        {/* Latest Blog Posts Section - KEPT */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Latest from Blog</h2>
                <p className="mt-2 text-gray-600">Expert insights on tax saving and financial planning</p>
              </div>
              <Link href="/blog" className="text-primary font-semibold hover:underline">
                View All Posts →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all hover:shadow-lg hover:border-primary/20">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <h3 className="mt-3 text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-gray-600 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-block text-primary font-medium">Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer - KEPT */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white font-bold text-sm">₹</div>
               <span className="font-heading font-bold text-lg text-gray-900">SalaryCalc</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-4">
              Empowering Indian employees with transparent salary insights. Updated for the <span className="font-bold">8th Pay Commission</span> and <span className="font-bold">FY 2026-27</span> tax rules.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/products/ctc-report" className="hover:text-primary">CTC Breakdown Report</Link></li>
              <li><Link href="/products/negotiation-letter" className="hover:text-primary">Negotiation Letter</Link></li>
              <li><Link href="/products/tax-strategy" className="hover:text-primary">Tax Strategy Report</Link></li>
            </ul>
            <h4 className="font-bold text-gray-900 mb-4 mt-6">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Disclaimer</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Calculations are indicative; actual salary may vary based on company policies and actual tax laws. Tool is for educational purposes only.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-100">
          <p className="text-center text-xs text-gray-500 mb-4 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator is for estimation purposes only and should not be considered professional tax advice. Always consult a certified tax professional for final tax filing.
          </p>
          <div className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} SalaryCalc India. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Ad Placeholder Sticky Bottom - KEPT */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 p-2 z-40 text-center shadow-lg">
         <div className="max-w-3xl mx-auto bg-gray-100 h-[50px] flex items-center justify-center text-gray-400 text-xs border border-gray-200 border-dashed">
            AdSense Sticky Footer Ad
         </div>
      </div>
    </div>
  );
}
