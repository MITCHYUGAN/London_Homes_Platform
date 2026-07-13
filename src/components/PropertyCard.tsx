/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Property } from '../types';
import { Home, Bath, Bed, Maximize2, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface PropertyCardProps {
  key?: string;
  property: Property;
  onViewDetails: (propertyId: string) => void;
  onBookInspection: (property: Property) => void;
}

export default function PropertyCard({ property, onViewDetails, onBookInspection }: PropertyCardProps) {
  // Format price helper
  const formatPrice = (price: number, status: string) => {
    const isShortLet = status === 'Short Let';
    const isRent = status === 'For Rent' || status === 'Recently Leased';

    let formatted = '';
    if (price >= 1000000000) {
      formatted = `₦${(price / 1000000000).toFixed(1)}B`;
    } else if (price >= 1000000) {
      formatted = `₦${(price / 1000000).toFixed(0)}M`;
    } else {
      formatted = `₦${price.toLocaleString()}`;
    }

    if (isShortLet) return `${formatted} / night`;
    if (isRent) return `${formatted} / year`;
    return formatted;
  };

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'Just Sold':
        return 'bg-black text-white border-black';
      case 'Recently Leased':
        return 'bg-gray-800 text-white border-gray-800';
      case 'Off-Plan':
        return 'bg-[#622219] text-white border-[#622219]';
      case 'For Rent':
        return 'bg-white text-[#111111] border-[#ECECEC]';
      case 'Short Let':
        return 'bg-[#99B7DE]/20 text-[#111111] border-[#99B7DE]/30';
      default:
        return 'bg-white text-[#622219] border-[#622219]/20';
    }
  };

  return (
    <div
      id={`property-card-${property.id}`}
      className="group bg-white border border-[#ECECEC] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-xl hover:border-black/10 h-full"
    >
      {/* Property Image & Badges */}
      <div className="relative overflow-hidden aspect-4/3 w-full bg-gray-100">
        <img
          src={property.images[0]}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span
            className={`text-[10px] uppercase font-semibold tracking-wider px-3 py-1.5 border backdrop-blur-xs ${getStatusBadgeStyles(
              property.status
            )}`}
          >
            {property.status}
          </span>
          {property.isWaterfront && (
            <span className="bg-[#99B7DE] text-white text-[10px] uppercase font-semibold tracking-wider px-3 py-1.5 border border-[#99B7DE]/20">
              Waterfront
            </span>
          )}
          {property.isSmartHome && (
            <span className="bg-black/85 text-white text-[10px] uppercase font-semibold tracking-wider px-3 py-1.5 border border-white/15">
              Smart Home
            </span>
          )}
          {property.isInvestmentOpportunity && (
            <span className="bg-[#622219] text-white text-[10px] uppercase font-semibold tracking-wider px-3 py-1.5 border border-[#622219]/20">
              High Yield ROI
            </span>
          )}
        </div>

        {/* Verification Check */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 text-[9px] uppercase font-semibold tracking-wider text-[#111111] shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Title Verified</span>
        </div>

        {/* Action overlay on hover */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => onViewDetails(property.id)}
            className="bg-white text-black px-6 py-3 font-semibold uppercase tracking-widest text-xs transition-transform duration-300 translate-y-4 group-hover:translate-y-0 shadow-lg hover:bg-black hover:text-white cursor-pointer"
          >
            Examine Property
          </button>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
            <span>{property.type} in {property.location}</span>
            <span className="font-mono text-gray-400">{property.referenceId}</span>
          </div>

          <h3
            onClick={() => onViewDetails(property.id)}
            className="font-sans text-lg font-bold text-gray-900 group-hover:text-[#622219] transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {property.title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {property.description}
          </p>
        </div>

        {/* Pricing and Stats */}
        <div className="mt-6 pt-6 border-t border-[#ECECEC] space-y-5">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-xl lg:text-2xl font-bold text-[#111111] tracking-tight">
              {formatPrice(property.price, property.status)}
            </span>
            {property.roiEstimate && (
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 uppercase tracking-wider">
                {property.roiEstimate}% ROI
              </span>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 py-1 text-gray-700 font-mono text-xs">
            {property.bedrooms && (
              <div className="flex items-center space-x-1.5">
                <Bed className="w-3.5 h-3.5 text-[#622219] shrink-0" />
                <span>{property.bedrooms} Bed</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center space-x-1.5">
                <Bath className="w-3.5 h-3.5 text-[#622219] shrink-0" />
                <span>{property.bathrooms} Bath</span>
              </div>
            )}
            {property.areaSqM && (
              <div className="flex items-center space-x-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#622219] shrink-0" />
                <span>{property.areaSqM} m²</span>
              </div>
            )}
          </div>

          {/* Direct CTA Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => onViewDetails(property.id)}
              className="text-[#622219] hover:text-[#D11D1F] text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5 group/btn cursor-pointer"
            >
              <span>Examine Estate</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>

            {property.status !== 'Just Sold' && property.status !== 'Recently Leased' && (
              <button
                onClick={() => onBookInspection(property)}
                className="text-xs uppercase font-semibold tracking-wider border-b border-[#ECECEC] hover:border-[#D11D1F] text-gray-900 hover:text-[#D11D1F] transition-all pb-0.5 cursor-pointer"
              >
                Book Inspection
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
