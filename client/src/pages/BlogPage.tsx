import React from 'react';
import { Link } from 'react-router-dom';
import posts from '../posts.json';

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2">
              <Link to={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{post.date}</span>
              <Link to={`/blog/${post.slug}`} className="text-blue-500 hover:text-blue-700 font-semibold">
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
