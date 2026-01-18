import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600">Common queries about 8th Pay Commission, Salary Calculation, and FY 2026-27 Taxes.</p>
      </div>

      <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border px-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-primary hover:no-underline">
            What is the 8th Pay Commission and when will it be implemented?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            The 8th Pay Commission is expected to be implemented from **January 1, 2026**. It aims to revise the salary structure, fitment factor, and allowances for Central Government employees and pensioners, replacing the current 7th CPC.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-primary hover:no-underline">
            How much salary hike can I expect from the 8th Pay Commission?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            While official announcements are pending, projections suggest a **fitment factor ranging from 1.92 to 2.86**. This could lead to a significant increase in basic pay, with minimum salaries potentially rising from ₹18,000 to over ₹26,000 - ₹34,000.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-primary hover:no-underline">
            How to use the 8th Pay Commission Salary Calculator?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            Our calculator allows you to toggle the **8th CPC Estimate** feature. Simply enter your current CTC, enable the 8th CPC switch, and select a fitment factor to see your projected revised basic pay and monthly in-hand salary for FY 2026-27.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-primary hover:no-underline">
            What are the New Tax Regime slabs for FY 2026-27 (AY 2027-28)?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            For FY 2026-27, the New Tax Regime offers a **₹12 Lakh tax-free rebate**. Slabs are: Up to ₹4L (Nil), ₹4L-₹8L (5%), ₹8L-₹12L (10%), ₹12L-₹16L (15%), ₹16L-₹20L (20%), ₹20L-₹24L (25%), and Above ₹24L (30%). A standard deduction of ₹75,000 is also applicable.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-primary hover:no-underline">
            Old vs New Tax Regime: Which is better after 8th CPC hike?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            With the 8th CPC hike increasing basic pay, your taxable income will rise. The **New Tax Regime** is generally more beneficial for most employees due to the ₹12 Lakh rebate and lower slabs, unless you have very high deductions (HRA, 80C, etc.) exceeding ₹4 Lakhs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-primary hover:no-underline">
            How is In-Hand Salary calculated accurately?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            In-hand salary is calculated as: **Gross Salary - (Income Tax + Employee PF + Professional Tax)**. Our tool accurately calculates state-wise Professional Tax and allows for 0% PF contribution if you are not covered under EPF.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
