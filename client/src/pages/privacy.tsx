import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border p-8 md:p-12">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8">
           <ArrowLeft className="w-4 h-4 mr-1" /> Back to Calculator
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none text-gray-600 space-y-4">
          <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
          
          <h3 className="text-gray-900">1. Information We Collect</h3>
          <p>
            We do not collect any personal identifiable information (PII) like your name, email, or phone number. 
            The salary details you enter (CTC, Bonus, Rent, etc.) are processed entirely within your browser 
            and are <strong>not sent to any server</strong>. We do not store your financial data anywhere.
          </p>

          <h3 className="text-gray-900">2. Cookies and Tracking</h3>
          <p>
            We use cookies and similar tracking technologies for analytics and ad personalization. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website. You can manage your cookie preferences in your browser settings.
          </p>

          <h3 className="text-gray-900">3. Google AdSense and DART Cookies</h3>
          <p>
            This website uses Google AdSense and the <strong>DART cookie</strong> for ad serving and personalization. Google uses the DART cookie to serve ads based on your interests. You may opt out of DART cookie personalization by visiting the <a href="https://ads.google.com/personalization/" className="text-primary hover:underline">Google Ads Settings</a> or the <a href="https://www.networkadvertising.org/managing/opt_out.asp" className="text-primary hover:underline">Network Advertising Initiative opt-out page</a>.
          </p>

          <h3 className="text-gray-900">4. Log Files and Analytics</h3>
          <p>
            Like most websites, we collect standard log information such as IP address, browser type, operating system, and pages accessed. This information is used solely for analytics and improving user experience. We do not link this data to personally identifiable information.
          </p>

          <h3 className="text-gray-900">5. Data Security</h3>
          <p>
            Since we do not store any user salary data on our servers, there is <strong>no risk of your financial data being compromised</strong> from our database. All calculations occur locally on your device using JavaScript, ensuring maximum privacy.
          </p>

          <h3 className="text-gray-900">6. Third-Party Links</h3>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of external sites. We encourage you to review their privacy policies.
          </p>

          <h3 className="text-gray-900">7. Changes to This Policy</h3>
          <p>
            We may update our Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by updating the "Effective Date" on this page. Your continued use of the website constitutes your acceptance of the updated policy.
          </p>

          <h3 className="text-gray-900">8. Contact Us</h3>
          <p>
            If you have any questions regarding this Privacy Policy, please contact us at <a href="mailto:support@salarycalc.in" className="text-primary hover:underline">support@salarycalc.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
