export interface TaxSlab {
  limit: number;
  rate: number;
}

export interface TaxRegimeData {
  slabs: TaxSlab[];
  standardDeduction: number;
  rebateLimit: number; // Income up to which no tax is payable (87A)
  cess: number; // Health and Education Cess percentage
  surcharge: TaxSlab[]; // Surcharge slabs based on income
}

// Dynamic Financial Year Calculation
const currentDate = new Date();
const currentMonth = currentDate.getMonth(); // 0-11
const currentYear = currentDate.getFullYear();

// If Jan-Mar (0-2), FY starts in prev year. Else current year.
const fyStartYear = currentMonth < 3 ? currentYear - 1 : currentYear;
const fyEndYear = fyStartYear + 1;

export const FY_YEAR = "2026-27"; // Explicitly set for SEO and accuracy as requested

// 8th Pay Commission Constants
export const EIGHTH_CPC = {
  FITMENT_FACTORS: [
    { label: "Conservative (1.92x)", value: 1.92 },
    { label: "Expected (2.57x)", value: 2.57 },
    { label: "Optimistic (2.86x)", value: 2.86 }
  ],
  MINIMUM_PAY: 18000,
  EXPECTED_MINIMUM_PAY: 26000
};

// Based on interim budget 2024-25 and expected trends for 2025-26
// This structure allows easy updates via JSON modification

export const OLD_REGIME: TaxRegimeData = {
  standardDeduction: 50000,
  rebateLimit: 500000,
  cess: 0.04,
  slabs: [
    { limit: 250000, rate: 0 },
    { limit: 500000, rate: 0.05 },
    { limit: 1000000, rate: 0.20 },
    { limit: Infinity, rate: 0.30 },
  ],
  surcharge: [
    { limit: 5000000, rate: 0.10 },
    { limit: 10000000, rate: 0.15 },
    { limit: 20000000, rate: 0.25 },
    { limit: 50000000, rate: 0.37 }, 
    { limit: Infinity, rate: 0.37 },
  ]
};

export const NEW_REGIME: TaxRegimeData = {
  standardDeduction: 75000, 
  rebateLimit: 1200000, // Tax free up to 12L in New Regime (Budget 2025)
  cess: 0.04,
  slabs: [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.10 },
    { limit: 1600000, rate: 0.15 },
    { limit: 2000000, rate: 0.20 },
    { limit: 2400000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 },
  ],
  surcharge: [
    { limit: 5000000, rate: 0.10 },
    { limit: 10000000, rate: 0.15 },
    { limit: 20000000, rate: 0.25 },
    { limit: Infinity, rate: 0.25 },
  ]
};

export const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Other/Union Territory"
];

export const METRO_CITIES = ["Delhi", "Mumbai", "Kolkata", "Chennai"];

// Professional Tax Slabs (Monthly)
export const PROFESSIONAL_TAX: Record<string, { limit: number, amount: number }[]> = {
  "Maharashtra": [
    { limit: 7500, amount: 0 },
    { limit: 10000, amount: 175 },
    { limit: Infinity, amount: 200 } // Note: Feb is 300
  ],
  "Karnataka": [
    { limit: 25000, amount: 0 },
    { limit: Infinity, amount: 200 }
  ],
  "Tamil Nadu": [
    { limit: 3500, amount: 0 },
    { limit: 9000, amount: 20 },
    { limit: 12000, amount: 60 },
    { limit: 15000, amount: 115 },
    { limit: Infinity, amount: 200 }
  ],
  "West Bengal": [
    { limit: 10000, amount: 0 },
    { limit: 15000, amount: 110 },
    { limit: 25000, amount: 130 },
    { limit: 40000, amount: 150 },
    { limit: Infinity, amount: 200 }
  ],
  "Gujarat": [
    { limit: 12000, amount: 0 },
    { limit: Infinity, amount: 200 }
  ],
  "Telangana": [
    { limit: 15000, amount: 0 },
    { limit: 20000, amount: 150 },
    { limit: Infinity, amount: 200 }
  ],
  "Andhra Pradesh": [
    { limit: 15000, amount: 0 },
    { limit: 20000, amount: 150 },
    { limit: Infinity, amount: 200 }
  ],
  "Madhya Pradesh": [
    { limit: 18750, amount: 0 },
    { limit: 25000, amount: 125 },
    { limit: 33333, amount: 166 },
    { limit: Infinity, amount: 208 }
  ]
}; 
