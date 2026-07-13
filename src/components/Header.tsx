/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onBookInspection: () => void;
}

export default function Header({ currentPage, setCurrentPage, onBookInspection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'services', label: 'Services' },
    { id: 'invest', label: 'Investment Guide' },
    { id: 'about', label: 'About' },
    { id: 'media', label: 'Media' },
    { id: 'blog', label: 'Insights' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#ECECEC] py-4'
          : 'bg-white/80 backdrop-blur-xs py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex flex-col items-start group text-left focus:outline-none cursor-pointer"
        >
          <span className="font-sans text-2xl font-extrabold tracking-tighter uppercase leading-none text-[#000000] transition-colors duration-300 group-hover:text-[#622219]">
            London Homes
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] mt-1 text-[#622219]">
            Your Comfort, Our Priority
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`font-sans text-sm font-medium tracking-wide transition-all duration-300 relative py-1 focus:outline-none cursor-pointer hover:text-[#622219] ${
                currentPage === item.id ? 'text-[#622219]' : 'text-[#333333]'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#622219] animate-fade-in" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div id="header-actions" className="hidden lg:flex items-center space-x-4">
          <a
            id="phone-link"
            href="tel:+234800LONDON"
            className="flex items-center space-x-2 text-sm font-medium text-[#111111] hover:text-[#622219] transition-colors duration-300"
          >
            <Phone className="w-4 h-4 text-[#622219]" />
            <span className="font-mono text-xs">+234 (0) 803 123 4567</span>
          </a>
          <button
            id="book-inspection-btn"
            onClick={onBookInspection}
            className="bg-[#D11D1F] text-white hover:bg-[#622219] text-xs font-semibold uppercase tracking-widest px-5 py-3 transition-all duration-300 cursor-pointer"
          >
            Private Viewing
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#111111] hover:text-[#622219] transition-colors duration-300 focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`lg:hidden fixed inset-x-0 top-[73px] bg-white border-b border-[#ECECEC] transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'opacity-100 translate-y-0 shadow-lg' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 flex flex-col space-y-5">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mob-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`font-sans text-left text-base font-semibold tracking-wide py-1 focus:outline-none ${
                currentPage === item.id ? 'text-[#622219]' : 'text-[#333333]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-[#ECECEC] flex flex-col space-y-4">
            <a
              id="mob-phone-link"
              href="tel:+2348031234567"
              className="flex items-center space-x-3 text-sm font-semibold text-[#111111]"
            >
              <Phone className="w-4 h-4 text-[#622219]" />
              <span className="font-mono text-sm">+234 (0) 803 123 4567</span>
            </a>
            <a
              id="mob-whatsapp-link"
              href="https://wa.me/2348031234567"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-3 text-sm font-semibold text-[#111111]"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Connect on WhatsApp</span>
            </a>
            <button
              id="mob-book-inspection-btn"
              onClick={() => {
                setIsOpen(false);
                onBookInspection();
              }}
              className="w-full bg-[#D11D1F] text-white hover:bg-[#622219] text-xs font-semibold uppercase tracking-widest py-4 transition-all duration-300 text-center cursor-pointer"
            >
              Schedule Private Viewing
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
