import React from 'react';
import { Link } from 'wouter';
import posts from '../posts.json';
import Navbar from "@/components/navbar";
import { Helmet } from "react-helmet-async";

const BlogPage: React.FC = () => {
  // Sort posts by ID descending to show latest first
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>SalaryCalc.in Blog: Tax Saving & Salary Planning Insights</title>
        <meta name="description" content="Expert insights on tax saving, salary planning, and financial growth in India. Stay updated with the latest 8th Pay Commission news and tax regime changes." />
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Blog</h1>
          <p className="text-lg text-gray-600">Expert insights on tax saving, salary planning, and financial growth in India.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                  {post.category || 'Tax Planning'}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold mb-3">
                <Link href={`/blog/${post.slug}`} className="text-gray-900 hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
              <div className="mt-auto">
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-primary hover:gap-2 transition-all font-semibold text-sm">
                  Read Full Article <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
