import { useEffect } from 'react';
import { injectSchema, removeSchema, webPageCalculatorSchema, faqPageSchema } from '../utils/seoUtils';
// Inside your Calculator functional component (e.g., right after the function declaration)

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
  }, []); // Empty dependency array ensures this runs once on mount and unmount
