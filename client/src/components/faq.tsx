import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Salary, Decoded</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We know that numbers on a screen can be confusing. Here are the real, practical answers to the questions we hear most often from people just like you.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="bg-white rounded-xl shadow-sm border px-6 py-2">
          <AccordionTrigger className="text-xl font-semibold text-gray-800 hover:text-primary hover:no-underline text-left">
            What exactly is the 8th Pay Commission, and why should I care?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-lg leading-relaxed pt-4">
            Think of the 8th Pay Commission as a massive "reset button" for the salaries of over 1 crore central government employees and pensioners. Historically, every 10 years, the government reviews pay structures to ensure they keep up with inflation. 
            <br /><br />
            The 8th CPC is expected to kick in on <span className="font-bold text-gray-900">January 1, 2026</span>. For you, this isn't just a policy change—it's a significant boost in your purchasing power. It's the difference between just getting by and finally having that extra cushion for your family's future.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="bg-white rounded-xl shadow-sm border px-6 py-2">
          <AccordionTrigger className="text-xl font-semibold text-gray-800 hover:text-primary hover:no-underline text-left">
            How much of a hike will I actually see in my bank account?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-lg leading-relaxed pt-4">
            Let's get practical. The "magic number" everyone is talking about is the <span className="font-bold text-gray-900">Fitment Factor</span>. While the 7th CPC used 2.57, there's a strong push for the 8th CPC to use a factor between <span className="font-bold text-gray-900">1.92 and 2.86</span>. 
            <br /><br />
            If your current basic pay is ₹18,000, a 2.86 fitment factor could push it to nearly ₹51,480. Even at a more conservative estimate, you're looking at a substantial jump. Our calculator lets you test these different scenarios so you can plan your home loan or big expenses with confidence.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="bg-white rounded-xl shadow-sm border px-6 py-2">
          <AccordionTrigger className="text-xl font-semibold text-gray-800 hover:text-primary hover:no-underline text-left">
            Is it true that I can earn ₹12 Lakhs and pay zero tax?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-lg leading-relaxed pt-4">
            Yes, and it's a game-changer! For <span className="font-bold text-gray-900">FY 2026-27</span>, the government has significantly sweetened the New Tax Regime. If your taxable income stays up to ₹12 Lakhs, you benefit from a full tax rebate under Section 87A. 
            <br /><br />
            When you add the <span className="font-bold text-gray-900">₹75,000 Standard Deduction</span>, you could effectively have a gross salary of nearly ₹12.75 Lakhs and still not owe a single rupee in income tax. This is the government's way of putting more money directly into the pockets of the middle class.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="bg-white rounded-xl shadow-sm border px-6 py-2">
          <AccordionTrigger className="text-xl font-semibold text-gray-800 hover:text-primary hover:no-underline text-left">
            Old vs. New Regime: How do I stop the confusion?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-lg leading-relaxed pt-4">
            It's a classic dilemma. The <span className="font-bold text-gray-900">Old Regime</span> is like a "DIY project"—you have to track your rent receipts (HRA), insurance (80C), and medical bills (80D) to save tax. It's great if you have a home loan or high rent. 
            <br /><br />
            The <span className="font-bold text-gray-900">New Regime</span> is the "set it and forget it" option. You get lower tax rates and a huge ₹12L tax-free window without needing any investment proofs. Our calculator does the heavy lifting for you, showing a side-by-side comparison so you can see exactly which one leaves more cash in your pocket.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="bg-white rounded-xl shadow-sm border px-6 py-2">
          <AccordionTrigger className="text-xl font-semibold text-gray-800 hover:text-primary hover:no-underline text-left">
            Why is my 'In-Hand' so much lower than my 'CTC'?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-lg leading-relaxed pt-4">
            We've all had that "paycheck shock." Your CTC (Cost to Company) includes everything the company spends on you, including things you don't see immediately, like their contribution to your PF or Gratuity. 
            <br /><br />
            Your <span className="font-bold text-gray-900">In-Hand Salary</span> is what's left after the "Big Three" deductions: Income Tax (TDS), your share of PF, and Professional Tax. We break these down line-by-line, including state-specific taxes, so you know exactly where every rupee is going.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="bg-white rounded-xl shadow-sm border px-6 py-2">
          <AccordionTrigger className="text-xl font-semibold text-gray-800 hover:text-primary hover:no-underline text-left">
            What if I don't have a PF deduction?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-lg leading-relaxed pt-4">
            Not everyone is covered under the EPF Act, and we've built our tool to reflect that reality. If you're a consultant, a freelancer, or work in a small startup where PF isn't mandatory, you can simply set the <span className="font-bold text-gray-900">PF percentage to 0%</span>. 
            <br /><br />
            Unlike other rigid calculators, ours will adjust instantly, giving you a precise look at your take-home pay without forcing unnecessary deductions.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
