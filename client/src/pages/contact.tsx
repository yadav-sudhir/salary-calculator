import { Link } from "wouter";
import { ArrowLeft, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border p-8 md:p-12">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8">
           <ArrowLeft className="w-4 h-4 mr-1" /> Back to Calculator
        </Link>
        
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have questions, feedback, or want to collaborate with us?
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mt-8">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-gray-700 text-lg">
              For any questions, feedback, or inquiries, please email us at:
            </p>
            <a 
              href="mailto:SalaryCalc@proton.me" 
              className="text-2xl font-bold text-primary hover:underline mt-4 inline-block"
            >
              SalaryCalc@proton.me
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Response Time</h3>
              <p className="text-sm text-gray-600">We typically respond within 24-48 hours.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Support</h3>
              <p className="text-sm text-gray-600">Technical issues, feature requests, or general support.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Business Inquiry</h3>
              <p className="text-sm text-gray-600">Partnership opportunities and collaboration queries.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
