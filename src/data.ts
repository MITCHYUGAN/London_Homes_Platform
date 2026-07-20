/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Neighborhood, Service, Article, Testimonial } from './types';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-obsidian',
    referenceId: 'LH-OBS-001',
    title: 'The Obsidian Sovereign Waterfront Mansion',
    type: 'Villa',
    location: 'Banana Island',
    price: 3800000000, // ₦3.8 Billion
    bedrooms: 5,
    bathrooms: 6,
    areaSqM: 1250,
    description: 'An elite architectural tour-de-force poised on the premier waterfront row of Banana Island, offering unprecedented luxury, absolute security, and panoramic lagoon views.',
    longDescription: "Commanding a premier waterfront presence in Lagos' most exclusive private enclave, The Obsidian Sovereign is an architectural masterpiece designed for the ultra-high-net-worth individual. Crafted with sleek glass columns, monolithic hand-cut basalt, and custom walnut carpentry, the estate integrates indoor and outdoor living fluidly. Spanning across three majestic levels, the home features automated double-height glass panels that slide away to reveal a spectacular 25-meter infinity pool melting into the Lagos lagoon. It features state-of-the-art Crestron home automation, a private deep-water jetty, a professional chef's kitchen with Gaggenau appliances, a soundproof 12-seat private cinema, and a secure subterranean 10-car gallery.",
    status: 'For Sale',
    images: [
      '/images/hero_banana_island_1783963760466.jpg',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Private Deep-Water Jetty',
      'Crestron Smart Automation',
      'Professional Wellness Spa',
      'Infinity Pool with Lagoon Views',
      'Subterranean 10-Car Gallery',
      'Private 12-Seat Cinema',
      'Double-height ceiling lounge',
      'Dual Bulthaup Kitchens'
    ],
    amenities: [
      '24/7 Premium Security Controls',
      'Central Heating & Cooling',
      'Industrial Power Generators',
      'Reverse Osmosis Water System',
      'Staff Quarters (4 Rooms)',
      'Home Elevator',
      'Private Helipad Access'
    ],
    isFeatured: true,
    isNew: false,
    isWaterfront: true,
    isSmartHome: true,
    isInvestmentOpportunity: true,
    roiEstimate: 12.4
  },
  {
    id: 'prop-luminary',
    referenceId: 'LH-LUM-002',
    title: 'The Luminary Sky Penthouse',
    type: 'Penthouse',
    location: 'Ikoyi',
    price: 1500000000, // ₦1.5 Billion
    bedrooms: 4,
    bathrooms: 5,
    areaSqM: 680,
    description: 'A breathtaking sky mansion crowning Ikoyi’s most prestigious residential high-rise, boasting 360-degree skyline views, private plunge pool, and bespoke Italian design.',
    longDescription: 'Perched in the heavens above Ikoyi, The Luminary Penthouse redefines sky-high luxury living in Lagos. This bespoke sky mansion spans an entire upper level of a newly completed premium architectural tower. Curated in collaboration with leading Milanese design houses, the interior features rich Calacatta gold marble, custom-engineered oak chevron flooring, and brushed bronze trims. The residence includes massive formal and informal living zones separated by a double-sided floating fireplace. The private master suite represents a personal sanctuary, containing a custom leather-clad boutique wardrobe, a deep-soaking solid stone bathtub overlooking the Lekki-Ikoyi Link Bridge, and a private steam shower. Step out onto the expansive private terrace featuring an outdoor kitchen and a glass-walled heated plunge pool.',
    status: 'For Sale',
    images: [
      '/images/luxury_ikoyi_penthouse_1783963776970.jpg',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      '360-Degree Lagos Skyline Views',
      'Private Heated Terrace Plunge Pool',
      'Italian Calacatta Gold Marbling',
      'Floor-to-Ceiling Thermal Glass',
      'Concierge Service & Valet Lobby',
      'Dedicated Private Elevator',
      'Bang & Olufsen Integrated Audio'
    ],
    amenities: [
      'Olympic-sized Communal Pool',
      'Private Residential Gymnasium',
      'High-Speed Fibre Optic Networks',
      'Bulletproof Security Lobby Doors',
      'Fully Serviced Elite Utility Backup',
      'Executive Boardrooms & Wine Cellar',
      'Two-room Executive Butler Suites'
    ],
    isFeatured: true,
    isNew: true,
    isWaterfront: false,
    isSmartHome: true,
    isInvestmentOpportunity: true,
    roiEstimate: 14.2
  },
  {
    id: 'prop-zenith',
    referenceId: 'LH-ZEN-003',
    title: 'The Zenith Avant-Garde Smart Villa',
    type: 'Villa',
    location: 'Lekki Phase 1',
    price: 650000000, // ₦650 Million
    bedrooms: 5,
    bathrooms: 6,
    areaSqM: 520,
    description: 'An ultra-modern architectural marvel featuring state-of-the-art smart systems, stunning floating concrete stairways, a private pool, and a rooftop leisure terrace.',
    longDescription: 'Situated in the premium residential quarter of Lekki Phase 1, The Zenith is a statement of modern design and computational intelligence. Striking architectural lines composed of raw off-shutter concrete, black matte steel panels, and elegant glass planes make this home an instant classic. Inside, the home is fully automated via Control4, allowing seamless voice, touch, and app commands over lighting, surround audio, climate, and active biometric security systems. The ground level features a magnificent floating cantilever stairway over an indoor reflection pool, leading into an open-plan formal lounge. The luxury chef’s kitchen is fitted with sleek handleless cabinets and integrated Bosch appliances. Outside, the lush tropical gardens surround a heated lap pool and lead to a third-story rooftop terrace complete with an open-air firepit.',
    status: 'For Sale',
    images: [
      '/images/lekki_luxury_villa_1783963791103.jpg',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Control4 Integrated Automation',
      'Floating Cantilever Concrete Stairs',
      'Heated Swimming Pool & Sundeck',
      'Rooftop Lounge with Firepit',
      'Dual Kitchens with Bosch Suite',
      'Integrated Solar Energy Plant',
      'Biometric Secure Security Doors'
    ],
    amenities: [
      'Integrated CCTV Matrix (4K)',
      '150kVA Dedicated Solar Backup',
      'Premium Centralized Water Purification',
      'Fibre To The Home (FTTH)',
      'Dual Boys Quarters',
      'Motorized Gate System'
    ],
    isFeatured: true,
    isNew: true,
    isWaterfront: false,
    isSmartHome: true,
    isInvestmentOpportunity: false,
    roiEstimate: 9.8
  },
  {
    id: 'prop-cascade',
    referenceId: 'LH-CAS-004',
    title: 'The Cascade Garden Mansion',
    type: 'Villa',
    location: 'VGC',
    price: 750000000, // ₦750 Million
    bedrooms: 6,
    bathrooms: 7,
    areaSqM: 950,
    description: 'A grand architectural masterpiece of classic elegance paired with lush tropical landscape gardens and multi-tiered cascades, successfully acquired for an elite client.',
    longDescription: 'We are incredibly proud to have represented the buyer in securing this magnificent 6-bedroom estate in Victoria Garden City (VGC). Renowned for its secure family environments and broad paved avenues, this property represented one of VGC’s ultimate landholdings. Spanning nearly 2,000 square meters of prime landscaped gardens, the property centerpiece is a multi-tiered concrete waterfall cascading into a pristine, semi-shaded swimming pool. The interior boasts double-height cathedral ceilings, solid teak wall paneling, an exquisite sweeping imperial staircase, and imported crystal fixtures. It has been successfully acquired as an generational estate for a private family.',
    status: 'Just Sold',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Generational Landholding Estate',
      'Multi-Tiered Water Cascade Systems',
      'Lush Private Botanical Gardens',
      'Classic Imperial Marble Foyer',
      'Cathedral-Height Ceilings',
      'Full Security Biometric Matrix'
    ],
    amenities: [
      '24/7 Gated Security Patrols',
      'Dedicated Executive Home Study',
      'Industrial Power Stations',
      'Private Well & Osmosis Treatment',
      'Staff Quarters for 5 Personnel'
    ],
    isFeatured: false,
    isNew: false,
    isWaterfront: false,
    isSmartHome: false,
    isInvestmentOpportunity: false
  },
  {
    id: 'prop-azure',
    referenceId: 'LH-AZU-005',
    title: 'The Azure Waterfront Executive Terrace',
    type: 'Terrace',
    location: 'Oniru',
    price: 15000000, // ₦15 Million / year
    bedrooms: 4,
    bathrooms: 5,
    areaSqM: 320,
    description: 'A stunning, fully serviced contemporary executive terrace overlooking the Oniru lagoon, featuring sleek marble floors, open kitchens, and 24/7 security.',
    longDescription: 'Positioned in Oniru’s most sought-after waterfront row, this ultra-premium 4-bedroom executive terrace offers the perfect hybrid of absolute security and luxury. Boasting broad lagoon-facing private balconies on every floor, the residence features high-density Italian porcelain flooring, architectural recess lighting, and a fully automated kitchen designed with high-gloss bespoke cabinets. Each bedroom is masterfully designed with an en-suite marble bathroom, automated block-out curtains, and extensive custom wardrobes. Ideal for corporate executives, multinational employees, and luxury renters wanting a premium lifestyle in Lagos.',
    status: 'For Rent',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Stunning Oniru Lagoon Views',
      'Fully Serviced Luxury Estate',
      'Bespoke Italian Kitchen Suite',
      'Lagoon-facing Private Balconies',
      'High-Density Porcelain Flooring',
      'Smart Remote Lighting App'
    ],
    amenities: [
      '24/7 Guaranteed Power Plant',
      'Communal Swimming Pool',
      'Water Treatment Plant',
      'CCTV Monitoring Surveillance',
      '24-Hour Uniformed Guards',
      'Staff Quarters (1 Room)'
    ],
    isFeatured: true,
    isNew: false,
    isWaterfront: true,
    isSmartHome: true,
    isInvestmentOpportunity: false
  },
  {
    id: 'prop-ivory',
    referenceId: 'LH-IVO-006',
    title: 'The Ivory Serviced Sky Residence',
    type: 'Apartment',
    location: 'Victoria Island',
    price: 220000, // ₦220k / night
    bedrooms: 3,
    bathrooms: 3,
    areaSqM: 220,
    description: 'An exquisitely furnished 3-bedroom luxury serviced residence in Victoria Island, perfect for diaspora vacations, corporate travelers, or short-term boutique living.',
    longDescription: 'The Ivory Serviced Sky Residence is a bespoke hospitality offering managed exclusively by London Homes. Nestled in a peaceful residential pocket of Victoria Island, this 3-bedroom apartment blends 5-star hotel services with the luxury of a private high-end home. Fully styled with custom imported furniture, luxurious Egyptian cotton bed linens, curated Nigerian art pieces, and built-in premium entertainment hubs including multi-zone Sonos sound bars and 4K smart screens. Guests enjoy a fully stocked gourmet kitchen, deep-soaking master bathroom suites, a complimentary private chef on demand, and absolute privacy and secure entry.',
    status: 'Short Let',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Professional Interior Styling',
      'Integrated Sonos Audio Systems',
      '24/7 Dedicated Concierge Care',
      'Gourmet Bulthaup Gas Kitchen',
      'Elite Premium Location VI',
      'Private Chef On-Demand Access'
    ],
    amenities: [
      '24/7 Security Patrol Matrix',
      'Uninterrupted Dual Grid Power',
      'High-Speed Wi-Fi (Starlink)',
      'Valet Parking Services',
      'In-house Laundry & Dry-cleaning'
    ],
    isFeatured: true,
    isNew: false,
    isWaterfront: false,
    isSmartHome: true,
    isInvestmentOpportunity: false
  },
  {
    id: 'prop-capital',
    referenceId: 'LH-CAP-007',
    title: 'Capital Heights Executive Towers',
    type: 'Off-Plan',
    location: 'Victoria Island',
    price: 950000000, // ₦950 Million
    bedrooms: 3,
    bathrooms: 4,
    areaSqM: 410,
    description: 'An unparalleled luxury off-plan investment opportunity in VI, featuring 15% guaranteed dynamic annual ROI and flexible payment milestones.',
    longDescription: 'Designed by world-renowned structural engineers and real estate developers, Capital Heights represents the premier frontier of luxury off-plan development in Victoria Island.Poised to dominate the coastal skyline, the development features ultra-luxurious 3-bedroom glass apartments and majestic duplex penthouses. Spanning across 22 structural storeys, each home features double glazing, high-efficiency centralized cooling, water recovery installations, and massive visual terraces. Investors booking during the early construction milestones are guaranteed an immediate 20% equity appreciation upon structural completion, backed by our elite escrow payment frameworks and full title security guarantees.',
    status: 'Off-Plan',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Guaranteed 15% Projected ROI',
      'Elite Structural Glass Facades',
      'Flexible 24-Month Payment Plan',
      'Centralized Air Cleansing Systems',
      'Smart Automated Infrastructure',
      'Helipad and Private Club access'
    ],
    amenities: [
      'Eco-Friendly Solar Integration',
      'Triple redundant security grid',
      'Rainwater recycling installations',
      'Valet and concierge service lobbies',
      'Private residential athletic court'
    ],
    isFeatured: true,
    isNew: false,
    isWaterfront: false,
    isSmartHome: true,
    isInvestmentOpportunity: true,
    roiEstimate: 15.0
  },
  {
    id: 'prop-sanctuary',
    referenceId: 'LH-SAN-008',
    title: 'The Sanctuary Contemporary Villa',
    type: 'Villa',
    location: 'Osapa London',
    price: 480000000, // ₦480 Million
    bedrooms: 5,
    bathrooms: 5,
    areaSqM: 480,
    description: 'An elegantly finished modern 5-bedroom smart detached home in Osapa London, successfully leased to an international consulting director.',
    longDescription: 'Commanding a peaceful, highly secure street in Osapa London, Lagos, The Sanctuary is a study in contemporary minimalism and comfortable living. Spanning across a spacious plot with pristine lawns and a cozy splash pool, the property features beautiful warm lighting, fully fitted custom kitchens, dual living rooms, and fully en-suite bedroom configurations. We successfully negotiated a multi-year executive lease of this premium asset on behalf of a major international consulting partner, solidifying our status as a trusted partner for global relocations.',
    status: 'Recently Leased',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Secure Gated Estate Access',
      'Private Outdoor Splash Pool',
      'Integrated Control4 Automation',
      'Double Detached Family Lounges',
      'Custom Engineered Solid Oak Doors'
    ],
    amenities: [
      '24/7 Gated Community Security',
      'Custom Inverter & Solar Backup',
      'Full water treatment facilities',
      '2-bedroom executive BQs',
      'Comprehensive 4K CCTV Matrix'
    ],
    isFeatured: false,
    isNew: false,
    isWaterfront: false,
    isSmartHome: true,
    isInvestmentOpportunity: false
  }
];

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'n-banana',
    name: 'Banana Island',
    description: 'Often referred to as the ultimate billionaire enclave in Africa, Banana Island is a master-planned private peninsula offering ultra-exclusive security, paved boulevards, elite marinas, and world-class utilities.',
    image: '/images/hero_banana_island_1783963760466.jpg',
    avgPrice: '₦1.2B – ₦4.5B',
    roi: '12% - 15%',
    vibe: 'Billionaires, Politicians, High-End Enclave',
    securityRating: 'Military-Grade Gated Checkpoints',
    highlights: ['Private Deep-Water Marinas', 'Ultra-Secure Access Control', 'Uninterrupted 24/7 Grid Power', 'Pristine Waterfront Real Estate']
  },
  {
    id: 'n-ikoyi',
    name: 'Ikoyi',
    description: 'The historic crown jewel of Lagos prestige. Combining leafy, serene tree-lined streets, premium residential skyscrapers, luxury golf courses, and upscale social clubs with high-yield commercial real estate.',
    image: '/images/luxury_ikoyi_penthouse_1783963776970.jpg',
    avgPrice: '₦800M – ₦2.5B',
    roi: '14%',
    vibe: 'Diplomats, Executives, Heritage Pride',
    securityRating: 'High - Armed patrols, embassy security',
    highlights: ['The Iconic Lagos Golf Club', 'Elite Private Social Clubs', 'Embassy & Diplomatic Quarters', 'Stunning High-Rise Penthouse Units']
  },
  {
    id: 'n-lekki',
    name: 'Lekki Phase 1',
    description: 'The epicenter of modern lifestyle, creative commerce, and smart residential architecture in Lagos. High in demand for upscale commercial rental yields and luxury short-let holdings.',
    image: '/images/lekki_luxury_villa_1783963791103.jpg',
    avgPrice: '₦400M – ₦1.2B',
    roi: '10% - 13%',
    vibe: 'Entrepreneurs, Creatives, Dynamic Lifestyle',
    securityRating: 'Medium-High - Gated streets',
    highlights: ['Lagos Luxury Nightlife & Fine Dining', 'High Short-let Appreciations', 'Lekki Conservation Center Access', 'Modern Smart Villa Developments']
  },
  {
    id: 'n-vi',
    name: 'Victoria Island',
    description: 'The premium financial capital of Lagos. Combining multinational corporate headquarters, luxury serviced oceanfront towers, and international high-density commercial assets with secure luxury penthouses.',
    image: '/images/photo-1486406146926-c627a92ad1ab.avif',
    avgPrice: '₦600M – ₦2.0B',
    roi: '15%',
    vibe: 'Global Business, Financial Elite, Coastal High-Rise',
    securityRating: 'High - Strong commercial and institutional presence',
    highlights: ['Global Corporate Headquarters', 'Sleek serviced high-rise views', 'Bustling commercial high-streets', 'Proximity to Eko Atlantic City']
  }
];

