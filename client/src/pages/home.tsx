import { motion } from 'framer-motion';
import { Link } from 'wouter';
import SalaryCalculator from '@/components/ui/salary-calculator';
import FAQ from '@/components/faq';
import MonetizationSection from '@/components/monetization-section';
import { Helmet } from 'react-helmet';
import { injectionSchema } from '@/utils/seoUtils';
import { useEffect } from 'react';
import rawPosts from '@/posts.json';

const posts = Array.isArray(rawPosts)
  ? rawPosts
  : rawPosts?.posts ?? [];

const STATE_LINKS = [
  { name: 'Maharashtra', slug: 'maharashtra' },
  { name: 'Karnataka', slug: 'karnataka' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Tamil Nadu', slug: 'tamil-nadu' },
  { name: 'Telangana', slug: 'telangana' },
  { name: 'Gujarat', slug: 'gujarat' }, // ✅ fixed
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
      name:
        'In-Hand Salary Calculator India 2026-27: Old vs New Tax Regime, 8th Pay Commission, CTC to Take Home Pay',
      description:
        'Accurate In-Hand Salary Calculator for India (FY 2026-27). Instantly compare Old vs New Tax Regime, calculate CTC to take-home pay, and check 8th Pay Commission impact.',
      url: 'https://salarycalc.in/',
      mainEntity: {
        '@type': 'SoftwareApplication',
        name: 'In-Hand Salary Calculator India',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        url: 'https://salarycalc.in/',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
        featureList: [
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
        <title>
          In-Hand Salary Calculator India 2026-27: Old vs New Tax Regime, 8th Pay
          Commission, CTC to Take Home Pay
        </title>
        <meta
          name="description"
          content="Accurate In-Hand Salary Calculator for India (FY 2026-27). Instantly compare Old vs New Tax Regime, calculate CTC to take-home pay, and check 8th Pay Commission impact."
        />
        <meta
          name="keywords"
          content="salary calculator india, in-hand salary calculator, tax calculator, 8th pay commission, old vs new tax regime"
        />
        <link rel="canonical" href="https://salarycalc.in/" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* HERO */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                In-Hand Salary Calculator India 2026-27
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-6">
                Calculate your exact monthly take-home salary. Compare Old vs New
                Regime instantly.
              </p>
              <p className="text-lg text-blue-200">
                ✨ Now with 8th Pay Commission Support
              </p>
            </motion.div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-4">Salary Details</h2>
                <SalaryCalculator />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-blue-50 rounded-lg p-6 sticky top-20"
            >
              <h3 className="font-bold mb-4">Why Use This Calculator?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Old vs New Regime</li>
                <li>✓ PF, PT, TDS Included</li>
                <li>✓ State-wise accuracy</li>
                <li>✓ 8th Pay Commission ready</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* STATE LINKS */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              State-wise Salary Calculators
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {STATE_LINKS.map((state, index) => (
                <motion.div
                  key={state.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/salary-calculator/${state.slug}`}
                    className="block bg-white p-4 rounded-lg shadow text-center font-semibold hover:bg-blue-50 hover:text-blue-600 transition"
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

        {/* BLOG */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Latest from Blog</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {posts.slice(0, 2).map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 font-semibold hover:text-blue-800"
                  >
                    Read More →
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                View All Posts →
              </Link>
            </div>
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
