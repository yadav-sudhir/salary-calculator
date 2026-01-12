// client/src/pages/Calculator.tsx
import React, { useEffect, useState } from 'react';
import { injectSchema, removeSchema, webPageCalculatorSchema, faqPageSchema } from '../utils/seoUtils';
// ... other imports and component logic

const Calculator: React.FC = () => {
  // ... existing state and functions

  useEffect(() => {
    // Inject WebPage and Calculator schema
    injectSchema(webPageCalculatorSchema, 'web-page-calculator-schema');
    // Inject FAQPage schema
    injectSchema(faqPageSchema, 'faq-page-schema');

    return () => {
      // Clean up schema when component unmounts
      removeSchema('web-page-calculator-schema');
      removeSchema('faq-page-schema');
    };
  }, []);

  return (
    // ... your existing JSX for the calculator page
    <div>
      <h1>In-Hand Salary Calculator India 2025-26</h1>
      {/* ... calculator input fields ... */}

      <h2>Frequently Asked Questions</h2>
      {/* ... FAQ content ... */}
    </div>
  );
};

export default Calculator;
