import React from 'react';
import { useRoute, Link } from 'wouter';
import posts from '../posts.json';

const PostPage: React.FC = () => {
  const [match, params] = useRoute('/blog/:slug');
  const slug = params?.slug as string;
  const post = posts.find((p) => p.slug === slug);

  if (!match || !post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link href="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <Link href="/blog" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Blog</Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-8">Published on {post.date}</p>
        <div 
          className="prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default PostPage;
