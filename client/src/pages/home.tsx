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
      name:
        'In-Hand Salary Calculator India 2026-27: Old vs New Tax Regime, 8th Pay Commission',
      description:
        'Accurate In-Hand Salary Calculator for India (FY 2026-27). Compare Old vs New Tax Regime and calculate take-home salary.',
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
        <title>
          In-Hand Salary Calculator India 2026-27 | Old vs New Tax Regime
        </title>
        <meta
          name="description"
          content="Calculate your exact in-hand salary for FY 2026-27. Compare Old vs New Tax Regime, PF, PT, TDS & 8th Pay Commission impact."
        />
        <meta
          name="keywords"
          content="in-hand salary calculator india, salary calculator, old vs new tax regime, 8th pay commission"
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
              In-Hand Salary Calculator India 2026-27
            </motion.h1>
            <p className="text-xl text-blue-100">
              Know your real take-home salary in seconds
            </p>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Salary Details</h2>
              <SalaryCalculator />
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow sticky top-20">
              <h3 className="font-bold mb-4">Why this calculator?</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Old vs New Regime</li>
                <li>✓ PF, PT, TDS included</li>
                <li>✓ State-wise accuracy</li>
                <li>✓ 8th Pay Commission ready</li>
              </ul>
            </div>
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

        {/* BLOG */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Latest from Blog</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {posts.slice(0, 2).map(post => (
                <div
                  key={post.id}
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
                </div>
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
