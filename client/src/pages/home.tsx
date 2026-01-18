import { motion } from 'framer-motion';
import { Link } from 'wouter';
import SalaryCalculator from '@/components/ui/salary-calculator';
import FAQ from '@/components/faq';
import MonetizationSection from '@/components/monetization-section';
import { Helmet } from 'react-helmet';
import { injectionSchema } from '@/utils/seoUtils';
import { useEffect } from 'react';
import posts from '@/posts.json';

const STATE_LINKS = [
  { name: 'Maharashtra', slug: 'maharashtra' },
  { name: 'Karnataka', slug: 'karnataka' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Tamil Nadu', slug: 'tamil-nadu' },
  { name: 'Telangana', slug: 'telangana' },
  { name: 'Gujarat', slug: 'gujarati' },
  { name: 'Haryana', slug: 'haryana' },
  { name: 'Punjab', slug: 'punjab' },
  { name: 'Rajasthan', slug: 'rajasthan' },
  { name: 'West Bengal', slug: 'west-bengal' },
  { name: 'Uttar Pradesh', slug: 'uttar-pradesh' },
  { name: 'Madhya Pradesh', slug: 'madhya-pradesh' },
];

export default function Home() {
  useEffect(() => {
    // Inject homepage schema
    const homeSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'In-Hand Salary Calculator India 2026-27: Old vs New Tax Regime, 8th Pay Commission, CTC to Take Home Pay',
      'description': 'Accurate In-Hand Salary Calculator for India (FY 2026-27). Instantly compare Old vs New Tax Regime, calculate CTC to take-home pay, and check 8th Pay Commission impact.',
      'url': 'https://salarycalc.in/',
      'mainEntity': {
        '@type': 'SoftwareApplication',
        'name': 'In-Hand Salary Calculator India',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'All',
        'url': 'https://salarycalc.in/',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock',
        },
        'featureList': [
          'Old vs New Tax Regime Comparison',
          '8th Pay Commission Calculator',
          'State-Specific Professional Tax',
          'HRA Exemption Calculator',
          'PF and EPF Deduction Calculator',
        ],
      },
    };
    injectionSchema(homeSchema, 'homepage-schema');
  }, []);

  return (
    <>
      <Helmet>
        <title>In-Hand Salary Calculator India 2026-27: Old vs New Tax Regime, 8th Pay Commission, CTC to Take Home Pay</title>
        <meta
          name="description"
          content="Accurate In-Hand Salary Calculator for India (FY 2026-27). Instantly compare Old vs New Tax Regime, calculate CTC to take-home pay, and check 8th Pay Commission impact."
        />
        <meta name="keywords" content="salary calculator india, in-hand salary calculator, tax calculator, 8th pay commission, old vs new tax regime" />
        <link rel="canonical" href="https://salarycalc.in/" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                In-Hand Salary Calculator India 2026-27
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Calculate your exact monthly take-home salary. Compare Old vs New Regime tax savings instantly. Accurate, updated, and free.
              </p>
              <p className="text-lg text-blue-200 mb-8">
                ✨ Now with 8th Pay Commission Support for Government Employees
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Calculator Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Salary Details</h2>
                  <p className="text-gray-600 mb-6">Enter your salary components for FY 2026-27</p>
                  <SalaryCalculator />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-blue-50 rounded-lg p-6 sticky top-20">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to Calculate?</h3>
                  <p className="text-gray-600 mb-6">
                    Enter your CTC details on the left to see your detailed salary breakdown.
                  </p>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span>Includes all deductions (PF, PT, Income Tax)</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span>Compare Old vs New Tax Regime</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span>8th Pay Commission Support</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-blue-600 font-bold mr-2">✓</span>
                      <span>State-specific calculations</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 8th Pay Commission Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                8th Pay Commission Salary Calculator
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Check how the 8th Pay Commission will impact your take-home salary. Our calculator applies the latest pay commission multipliers to show you the exact salary increase and revised deductions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="text-4xl font-bold text-green-600 mb-4">2.86x</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Pay Commission Multiplier</h3>
                <p className="text-gray-600">
                  Historical average multiplier based on previous pay commission implementations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="text-4xl font-bold text-blue-600 mb-4">Government</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Employee Focus</h3>
                <p className="text-gray-600">
                  Specifically designed for government employees affected by pay commission changes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="text-4xl font-bold text-purple-600 mb-4">Instant</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Results</h3>
                <p className="text-gray-600">
                  See the impact immediately with our real-time calculation engine.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* State-Specific Calculators Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                State-Specific Salary Calculators (FY 2026-27)
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional Tax (PT) varies by state in India. Select your state to get accurate calculations tailored to your region.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {STATE_LINKS.map((state, index) => (
                <motion.div
                  key={state.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                >
                  <Link href={`/salary-calculator/${state.slug}`}>
                    <a className="block bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center font-semibold text-gray-900 hover:text-blue-600 hover:bg-blue-50">
                      {state.name}
                    </a>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <FAQ />
          </div>
        </section>

        {/* Monetization Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MonetizationSection />
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
              The Most Accurate In-Hand Salary Calculator for India (FY 2026-27)
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Stop guessing your take-home pay. Our tool provides a transparent, step-by-step breakdown of every deduction, ensuring you get the most accurate in-hand salary figure. We are constantly updated to reflect the latest budget changes and tax slabs for the current financial year.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Instantly Compare Old vs. New Tax Regime for Maximum Savings
                </h3>
                <p className="text-gray-600">
                  Choosing the right tax regime is the single biggest financial decision for salaried individuals. Our unique comparison feature instantly shows you the exact tax liability and savings under both the Old Tax Regime (with deductions like 80C, HRA, etc.) and the New Tax Regime (with lower tax rates).
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Detailed Breakdown: CTC to In-Hand Salary Components
                </h3>
                <p className="text-gray-600">
                  Your Cost to Company (CTC) is broken down by mandatory deductions: Income Tax (TDS), Employee Provident Fund (EPF), and Professional Tax (PT). We provide 100% transparency, allowing you to gain clarity and take control of your financial planning.
                </p>
              </motion.div>
            </div>

            {/* Blog Posts */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Latest from Blog</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.slice(0, 2).map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                  >
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">{post.title}</h4>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`}>
                        <a className="text-blue-600 hover:text-blue-800 font-semibold">
                          Read More →
                        </a>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/blog">
                  <a className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
                    View All Posts →
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
