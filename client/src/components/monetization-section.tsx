import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Briefcase, ArrowRight } from "lucide-react";

export default function MonetizationSection() {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Optimize Your Salary & Investments</h2>
          <p className="text-gray-600">Take the next step towards financial growth</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CTA Box 1: Tax Saving Investments */}
          <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors shadow-lg hover:shadow-xl">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl text-gray-900">Maximize Your Tax Savings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Under the Old Regime, you can invest in ELSS mutual funds, insurance, and more to reduce your tax burden significantly. Discover proven strategies used by high earners.
              </p>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
                onClick={() => window.open("#", "_blank")}
              >
                Explore Top Tax-Saving Investments
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-gray-500 text-center">Limited time: Free consultation offer</p>
            </CardContent>
          </Card>

          {/* CTA Box 2: Financial Planning */}
          <Card className="border-2 border-secondary/20 hover:border-secondary/50 transition-colors shadow-lg hover:shadow-xl">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Briefcase className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-xl text-gray-900">Plan Your Financial Future</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Understanding your salary is the first step. Let an expert help you plan your investments, loans, and financial goals for long-term wealth creation.
              </p>
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-white flex items-center justify-center gap-2"
                onClick={() => window.open("#", "_blank")}
              >
                Connect with a Financial Advisor
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-xs text-gray-500 text-center">Free 30-minute consultation</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
