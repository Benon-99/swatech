"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronUp, Shield, Lock } from "lucide-react";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { LoadingContext } from "./providers/LoadingProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [mobileSolutionsDropdownOpen, setMobileSolutionsDropdownOpen] = useState(false);

  const loadingContext = useContext(LoadingContext);
  const { setIsLoading } = loadingContext || { setIsLoading: () => {} };
  
  // Handle links with transition
  const handleLinkClick = (href: string) => {
    // Trigger loading state before navigation
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  };

  // Control navbar visibility based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Make navbar transparent at the top of the page
      if (currentScrollPos < 10) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
      
      // Always keep navbar visible
      setVisible(true);
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Solutions", href: "/solutions" },
  ];

  // const solutionItems = [
  //   { 
  //     category: "Security Solutions",
  //     items: [
  //       { title: "Milestone XProtect® VMS", href: "/solutions#milestone-xprotect" },
  //       { title: "BriefCam Video Analytics", href: "/solutions#briefcam-video-analytics" },
  //       { title: "O-Insights for Milestone", href: "/solutions#o-insights" }
  //     ]
  //   },
  // ];

  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null; // Hide Navbar on admin pages
  }

  return (
    <div className="h-20">
      <nav
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
          isScrolled
            ? "bg-dark/90 backdrop-blur-lg border-b border-secondary/20 cyber-scanline"
            : "bg-dark/80 backdrop-blur-md"
        }`}
        style={{ 
          position: 'fixed',
          top: 0,
          width: '100%'
        }}
      >
        <div className="w-[100%] mx-auto px-5 border-b-2 border-white">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center" onClick={(e) => {
              e.preventDefault();
              handleLinkClick("/");
            }}>
              <div className="relative group">
                {/* <Image
                  src="/logo_ow.webp"
                  alt="SwaTech Logo"
                  width={120}
                  height={48}
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
                /> */}
                <span className="text-2xl font-bold text-secondary">SWATECH</span>
                <div className="absolute inset-0 bg-secondary/20 filter blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className={`text-${pathname === item.href ? 'secondary' : 'gray-300'} hover:text-secondary transition-colors relative group`}
                  >
                    <span>{item.title}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ) 
              )}

              <Link
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("/contact");
                }}
                className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-md text-primary bg-secondary hover:opacity-90 focus:outline-none transition-all duration-300 shadow-[0_0_10px_rgba(14,246,204,0.3)]"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-secondary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                item.title !== "Solutions" ? (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`block text-${pathname === item.href ? 'secondary' : 'gray-300'} hover:text-secondary transition-colors py-2`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      handleLinkClick(item.href);
                    }}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div key={item.title} className="py-2">
                    <button
                      onClick={() => setMobileSolutionsDropdownOpen(!mobileSolutionsDropdownOpen)}
                      className={`flex items-center w-full text-${
                        pathname.startsWith('/solutions') ? 'secondary' : 'gray-300'
                      } hover:text-secondary transition-colors`}
                    >
                      <span>Solutions</span>
                      <span>
                        {mobileSolutionsDropdownOpen ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </span>
                    </button>
                    
                    {/* <AnimatePresence>
                      {mobileSolutionsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 mt-2 space-y-1"
                        >
                          {solutionItems.flatMap(category => 
                            category.items.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="block text-gray-300 hover:text-secondary transition-colors py-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsOpen(false);
                                  handleLinkClick(item.href);
                                }}
                              >
                                {item.title}
                              </Link>
                            ))
                          )}
                          <Link
                            href="/solutions"
                            className="block text-secondary font-medium py-2"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOpen(false);
                              handleLinkClick("/solutions");
                            }}
                          >
                            View All Solutions
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence> */}
                  </div>
                )
              ))}
              
              <div className="pt-4 mt-2 border-t border-secondary/20">
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-2 font-medium rounded-md text-primary bg-secondary hover:opacity-90 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    handleLinkClick("/contact");
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
