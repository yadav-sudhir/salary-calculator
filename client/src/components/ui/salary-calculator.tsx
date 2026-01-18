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
      pfPercentage: 0,
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
    
    const basicSalary = (ctc - bonus) * 0.40;
    const hraPercentage = Number(data.hraPercentage) || 40;
    const pfPercentage = Number(data.pfPercentage) || 0;
    const hraComponent = basicSalary * (hraPercentage / 100);
    const employeePF = basicSalary * (pfPercentage / 100);
    const employerPF = basicSalary * 0.12;
    
    // State-specific Professional Tax
    const monthlyGross = (ctc - employerPF) / 12;
    const ptMonthly = getProfessionalTax(data.state, monthlyGross);
    const professionalTax = ptMonthly * 12;
    
    const metroCities = ["Delhi", "Mumbai", "Kolkata", "Chennai"];
    const isMetro = metroCities.includes(data.state); // Simplified check
    
    const rentPaidMonthly = Number(data.rentPaid) || 0;
    const hraExemption = calculateHRAExemption(basicSalary, hraComponent, Math.max(0, rentPaidMonthly * 12), isMetro);
    
    const taxableOld = Math.max(0, ctc - OLD_REGIME.standardDeduction - hraExemption - Math.min(150000, employeePF) - professionalTax);
    const taxOld = calculateTax(taxableOld, OLD_REGIME);
    
    const taxableNew = Math.max(0, ctc - NEW_REGIME.standardDeduction);
    const taxNew = calculateTax(taxableNew, NEW_REGIME);
    
    const selectedTax = data.regime === "old" ? taxOld : taxNew;
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

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-8">
      <div className="grid md:grid-cols-12 gap-8">
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
                    placeholder="Enter annual CTC"
                    {...form.register("annualCTC", { valueAsNumber: true })}
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
                  <Input id="bonus" type="number" className="h-10" {...form.register("bonus", { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pf" className="text-sm font-medium text-gray-700">PF %</Label>
                  <Input id="pf" type="number" className="h-10" {...form.register("pfPercentage", { valueAsNumber: true })} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="regime">Tax Regime</Label>
                   <Select defaultValue="new" onValueChange={(val: any) => form.setValue("regime", val)}>
                     <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                     <SelectContent>
                       <SelectItem value="new">New Regime</SelectItem>
                       <SelectItem value="old">Old Regime</SelectItem>
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="state">State</Label>
                   <Select defaultValue="Delhi" onValueChange={(val) => form.setValue("state", val)}>
                     <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                     <SelectContent className="max-h-[200px]">
                       <ScrollArea className="h-[200px]">
                         {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                       </ScrollArea>
                     </SelectContent>
                   </Select>
                 </div>
              </div>

              <Button 
                onClick={form.handleSubmit(onSubmit)}
                className="w-full h-12 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
                disabled={isAnimating}
              >
                {isAnimating ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Calculate In-Hand Salary"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section (Simplified for brevity in this tool call) */}
        <div className="md:col-span-7">
          {result ? (
            <div className="space-y-6">
              <Card className="bg-primary text-white overflow-hidden">
                <CardContent className="p-8 text-center space-y-2">
                  <p className="text-primary-foreground/80 font-medium">Monthly Take-Home Salary</p>
                  <h2 className="text-5xl font-bold tracking-tight">{formatCurrency(result.monthlyInHand)}</h2>
                  {result.cpcHike > 0 && (
                    <p className="text-sm bg-white/20 inline-block px-3 py-1 rounded-full">
                      Includes {formatCurrency(result.cpcHike/12)} 8th CPC Hike
                    </p>
                  )}
                </CardContent>
              </Card>
              {/* Detailed breakdown would follow here */}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed rounded-xl p-12 text-center text-gray-400">
              <div className="space-y-4">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <IndianRupee className="w-8 h-8" />
                </div>
                <p>Enter your salary details to see the breakdown</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
