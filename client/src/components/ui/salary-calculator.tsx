import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Info, IndianRupee, ArrowRight, Download, RefreshCw, HelpCircle, Share2, Check, TrendingUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { STATES, OLD_REGIME, NEW_REGIME, FY_YEAR, EIGHTH_CPC } from "@/lib/tax-constants";
import { calculateTax, calculateSalaryStructure, calculateHRAExemption, getProfessionalTax } from "@/lib/tax-utils";

const formSchema = z.object({
  annualCTC: z.coerce.number().min(0, "CTC must be a positive number"),
  bonus: z.coerce.number().min(0).default(0),
  pfPercentage: z.coerce.number().min(0).max(100).default(0), // Default to 0 as requested
  hraPercentage: z.coerce.number().min(0).max(100).default(40),
  rentPaid: z.coerce.number().min(0).default(0),
  state: z.string().min(1, "Please select a state").default("Delhi"),
  regime: z.enum(["old", "new"]).default("new"),
  enable8thCPC: z.boolean().default(false),
  fitmentFactor: z.coerce.number().default(2.57),
});

type FormValues = z.infer<typeof formSchema>;

export default function SalaryCalculator() {
  const [result, setResult] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shareButtonText, setShareButtonText] = useState("Share Your Savings!");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      annualCTC: undefined,
      bonus: 0,
      pfPercentage: 0, // Default to 0% PF
      hraPercentage: 40,
      rentPaid: 0,
      state: "Delhi",
      regime: "new",
      enable8thCPC: false,
      fitmentFactor: 2.57,
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsAnimating(true);
    
    // Simulate calculation delay for effect
    setTimeout(() => {
      calculate(data);
      setIsAnimating(false);
    }, 400);
  };

  const calculate = (data: FormValues) => {
    let ctc = Math.max(0, Number(data.annualCTC) || 0);
    const bonus = Math.max(0, Number(data.bonus) || 0);
    
    if (ctc === 0) {
      setResult(null);
      return;
    }

    // 8th CPC Impact
    let cpcHike = 0;
    if (data.enable8thCPC) {
      const currentBasic = (ctc - bonus) * 0.40;
      const revisedBasic = currentBasic * data.fitmentFactor;
      cpcHike = revisedBasic - currentBasic;
      ctc += cpcHike; // Add hike to CTC for calculation
    }
    
    // Derive Salary Structure using the fixed logic
    const pfPercentage = Number(data.pfPercentage) || 0;
    const structure = calculateSalaryStructure(ctc, bonus, pfPercentage, data.state);
    
    const basicSalary = structure.basicSalary;
    const hraComponent = structure.hraReceived;
    const employeePF = structure.pfDeduction;
    const professionalTax = structure.professionalTax;
    
    // Employer PF (only if PF is enabled)
    const employerPF = pfPercentage > 0 ? (basicSalary * 0.12) : 0;
    
    // Metro/Non-Metro determination
    const metroCities = ["Delhi", "Mumbai", "Kolkata", "Chennai"];
    const isMetro = metroCities.includes(data.state);
    
    // HRA Exemption (Old Regime only)
    const rentPaidMonthly = Number(data.rentPaid) || 0;
    const hraExemption = calculateHRAExemption(basicSalary, hraComponent, Math.max(0, rentPaidMonthly * 12), isMetro);
    
    // OLD REGIME CALCULATION
    const taxableOld = Math.max(0, 
      ctc - 
      OLD_REGIME.standardDeduction - 
      hraExemption - 
      Math.min(150000, employeePF) -
      professionalTax
    );
    const taxOld = calculateTax(taxableOld, OLD_REGIME);
    
    // NEW REGIME CALCULATION
    const taxableNew = Math.max(0, ctc - NEW_REGIME.standardDeduction);
    const taxNew = calculateTax(taxableNew, NEW_REGIME);
    
    // Get selected regime result
    const selectedTax = data.regime === "old" ? taxOld : taxNew;
    
    // Calculate take-home
    const totalDeductions = selectedTax.totalTax + employeePF + professionalTax;
    const annualInHand = ctc - totalDeductions - employerPF;
    const monthlyInHand = Math.max(0, annualInHand / 12);
    
    setResult({
      monthlyInHand,
      annualInHand,
      totalTax: selectedTax.totalTax,
      pfDeduction: employeePF,
      professionalTax,
      regime: data.regime,
      cpcHike,
      details: {
        basic: basicSalary,
        hra: hraComponent,
        gross: ctc - employerPF,
        taxable: data.regime === "old" ? taxableOld : taxableNew,
        employerPF
      },
      comparison: {
        saved: Math.abs(taxOld.totalTax - taxNew.totalTax),
        betterRegime: taxOld.totalTax < taxNew.totalTax ? "Old Regime" : "New Regime",
        oldTax: taxOld.totalTax,
        newTax: taxNew.totalTax
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleShareSavings = async () => {
    const savings = Math.abs(result.comparison.oldTax - result.comparison.newTax);
    const betterRegime = result.comparison.betterRegime;
    const websiteUrl = window.location.origin;
    const shareText = `I just found out the ${betterRegime} Regime can save me ${formatCurrency(savings)} annually! Calculate your in-hand salary and tax savings here: ${websiteUrl}`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setShareButtonText("Copied!");
      setTimeout(() => setShareButtonText("Share Your Savings!"), 2000);
    } catch (err) {
      alert("Failed to copy. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-8">
      <div className="grid md:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="md:col-span-5 space-y-6">
          <Card className="border-0 shadow-lg ring-1 ring-black/5 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-6">
              <CardTitle className="text-xl text-primary flex items-center gap-2">
                 <RefreshCw className="w-5 h-5" /> Salary Details
              </CardTitle>
              <CardDescription>Enter your salary components for FY {FY_YEAR}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="space-y-2 group">
                <Label htmlFor="annualCTC" className="text-sm font-medium text-gray-700">Annual CTC (₹)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="annualCTC" 
                    type="number"
                    className="pl-9 h-11 transition-all focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-0 shadow-sm"
                    placeholder="Enter annual CTC (e.g., 1200000)"
                    {...form.register("annualCTC", { valueAsNumber: true })}
                    onFocus={(e) => {
                      if (e.target.value === "" || e.target.value === "0") {
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>

              {/* 8th Pay Commission Toggle */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold text-blue-900 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> 8th Pay Commission
                  </Label>
                  <p className="text-xs text-blue-700">Estimate impact on salary</p>
                </div>
                <Switch 
                  checked={form.watch("enable8thCPC")}
                  onCheckedChange={(val) => form.setValue("enable8thCPC", val)}
                />
              </div>

              {form.watch("enable8thCPC") && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <Label className="text-xs font-medium text-gray-500">Fitment Factor</Label>
                  <Select 
                    defaultValue="2.57" 
                    onValueChange={(val) => form.setValue("fitmentFactor", parseFloat(val))}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select Factor" />
                    </SelectTrigger>
                    <SelectContent>
                      {EIGHTH_CPC.FITMENT_FACTORS.map(f => (
                        <SelectItem key={f.value} value={f.value.toString()}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bonus" className="text-sm font-medium text-gray-700">Annual Bonus (₹)</Label>
                  <Input 
                    id="bonus" 
                    type="number" 
                    className="h-10 transition-all focus-visible:ring-primary shadow-sm"
                    {...form.register("bonus", { valueAsNumber: true })} 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pf" className="text-sm font-medium text-gray-700">PF %</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><Info className="h-3 w-3 text-gray-400" /></TooltipTrigger>
                        <TooltipContent>Employee contribution (set to 0 if not applicable)</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input 
                    id="pf" 
                    type="number" 
                    className="h-10 transition-all focus-visible:ring-primary shadow-sm"
                    {...form.register("pfPercentage", { valueAsNumber: true })} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="regime">Tax Regime</Label>
                   <Select 
                     defaultValue="new" 
                     onValueChange={(val: any) => form.setValue("regime", val)}
                   >
                     <SelectTrigger className="h-10">
                       <SelectValue placeholder="Select Regime" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="new">New Regime</SelectItem>
                       <SelectItem value="old">Old Regime</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="state">State</Label>
                   <Select 
                     defaultValue="Delhi" 
                     onValueChange={(val) => form.setValue("state", val)}
                   >
                     <SelectTrigger className="h-10">
                       <SelectValue placeholder="State" />
                     </SelectTrigger>
                     <SelectContent className="max-h-[300px]">
                       <ScrollArea className="h-[300px] w-full">
                         <div className="p-1">
                           {STATES.map(state => (
                             <SelectItem key={state} value={state} className="cursor-pointer">
                               {state}
                             </SelectItem>
                           ))}
                         </div>
                       </ScrollArea>
                     </SelectContent>
                   </Select>
                 </div>
              </div>

              {form.watch("regime") === "old" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-2 bg-blue-50/50 p-3 rounded-lg border border-blue-100"
                >
                   <Label htmlFor="rent" className="text-sm font-medium text-blue-900">Monthly Rent Paid (₹)</Label>
                   <Input 
                     id="rent" 
                     type="number" 
                     className="h-10 bg-white border-blue-200 focus-visible:ring-blue-500"
                     placeholder="For HRA Exemption"
                     {...form.register("rentPaid", { valueAsNumber: true })} 
                   />
                </motion.div>
              )}

              <Button 
                onClick={form.handleSubmit(onSubmit)}
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              >
                Calculate Salary
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="md:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <IndianRupee className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Ready to Calculate?</h3>
                <p className="text-gray-500 mt-2 max-w-xs">Enter your CTC details on the left to see your detailed salary breakdown for FY {FY_YEAR}.</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Main Monthly Card */}
                <Card className="bg-gray-900 text-white border-0 shadow-2xl overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                   <CardContent className="p-8 relative z-10">
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                       <div>
                         <p className="text-blue-200 font-medium mb-1">Monthly In-Hand Salary</p>
                         <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                           {formatCurrency(result.monthlyInHand)}
                         </h2>
                         <p className="text-sm text-gray-400 mt-2">
                           Annual Take Home: <span className="text-white font-medium">{formatCurrency(result.annualInHand)}</span>
                         </p>
                         {result.cpcHike > 0 && (
                            <p className="text-xs bg-white/10 inline-block px-2 py-1 rounded mt-2 text-blue-200">
                              Includes {formatCurrency(result.cpcHike/12)} 8th CPC Hike
                            </p>
                         )}
                       </div>
                       <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-md">
                         <Download className="mr-2 h-4 w-4" /> Export
                       </Button>
                     </div>
                   </CardContent>
                </Card>

                {/* Breakdown Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-help">
                          <CardHeader className="pb-2 flex flex-row items-center justify-between">
                             <CardTitle className="text-sm font-medium text-gray-500">Total Tax (Annual)</CardTitle>
                             <HelpCircle className="w-4 h-4 text-gray-400" />
                          </CardHeader>
                          <CardContent>
                             <div className="text-2xl font-bold text-red-600">{formatCurrency(result.totalTax)}</div>
                             <p className="text-xs text-gray-400 mt-1">Includes Cess & Surcharge</p>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Total Income Tax deducted from your salary including 4% Health and Education Cess plus applicable surcharge for high earners.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-help">
                          <CardHeader className="pb-2 flex flex-row items-center justify-between">
                             <CardTitle className="text-sm font-medium text-gray-500">PF Contribution</CardTitle>
                             <HelpCircle className="w-4 h-4 text-gray-400" />
                          </CardHeader>
                          <CardContent>
                             <div className="text-2xl font-bold text-emerald-600">{formatCurrency(result.pfDeduction * 12)}</div>
                             <p className="text-xs text-gray-400 mt-1">Employee Share (Annual)</p>
                          </CardContent>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Your {result.details.basic > 0 ? Math.round((result.pfDeduction / result.details.basic) * 100) : 0}% contribution to Employee Provident Fund (EPF) deducted each month for retirement benefits.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Detailed Breakdown Section */}
                <Card className="bg-blue-50/50 border-blue-200">
                   <CardHeader>
                     <CardTitle className="text-sm text-blue-900 flex items-center gap-2">
                       <Info className="w-4 h-4" /> Calculation Breakdown
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-3">
                     <div className="grid grid-cols-2 gap-4 text-sm">
                       <div>
                         <p className="text-gray-600">Annual CTC</p>
                         <p className="font-semibold text-gray-900">{formatCurrency(result.details.basic / 0.40)}</p>
                       </div>
                       <div>
                         <p className="text-gray-600">Basic Salary (40%)</p>
                         <p className="font-semibold text-gray-900">{formatCurrency(result.details.basic)}</p>
                       </div>
                       <div>
                         <p className="text-gray-600">HRA Component</p>
                         <p className="font-semibold text-gray-900">{formatCurrency(result.details.hra)}</p>
                       </div>
                       <div>
                         <p className="text-gray-600">Employer PF (12%)</p>
                         <p className="font-semibold text-gray-900">{formatCurrency(result.details.employerPF)}</p>
                       </div>
                       <div>
                         <p className="text-gray-600">Taxable Income</p>
                         <p className="font-semibold text-gray-900">{formatCurrency(result.details.taxable)}</p>
                       </div>
                       <div>
                         <p className="text-gray-600">Professional Tax</p>
                         <p className="font-semibold text-gray-900">{formatCurrency(result.professionalTax)}</p>
                       </div>
                     </div>
                     
                     <Separator className="bg-blue-200" />
                     
                     <div className="bg-white p-3 rounded border border-blue-100">
                       <p className="text-xs text-gray-600 mb-2">Step-by-Step In-Hand Calculation:</p>
                       <ol className="text-xs space-y-1 text-gray-700 font-mono">
                         <li>1. Annual CTC: <span className="font-semibold">{formatCurrency(result.details.basic / 0.40)}</span></li>
                         {result.cpcHike > 0 && (
                           <li className="text-blue-600">+ 8th CPC Hike: <span className="font-semibold">{formatCurrency(result.cpcHike)}</span></li>
                         )}
                         <li>2. − Income Tax: <span className="font-semibold">{formatCurrency(result.totalTax)}</span></li>
                         <li>3. − Employee PF: <span className="font-semibold">{formatCurrency(result.pfDeduction * 12)}</span></li>
                         <li>4. − Professional Tax: <span className="font-semibold">{formatCurrency(result.professionalTax)}</span></li>
                         <li>5. − Employer PF: <span className="font-semibold">{formatCurrency(result.details.employerPF)}</span></li>
                         <li className="border-t border-blue-200 pt-1 mt-1"><strong>Final Annual In-Hand: <span className="text-primary">{formatCurrency(result.annualInHand)}</span></strong></li>
                         <li className="text-primary font-bold"><strong>Monthly In-Hand: {formatCurrency(result.monthlyInHand)}</strong></li>
                       </ol>
                     </div>
                   </CardContent>
                </Card>

                {/* Comparison Section */}
                <Card className="border-l-4 border-l-amber-500 bg-amber-50/50">
                   <CardContent className="p-4 space-y-4">
                     <div className="flex items-start justify-between gap-4">
                       <div className="flex-1">
                         <h4 className="font-semibold text-amber-900">Tax Regime Comparison</h4>
                         <p className="text-sm text-amber-800/80 mt-1">
                           {result.comparison.saved > 0 ? (
                             <>
                               The <span className="font-bold">{result.comparison.betterRegime}</span> saves you <span className="font-bold">{formatCurrency(result.comparison.saved)}</span> more in taxes!
                             </>
                           ) : (
                             "Both regimes result in the same tax liability."
                           )}
                         </p>
                       </div>
                       <div className="text-right hidden md:block">
                          <div className="text-xs text-gray-500">Old Regime Tax</div>
                          <div className="font-medium">{formatCurrency(result.comparison.oldTax)}</div>
                          <div className="text-xs text-gray-500 mt-1">New Regime Tax</div>
                          <div className="font-medium">{formatCurrency(result.comparison.newTax)}</div>
                       </div>
                     </div>

                     {result.comparison.saved > 0 && (
                       <Button 
                         onClick={handleShareSavings}
                         className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold flex items-center justify-center gap-2"
                       >
                         {shareButtonText === "Copied!" ? (
                           <>
                             <Check className="w-5 h-5" /> {shareButtonText}
                           </>
                         ) : (
                           <>
                             <Share2 className="w-5 h-5" /> {shareButtonText}
                           </>
                         )}
                       </Button>
                     )}
                   </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
