import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

import SalaryCalculator from '@/components/ui/salary-calculator';
import FAQ from '@/components/faq';
import MonetizationSection from '@/components/monetization-section';
import { injectionSchema } from '@/utils/seoUtils';
import rawPosts from '@/posts.json';

/* Safe blog posts handling */
const posts = Array.isArray(rawPosts)
  ? rawPosts
  : rawPosts?.posts ?? [];

const STATE_LINKS = [
  { name: 'Maharashtra', slug: 'maharashtra' },
  { name: 'Karnataka', slug: 'karnataka' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Tamil Nadu', slug: 'tamil-nadu' },
  { name: 'Telangana', slug: 'telangana' },
  { name: 'Gujarat', slug: 'gujarat' },
  { name: 'Haryana', slug: 'haryana' },
  { name: 'Punjab', slug: 'punjab' },
  { name: 'Rajasthan', slug: 'rajasthan' },
  { name: 'West Bengal', slug: 'west-bengal' },
  { name: 'Uttar Pradesh', slug: 'uttar-pradesh' },
  { name: 'Madhya Pradesh', slug: 'madhya-pradesh' },
];

export default function Home() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const homeSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'In-Hand Salary Calculator India 2025-26 & 2026-27: 8th Pay Commission Impact',
      description: 'Accurate In-Hand Salary Calculator for India (FY 2025-26 & 2026-27). Compare Old vs New Tax Regime, estimate 8th Pay Commission hike, and calculate take-home salary.',
      url: 'https://salarycalc.in/',
      mainEntity: {
        '@type': 'SoftwareApplication',
        name: 'In-Hand Salary Calculator India',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
      },
    };

    injectionSchema(homeSchema, 'homepage-schema');
  }, []);

  return (
    <>
      <Helmet>
        <title>In-Hand Salary Calculator India 2025-26 & 2026-27 | 8th Pay Commission</title>
        <meta
          name="description"
          content="Calculate your exact in-hand salary for FY 2025-26 and 2026-27. Compare Old vs New Tax Regime, PF, PT, TDS & 8th Pay Commission impact."
        />
        <meta
          name="keywords"
          content="in-hand salary calculator india, 8th pay commission calculator, salary calculator 2025-26, 2026-27 tax calculator, old vs new tax regime"
        />
        <link rel="canonical" href="https://salarycalc.in/" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* HERO */}
        <section className="py-14 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              In-Hand Salary Calculator India 2025-27
            </motion.h1>
            <p className="text-xl text-blue-100">
              Updated for 8th Pay Commission & FY 2026-27 Tax Slabs
            </p>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Salary & 8th CPC Calculator</h2>
              <SalaryCalculator />
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow sticky top-20">
              <h3 className="font-bold mb-4">8th Pay Commission Ready</h3>
              <p className="text-sm text-gray-600 mb-4">
                Estimate your revised salary with the expected 8th CPC fitment factors (1.92x to 2.86x).
              </p>
              <ul className="space-y-2 text-sm">
                <li>✓ Old vs New Regime 2025-27</li>
                <li>✓ State-wise Professional Tax</li>
                <li>✓ HRA Exemption Logic</li>
                <li>✓ 0% PF Option Included</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION FOR SEO */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 prose prose-blue">
            <h2 className="text-3xl font-bold mb-6">Understanding 8th Pay Commission & FY 2026-27 Tax Changes</h2>
            <p>
              As we approach the implementation of the <strong>8th Pay Commission</strong> in 2026, central government employees and private sector professionals alike are looking for accurate ways to estimate their future take-home pay. Our calculator is designed to handle these complex transitions seamlessly.
            </p>
            <h3>How to Calculate 8th Pay Commission Salary?</h3>
            <p>
              The 8th CPC salary is typically calculated using a <strong>Fitment Factor</strong> applied to the current basic pay. While the government is yet to finalize the factor, experts suggest a range between 1.92 and 2.86. Our tool allows you to toggle this impact and see how it affects your monthly in-hand salary after tax.
            </p>
            <h3>FY 2025-26 vs FY 2026-27: Which Regime to Choose?</h3>
            <p>
              With the New Tax Regime becoming the default, it's crucial to compare it with the Old Regime, especially if you have significant investments under Section 80C or high HRA. Our calculator provides a side-by-side comparison for both financial years to help you maximize your savings.
            </p>
          </div>
        </section>

        {/* STATE LINKS */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              State-wise Salary Calculators
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {STATE_LINKS.map((state, i) => (
                <motion.div
                  key={state.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/salary-calculator/${state.slug}`}
                    className="block bg-white p-4 rounded-lg shadow text-center font-semibold hover:bg-blue-50 hover:text-blue-600"
                  >
                    {state.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <FAQ />
          </div>
        </section>

        {/* MONETIZATION */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <MonetizationSection />
          </div>
        </section>
      </div>
    </>
  );
}
