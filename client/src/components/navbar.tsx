import { Link } from "wouter";
import { Menu, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navLinks = [
    { href: "/#calculator", label: "Calculator" },
    { href: "/#faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy", label: "Privacy" },
  ];

  const productLinks = [
    { href: "/products/ctc-report", label: "CTC Report", price: "₹799", icon: "📊" },
    { href: "/products/negotiation-letter", label: "Negotiation Letter", price: "₹1,499", icon: "💼" },
    { href: "/products/tax-strategy", label: "Tax Strategy", price: "₹2,499", icon: "💰" },
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
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          {/* Products Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none">
              Products
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {productLinks.map((product) => (
                <DropdownMenuItem key={product.href} asChild>
                  <Link href={product.href}>
                    <div className="flex items-center justify-between w-full px-2 py-2 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.icon}</span>
                        <span className="font-medium text-gray-900 text-sm">{product.label}</span>
                      </div>
                      <span className="text-xs font-bold text-primary">{product.price}</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
                
                {/* Products Section in Mobile */}
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                    Products
                  </div>
                  {productLinks.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="flex items-center justify-between py-3 border-b border-gray-50 hover:text-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{product.icon}</span>
                        <span className="text-sm font-medium">{product.label}</span>
                      </div>
                      <span className="text-sm font-bold text-primary">{product.price}</span>
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
