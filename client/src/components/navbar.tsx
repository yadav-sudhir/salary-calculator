import { Link } from "wouter";
import { Menu, ChevronDown, Sparkles } from "lucide-react";
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

  // UPDATED PRICES!
  const productLinks = [
    { 
      href: "/products/ctc-report", 
      label: "CTC Report", 
      price: "₹799", 
      icon: "📊",
      badge: null 
    },
    { 
      href: "/products/negotiation-letter", 
      label: "Negotiation Letter", 
      price: "₹499", 
      oldPrice: "₹1,499",
      icon: "💼",
      badge: "POPULAR" 
    },
    { 
      href: "/products/tax-strategy", 
      label: "Tax Strategy", 
      price: "₹999",
      oldPrice: "₹2,499", 
      icon: "💰",
      badge: "60% OFF" 
    },
  ];

  // Handle smooth scroll to anchor links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If not on home page, navigate there first
        window.location.href = href;
      }
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-xl bg-white/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo - Enhanced */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl transition-all group-hover:scale-110 group-hover:shadow-lg">
            ₹
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-gray-900">
            Salary<span className="text-primary">Calc</span>
          </span>
        </Link>

        {/* Desktop Navigation - Enhanced */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          ))}
          
          {/* Products Dropdown - Enhanced */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none relative group">
              Products
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              <span className="absolute -top-1 -right-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 shadow-xl border-gray-200">
              <div className="p-2 space-y-1">
                {productLinks.map((product) => (
                  <DropdownMenuItem key={product.href} asChild className="p-0">
                    <Link href={product.href}>
                      <div className="flex items-center justify-between w-full px-3 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-all group">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-2xl group-hover:scale-110 transition-transform">{product.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 text-sm">{product.label}</span>
                              {product.badge && (
                                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-bold text-primary">{product.price}</span>
                              {product.oldPrice && (
                                <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
              
              {/* Special Offer Banner */}
              <div className="border-t border-gray-100 p-3 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-2 text-xs">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">
                    <span className="font-bold text-purple-600">Limited Time:</span> Up to 60% off!
                  </span>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Navigation - Enhanced */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader className="text-left border-b pb-4 mb-4">
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
                    ₹
                  </div>
                  <span>SalaryCalc</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 mt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-all py-3 px-3 rounded-lg border-b border-gray-50"
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Products Section in Mobile - Enhanced */}
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                      Products
                    </div>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                      SALE
                    </span>
                  </div>
                  {productLinks.map((product) => (
                    <Link
                      key={product.href}
                      href={product.href}
                      className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-50 transition-all border-b border-gray-50 group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl group-hover:scale-110 transition-transform">{product.icon}</span>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 mb-0.5">{product.label}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-primary">{product.price}</span>
                            {product.oldPrice && (
                              <span className="text-xs text-gray-400 line-through">{product.oldPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {product.badge && (
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
                
                {/* Mobile CTA */}
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-purple-900">Limited Offer</span>
                  </div>
                  <p className="text-xs text-gray-700">Save up to 60% on all products. Ends soon!</p>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
