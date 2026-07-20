/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { SiInstagram, SiTiktok, SiFacebook } from "@icons-pack/react-simple-icons";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer id="main-footer" className="bg-[#111111] text-white pt-24 pb-12 border-t border-[#622219]/20 font-sans">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-20 border-b border-[#333333]">
          {/* Brand Column */}
          <div id="footer-brand" className="space-y-6">
            <button onClick={() => handleLinkClick("home")} className="flex flex-col items-start text-left focus:outline-none cursor-pointer">
              <span className="text-2xl font-bold tracking-widest text-white uppercase hover:text-[#99B7DE] transition-colors">London Homes</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#99B7DE] mt-1">Your Comfort, Our Priority</span>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Lagos’ premier boutique real estate firm representing high-net-worth investors in securing authentic, high-yield luxury residential holdings.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                id="ig-link"
                href="https://www.instagram.com/londonhomeslimited/"
                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#99B7DE] transition-all"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                id="tk-link"
                href="https://www.tiktok.com/@londonhomeslimited"
                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#99B7DE] transition-all"
                aria-label="TikTok"
              >
                <SiTiktok className="w-4 h-4" />
              </a>
              <a
                id="fb-link"
                href="https://www.facebook.com/ilondonhome"
                className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#99B7DE] transition-all"
                aria-label="Facebook"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div id="footer-links" className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-[#99B7DE] font-semibold">Exquisite Navigation</h4>
            <ul className="space-y-3">
              {[
                { id: "home", label: "Home Experience" },
                { id: "properties", label: "Luxury Portfolio" },
                { id: "services", label: "Bespoke Services" },
                { id: "invest", label: "Investment Guide" },
                { id: "about", label: "Our Story & Team" },
                { id: "media", label: "Cinematic Tours" },
                { id: "blog", label: "Luxury Insights" },
                { id: "contact", label: "Contact Office" },
              ].map((link) => (
                <li key={link.id}>
                  <button onClick={() => handleLinkClick(link.id)} className="text-gray-400 hover:text-white text-sm transition-colors focus:outline-none cursor-pointer">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations Covered Column */}
          <div id="footer-locations" className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-[#99B7DE] font-semibold">Prime Territories</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-400">
              <li>Ikoyi</li>
              <li>Banana Island</li>
              <li>Lekki Phase 1</li>
              <li>Victoria Island</li>
              <li>VGC</li>
              <li>Oniru</li>
              <li>Osapa London</li>
              <li>Chevron</li>
              <li>Ajah</li>
              <li>Sangotedo</li>
            </ul>
            <div className="pt-2 flex items-center space-x-2 text-xs text-[#99B7DE]">
              <ShieldCheck className="w-4 h-4" />
              <span>Guaranteed Secure C of O Titles</span>
            </div>
          </div>

          {/* Newsletter Column */}
          <div id="footer-newsletter" className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-[#99B7DE] font-semibold">Market Intelligence</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Subscribe to our private list for quarterly Lagos off-plan opportunities and legal title updates.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Private Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A] text-white border border-gray-800 focus:border-[#99B7DE] text-sm px-4 py-3 pr-10 focus:outline-none transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#99B7DE] hover:text-white transition-colors cursor-pointer" aria-label="Submit Email">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center space-x-2 text-[#99B7DE] text-xs">
                  <Check className="w-3 h-3" />
                  <span>Subscribed to Private Insights.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Office & Regulatory Section */}
        <div id="footer-bottom-grid" className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 text-gray-400 text-sm">
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-[#99B7DE] shrink-0 mt-0.5" />
            <span>
              <strong>London Homes HQ:</strong> Block 12, Plot 8, Admiralty Way, Lekki Phase 1, Lagos, Nigeria.
            </span>
          </div>
          <div >
            <span className="flex items-start space-x-3">
              <Phone className="w-4 h-4 text-[#99B7DE] shrink-0 mt-0.5" />
              <strong>Inquiries:</strong> +234 (0) 803 265 9756 | +234 (0) 705 060 4442  <br />
            </span>
            <span className="flex items-start space-x-3">
            <Mail className="w-4 h-4 text-[#99B7DE] shrink-0 mt-0.5" />
              <strong>Email: </strong> concierge@londonhomes.ng
            </span>
          </div>
          <div className="lg:text-right space-y-1">
            <p>© {new Date().getFullYear()} London Homes Limited. All rights reserved.</p>
            <p className="text-xs text-gray-600">Certified Member: Real Estate Developers Association of Nigeria (REDAN) & Lagos State Real Estate Regulatory Authority (LASRERA).</p>
          </div>
        </div>
      </footer>
      {/* Artistic Flair - Live Market Updates Status Bar */}
      <div id="live-status-bar" className="border-t border-[#ECECEC] flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 py-4 bg-white z-10 text-gray-900 font-sans gap-4 md:gap-0">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-900">Live Market Updates</span>
          </div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Lekki P1 Appreciation: +4.2% (Q3)</span>
        </div>
        <div className="flex gap-6 items-center text-[10px] uppercase tracking-widest">
          <span className="opacity-50 text-gray-500">Connect:</span>
          <a href="https://www.instagram.com/londonhomeslimited/" target="_blank" className="font-bold text-gray-900 hover:text-[#622219] transition-colors">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@londonhomeslimited" target="_blank" className="font-bold text-gray-900 hover:text-[#622219] transition-colors">
            TikTok
          </a>
          <a href="https://wa.me/2348032659756" target="_blank" rel="noreferrer" className="font-bold text-[#D11D1F] hover:text-[#622219] transition-colors">
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
