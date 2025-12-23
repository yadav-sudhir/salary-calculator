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
        <p className="text-gray-600">Common queries about salary calculation and taxes in India.</p>
      </div>

      <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-sm border px-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-primary hover:no-underline">
            What is In-Hand Salary?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            In-hand salary is the net amount credited to your bank account after all deductions like Income Tax (TDS), Employee Provident Fund (EPF), and Professional Tax are subtracted from your gross salary (CTC).
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-primary hover:no-underline">
            Old vs New Tax Regime: Which is better for FY 2025-26?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            The New Regime offers lower tax rates but fewer deductions (no HRA, 80C, etc.), while the Old Regime allows claiming exemptions. Generally, if your total deductions (HRA + 80C + 80D) exceed ₹3.75 Lakhs, the Old Regime might be better. Otherwise, the New Regime is usually more beneficial due to the increased standard deduction of ₹75,000.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-primary hover:no-underline">
            How is HRA calculated for tax exemption?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            HRA exemption is calculated as the minimum of: 
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Actual HRA received</li>
              <li>50% of Basic Salary (for metro cities) or 40% (non-metro)</li>
              <li>Actual Rent Paid minus 10% of Basic Salary</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-primary hover:no-underline">
            Is the Standard Deduction applicable in the New Regime?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 leading-relaxed">
            Yes, starting FY 2024-25, a Standard Deduction of ₹75,000 is available under the New Tax Regime as well.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
