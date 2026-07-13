/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Property {
  id: string;
  title: string;
  type: 'Villa' | 'Apartment' | 'Penthouse' | 'Maisonette' | 'Terrace' | 'Commercial' | 'Land' | 'Off-Plan';
  location: 'Ikoyi' | 'Victoria Island' | 'Lekki Phase 1' | 'VGC' | 'Ajah' | 'Chevron' | 'Banana Island' | 'Oniru' | 'Osapa London' | 'Sangotedo' | 'Thomas Estate';
  price: number; // in Naira (₦)
  bedrooms?: number;
  bathrooms?: number;
  areaSqM?: number;
  description: string;
  longDescription?: string;
  status: 'For Sale' | 'For Rent' | 'Short Let' | 'Just Sold' | 'Recently Leased' | 'Off-Plan';
  images: string[];
  features: string[];
  amenities: string[];
  isFeatured: boolean;
  isNew: boolean;
  isWaterfront: boolean;
  isSmartHome: boolean;
  isInvestmentOpportunity: boolean;
  roiEstimate?: number; // annual yield percentage
  videoUrl?: string; // YouTube or local path
  referenceId: string;
  mapCoordinates?: { lat: number; lng: number };
}

export interface Neighborhood {
  id: string;
  name: 'Ikoyi' | 'Victoria Island' | 'Lekki Phase 1' | 'VGC' | 'Ajah' | 'Chevron' | 'Banana Island' | 'Oniru' | 'Osapa London' | 'Sangotedo' | 'Thomas Estate';
  description: string;
  image: string;
  avgPrice: string;
  roi: string;
  vibe: string;
  securityRating: string;
  highlights: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  process: string[];
  image: string;
  iconName: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Investment' | 'Market Trends' | 'Neighborhood Guide' | 'Buying Tips';
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  reviewText: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  propertyId?: string;
  propertyTitle?: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'Pending' | 'Confirmed';
}