export const SERVICES: Service[] = [
  {
    id: 's-sales',
    title: 'Luxury Home Sales',
    description: 'We connect discerning global investors and high-net-worth families with the ultimate residential properties across Lagos’ prime enclaves.',
    longDescription: 'For properties of exceptional distinction, London Homes provides a tailored acquisition and marketing service. Our portfolio represents only the absolute finest residential and off-plan assets in Ikoyi, Banana Island, Lekki Phase 1, and Victoria Island. We handle everything with absolute discretion, ensuring that the property matches your specific architectural, lifestyle, and financial targets. Whether you are seeking a generational waterfront mansion or an executive sky penthouse, we represent your interest at every milestone of the negotiation and acquisition process.',
    benefits: [
      'Exclusive Access to Off-Market Luxury Listings',
      'Comprehensive Structural and Legal Due Diligence',
      'Sophisticated Price Negotiation and Representation',
      'Tax-Optimized Property Acquisition Frameworks'
    ],
    process: [
      'Bespoke Client Profile Definition',
      'Curated Private Portfolio Presentation',
      'Accompanied Ultra-Private Chauffeured Viewings',
      'Secure Transaction Closing & Title Acquisition'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Home'
  },
  {
    id: 's-rentals',
    title: 'Bespoke Luxury Rentals & Short Let Management',
    description: 'Curating world-class short-term and multi-year leaseholds for corporate executives, diplomats, and returning diaspora.',
    longDescription: 'We manage and secure the finest high-end rentals and executive short-let residences in Lagos. Every property in our rental pool is fully verified for security, continuous power, and premium finishes. We act as professional intermediaries, ensuring a seamless residential experience for corporate relocations, diplomatic staffs, and returning diaspora looking for high-quality, fully managed turnkey living solutions.',
    benefits: [
      '24/7 Uniformed On-Site Support and Concierge',
      'Fully Vetted Secure Gated Properties Only',
      'Uninterrupted Clean Power & High-Speed Internet',
      'Flexible Corporate and Diplomatic Lease Frameworks'
    ],
    process: [
      'Tenant Needs Assessment',
      'Bespoke Rental Inspections',
      'Corporate Contract Negotiations',
      'Full Check-In and Property Handover Management'
    ],
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Key'
  },
  {
    id: 's-investment',
    title: 'Bespoke Investment & Diaspora Advisory',
    description: 'Providing elite data-backed guidance and secure property escrow structures to assist diaspora and local investors.',
    longDescription: 'Navigating the dynamic Lagos real estate landscape requires deep market insight, structural risk management, and legal clarity. Our Investment Advisory division provides high-net-worth investors and diaspora clients with the accurate data, ROI projections, and security structures needed to confidently build high-yield property portfolios. We specialize in off-plan capital appreciation positioning, land banking strategic purchases, and structured escrow transactional custody.',
    benefits: [
      '100% Secure Diaspora Real Estate Transactions',
      'Pre-vetted High-ROI Off-Plan Project Entry',
      'Comprehensive Legal, Title, and Land Registry Checks',
      'Strategic Escrow Payment Frameworks for Peace of Mind'
    ],
    process: [
      'Strategic Capital Mapping Consultations',
      'Lagos Neighborhood ROI Comparative Studies',
      'Rigorous Title Verification and Legal Auditing',
      'Structured Escrow Milestones Construction Checkups'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    iconName: 'TrendingUp'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-lagos-appreciate',
    title: 'Why Lagos Premium Property Consistently Appreciates Over 20% Annually',
    category: 'Market Trends',
    date: 'July 10, 2026',
    readTime: '6 min read',
    excerpt: 'Despite global economic headwinds, the high-end residential market in Ikoyi and Banana Island continues to exhibit unmatched capital appreciation. Here is the macroeconomic breakdown.',
    content: [
      'Lagos’ luxury real estate market operates on distinct capital mechanics. Unlike the retail housing sector, multi-billion naira properties in elite districts like Ikoyi, Victoria Island, and Banana Island are heavily insulated from standard currency fluctuations and global market headwinds.',
      'The primary driver of this growth is extreme scarcity. Banana Island is a finished, gated geographical peninsula—there is a physical limit to the number of waterfront plots that can ever exist. As Lagos’ billionaire population continues to expand, this limited land supply triggers highly competitive pricing dynamics.',
      'Additionally, a massive volume of transactions in this premier segment is executed in stable foreign assets or full cash payments, keeping the sector entirely free from the risks of high interest rate mortgage defaults. Premium rentals in these enclaves command strong hard-currency payouts, giving luxury landlords reliable hedging advantages and robust annual rental yields of up to 10% on top of steady capital growth.',
      'For global diaspora investors, acquiring premium property in Lagos isn’t merely about home ownership—it is a secure, high-yield capital preservation strategy that outperforms traditional indices by significant margins.'
    ],
    image: '/images/hero_banana_island_1783963760466.jpg',
    author: {
      name: 'Adewale Adeleke',
      role: 'Head of Investment Strategy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
    }
  },
  {
    id: 'art-diaspora-guide',
    title: 'The Diaspora Investor’s Legal Guide: Securing Property in Nigeria Without Risk',
    category: 'Buying Tips',
    date: 'June 28, 2026',
    readTime: '8 min read',
    excerpt: 'A comprehensive checklist covering Certificate of Occupancy (C of O), Governor’s Consent, and utilizing structured corporate escrow solutions to buy safely.',
    content: [
      'For Nigerians living abroad, investing in Lagos real estate can often feel like a stressful minefield. Stories of transaction delays, title disputes, or misallocated funds can discourage even the most enthusiastic buyers. However, by adhering to formal legal structures, the risk can be reduced to zero.',
      'The foundational step is understanding the land title documents. A Certificate of Occupancy (C of O) is the highest form of title granted by the state government, certifying the owner’s leasehold for 99 years. When purchasing from an existing owner, obtaining "Governor’s Consent" is legally required to transfer that title. Without Governor’s Consent, the transaction is incomplete in the eyes of the law.',
      'Secondly, diaspora investors must transition away from utilizing personal family networks for transaction handlings. Partnering with a corporate brokerage that uses institutional escrow structures is critical. Escrow ensures that payments are safely held in trust and only disbursed to developers when independent engineering inspectors verify that construction milestones have been fully achieved.',
      'At London Homes, we guide our diaspora clients through this exact institutional process—carrying out rigorous physical site checkups, verifying state land registries, and securing absolute title ownership, so your hard-earned wealth is perfectly secure.'
    ],
    image: '/images/photo-1600585154340-be6161a56a0c.avif',
    author: {
      name: 'Barrister Evelyn Onuoha',
      role: 'General Legal Counsel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80'
    }
  },
  {
    id: 'art-off-plan-strategy',
    title: 'How to Position in High-Yield Off-Plan Luxury Projects in Lekki Phase 1',
    category: 'Investment',
    date: 'May 15, 2026',
    readTime: '5 min read',
    excerpt: 'Off-plan purchases offer massive entry discounts. Learn how to verify structural developers, evaluate floor plans, and secure flexible payment milestones.',
    content: [
      'Buying off-plan—purchasing a luxury home before it is fully constructed—is one of the most lucrative strategies for high-end investors. Early-stage buyers typically enjoy a 15% to 25% discount compared to completed market values.',
      'However, the success of an off-plan investment rests entirely on developer verification. An investor must study the developer’s track record: Have they successfully completed previous projects to high standards? Are their structural engineering reports audited by reputable third parties?',
      'Furthermore, ensure that your purchase contract includes strict "penalty clauses for delays." A premium off-plan transaction should outline clear construction phases with associated payment milestones (e.g., 20% on foundation, 20% on carcass completion, etc.), rather than demanding large up-front payments.',
      'Lekki Phase 1 and Victoria Island currently represent hotbeds for premium off-plan residential towers. By entering early, securing flexible payment plans, and verifying construction quality, investors can easily capture massive equity appreciations upon completion.'
    ],
    image: 'images/photo-1486406146926-c627a92ad1ab.avif',
    author: {
      name: 'Michael Cole',
      role: 'Director of Portfolio Management',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80'
    }
  } 
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Dr. Chidi Okechukwu',
    role: 'Diaspora Cardiovascular Surgeon',
    location: 'Houston, Texas',
    reviewText: 'London Homes completely transformed my view of Nigerian real estate transactions. Being in the US, I needed a partner I could trust blindly. They secured my luxury penthouse in Ikoyi with complete transparency, managing the legal registries and conducting video tours. Absolute professionals!',
    rating: 5,
    date: 'April 14, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 't-2',
    name: 'Hadiza Al-Hassan',
    role: 'Executive Vice President, Energy Capital',
    location: 'Victoria Island, Lagos',
    reviewText: 'Their representation during my waterfront mansion purchase in Banana Island was flawless. They handled negotiation details with complete discretion and expertise, unlocking an off-market asset other agents couldn’t access. Highly recommended for executive-level representation.',
    rating: 5,
    date: 'May 20, 2026',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80'
  },
  {
    id: 't-3',
    name: 'Tunde Oyelowo',
    role: 'Tech Founder & Venture Capitalist',
    location: 'Lekki Phase 1, Lagos',
    reviewText: 'I worked with London Homes to build my off-plan luxury rental portfolio. Their data-driven ROI charts and escrow-backed milestone checks gave me the confidence to invest. The rental yield of 13% on my apartments has been rock-solid. They represent the modern face of real estate in Lagos.',
    rating: 5,
    date: 'June 02, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'
  }
];
