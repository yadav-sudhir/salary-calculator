import React, { useState } from 'react';
import { useLocation } from 'wouter';

const AdminPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace 'your_secure_password' with your actual password or use env variables
    if (password === 'admin123') {
      setIsAuthorized(true);
    } else {
      alert('Incorrect Password');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, password })
      });

      if (response.ok) {
        alert('Article Published Successfully!');
        setLocation('/blog');
      } else {
        alert('Failed to publish article');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="w-full p-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full p-2 text-white bg-primary rounded">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border rounded-md p-2"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (URL path)</label>
          <input
            type="text"
            required
            placeholder="e.g., how-to-calculate-salary"
            className="mt-1 block w-full border rounded-md p-2"
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Excerpt (Short Summary)</label>
          <textarea
            required
            className="mt-1 block w-full border rounded-md p-2 h-20"
            value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content (HTML allowed)</label>
          <textarea
            required
            className="mt-1 block w-full border rounded-md p-2 h-40 font-mono text-sm"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
          />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-primary/90">
          Publish Article
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
