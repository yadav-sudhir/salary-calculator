// client/src/utils/seoUtils.ts

interface Schema {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

/**
 * Injects JSON-LD schema into the document's head.
 * It removes any existing schema with the same ID to prevent duplicates.
 * @param schemaData The JSON-LD schema object to inject.
 * @param id A unique ID for the script tag, useful for managing dynamic schemas.
 */
export const injectSchema = (schemaData: Schema, id: string) => {
  // Remove existing script with the same ID to prevent duplicates on re-renders
  const existingScript = document.getElementById(id);
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id; // Assign a unique ID
  script.innerHTML = JSON.stringify(schemaData);
  document.head.appendChild(script);
};

/**
 * Removes a schema script from the document's head.
 * @param id The unique ID of the script tag to remove.
 */
export const removeSchema = (id: string) => {
  const existingScript = document.getElementById(id);
  if (existingScript) {
    existingScript.remove();
  }
};

// --- Schema Definitions ---

// WebPage and Calculator Schema for the main page
export const webPageCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "SalaryCalc.in: In-Hand Salary Calculator India 2026-27 | Old vs New Tax Regime",
  "description": "Calculate your exact take-home salary instantly with our updated FY 2026-27 in-hand salary calculator. Compare old vs new tax regime, including HRA & PF deductions.",
  "url": "https://salarycalc.in/",
  "mainEntity": {
    "@type": "Calculator",
    "name": "SalaryCalc.in: In-Hand Salary Calculator India 2026-27",
    "description": "An online tool to calculate in-hand salary after tax in India for FY 2026-27, comparing old and new tax regimes.",
    "url": "https://salarycalc.in/",
    "potentialAction": {
      "@type": "CalculateAction",
      "name": "Calculate Salary",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://salarycalc.in/"
      },
      "query-input": [
        "required name=annualCTC",
        "required name=bonus",
        "required name=pf",
        "required name=taxRegime",
        "required name=state"
      ]
    }
  }
};

// FAQPage Schema for the FAQ section
export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is In-Hand Salary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In-hand salary, also known as take-home salary, is the amount an employee receives after all deductions (like taxes, provident fund, professional tax, etc. ) are made from their gross salary or Cost to Company (CTC)."
      }
    },
    {
      "@type": "Question",
      "name": "Old vs New Tax Regime: Which is better for FY 2026-27?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The better tax regime (Old or New) for FY 2026-27 depends on individual financial situations, particularly the amount of deductions and exemptions an individual can claim. The Old Regime allows various deductions (e.g., 80C, HRA, 80D), while the New Regime offers lower tax rates but fewer exemptions. It's recommended to use a calculator to compare both options based on your specific income and investments."
      }
    },
    {
      "@type": "Question",
      "name": "How is HRA calculated for tax exemption?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under the Old Tax Regime, HRA exemption is the least of: 1) Actual HRA received, 2) 50% of basic salary (for metro cities) or 40% (for non-metro cities), or 3) Actual rent paid minus 10% of basic salary. The New Tax Regime does not allow HRA exemption."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Standard Deduction applicable in the New Regime?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, for FY 2026-27, a standard deduction of ₹75,000 is allowed under the New Tax Regime for salaried individuals. This was increased from ₹50,000 in previous budgets to make the New Regime more attractive."
      }
    }
  ]
};
