import React from 'react';
import { useParams, Link } from 'react-router-dom';
import posts from '../posts.json';

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-blue-500 mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-8">Published on {post.date}</p>
        <div 
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-12">
            <Link to="/blog" className="text-blue-600 hover:underline">&larr; Back to Blog</Link>
        </div>
      </article>
    </div>
  );
};

export default PostPage;
