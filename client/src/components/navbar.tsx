import { Link } from "wouter";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navLinks = [
    { href: "/#calculator", label: "Calculator" },
    { href: "/#faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy", label: "Privacy" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo - Clickable to Home */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-105">
            ₹
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-gray-900">
            Salary<span className="text-primary">Calc</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <SheetHeader className="text-left border-b pb-4 mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white font-bold text-sm">
                    ₹
                  </div>
                  <span>SalaryCalc</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium text-gray-600 hover:text-primary transition-colors py-2 border-b border-gray-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
