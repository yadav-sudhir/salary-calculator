import { OLD_REGIME, NEW_REGIME, TaxRegimeData, PROFESSIONAL_TAX } from "./tax-constants";

interface TaxResult {
  taxableIncome: number;
  tax: number;
  cess: number;
  totalTax: number;
  surcharge: number;
}

export function calculateTax(income: number, regime: TaxRegimeData): TaxResult {
  const grossIncome = Math.max(0, income);
  const incomeAfterStdDed = Math.max(0, grossIncome - regime.standardDeduction);
  
  // For New Regime: 7L rebate (effectively 12L taxable income after deductions in some cases, but 7L is the standard threshold)
  // For Old Regime: 5L rebate
  const rebateThreshold = regime.standardDeduction === 75000 ? 700000 : 500000;
  
  if (incomeAfterStdDed <= rebateThreshold) {
    return { 
      taxableIncome: incomeAfterStdDed, 
      tax: 0, 
      surcharge: 0,
      cess: 0, 
      totalTax: 0 
    };
  }
  
  let tax = 0;
  let previousLimit = 0;
  
  for (const slab of regime.slabs) {
    if (incomeAfterStdDed <= previousLimit) break;
    
    if (slab.limit === Infinity) {
      const taxableAmount = Math.max(0, incomeAfterStdDed - previousLimit);
      tax += taxableAmount * slab.rate;
      break;
    } else {
      const slabEnd = Math.min(incomeAfterStdDed, slab.limit);
      if (slabEnd > previousLimit) {
        const taxableInThisSlab = slabEnd - previousLimit;
        tax += taxableInThisSlab * slab.rate;
      }
      previousLimit = slab.limit;
    }
  }
  
  let surchargeRate = 0;
  for (const surchargeSlab of regime.surcharge) {
    if (incomeAfterStdDed > surchargeSlab.limit) {
      surchargeRate = surchargeSlab.rate;
    } else {
      break;
    }
  }
  const surcharge = tax * surchargeRate;
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
  basicSalary: number;
  hraReceived: number;
  bonus: number;
  specialAllowance: number;
  pfDeduction: number;
  professionalTax: number;
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

export function calculateSalaryStructure(
  ctc: number, 
  bonus: number, 
  pfPercentage: number, 
  state: string = "Delhi"
): SalaryDetails {
  const ctcExBonus = ctc - bonus;
  const basic = ctcExBonus * 0.40; 
  const hra = basic * 0.40;
  const employerPF = basic * 0.12; 
  
  const special = ctcExBonus - basic - hra - employerPF;
  
  // PF Fix: Ensure 0% is handled correctly
  const employeePF = basic * (pfPercentage / 100);
  
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
  if (rentPaid <= 0) return 0;
  
  const c1 = hraReceived;
  const c2 = Math.max(0, rentPaid - (0.10 * basic));
  const c3 = basic * (isMetro ? 0.50 : 0.40);
  
  return Math.min(c1, c2, c3);
}

/**
 * 8th Pay Commission Estimate
 * Formula: Revised Basic = Current Basic * Fitment Factor
 */
export function calculate8thCPCHike(currentBasic: number, fitmentFactor: number): number {
  return currentBasic * fitmentFactor;
}
