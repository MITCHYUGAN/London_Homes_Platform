/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Phone,
  Mail,
  Calendar,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Check,
  HelpCircle,
  Play,
  Download,
  Info,
  Layers,
  Award,
  Globe,
  Building,
  DollarSign,
  MessageCircle,
  Clock,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PropertyCard from "./components/PropertyCard";
import InspectionModal from "./components/InspectionModal";
import RoiCalculator from "./components/RoiCalculator";
import LuxuryViewportVideo from "./components/LuxuryViewportVideo";
import { PROPERTIES, NEIGHBORHOODS, SERVICES, ARTICLES, TESTIMONIALS } from "./data";
import { Property, Article } from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("prop-obsidian");
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [propertyForInspection, setPropertyForInspection] = useState<Property | null>(null);

  // Home Quick Search State
  const [quickSearchLocation, setQuickSearchLocation] = useState("all");
  const [quickSearchType, setQuickSearchType] = useState("all");
  const [quickSearchBudget, setQuickSearchBudget] = useState("all");

  // Properties Filtering State
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterBeds, setFilterBeds] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridMode, setIsGridMode] = useState(true);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Mortgage Estimator State (Property Detail Page)
  const [mortgageDownPaymentPercent, setMortgageDownPaymentPercent] = useState(30); // 30% default
  const [mortgageInterestRate, setMortgageInterestRate] = useState(18); // 18% standard high-end Nigerian bank mortgage
  const [mortgageTermYears, setMortgageTermYears] = useState(15); // 15 years

  // Selected property helper
  const selectedProperty = PROPERTIES.find((p) => p.id === selectedPropertyId) || PROPERTIES[0];

  // Active contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Video modal walkthrough state
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Lifestyle background video states
  const [isLifestyleMuted, setIsLifestyleMuted] = useState(true);
  const lifestyleIframeRef = useRef<HTMLIFrameElement>(null);

  const toggleLifestyleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const iframe = lifestyleIframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    if (isLifestyleMuted) {
      iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "unMute", args: "" }), "*");
      setIsLifestyleMuted(false);
    } else {
      iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "mute", args: "" }), "*");
      setIsLifestyleMuted(true);
    }
  };

  // Trigger inspection modal with a specific property
  const handleOpenInspectionForProperty = (property: Property) => {
    setPropertyForInspection(property);
    setIsInspectionModalOpen(true);
  };

  // Trigger general advisory booking
  const handleOpenGeneralInspection = () => {
    setPropertyForInspection(null);
    setIsInspectionModalOpen(true);
  };

  // Handle page transitions smoothly by scrolling to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Execute Search from Home Quick search
  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterLocation(quickSearchLocation);
    setFilterType(quickSearchType);
    setFilterPrice(quickSearchBudget);
    setCurrentPage("properties");
  };

  // Filter properties logic
  const filteredProperties = PROPERTIES.filter((prop) => {
    const matchesLocation = filterLocation === "all" || prop.location === filterLocation;
    const matchesType = filterType === "all" || prop.type === filterType;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "For Sale" && prop.status === "For Sale") ||
      (filterStatus === "For Rent" && prop.status === "For Rent") ||
      (filterStatus === "Short Let" && prop.status === "Short Let") ||
      (filterStatus === "Just Sold" && prop.status === "Just Sold") ||
      (filterStatus === "Recently Leased" && prop.status === "Recently Leased");

    const matchesBeds = filterBeds === "all" || prop.bedrooms === Number(filterBeds);

    let matchesPrice = true;
    if (filterPrice !== "all") {
      if (filterPrice === "under-500m") matchesPrice = prop.price < 500000000;
      else if (filterPrice === "500m-1b") matchesPrice = prop.price >= 500000000 && prop.price <= 1000000000;
      else if (filterPrice === "over-1b") matchesPrice = prop.price > 1000000000;
    }

    const matchesSearch =
      searchQuery === "" ||
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLocation && matchesType && matchesStatus && matchesBeds && matchesPrice && matchesSearch;
  });

  // Contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactPhone) {
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactMessage("");
      setTimeout(() => setContactSuccess(false), 5000);
    }
  };

  // Format currency helper
  const formatNairaRaw = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-900 font-sans selection:bg-[#622219]/10 selection:text-[#622219] flex flex-col justify-between">
      {/* Dynamic Header */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} onBookInspection={handleOpenGeneralInspection} />

      {/* Floating WhatsApp CTA */}
      <a
        id="floating-whatsapp-cta"
        href="https://wa.me/2348032659756?text=Hello%20London%20Homes,%20I%20am%20interested%20in%20arranging%20a%20luxury%20property%20inspection%20in%20Lagos."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center justify-center border border-white/20"
        title="Connect with Luxury Advisor on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* MAIN CONTAINER */}
      <main className="flex-1 pt-24">
        {/* ========================================================= */}
        {/* PAGE: HOME */}
        {/* ========================================================= */}
        {currentPage === "home" && (
          <div id="home-view" className="animate-fade-in">
            {/* SECTION: LUXURY HERO */}
            <section id="luxury-hero" className="relative h-[95vh] flex items-center justify-center bg-black overflow-hidden">
              {/* Background Video - Cinematic Drone View of City Skyline at Sunset */}
              <div className="absolute inset-0 z-0">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-60 filter saturate-110">
                  <source src="/src/assets/videos/drone-video.mp4" type="video/mp4" />
                  {/* Fallback image */}
                  <img src="/src/assets/images/hero_banana_island_1783963760466.jpg" alt="Banana Island Luxury Drone Footage Placeholder" className="w-full h-full object-cover opacity-60" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-1" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-1" />
              </div>

              {/* Luxury Accent Float - Context Rail (Artistic Flair) */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col justify-between h-[200px] items-center z-10 select-none pointer-events-none">
                <div className="rotate-180 flex items-center gap-3" style={{ writingMode: "vertical-rl" }}>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-extrabold">Estd. 2018 — Lagos</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="w-0.5 h-8 bg-[#622219]"></div>
                  <div className="w-0.5 h-4 bg-white/20"></div>
                </div>
              </div>

              {/* Editorial Hero Content */}
              <div className="relative z-10 max-w-5xl mx-auto text-center px-6 space-y-8 text-white mt-12">
                <span className="text-xs uppercase font-extrabold tracking-[0.4em] text-[#99B7DE] bg-black/30 backdrop-blur-md px-4 py-2 border border-white/10 inline-block rounded-xs animate-pulse">
                  Exclusive Terralife & Elite Escrows
                </span>
                <h1 className="font-sans text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none text-white drop-shadow-md">
                  Own More Than Property. <br className="hidden md:inline" />
                  <span className="text-[#99B7DE]">Own Legacy.</span>
                </h1>
                <p className="text-gray-200 text-base sm:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
                  We help high-net-worth Nigerian families and global diaspora investors confidently acquire and manage certified luxury real estate across Lagos.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setCurrentPage("properties")}
                    className="w-full sm:w-auto bg-[#D11D1F] hover:bg-[#622219] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 transition-colors cursor-pointer"
                  >
                    Examine Portfolio
                  </button>
                  <button
                    onClick={handleOpenGeneralInspection}
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest px-8 py-4 transition-colors cursor-pointer"
                  >
                    Request Advisory
                  </button>
                </div>
              </div>

              {/* Floating scroll trigger details */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center text-xs text-black/60 hidden md:block">
                <span className="font-mono animate-bounce inline-block mb-1">↓</span>
                <p className="uppercase tracking-widest font-semibold text-[9px]">Begin Editorial Narrative</p>
              </div>
            </section>

            {/* SECTION: TRUST PARTNERS (Apple Style) */}
            <section id="trust-partners" className="bg-white py-12 border-b border-[#ECECEC]">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="text-center lg:text-left">
                    <span className="text-[10px] uppercase tracking-widest text-[#622219] font-bold block">Certified Trust Protocols</span>
                    <p className="text-gray-400 text-xs mt-1 font-mono">Affiliated with top-tier financial custodians and title guarantee institutions</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="font-mono text-base font-black tracking-widest">ACCESS BANK ESCROW</span>
                    <span className="font-sans text-lg font-bold tracking-tight">GTCO PRIVATE</span>
                    <span className="font-mono text-sm font-semibold tracking-[0.2em]">LASRERA SECURE</span>
                    <span className="font-serif text-base italic font-semibold">REDAN MEMBER</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: QUICK PROPERTY SEARCH ENGINE */}
            <section id="quick-search" className="relative z-20 max-w-6xl mx-auto px-6 -mt-16 md:-mt-20">
              <form onSubmit={handleQuickSearch} className="bg-white border border-[#ECECEC] shadow-2xl p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1.5 border-b sm:border-b-0 sm:border-r border-[#ECECEC] pb-4 sm:pb-0 sm:pr-4">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">Territory</label>
                  <select
                    value={quickSearchLocation}
                    onChange={(e) => setQuickSearchLocation(e.target.value)}
                    className="w-full text-sm font-semibold text-gray-800 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Lagos Regions</option>
                    <option value="Banana Island">Banana Island</option>
                    <option value="Ikoyi">Ikoyi</option>
                    <option value="Lekki Phase 1">Lekki Phase 1</option>
                    <option value="Victoria Island">Victoria Island</option>
                    <option value="Oniru">Oniru</option>
                    <option value="VGC">VGC</option>
                  </select>
                </div>

                <div className="space-y-1.5 border-b lg:border-b-0 lg:border-r border-[#ECECEC] pb-4 sm:pb-0 lg:pr-4">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">Estate Type</label>
                  <select
                    value={quickSearchType}
                    onChange={(e) => setQuickSearchType(e.target.value)}
                    className="w-full text-sm font-semibold text-gray-800 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Properties</option>
                    <option value="Villa">Luxury Villas</option>
                    <option value="Penthouse">Sky Penthouses</option>
                    <option value="Apartment">Serviced Apartments</option>
                    <option value="Terrace">Executive Terraces</option>
                    <option value="Off-Plan">Off-Plan Ventures</option>
                  </select>
                </div>

                <div className="space-y-1.5 border-b sm:border-b-0 sm:border-r border-[#ECECEC] pb-4 sm:pb-0 sm:pr-4">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400">Capital Bracket</label>
                  <select
                    value={quickSearchBudget}
                    onChange={(e) => setQuickSearchBudget(e.target.value)}
                    className="w-full text-sm font-semibold text-gray-800 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="all">Any Price Bracket</option>
                    <option value="under-500m">Under ₦500 Million</option>
                    <option value="500m-1b">₦500M – ₦1 Billion</option>
                    <option value="over-1b">Above ₦1 Billion</option>
                  </select>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="w-full bg-[#111111] hover:bg-[#622219] text-white text-xs font-semibold uppercase tracking-widest py-4.5 transition-colors duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Listings</span>
                  </button>
                </div>
              </form>
            </section>

            {/* SECTION: BRAND & TRUST STORY NARRATIVE */}
            <section id="brand-story-home" className="py-24 lg:py-32 bg-white">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Beyond Average Brokerages</span>
                    <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">Why Global Investors Transact Through London Homes.</h2>
                  </div>
                  <p className="text-gray-500 text-base leading-relaxed font-light">
                    In Lagos real estate, the bottleneck is never inventory. It is trust, verified title clarity, and transaction security. London Homes was founded to eliminate risk, serving as an
                    institutional gateway for local families and returning diaspora looking to build wealth safely.
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed font-light">
                    Every property on our roster undergoes exhaustive three-layer legal validation, ensuring 100% clean title status, free of disputable allocations or local family entanglements. We
                    secure your investment through certified third-party bank escrows.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setCurrentPage("about")}
                      className="text-gray-900 hover:text-[#622219] font-bold text-xs uppercase tracking-widest flex items-center space-x-2 group/btn cursor-pointer"
                    >
                      <span>Study Our Secure Framework</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Grid of bespoke reasons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                  <div className="p-8 bg-[#F8F8F8] border border-[#ECECEC] space-y-4">
                    <div className="w-12 h-12 bg-[#622219]/5 text-[#622219] flex items-center justify-center rounded-xs">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-sans text-base font-bold text-gray-900">100% Title Verification</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-light">Every asset has certified Certificate of Occupancy (C of O) and Governor’s Consent checks before publishing.</p>
                  </div>

                  <div className="p-8 bg-[#F8F8F8] border border-[#ECECEC] space-y-4">
                    <div className="w-12 h-12 bg-[#622219]/5 text-[#622219] flex items-center justify-center rounded-xs">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="font-sans text-base font-bold text-gray-900">Secure Escrow Milestone Contracts</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-light">Funds for off-plan purchases are released in secure phases verified by our independent civil engineers.</p>
                  </div>

                  <div className="p-8 bg-[#F8F8F8] border border-[#ECECEC] space-y-4">
                    <div className="w-12 h-12 bg-[#622219]/5 text-[#622219] flex items-center justify-center rounded-xs">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-sans text-base font-bold text-gray-900">Bespoke Concierge Care</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-light">Chauffeured viewings, complete airport pickups for diaspora clients, and seamless asset handover management.</p>
                  </div>

                  <div className="p-8 bg-[#F8F8F8] border border-[#ECECEC] space-y-4">
                    <div className="w-12 h-12 bg-[#622219]/5 text-[#622219] flex items-center justify-center rounded-xs">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="font-sans text-base font-bold text-gray-900">Data-Backed Projections</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-light">No marketing exaggerations. Real comparative neighborhood yield metrics and capital valuation statistics.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: FEATURED LISTINGS */}
            <section id="featured-listings" className="py-24 lg:py-32 bg-[#F8F8F8] border-y border-[#ECECEC]">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-3">
                    <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Curated Masterpieces</span>
                    <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">Featured Holdings</h2>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setFilterLocation("all");
                        setFilterType("all");
                        setFilterStatus("all");
                        setCurrentPage("properties");
                      }}
                      className="text-xs uppercase font-semibold tracking-widest border-b border-[#111111] pb-1 hover:text-[#622219] hover:border-[#622219] transition-all cursor-pointer"
                    >
                      Examine Complete Inventory ({PROPERTIES.length})
                    </button>
                  </div>
                </div>

                {/* Property Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {PROPERTIES.filter((p) => p.isFeatured)
                    .slice(0, 3)
                    .map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onViewDetails={(id) => {
                          setSelectedPropertyId(id);
                          setCurrentPage("property-details");
                        }}
                        onBookInspection={handleOpenInspectionForProperty}
                      />
                    ))}
                </div>
              </div>
            </section>

            {/* SECTION: ACTIVE MARKET TRANSACTIONS (Activity Counters) */}
            <section id="market-stats" className="py-20 lg:py-28 bg-[#111111] text-white">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 text-center">
                  <div className="space-y-2">
                    <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#99B7DE]">₦100B+</span>
                    <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Property Transactions</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#99B7DE]">220+</span>
                    <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Luxury Listings</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#99B7DE]">500+</span>
                    <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Satisfied Clients</p>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#99B7DE]">10+</span>
                    <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Prime Lagos locations</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: BREATHE NEIGHBORHOODS MAP GUIDES */}
            <section id="explore-neighborhoods" className="py-24 lg:py-32 bg-white">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-16">
                <div className="text-center space-y-3 max-w-xl mx-auto">
                  <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Lagos Territories</span>
                  <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">Prime Locations</h2>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">We exclusively list in enclaves of unmatched stability, security, and proven capital appreciation trends.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {NEIGHBORHOODS.map((hood) => (
                    <div
                      key={hood.id}
                      className="group relative h-96 overflow-hidden border border-[#ECECEC] cursor-pointer"
                      onClick={() => {
                        setFilterLocation(hood.name);
                        setFilterType("all");
                        setFilterStatus("all");
                        setCurrentPage("properties");
                      }}
                    >
                      <img src={hood.image} alt={hood.name} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#99B7DE]">Average Entry {hood.avgPrice}</span>
                        <h3 className="font-sans text-lg font-bold">{hood.name}</h3>
                        <p className="text-gray-300 text-xs font-light line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">{hood.description}</p>
                        <div className="flex items-center space-x-1.5 pt-1 text-[10px] text-[#99B7DE] uppercase font-bold tracking-wider">
                          <span>ROI: {hood.roi}</span>
                          <span>•</span>
                          <span>Explore region</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION: DIASPORA INVESTMENT SPOTLIGHT */}
            <section id="investment-spotlight" className="py-24 lg:py-32 bg-[#F8F8F8] border-y border-[#ECECEC]">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 order-2 lg:order-1">
                  <div className="relative aspect-video w-full overflow-hidden shadow-2xl border border-[#ECECEC] rounded-xs">
                    {/* <LuxuryViewportVideo
                      id="diaspora-spotlight-video"
                      src={`https://www.youtube.com/embed/VuPsrZDFODA`}
                      // src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-mansion-with-pool-42861-large.mp4"
                      // poster="/src/assets/images/luxury_ikoyi_penthouse_1783963776970.jpg"
                      title="Cinematic Property Walkthrough Tour"
                      onExpand={(url) => setActiveVideoUrl(url)}
                    /> */}
                    <div style={{ overflow: "hidden", paddingBottom: "56.25%", position: "relative", height: 0 }}>
                      <iframe
                        style={{ left: 0, top: 0, height: "100%", width: "100%", position: "absolute" }}
                        src={`https://www.youtube.com/embed/ycNRiq7LAvM`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white p-4 border border-[#ECECEC] font-mono">
                      <div className="text-lg font-bold text-[#622219]">₦3.8B</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Hedge Asset</div>
                    </div>
                    <div className="bg-white p-4 border border-[#ECECEC] font-mono">
                      <div className="text-lg font-bold text-[#622219]">15%</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Avg Yield</div>
                    </div>
                    <div className="bg-white p-4 border border-[#ECECEC] font-mono">
                      <div className="text-lg font-bold text-[#622219]">100%</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Escrowed</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 order-1 lg:order-2">
                  <div className="space-y-3">
                    <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Capital Positioning</span>
                    <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">Confidently Invest in Lagos Off-Plan Ventures</h2>
                  </div>
                  <p className="text-gray-500 text-base leading-relaxed font-light">
                    Lagos’ elite residential skyscrapers present some of the world’s ultimate arbitrage opportunities. Buying off-plan allows early-stage bookings at significant discounts, yielding
                    secure, compounded gains of over 20% by structural handover.
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed font-light">
                    Our dynamic escrow disbursement frameworks protect you from unfinished delays. We verify builders, execute title registrations, and audit physical milestones continuously, keeping
                    your capital 100% insulated.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      onClick={() => setCurrentPage("invest")}
                      className="bg-[#111111] hover:bg-[#622219] text-white text-xs font-semibold uppercase tracking-widest px-8 py-4 transition-colors cursor-pointer"
                    >
                      Run Yield Simulator
                    </button>
                    <button
                      onClick={() => {
                        setCurrentPage("blog");
                      }}
                      className="text-gray-900 hover:text-[#622219] text-xs font-bold uppercase tracking-widest flex items-center space-x-2 p-3 cursor-pointer"
                    >
                      <span>Read Legal Guides</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: CINEMATIC LIFESTYLE LOOP (ULTRA LUXURY BANNER) */}
            <section className="relative h-[65vh] flex items-center justify-center bg-black overflow-hidden">
              <div className="absolute inset-0 z-0">
                {/* YouTube Background Player: loops and supports sound toggle */}
                <iframe
                  ref={lifestyleIframeRef}
                  src="https://www.youtube.com/embed/nYCIBk0_lTM?autoplay=1&mute=1&loop=1&playlist=nYCIBk0_lTM&controls=0&showinfo=0&rel=0&enablejsapi=1&playsinline=1&iv_load_policy=3&modestbranding=1"
                  className="absolute top-1/2 left-1/2 w-[125%] h-[125%] -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover opacity-50 scale-110 aspect-video"
                  allow="autoplay; encrypted-media"
                  title="Cinematic Luxury Loop"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 z-1" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-6">
                <span className="text-[11px] uppercase tracking-[0.4em] text-[#99B7DE] font-extrabold block">The Heritage of Perfection</span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl italic text-white leading-tight font-light drop-shadow-lg">
                  "We do not merely construct residences. <br />
                  We curate private sanctuaries that stand as monuments to your ambition and legacy."
                </h3>
                <div className="w-16 h-[1px] bg-white/30 mx-auto mt-6"></div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-mono">Curated by London Homes</p>
              </div>

              {/* Minimalist Floating Mute/Unmute Toggler */}
              <button
                id="toggle-sound-btn"
                onClick={toggleLifestyleMute}
                className="absolute bottom-6 right-6 lg:bottom-8 lg:right-12 z-20 w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:text-[#99B7DE] hover:border-white/50 flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer focus:outline-none"
                title={isLifestyleMuted ? "Unmute Video" : "Mute Video"}
              >
                {isLifestyleMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
              </button>
            </section>

            {/* SECTION: CLIENT SUCCESS STORIES & TESTIMONIALS */}
            <section id="testimonials-home" className="py-24 lg:py-32 bg-white">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-16">
                <div className="text-center space-y-3 max-w-xl mx-auto">
                  <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Verified Success Stories</span>
                  <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">Earning Client Trust</h2>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">
                    Listen to international medical professionals, energy partners, and diaspora investors who confidently acquired Lagos properties through us.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-[#F8F8F8] border border-[#ECECEC] p-8 lg:p-10 flex flex-col justify-between space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-1 text-amber-500">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <span key={i} className="text-lg">
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed italic font-light">"{t.reviewText}"</p>
                      </div>

                      <div className="flex items-center space-x-4 pt-4 border-t border-[#ECECEC]">
                        <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-[#ECECEC]" />
                        <div>
                          <h4 className="font-sans text-sm font-bold text-gray-900">{t.name}</h4>
                          <p className="text-gray-400 text-xs">{t.role}</p>
                          <span className="text-[10px] uppercase font-semibold text-[#622219] font-mono">{t.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION: LATEST INSIGHTS & EDITORIAL MAGAZINE */}
            <section id="insights-home" className="py-24 lg:py-32 bg-[#F8F8F8] border-t border-[#ECECEC]">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-3">
                    <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Market Intelligence</span>
                    <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">Latest Publications</h2>
                  </div>
                  <div>
                    <button
                      onClick={() => setCurrentPage("blog")}
                      className="text-xs uppercase font-semibold tracking-widest border-b border-[#111111] pb-1 hover:text-[#622219] hover:border-[#622219] transition-all cursor-pointer"
                    >
                      Browse All Insights
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  {ARTICLES.map((art) => (
                    <article key={art.id} className="group bg-white border border-[#ECECEC] overflow-hidden flex flex-col h-full hover:shadow-lg transition-all">
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                        <img src={art.image} alt={art.title} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <span className="absolute top-4 left-4 bg-white px-3 py-1.5 text-[9px] uppercase font-bold tracking-wider border border-[#ECECEC]">{art.category}</span>
                      </div>
                      <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center text-[10px] text-gray-400 font-mono space-x-2">
                            <span>{art.date}</span>
                            <span>•</span>
                            <span>{art.readTime}</span>
                          </div>
                          <h3
                            onClick={() => {
                              setCurrentPage("blog");
                            }}
                            className="font-sans text-base font-bold text-gray-900 hover:text-[#622219] transition-colors leading-snug cursor-pointer line-clamp-2"
                          >
                            {art.title}
                          </h3>
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{art.excerpt}</p>
                        </div>
                        <button
                          onClick={() => setCurrentPage("blog")}
                          className="text-[#622219] font-bold text-xs uppercase tracking-widest flex items-center space-x-1.5 hover:text-[#D11D1F] cursor-pointer"
                        >
                          <span>Examine Article</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION: FOOTER CTA WITH WHATSAPP VIEW */}
            <section id="footer-cta" className="relative py-28 lg:py-36 bg-[#111111] text-white overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img
                  src="/src/assets/images/hero_banana_island_1783963760466.jpg"
                  alt="Elite Background Footer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-20 filter grayscale blur-[1px]"
                />
                <div className="absolute inset-0 bg-[#111111]/90" />
              </div>

              <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#99B7DE]">Confidential Representation</span>
                <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none uppercase">
                  Schedule an Elite <br className="hidden sm:inline" /> Private Inspection
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-light">
                  Whether you are based locally or dialing in from Houston, London, or Toronto, let us host you. Enjoy absolute privacy, secure chauffeured transit, and direct negotiation
                  transparency.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={handleOpenGeneralInspection}
                    className="w-full sm:w-auto bg-[#D11D1F] hover:bg-[#622219] text-white text-xs font-semibold uppercase tracking-widest px-8 py-4.5 transition-colors cursor-pointer"
                  >
                    Arrange Private Viewing
                  </button>
                  <a
                    href="https://wa.me/2348032659756?text=Hi London Homes, I'm interested in a property I saw on your platform."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border border-gray-800 hover:border-gray-600 text-xs font-semibold uppercase tracking-widest px-8 py-4.5 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE: PROPERTIES (PORTFOLIO SEARCH) */}
        {/* ========================================================= */}
        {currentPage === "properties" && (
          <div id="portfolio-view" className="animate-fade-in max-w-[1440px] mx-auto px-6 lg:px-12 py-16 space-y-12">
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Exquisite Inventory</span>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">Luxury Real Estate Portfolio</h1>
              <p className="text-gray-500 text-sm max-w-xl font-light">Securely browse verified penthouses, off-plan projects, waterfront villas, and prime land plots available across Lagos.</p>
            </div>

            {/* ADVANCED FILTERING DASHBOARD */}
            <div id="portfolio-filters" className="bg-[#F8F8F8] border border-[#ECECEC] p-6 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Search query input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by keywords (e.g. Waterfront, pool, penthouse...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-[#ECECEC] focus:border-[#622219] text-sm pl-10 pr-4 py-3 focus:outline-none transition-colors"
                  />
                </div>

                {/* View toggles & count */}
                <div className="flex items-center justify-between lg:justify-end gap-6 text-xs font-semibold text-gray-600 uppercase">
                  <span>{filteredProperties.length} Properties Match</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsGridMode(true)}
                      className={`p-2 border border-[#ECECEC] cursor-pointer ${isGridMode ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                      aria-label="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsGridMode(false)}
                      className={`p-2 border border-[#ECECEC] cursor-pointer ${!isGridMode ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Filtering dropdown selects */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Region</label>
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full text-xs font-semibold bg-white border border-[#ECECEC] p-3 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Regions</option>
                    <option value="Banana Island">Banana Island</option>
                    <option value="Ikoyi">Ikoyi</option>
                    <option value="Lekki Phase 1">Lekki Phase 1</option>
                    <option value="Victoria Island">Victoria Island</option>
                    <option value="Oniru">Oniru</option>
                    <option value="VGC">VGC</option>
                    <option value="Osapa London">Osapa London</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Category</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full text-xs font-semibold bg-white border border-[#ECECEC] p-3 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="Villa">Villas</option>
                    <option value="Penthouse">Penthouses</option>
                    <option value="Apartment">Apartments</option>
                    <option value="Terrace">Terraces</option>
                    <option value="Off-Plan">Off-Plan Projects</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Acquisition Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full text-xs font-semibold bg-white border border-[#ECECEC] p-3 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="For Sale">For Sale</option>
                    <option value="For Rent">For Rent / Lease</option>
                    <option value="Short Let">Boutique Short Let</option>
                    <option value="Just Sold">Just Sold (Track)</option>
                    <option value="Recently Leased">Recently Leased (Track)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Beds</label>
                  <select
                    value={filterBeds}
                    onChange={(e) => setFilterBeds(e.target.value)}
                    className="w-full text-xs font-semibold bg-white border border-[#ECECEC] p-3 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Any Bedroom</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5">5 Bedrooms</option>
                    <option value="6">6 Bedrooms</option>
                  </select>
                </div>

                <div className="space-y-1 col-span-2 md:col-span-1">
                  <label className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Price Range</label>
                  <select
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                    className="w-full text-xs font-semibold bg-white border border-[#ECECEC] p-3 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Any Budget</option>
                    <option value="under-500m">Under ₦500M</option>
                    <option value="500m-1b">₦500M – ₦1B</option>
                    <option value="over-1b">Above ₦1B</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Row */}
              {(filterLocation !== "all" || filterType !== "all" || filterStatus !== "all" || filterBeds !== "all" || filterPrice !== "all" || searchQuery !== "") && (
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
                  <span className="text-gray-400">Active Criteria:</span>
                  {filterLocation !== "all" && (
                    <span className="bg-white border border-[#ECECEC] text-[#622219] px-2 py-1 flex items-center space-x-1">
                      <span>{filterLocation}</span>
                      <button onClick={() => setFilterLocation("all")} className="hover:text-black font-bold">
                        ×
                      </button>
                    </span>
                  )}
                  {filterType !== "all" && (
                    <span className="bg-white border border-[#ECECEC] text-[#622219] px-2 py-1 flex items-center space-x-1">
                      <span>{filterType}</span>
                      <button onClick={() => setFilterType("all")} className="hover:text-black font-bold">
                        ×
                      </button>
                    </span>
                  )}
                  {filterStatus !== "all" && (
                    <span className="bg-white border border-[#ECECEC] text-[#622219] px-2 py-1 flex items-center space-x-1">
                      <span>{filterStatus}</span>
                      <button onClick={() => setFilterStatus("all")} className="hover:text-black font-bold">
                        ×
                      </button>
                    </span>
                  )}
                  {filterBeds !== "all" && (
                    <span className="bg-white border border-[#ECECEC] text-[#622219] px-2 py-1 flex items-center space-x-1">
                      <span>{filterBeds} Beds</span>
                      <button onClick={() => setFilterBeds("all")} className="hover:text-black font-bold">
                        ×
                      </button>
                    </span>
                  )}
                  {searchQuery !== "" && (
                    <span className="bg-white border border-[#ECECEC] text-[#622219] px-2 py-1 flex items-center space-x-1">
                      <span>"{searchQuery}"</span>
                      <button onClick={() => setSearchQuery("")} className="hover:text-black font-bold">
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setFilterLocation("all");
                      setFilterType("all");
                      setFilterStatus("all");
                      setFilterBeds("all");
                      setFilterPrice("all");
                      setSearchQuery("");
                    }}
                    className="text-[#D11D1F] hover:underline cursor-pointer"
                  >
                    Reset All Criteria
                  </button>
                </div>
              )}
            </div>

            {/* REAL ESTATE LISTINGS OUTPUT */}
            {filteredProperties.length > 0 ? (
              <div className={isGridMode ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12" : "space-y-8"}>
                {filteredProperties.map((property) => {
                  if (isGridMode) {
                    return (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onViewDetails={(id) => {
                          setSelectedPropertyId(id);
                          setCurrentPage("property-details");
                        }}
                        onBookInspection={handleOpenInspectionForProperty}
                      />
                    );
                  } else {
                    return (
                      <div
                        key={property.id}
                        id={`list-card-${property.id}`}
                        className="group bg-white border border-[#ECECEC] hover:border-black/10 overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-xl"
                      >
                        {/* Left image column */}
                        <div className="relative md:w-[40%] bg-gray-100 aspect-video md:aspect-auto">
                          <img src={property.images[0]} alt={property.title} className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-103" />
                          <span className="absolute top-4 left-4 bg-white text-[#622219] border border-[#ECECEC] text-[9px] uppercase font-bold tracking-wider px-3 py-1">{property.status}</span>
                        </div>

                        {/* Right details column */}
                        <div className="p-8 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
                              <span>
                                {property.type} in {property.location}
                              </span>
                              <span className="font-mono text-[#622219] font-semibold">{property.referenceId}</span>
                            </div>
                            <h3
                              onClick={() => {
                                setSelectedPropertyId(property.id);
                                setCurrentPage("property-details");
                              }}
                              className="font-sans text-xl font-bold text-gray-900 group-hover:text-[#622219] transition-colors leading-tight cursor-pointer"
                            >
                              {property.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xl font-light">{property.description}</p>

                            {/* Features highlights */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              {property.features.slice(0, 3).map((f, i) => (
                                <span key={i} className="bg-gray-100 text-gray-600 text-[10px] uppercase font-medium px-2 py-1 rounded-xs">
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Footer details row */}
                          <div className="mt-8 pt-6 border-t border-[#ECECEC] flex flex-wrap items-baseline justify-between gap-4">
                            <div className="flex items-center space-x-6 text-gray-700 font-mono text-xs">
                              {property.bedrooms && (
                                <span className="flex items-center space-x-1.5">
                                  <Bed className="w-4 h-4 text-[#622219]" />
                                  <span>{property.bedrooms} Beds</span>
                                </span>
                              )}
                              {property.bathrooms && (
                                <span className="flex items-center space-x-1.5">
                                  <Bath className="w-4 h-4 text-[#622219]" />
                                  <span>{property.bathrooms} Baths</span>
                                </span>
                              )}
                              {property.areaSqM && (
                                <span className="flex items-center space-x-1.5">
                                  <Maximize2 className="w-4 h-4 text-[#622219]" />
                                  <span>{property.areaSqM} m²</span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center space-x-6">
                              <span className="font-mono text-xl font-bold text-gray-900">
                                {property.status === "Short Let" ? `₦${(property.price / 1000).toFixed(0)}k / night` : `₦${(property.price / 1000000).toFixed(0)} Million`}
                              </span>
                              <button
                                onClick={() => {
                                  setSelectedPropertyId(property.id);
                                  setCurrentPage("property-details");
                                }}
                                className="bg-[#111111] hover:bg-[#622219] text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 transition-colors cursor-pointer"
                              >
                                Examine Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="py-20 border border-dashed border-gray-200 text-center space-y-4">
                <p className="text-gray-500 font-medium">No luxury properties match your specific criteria.</p>
                <button
                  onClick={() => {
                    setFilterLocation("all");
                    setFilterType("all");
                    setFilterStatus("all");
                    setFilterBeds("all");
                    setFilterPrice("all");
                    setSearchQuery("");
                  }}
                  className="bg-black text-white text-xs uppercase font-semibold tracking-widest px-6 py-3 cursor-pointer hover:bg-[#622219]"
                >
                  Reset Filter Parameters
                </button>
              </div>
            )}

            {/* MAP VIEW PLACEHOLDER (LUXURY) */}
            <div id="map-section" className="bg-[#F8F8F8] border border-[#ECECEC] p-6 lg:p-12 space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-900 uppercase">Premium Territory Visualizations</h3>
                <p className="text-gray-500 text-xs">Displaying verified high-value property concentrations across Banana Island, Ikoyi and Lekki peninsula.</p>
              </div>
              <div className="relative aspect-3/1 w-full bg-gray-200 overflow-hidden flex items-center justify-center border border-[#ECECEC]">
                {/* SVG/Styled Vector Map Overlay */}
                <div className="absolute inset-0 bg-[#ECECEC]/30 z-0 flex items-center justify-center font-mono text-[10px] text-gray-400">
                  {/* Styled Grid Dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#dcdcdc_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                </div>
                <div className="relative z-10 text-center space-y-4 max-w-sm px-4">
                  <div className="w-12 h-12 rounded-full bg-white text-[#622219] border border-[#ECECEC] flex items-center justify-center mx-auto shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#622219] block">GIS Property Tracking</span>
                    <p className="text-gray-500 text-xs leading-relaxed">Lagos Land Registry validated plots coordinates mapped dynamically. To book a live chauffeured tour, click below.</p>
                  </div>
                  <button
                    onClick={handleOpenGeneralInspection}
                    className="bg-[#111111] hover:bg-[#622219] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 transition-colors cursor-pointer"
                  >
                    Arrange Chauffeured Drive
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE: PROPERTY DETAILS */}
        {/* ========================================================= */}
        {currentPage === "property-details" && (
          <div id="property-details-view" className="animate-fade-in max-w-[1440px] mx-auto px-6 lg:px-12 py-16 space-y-12">
            {/* Navigation back and title row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECECEC] pb-6">
              <button onClick={() => setCurrentPage("properties")} className="text-gray-500 hover:text-black text-xs font-bold uppercase tracking-widest flex items-center space-x-1 cursor-pointer">
                <span>← Back to Portfolio</span>
              </button>
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="text-gray-400">ESTATE REF:</span>
                <span className="font-bold text-[#622219]">{selectedProperty.referenceId}</span>
              </div>
            </div>

            {/* HERO TITLE BLOCK */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="bg-[#99B7DE]/20 text-gray-700 text-[10px] uppercase font-semibold tracking-wider px-3 py-1 rounded-xs">{selectedProperty.type}</span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] uppercase font-semibold tracking-wider px-3 py-1 rounded-xs flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Title Certified</span>
                  </span>
                </div>
                <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">{selectedProperty.title}</h1>
                <p className="text-gray-500 text-sm flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-[#622219] shrink-0" />
                  <span>Located in Lagos’ premier sector: {selectedProperty.location}</span>
                </p>
              </div>

              {/* Price Callout */}
              <div className="bg-[#F8F8F8] border border-[#ECECEC] p-6 lg:p-8 space-y-1 lg:text-right flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 block">Transactional Bracket</span>
                <span className="font-mono text-2xl lg:text-3xl font-bold text-[#622219]">{formatNairaRaw(selectedProperty.price)}</span>
                {selectedProperty.status === "For Rent" && <span className="text-xs text-gray-500 uppercase">per annum leasehold</span>}
                {selectedProperty.status === "Short Let" && <span className="text-xs text-gray-500 uppercase">per night serviced rate</span>}
                {selectedProperty.status === "Just Sold" && <span className="text-xs text-gray-500 uppercase font-semibold text-black">Successfully Closed</span>}
              </div>
            </div>

            {/* EDITORIAL GALLERY CAROUSEL */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3 aspect-16/9 bg-gray-100 overflow-hidden border border-[#ECECEC]">
                <img src={selectedProperty.images[0]} alt={selectedProperty.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
                {selectedProperty.images.slice(1, 4).map((img, i) => (
                  <div key={i} className="aspect-video lg:aspect-auto lg:h-[135px] bg-gray-100 overflow-hidden border border-[#ECECEC]">
                    <img src={img} alt={`${selectedProperty.title} Interior Detail ${i + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* SPECS STRIP */}
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 bg-[#F8F8F8] border border-[#ECECEC] p-6 text-center font-mono text-xs">
              {selectedProperty.bedrooms && (
                <div className="space-y-1 border-r border-[#ECECEC]">
                  <span className="text-gray-400 text-[10px] uppercase block">Bedrooms</span>
                  <span className="text-base font-bold text-gray-900">{selectedProperty.bedrooms} en-suites</span>
                </div>
              )}
              {selectedProperty.bathrooms && (
                <div className="space-y-1 border-r border-[#ECECEC]">
                  <span className="text-gray-400 text-[10px] uppercase block">Bathrooms</span>
                  <span className="text-base font-bold text-gray-900">{selectedProperty.bathrooms} baths</span>
                </div>
              )}
              {selectedProperty.areaSqM && (
                <div className="space-y-1 lg:border-r border-[#ECECEC]">
                  <span className="text-gray-400 text-[10px] uppercase block">Total Area</span>
                  <span className="text-base font-bold text-gray-900">{selectedProperty.areaSqM} m²</span>
                </div>
              )}
              <div className="space-y-1 hidden lg:block">
                <span className="text-gray-400 text-[10px] uppercase block">Valuation ROI</span>
                <span className="text-base font-bold text-emerald-600">{selectedProperty.roiEstimate ? `+${selectedProperty.roiEstimate}% Projected` : "Guaranteed Asset"}</span>
              </div>
            </div>

            {/* DETAILED NARRATIVE & SIDEBAR ENQUIRY CARD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Left description narrative */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h3 className="font-sans text-lg lg:text-xl font-bold text-gray-900 uppercase tracking-tight">Architectural Narrative</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">{selectedProperty.longDescription || selectedProperty.description}</p>
                </div>

                {/* Features Checklist */}
                <div className="space-y-4 pt-6 border-t border-[#ECECEC]">
                  <h3 className="font-sans text-lg font-bold text-gray-900 uppercase tracking-tight">Distinguishing Characteristics</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProperty.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 text-sm text-gray-700">
                        <div className="w-5 h-5 bg-[#622219]/5 text-[#622219] flex items-center justify-center rounded-xs shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities Checklist */}
                {selectedProperty.amenities.length > 0 && (
                  <div className="space-y-4 pt-6 border-t border-[#ECECEC]">
                    <h3 className="font-sans text-lg font-bold text-gray-900 uppercase tracking-tight">Regulatory & Estate Infrastructure</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProperty.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center space-x-3 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-[#99B7DE] rounded-full shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FLOO PLAN EMBED PLACEHOLDER */}
                <div className="space-y-4 pt-6 border-t border-[#ECECEC]">
                  <h3 className="font-sans text-lg font-bold text-gray-900 uppercase tracking-tight">Spatial Floor Layout Matrix</h3>
                  <div className="relative aspect-2/1 w-full bg-gray-50 border border-[#ECECEC] flex items-center justify-center font-mono text-[10px] text-gray-400">
                    <div className="absolute inset-0 bg-[radial-gradient(#dcdcdc_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40" />
                    <div className="text-center space-y-2 p-4">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 block">Spatials Schematic Verified</span>
                      <p className="text-gray-400 text-xs max-w-xs leading-relaxed">Exquisite CAD plans mapped and compiled securely. Available for direct digital download in PDF dossier.</p>
                      <button
                        onClick={() => alert("Exquisite CAD dossier download initiated securely.")}
                        className="text-xs uppercase font-bold text-[#622219] hover:text-black tracking-widest flex items-center space-x-1.5 mx-auto pt-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download CAD Dossier</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* LUXURY INTERACTIVE MORTGAGE ESTIMATOR */}
                {selectedProperty.status !== "Just Sold" && selectedProperty.status !== "Recently Leased" && (
                  <div id="mortgage-estimator" className="p-6 lg:p-8 border border-[#ECECEC] bg-[#F8F8F8] space-y-6">
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-gray-900 uppercase tracking-tight">Capital Financing Estimation</h4>
                      <p className="text-gray-500 text-xs">Simulate standard high-value private banking mortgage structures available through partner banks.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
                      {/* Downpayment Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-semibold">
                          <span className="uppercase text-gray-400">Down Payment</span>
                          <span className="text-[#111111]">{mortgageDownPaymentPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={80}
                          step={5}
                          value={mortgageDownPaymentPercent}
                          onChange={(e) => setMortgageDownPaymentPercent(Number(e.target.value))}
                          className="w-full accent-[#622219] bg-gray-200 h-1"
                        />
                        <div className="text-[10px] text-gray-500">Cash Equity: {formatNairaRaw(Math.round(selectedProperty.price * (mortgageDownPaymentPercent / 100)))}</div>
                      </div>

                      {/* Interest Rate */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-semibold">
                          <span className="uppercase text-gray-400">Interest Rate</span>
                          <span className="text-[#111111]">{mortgageInterestRate}% / yr</span>
                        </div>
                        <input
                          type="range"
                          min={12}
                          max={26}
                          step={1}
                          value={mortgageInterestRate}
                          onChange={(e) => setMortgageInterestRate(Number(e.target.value))}
                          className="w-full accent-[#622219] bg-gray-200 h-1"
                        />
                        <div className="text-[10px] text-gray-500">High-End Wealth Tier</div>
                      </div>

                      {/* Years */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-semibold">
                          <span className="uppercase text-gray-400">Amortization</span>
                          <span className="text-[#111111]">{mortgageTermYears} Years</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={25}
                          step={5}
                          value={mortgageTermYears}
                          onChange={(e) => setMortgageTermYears(Number(e.target.value))}
                          className="w-full accent-[#622219] bg-gray-200 h-1"
                        />
                        <div className="text-[10px] text-gray-500">Standard Corporate Lease</div>
                      </div>
                    </div>

                    {/* Monthly mortgage calculation */}
                    {(() => {
                      const principal = selectedProperty.price * (1 - mortgageDownPaymentPercent / 100);
                      const monthlyRate = mortgageInterestRate / 100 / 12;
                      const numberOfPayments = mortgageTermYears * 12;
                      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

                      return (
                        <div className="bg-white border border-[#ECECEC] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400">Financed Principal</span>
                            <div className="text-sm font-bold text-gray-900">{formatNairaRaw(Math.round(principal))}</div>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400">Estimated Monthly Payment</span>
                            <div className="text-lg font-bold text-[#622219]">{formatNairaRaw(Math.round(monthlyPayment))}</div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Sticky Enquiry Sidebar card */}
              <div id="sticky-enquiry-card" className="sticky top-28 bg-white border border-[#ECECEC] shadow-xl p-6 lg:p-8 space-y-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#99B7DE]">Secure Private Inquiries</span>
                <div className="space-y-2">
                  <h3 className="font-sans text-lg font-bold text-gray-900 uppercase">Coordinate Handover</h3>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">Arrange a private chauffeured viewing of {selectedProperty.title} or request more detail documents securely.</p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => handleOpenInspectionForProperty(selectedProperty)}
                    className="w-full bg-[#D11D1F] hover:bg-[#622219] text-white text-xs font-semibold uppercase tracking-widest py-4 transition-colors cursor-pointer text-center block"
                  >
                    Request Private Tour
                  </button>
                  <a
                    href={`https://wa.me/2348032659756?text=Hello%20London%20Homes,%20I%20am%20interested%20in%20a%20private%20inspection%20for%20the%20property%20${selectedProperty.title}%20(REF:%20${selectedProperty.referenceId})`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-transparent hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-black text-xs font-semibold uppercase tracking-widest py-4 transition-colors flex items-center justify-center space-x-2 text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-[#ECECEC] space-y-2.5 text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Certified Secure Transactions only</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#622219]" />
                    <span>Accompanied airport concierge on demand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RELATED PROPERTIES SEGMENT */}
            <div className="space-y-8 pt-12 border-t border-[#ECECEC]">
              <h3 className="font-sans text-xl font-bold text-gray-900 uppercase tracking-tight">Comparable Enclaves & Holdings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROPERTIES.filter((p) => p.id !== selectedProperty.id)
                  .slice(0, 3)
                  .map((prop) => (
                    <PropertyCard
                      key={prop.id}
                      property={prop}
                      onViewDetails={(id) => {
                        setSelectedPropertyId(id);
                        setCurrentPage("property-details");
                      }}
                      onBookInspection={handleOpenInspectionForProperty}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE: SERVICES */}
        {/* ========================================================= */}
        {currentPage === "services" && (
          <div id="services-view" className="animate-fade-in max-w-[1440px] mx-auto px-6 lg:px-12 py-16 space-y-20">
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Certified Offerings</span>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">Elite Real Estate Services</h1>
              <p className="text-gray-500 text-sm max-w-xl font-light">Providing comprehensive due diligence, absolute contract privacy, and high-yield transactional advisory models.</p>
            </div>

            {/* SERVICES LIST */}
            <div className="space-y-24">
              {SERVICES.map((serv, index) => (
                <div key={serv.id} className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  {/* Service image */}
                  <div className="flex-1 aspect-16/10 w-full bg-gray-100 overflow-hidden border border-[#ECECEC] relative">
                    <img src={serv.image} alt={serv.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    <div className="absolute top-6 left-6 bg-white px-4 py-3 border border-[#ECECEC] flex items-center justify-center font-bold text-[#622219] font-mono shadow-sm uppercase text-xs">
                      {serv.title.split(" ")[0]}
                    </div>
                  </div>

                  {/* Service content */}
                  <div className="flex-1 space-y-6">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 font-mono">Service Module 0{index + 1}</span>
                    <h2 className="font-sans text-2xl lg:text-3xl font-extrabold text-[#111111] uppercase tracking-tight leading-tight">{serv.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">{serv.longDescription}</p>

                    {/* Benefits checklist */}
                    <div className="space-y-3 pt-2">
                      <span className="text-xs uppercase font-bold text-gray-900 block">Elite Benefits</span>
                      <ul className="space-y-2.5">
                        {serv.benefits.map((ben, i) => (
                          <li key={i} className="flex items-center space-x-2 text-xs text-gray-600">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Operational Flow */}
                    <div className="space-y-3 pt-2">
                      <span className="text-xs uppercase font-bold text-gray-900 block">Operational Milestones</span>
                      <div className="grid grid-cols-2 gap-4">
                        {serv.process.map((proc, i) => (
                          <div key={i} className="bg-[#F8F8F8] border border-[#ECECEC] p-3 text-xs">
                            <span className="font-mono text-[10px] font-bold text-[#622219] block mb-1">PHASE 0{i + 1}</span>
                            <span className="text-gray-600 leading-relaxed font-light">{proc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleOpenGeneralInspection}
                        className="bg-[#111111] hover:bg-[#622219] text-white text-xs font-semibold uppercase tracking-widest px-8 py-3.5 transition-colors cursor-pointer"
                      >
                        Initiate Advisory Protocol
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE: INVESTMENT GUIDE (YIELDS + LEGAL DIASPORA) */}
        {/* ========================================================= */}
        {currentPage === "invest" && (
          <div id="invest-view" className="animate-fade-in max-w-[1440px] mx-auto px-6 lg:px-12 py-16 space-y-16">
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Wealth Guard</span>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">Investment & Diaspora Advisory</h1>
              <p className="text-gray-500 text-sm max-w-xl font-light">Providing sophisticated data tracking, transparent Escrow rules, and accurate Lagos valuation comparisons.</p>
            </div>

            {/* REAL INTERACTIVE ROI CALCULATOR COMPONENT */}
            <section id="roi-calculator-section" className="space-y-6">
              <div className="space-y-2 border-b border-[#ECECEC] pb-4">
                <span className="text-xs uppercase font-bold text-[#622219]">Interactive Asset Simulator</span>
                <h2 className="text-xl font-bold uppercase tracking-tight text-[#111111]">Lagos Yield & Capital Modeler</h2>
              </div>
              <RoiCalculator />
            </section>

            {/* WHY INVEST IN LAGOS LAND & STATS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-12 border-t border-[#ECECEC]">
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#622219] block">Macroeconomic Drivers</span>
                  <h3 className="font-sans text-2xl lg:text-3xl font-extrabold text-[#111111] leading-tight uppercase">Why Invest in Lagos Premium Enclaves?</h3>
                </div>
                <div className="space-y-6 text-gray-500 text-sm font-light leading-relaxed">
                  <p>
                    Lagos’ elite residential districts possess structural real estate behaviors that outperform traditional emerging market indexes. Because land space in peninsula regions like Banana
                    Island and Ikoyi is structurally finite, competitive scarcity continues to drive land valuations up.
                  </p>
                  <p>
                    Additionally, rental demand from multinational energy networks, corporate consultancies, and luxury short-let managers commands high-yield, hard-currency payouts, insulating your
                    landlord returns from standard currency devaluations.
                  </p>
                </div>

                {/* Sub-metrics */}
                <div className="grid grid-cols-2 gap-6 text-center font-mono">
                  <div className="p-6 bg-[#F8F8F8] border border-[#ECECEC]">
                    <div className="text-2xl font-bold text-[#622219]">20% +</div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mt-1">Avg Annual Appreciation</span>
                  </div>
                  <div className="p-6 bg-[#F8F8F8] border border-[#ECECEC]">
                    <div className="text-2xl font-bold text-[#622219]">12% - 15%</div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mt-1">Average Net Rental Yield</span>
                  </div>
                </div>
              </div>

              {/* Legal Checklist for Safe purchases */}
              <div className="bg-[#F8F8F8] border border-[#ECECEC] p-8 lg:p-10 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] text-[#99B7DE] font-bold uppercase tracking-widest font-mono">Diaspora Risk Mitigation</span>
                  <h3 className="font-sans text-xl font-bold text-[#111111] uppercase tracking-tight">The Safe Buying Framework</h3>
                  <p className="text-gray-400 text-xs">Four institutional steps to ensure 100% legal security of your property transaction.</p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      step: "01",
                      title: "Verify Land Registry Coordinates",
                      desc: "Never rely on photos. We map coordinates directly at the Lagos State Lands Registry to confirm authentic Certificate of Occupancy (C of O) status.",
                    },
                    {
                      step: "02",
                      title: "Establish Secure Escrow Accounts",
                      desc: "Funds are never wired directly to individual builders. Your capital is deposited in secure bank escrows with partner legal custodians.",
                    },
                    {
                      step: "03",
                      title: "Independent Milestone Verification",
                      desc: "Developers receive payments in structured installments only after our civil engineers physically verify completion of carcass, roofing, and finishing.",
                    },
                    {
                      step: "04",
                      title: "Governor’s Consent Processing",
                      desc: "We handle the complete statutory filing at the state government registry to ensure the deed of assignment is formally approved and registered.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="font-mono text-[#622219] font-bold text-sm bg-white border border-[#ECECEC] w-8 h-8 flex items-center justify-center rounded-xs shrink-0">{item.step}</span>
                      <div className="space-y-1">
                        <h4 className="font-sans text-sm font-bold text-gray-900">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE: ABOUT (OUR HISTORY & TEAM) */}
        {/* ========================================================= */}
        {currentPage === "about" && (
          <div id="about-view" className="animate-fade-in max-w-[1440px] mx-auto px-6 lg:px-12 py-16 space-y-20">
            {/* Header */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Our History</span>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">About London Homes</h1>
              <p className="text-gray-500 text-sm max-w-xl font-light">Redefining transaction integrity, architectural selection, and luxury customer service in Lagos.</p>
            </div>

            {/* Narrative with Drone photo side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <span className="text-xs uppercase font-extrabold text-[#622219] block">Digital Headquarters</span>
                <h2 className="font-sans text-2xl lg:text-3xl font-extrabold text-[#111111] uppercase tracking-tight leading-tight">Earning Trust in High-Value Real Estate</h2>
                <div className="space-y-4 text-gray-500 text-sm leading-relaxed font-light">
                  <p>
                    London Homes was founded to challenge the status quo. In a marketplace heavily crowded by generic realtors promoting identical listings without legal due diligence, we saw an
                    opportunity to introduce institutional-grade transparency and security.
                  </p>
                  <p>
                    Specializing exclusively in high-value enclaves across Lagos—including Ikoyi, Banana Island, Victoria Island, and Lekki Phase 1—we act as dedicated investment partners. Our clients
                    are successful professionals, multi-national directors, and return diaspora investors who require premium representation.
                  </p>
                  <p>
                    We do not merely match you with a home; we verify titles, negotiate clean transaction pricing, secure payments through bank escrow accounts, and support you throughout the lifetime
                    of your property holdings.
                  </p>
                </div>
              </div>

              <div className="aspect-16/10 w-full bg-gray-100 overflow-hidden border border-[#ECECEC]">
                <img src="/src/assets/images/hero_banana_island_1783963760466.jpg" alt="Banana Island drone photography" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* VALUES GRID (3 COLS) */}
            <div className="space-y-12">
              <div className="text-center space-y-2 max-w-sm mx-auto">
                <span className="text-xs uppercase font-bold text-[#622219]">Corporate Values</span>
                <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-[#111111]">Our Pillars</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Discretion & Integrity",
                    desc: "We represent high-profile investors with absolute transaction confidentiality, secure escrow accounts, and direct legal representation.",
                  },
                  {
                    title: "Fiduciary Responsibility",
                    desc: "We treat your capital as our priority. No inflated prices, no marketing exaggerations, only verified, data-backed ROI guides.",
                  },
                  {
                    title: "Scrupulous Safety",
                    desc: "Every property undergoes three layers of title verification at state registries to guarantee 100% clean title status.",
                  },
                ].map((val, idx) => (
                  <div key={idx} className="bg-[#F8F8F8] border border-[#ECECEC] p-8 space-y-4">
                    <span className="font-mono text-xs text-[#622219] font-bold block">PILLAR 0{idx + 1}</span>
                    <h4 className="font-sans text-base font-bold text-gray-900 uppercase">{val.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed font-light">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* EXECUTIVE PROFILES */}
            <div className="space-y-12">
              <div className="text-center space-y-2 max-w-sm mx-auto">
                <span className="text-xs uppercase font-bold text-[#622219]">Executive Council</span>
                <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-[#111111]">MEET THE TEAM</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
                {[
                  {
                    name: "Anthony London",
                    role: "Chief Executive Officer",
                    avatar: "/src/assets/images/ceo_img.png",
                    desc: "5yrs+ in high-value asset banking and luxury acquisitions across London and Lagos.",
                  },
                  {
                    name: "Kofi Adeleke",
                    role: "Head of Legal & Title Due Diligence",
                    avatar: "/src/assets/images/head-of-legal-and-title_img.png",
                    desc: "Specialist in Lagos State land dispute resolution and statutory Governor's Consent files processing.",
                  },
                  {
                    name: "Mitchell D.",
                    role: "Digital Systems Engineer",
                    avatar: "/src/assets/images/digital-systems-engineer_img.jpeg",
                    desc: "Creating modern digital products that improve customer experience and business performance.",
                  },
                ].map((lead, idx) => (
                  <div key={idx} className="group bg-white border border-[#ECECEC] overflow-hidden flex flex-col h-full hover:border-[#622219]/30 transition-all">
                    <div className="aspect-square w-full bg-gray-100 overflow-hidden">
                      <img src={lead.avatar} alt={lead.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="p-6 space-y-2">
                      <h4 className="font-sans text-base font-bold text-gray-900">{lead.name}</h4>
                      <p className="text-[#622219] text-xs uppercase font-semibold">{lead.role}</p>
                      <p className="text-gray-500 text-xs leading-relaxed font-light pt-1">{lead.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE: MEDIA (VIDEO TOURS & REELS) */}
        {/* ========================================================= */}
        {currentPage === "media" && (
          <div id="media-view" className="animate-fade-in max-w-[1440px] mx-auto px-6 lg:px-12 py-16 space-y-16">
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Cinematic Showcase</span>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">Media & Video Gallery</h1>
              <p className="text-gray-500 text-sm max-w-xl font-light">Examine detailed physical walk-throughs, construction drone captures, client diaries captured live, and many more stories.</p>
            </div>

            {/* VIDEO TOURS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  id: "VuPsrZDFODA",
                  title: "Touring an Ultra-Luxury 5 Bedroom Mansion in VGC Lagos | Pool, Cinema, Gym & Rooftop - ₦850M",
                  duration: "12:09 mins",
                  img: "/src/assets/images/Ultra-Luxury-5-Bedroom-Mansion-in-VGC-Lagos.png",
                },
                {
                  id: "ycNRiq7LAvM",
                  title: "Massive Change Coming! Lekki-Ajah Road Rehabilitation & What It Means for Real Estate Buyers",
                  duration: "09:35 mins",
                  img: "/src/assets/images/Lekki-Ajah-Road-Rehabilitation_img.png",
                },
                {
                  id: "NW0zb4-71iA",
                  title: "Factors to Consider When Buying a Home: A Comprehensive Guide",
                  duration: "06:40 mins",
                  img: "/src/assets/images/Factors-to-Consider-When-Buying-a-Home_img.png",
                },
                {
                  id: "t241N6tcfAg",
                  title: "Royal Garden Estate luxury home.",
                  duration: "03:40 mins",
                  img: "/src/assets/images/Royal-Garden-Estate-luxury-home_img.png",
                },
              ].map((vid) => (
                <div key={vid.id} className="group space-y-4">
                  <div className="relative aspect-video w-full bg-black overflow-hidden border border-[#ECECEC] shadow-md">
                    <img src={vid.img} alt={vid.title} referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-80 group-hover:scale-103 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setActiveVideoUrl(`https://www.youtube.com/embed/${vid.id}`)}
                        className="w-14 h-14 rounded-full bg-[#D11D1F] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer"
                        aria-label="Play Walkthrough"
                      >
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </button>
                    </div>
                    <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] text-white font-mono uppercase">{vid.duration}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-sans text-base font-bold text-gray-900 group-hover:text-[#622219] transition-colors">{vid.title}</h3>
                    <p className="text-gray-400 text-xs">Exclusively produced by London Homes Media division</p>
                  </div>
                </div>
              ))}
            </div>

            {/* INSTAGRAM & SOCIAL REELS LAYOUT */}
            <div className="space-y-8 pt-12 border-t border-[#ECECEC]">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-[#622219]">Instagram & Social Diaries</span>
                <h3 className="font-sans text-xl font-bold uppercase tracking-tight text-gray-900">Behind the Scenes</h3>
                <p className="text-gray-500 text-xs">Dynamic snippets captured by our field advisors during daily client handovers and site audits.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
                    tag: "#LagosKitchens",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80",
                    tag: "#BananaPools",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
                    tag: "#IkoyiBeds",
                  },
                  {
                    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
                    tag: "#LekkiVillas",
                  },
                ].map((post, i) => (
                  <div key={i} className="group relative aspect-square bg-gray-100 overflow-hidden border border-[#ECECEC] cursor-pointer">
                    <img src={post.img} alt="Instagram Style Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-mono text-xs text-white font-semibold">{post.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE: INSIGHTS (BLOG ARTICLE LIST) */}
        {/* ========================================================= */}
        {currentPage === "blog" && (
          <div id="insights-view" className="animate-fade-in max-w-[1440px] mx-auto px-6 lg:px-12 py-16 space-y-16">
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Market Intelligence</span>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">Lagos Luxury Insights</h1>
              <p className="text-gray-500 text-sm max-w-xl font-light">
                Examine technical market studies, legal title acquisition checklists, and off-plan investment strategies authored by our senior specialists.
              </p>
            </div>

            {/* EXPANDED ARTICLES LIST */}
            <div className="space-y-16 lg:space-y-24">
              {ARTICLES.map((art) => (
                <div key={art.id} id={`article-${art.id}`} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start border-b border-[#ECECEC] pb-16 lg:pb-24">
                  {/* Article Banner image */}
                  <div className="lg:col-span-1 aspect-16/10 bg-gray-100 overflow-hidden border border-[#ECECEC]">
                    <img src={art.image} alt={art.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>

                  {/* Article Text narrative */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="bg-[#622219]/5 text-[#622219] px-2.5 py-1 uppercase font-bold tracking-wider">{art.category}</span>
                      <span className="font-mono text-gray-400">
                        {art.date} • {art.readTime}
                      </span>
                    </div>

                    <h2 className="font-sans text-xl lg:text-2xl font-bold text-gray-900 leading-tight">{art.title}</h2>

                    <div className="space-y-4 text-gray-500 text-sm leading-relaxed font-light">
                      {art.content.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {/* Author block */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-[#ECECEC] max-w-sm">
                      <img src={art.author.avatar} alt={art.author.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{art.author.name}</h4>
                        <p className="text-gray-400 text-[10px]">{art.author.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE: CONTACT & FAQ */}
        {/* ========================================================= */}
        {currentPage === "contact" && (
          <div id="contact-view" className="animate-fade-in max-w-[1440px] mx-auto px-6 lg:px-12 py-16 space-y-20">
            {/* Header */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-[#622219]">Secure Office</span>
              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-none">Contact & Inquiries</h1>
              <p className="text-gray-500 text-sm max-w-xl font-light">Request private consultations, arrange accompanied chauffeured viewings, or dispatch custom briefs securely.</p>
            </div>

            {/* CONTACT CODES & FORM SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Contacts list */}
              <div className="space-y-10">
                <div className="space-y-3">
                  <span className="text-xs uppercase font-extrabold text-[#622219] block">Bespoke Representatives</span>
                  <h2 className="font-sans text-2xl font-extrabold text-[#111111] uppercase tracking-tight">London Homes HQ</h2>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">
                    Our corporate office on Admiralty Way, Lekki is designed to facilitate secure, confidential buyer negotiations. Drop in for private consultations.
                  </p>
                </div>

                <div className="space-y-6 font-mono text-sm text-gray-700">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-[#622219] shrink-0 mt-0.5" />
                    <div>
                      <strong>Office Address:</strong>
                      <p className="text-gray-500 font-sans text-xs mt-1 leading-relaxed">Block 12, Plot 8, Admiralty Way, Lekki Phase 1, Lagos, Nigeria.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-[#622219] shrink-0 mt-0.5" />
                    <div>
                      <strong>Hotlines:</strong>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                        +234 (0) 803 265 9756{/* (Diaspora Hot Desk)  */}
                        <br />
                        +234 (0) 705 060 4442 {/* (Corporate Lease Desk) */}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 text-[#622219] shrink-0 mt-0.5" />
                    <div>
                      <strong>Electronic Correspondence:</strong>
                      <p className="text-[#622219] text-xs mt-1 leading-relaxed font-sans">concierge@londonhomes.ng</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-[#622219] shrink-0 mt-0.5" />
                    <div>
                      <strong>Private Consulting Hours:</strong>
                      <p className="text-gray-500 font-sans text-xs mt-1 leading-relaxed">
                        Monday – Friday: 09:00 – 18:00 <br />
                        Saturday: 10:00 – 16:00 (Accompanied inspections only)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Styled Map vector placeholder */}
                <div className="aspect-2/1 bg-[#F8F8F8] border border-[#ECECEC] relative flex items-center justify-center font-mono text-[9px] text-gray-400">
                  <div className="absolute inset-0 bg-[radial-gradient(#dcdcdc_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                  <div className="text-center z-10 p-4 space-y-1.5">
                    <MapPin className="w-5 h-5 text-[#622219] mx-auto" />
                    <span className="font-bold text-gray-800 uppercase block">Admiralty Way Location Mapped</span>
                    <span className="text-gray-400">LAT: 6.4492° N, LNG: 3.4812° E</span>
                  </div>
                </div>
              </div>

              {/* Right Enquiry form */}
              <div className="bg-[#F8F8F8] border border-[#ECECEC] p-8 lg:p-12 space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#99B7DE]">Secure Lead Routing</span>
                  <h3 className="font-sans text-xl font-bold text-gray-900 uppercase">Dispatch Brief</h3>
                  <p className="text-gray-400 text-xs">Your inquiry is routed directly to a certified London Homes senior strategy partner.</p>
                </div>

                {!contactSuccess ? (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-sm">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kolawole Aluko"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-white border border-[#ECECEC] px-4 py-3 focus:border-[#622219] focus:outline-none transition-colors text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. investor@gmail.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-white border border-[#ECECEC] px-4 py-3 focus:border-[#622219] focus:outline-none transition-colors text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +234 80..."
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full bg-white border border-[#ECECEC] px-4 py-3 focus:border-[#622219] focus:outline-none transition-colors text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Detailed Request Requirements</label>
                      <textarea
                        rows={4}
                        placeholder="Describe budget, target bedrooms, and timing preference..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full bg-white border border-[#ECECEC] px-4 py-3 focus:border-[#622219] focus:outline-none transition-colors text-xs"
                      />
                    </div>

                    <button type="submit" className="w-full bg-[#111111] hover:bg-[#622219] text-white text-xs font-semibold uppercase tracking-widest py-4 transition-colors cursor-pointer">
                      Dispatch Secure Brief
                    </button>
                  </form>
                ) : (
                  <div className="p-8 text-center space-y-4 bg-white border border-[#ECECEC]">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold uppercase text-gray-900">Brief Dispatched</h4>
                    <p className="text-gray-500 text-xs leading-relaxed max-w-xs mx-auto">
                      Your requirements have been logged securely. A partner consultant will call you within the hour to coordinate next steps.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* TECHNICAL ACCORDION FAQ SECTION */}
            <div className="space-y-8 pt-12 border-t border-[#ECECEC]">
              <div className="text-center space-y-2 max-w-sm mx-auto">
                <span className="text-xs uppercase font-bold text-[#622219]">Registry & Legal FAQs</span>
                <h3 className="font-sans text-2xl font-extrabold uppercase tracking-tight text-gray-900">Critical Knowledge</h3>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {[
                  {
                    q: "How does London Homes guarantee title security for returning diaspora?",
                    a: "Every property we list is subjected to a comprehensive three-tier title audit. This includes a physical inspection at the Lagos State Land Registry to cross-verify the Certificate of Occupancy (C of O), check for outstanding litigation files, and guarantee that the seller has absolute legal authority to convey the title.",
                  },
                  {
                    q: "What is Governor’s Consent and why is it legally essential?",
                    a: 'Under the Nigerian Land Use Act, all lands belong to the governor of each state, leased to citizens for 99 years. When purchasing from a private seller, statutory "Governor’s Consent" is required to transfer that leasehold. Our general legal counsel handles the complete processing at the state ministry to secure your title flawlessly.',
                  },
                  {
                    q: "Do you support third-party bank escrow systems?",
                    a: "Yes, absolutely. We do not encourage direct wiring of high-value funds to developer accounts. London Homes works with tier-1 partner banks (Access Bank, GTCO) to establish legal escrow frameworks. Capital is disbursed only when our independent engineers audit and approve specific construction milestones.",
                  },
                  {
                    q: "How are chauffeured inspections managed for diaspora buyers?",
                    a: "We understand that visiting site locations in busy Lagos traffic can be stressful. We provide chauffeured, air-conditioned transport with private security escrows for physical viewings. For diaspora clients unable to travel, we host detailed 4K virtual tours, drone mappings, and legal consultations via secure video calls.",
                  },
                ].map((faq, idx) => (
                  <div key={idx} className="border border-[#ECECEC] bg-[#F8F8F8]">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-6 text-left font-semibold text-gray-900 text-sm flex items-center justify-between focus:outline-none cursor-pointer"
                    >
                      <span className="uppercase tracking-tight">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#622219] transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === idx && <div className="px-6 pb-6 pt-2 text-xs leading-relaxed text-gray-500 font-light border-t border-[#ECECEC]/30 bg-white">{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Dynamic Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Luxury Accent Floating Element - Artistic Flair */}
      <div className="fixed bottom-24 left-8 w-28 h-28 rounded-full border border-[#ECECEC] hidden xl:flex flex-col items-center justify-center p-3 text-center bg-white/95 backdrop-blur-md shadow-xl z-40 pointer-events-none select-none transition-all duration-500">
        <span className="text-[8px] uppercase tracking-[0.2em] mb-1 text-[#622219] font-extrabold">Digital HQ</span>
        <p className="text-[9px] italic font-serif leading-tight text-gray-800">"The gold standard for Lagos real estate."</p>
      </div>

      {/* Global Inspection Booking Modal */}
      <InspectionModal isOpen={isInspectionModalOpen} onClose={() => setIsInspectionModalOpen(false)} selectedProperty={propertyForInspection} />

      {/* Walkthrough Video Modal overlay */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setActiveVideoUrl(null)}
            className="absolute top-6 right-6 text-white hover:text-[#622219] font-bold uppercase tracking-widest text-xs flex items-center space-x-1 p-2 cursor-pointer bg-black/40 backdrop-blur-md px-4 py-2 border border-white/10"
          >
            <span>Close Player ×</span>
          </button>
          <div className="w-full max-w-4xl aspect-video bg-black shadow-2xl border border-white/10 rounded-sm overflow-hidden">
            {activeVideoUrl.includes(".mp4") ? (
              <video src={activeVideoUrl} controls autoPlay className="w-full h-full object-contain" />
            ) : (
              <iframe src={activeVideoUrl} title="YouTube Walkthrough Player" className="w-full h-full" allowFullScreen />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
