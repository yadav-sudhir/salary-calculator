import React from 'react';
import { useRoute, Link } from 'wouter';
import posts from '../posts.json';
import Navbar from "@/components/navbar";
import { Helmet } from "react-helmet-async";

const PostPage: React.FC = () => {
  const [match, params] = useRoute('/blog/:slug');
  const slug = params?.slug as string;
  const post = posts.find((p) => p.slug === slug);

  if (!match || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{post.metaTitle || post.title}</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.metaTitle || post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta name="twitter:title" content={post.metaTitle || post.title} />
        <meta name="twitter:description" content={post.metaDescription || post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <link rel="canonical" href={`https://salarycalc.in/blog/${post.slug}`} />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <div className="mb-8">
            <Link href="/blog" className="text-primary font-medium hover:underline mb-6 inline-block">
              ← Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                {post.category || 'Tax Planning'}
              </span>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 border-t border-b border-gray-50 py-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                {post.author?.charAt(0) || 'S'}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{post.author || 'Sudhir Yadav'}</p>
                <p className="text-xs text-gray-500">Financial Strategist</p>
              </div>
            </div>
          </div>

          <div 
            className="prose prose-blue lg:prose-xl max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold mb-4">Share this article</h3>
            <div className="flex gap-4">
              <a 
                href={`https://twitter.com/intent/tweet?url=https://salarycalc.in/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=https://salarycalc.in/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://salarycalc.in/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostPage;
