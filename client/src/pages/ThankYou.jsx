import React from 'react';
import { Link } from 'wouter';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your report is being generated and will be delivered to your email within 2 minutes.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700 mb-2">
            Check your email (including spam folder) for:
          </p>
          <ul className="text-sm text-left space-y-1 text-gray-600">
            <li>✓ Your personalized report</li>
            <li>✓ Payment receipt</li>
          </ul>
        </div>
        <Link href="/">
          <a className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}
