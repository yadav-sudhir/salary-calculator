import { motion } from "framer-motion";
import { Link } from "wouter";
import SalaryCalculator from "@/components/ui/salary-calculator";
import FAQ from "@/components/faq";
import MonetizationSection from "@/components/monetization-section";
import { FY_YEAR } from "@/lib/tax-constants";
import posts from '../posts.json';
import Navbar from "@/components/navbar";
import { Helmet } from "react-helmet-async";

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
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight"
            >
              8th Pay Commission & In-Hand Salary Calculator <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">India FY 2026-27</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Calculate your exact monthly take-home salary. Compare Old vs New Regime tax savings instantly. Accurate, updated, and free.
            </motion.p>
          </div>
        </section>

        {/* Ad Placeholder Top */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
           <div className="bg-gray-100 rounded-lg h-[90px] w-full flex items-center justify-center text-gray-400 border border-gray-200 border-dashed text-sm">
             AdSense Placeholder (Display Ad)
           </div>
        </div>

        {/* Calculator Application */}
        <section id="calculator" className="px-4">
           <SalaryCalculator />
        </section>

        {/* Ad Placeholder Middle */}
        <div className="max-w-4xl mx-auto px-4 my-12">
           <div className="bg-gray-100 rounded-lg h-[90px] w-full flex items-center justify-center text-gray-400 border border-gray-200 border-dashed text-sm">
             AdSense Placeholder (In-Article Ad)
           </div>
        </div>

        {/* Monetization Section - MOVED ABOVE FAQ FOR BETTER CONVERSION */}
        <section className="px-4">
          <MonetizationSection />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 bg-gray-50">
           <div className="px-4">
             <FAQ />
           </div>
        </section>

        {/* SEO Content Section */}
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

        {/* Latest Blog Posts Section */}
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
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 transition-all hover:shadow-md hover:border-primary/20">
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white font-bold text-sm">₹</div>
               <span className="font-heading font-bold text-lg text-gray-900">SalaryCalc</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Empowering Indian employees with transparent salary insights. Updated for the <span className="font-bold">8th Pay Commission</span> and <span className="font-bold">FY 2026-27</span> tax rules.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
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
      
      {/* Ad Placeholder Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 p-2 z-50 text-center shadow-lg">
         <div className="max-w-3xl mx-auto bg-gray-100 h-[50px] flex items-center justify-center text-gray-400 text-xs border border-gray-200 border-dashed">
            AdSense Sticky Footer Ad
         </div>
      </div>
    </div>
  );
}
