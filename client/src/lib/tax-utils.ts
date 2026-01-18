import { OLD_REGIME, NEW_REGIME, TaxRegimeData, PROFESSIONAL_TAX } from "./tax-constants";

interface TaxResult {
  taxableIncome: number;
  tax: number;
  cess: number;
  totalTax: number;
  surcharge: number;
}

export function calculateTax(income: number, regime: TaxRegimeData): TaxResult {
  // Ensure income is never negative
  const grossIncome = Math.max(0, income);
  
  // Apply standard deduction
  const incomeAfterStdDed = Math.max(0, grossIncome - regime.standardDeduction);
  
  // Rebate Logic:
  // For New Regime (FY 2026-27): 12L rebate
  // For Old Regime: 5L rebate
  const rebateThreshold = regime.rebateLimit;
  
  if (incomeAfterStdDed <= rebateThreshold) {
    return { 
      taxableIncome: incomeAfterStdDed, 
      tax: 0, 
      surcharge: 0,
      cess: 0, 
      totalTax: 0 
    };
  }
  
  // Calculate tax using slab system
  let tax = 0;
  let previousLimit = 0;
  
  for (const slab of regime.slabs) {
    if (incomeAfterStdDed <= previousLimit) break;
    
    if (slab.limit === Infinity) {
      // Last slab (infinity limit)
      const taxableAmount = Math.max(0, incomeAfterStdDed - previousLimit);
      tax += taxableAmount * slab.rate;
      break;
    } else {
      // Regular slab
      const slabEnd = Math.min(incomeAfterStdDed, slab.limit);
      if (slabEnd > previousLimit) {
        const taxableInThisSlab = slabEnd - previousLimit;
        tax += taxableInThisSlab * slab.rate;
      }
      previousLimit = slab.limit;
    }
  }
  
  // Calculate surcharge
  let surchargeRate = 0;
  for (const surchargeSlab of regime.surcharge) {
    if (incomeAfterStdDed > surchargeSlab.limit) {
      surchargeRate = surchargeSlab.rate;
    } else {
      break;
    }
  }
  const surcharge = tax * surchargeRate;
  
  // Calculate cess (4% on tax + surcharge)
  const cess = (tax + surcharge) * regime.cess;
  
  return {
    taxableIncome: incomeAfterStdDed,
    tax,
    surcharge,
    cess,
    totalTax: tax + surcharge + cess
  };
}

export interface SalaryDetails {
  annualCTC: number;
  basicSalary: number; // usually 40-50% of CTC
  hraReceived: number; // usually 40-50% of Basic
  bonus: number;
  specialAllowance: number;
  pfDeduction: number; // 12% of Basic
  professionalTax: number; // ~2400 per year
}

export function calculateSalaryStructure(
  ctc: number, 
  bonus: number, 
  pfPercentage: number,
  state: string = "Delhi"
): SalaryDetails {
  const ctcExBonus = ctc - bonus;
  
  // Accuracy Fix: Basic is usually 40-50% of CTC. 
  // If PF is 0, we still calculate Basic to derive HRA and other components.
  const basic = ctcExBonus * 0.40; 
  const hra = basic * 0.40;
  
  // Employer PF is only part of CTC if PF is enabled.
  // If pfPercentage is 0, we assume Employer PF is also 0 or not part of this CTC structure.
  const employerPF = pfPercentage > 0 ? (basic * 0.12) : 0; 
  
  const special = ctcExBonus - basic - hra - employerPF;
  
  // Employee PF Calculation (can be 0)
  const employeePF = basic * (pfPercentage / 100);
  
  // Professional Tax Calculation
  const monthlyGross = (basic + hra + Math.max(0, special) + (bonus / 12));
  const ptMonthly = getProfessionalTax(state, monthlyGross);
  const professionalTax = ptMonthly * 12;
  
  return {
    annualCTC: ctc,
    basicSalary: basic,
    hraReceived: hra,
    bonus: bonus,
    specialAllowance: Math.max(0, special),
    pfDeduction: employeePF,
    professionalTax: professionalTax
  };
}

export function calculateHRAExemption(basic: number, hraReceived: number, rentPaid: number, isMetro: boolean): number {
  // Min of:
  // 1. Actual HRA Received
  // 2. Rent Paid - 10% of Basic
  // 3. 50% of Basic (Metro) or 40% (Non-Metro)
  
  if (rentPaid <= 0) return 0;
  
  const c1 = hraReceived;
  const c2 = Math.max(0, rentPaid - (0.10 * basic));
  const c3 = basic * (isMetro ? 0.50 : 0.40);
  
  return Math.min(c1, c2, c3);
}

export function getProfessionalTax(state: string, monthlySalary: number): number {
  const stateSlabs = PROFESSIONAL_TAX[state];
  if (!stateSlabs) return 200; // Default fallback

  for (const slab of stateSlabs) {
    if (monthlySalary <= slab.limit) {
      return slab.amount;
    }
  }
  return 200;
}

/**
 * 8th Pay Commission Estimate
 * Formula: Revised Basic = Current Basic * Fitment Factor
 */
export function calculate8thCPCHike(currentBasic: number, fitmentFactor: number): number {
  return currentBasic * fitmentFactor;
}
