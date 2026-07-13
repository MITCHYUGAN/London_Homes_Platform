/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, Check } from 'lucide-react';
import { Property } from '../types';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property | null;
}

export default function InspectionModal({ isOpen, onClose, selectedProperty }: InspectionModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [interestType, setInterestType] = useState(selectedProperty ? 'specific' : 'consulting');
  const [preferredLocation, setPreferredLocation] = useState('Ikoyi');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && email && phone) {
      // Simulate saving booking
      const newBooking = {
        id: `booking-${Date.now()}`,
        fullName,
        email,
        phone,
        propertyId: selectedProperty?.id,
        propertyTitle: selectedProperty?.title,
        preferredDate: date,
        preferredTime: time,
        preferredLocation,
        status: 'Pending',
      };

      // Store in local storage to demonstrate a working system
      const existingBookings = JSON.parse(localStorage.getItem('london_homes_bookings') || '[]');
      existingBookings.push(newBooking);
      localStorage.setItem('london_homes_bookings', JSON.stringify(existingBookings));

      setIsSuccess(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('');
    onClose();
  };

  return (
    <div
      id="inspection-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
    >
      <div
        id="modal-container"
        className="relative bg-white w-full max-w-lg overflow-hidden border border-[#ECECEC] shadow-2xl transition-all duration-500"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 lg:p-8 border-b border-[#ECECEC]">
          <div className="space-y-1">
            <h3 className="font-sans text-lg lg:text-xl font-bold tracking-tight text-[#111111] uppercase">
              Schedule Private Viewing
            </h3>
            <p className="text-gray-400 text-xs tracking-wider uppercase">
              {selectedProperty ? 'For ' + selectedProperty.title : 'Premium Advisory Consulting'}
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-gray-400 hover:text-black transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
            {selectedProperty && (
              <div className="bg-[#F8F8F8] p-4 border-l-2 border-[#622219] flex items-center space-x-3 text-xs text-gray-700 font-medium">
                <Sparkles className="w-4 h-4 text-[#622219] shrink-0" />
                <span>You are booking a chauffeured private viewing of {selectedProperty.title} in {selectedProperty.location}.</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aliko Dangote"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#F8F8F8] border border-[#ECECEC] focus:border-[#622219] text-sm px-4 py-3 focus:outline-none transition-colors"
                />
              </div>

              {/* Contact Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. investor@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8F8F8] border border-[#ECECEC] focus:border-[#622219] text-sm px-4 py-3 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +234 803..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8F8F8] border border-[#ECECEC] focus:border-[#622219] text-sm px-4 py-3 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Consultation Context if no specific property */}
              {!selectedProperty && (
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1.5">
                    Territory of Interest
                  </label>
                  <select
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full bg-[#F8F8F8] border border-[#ECECEC] focus:border-[#622219] text-sm px-4 py-3 focus:outline-none transition-colors"
                  >
                    <option value="Banana Island">Banana Island</option>
                    <option value="Ikoyi">Ikoyi</option>
                    <option value="Lekki Phase 1">Lekki Phase 1</option>
                    <option value="Victoria Island">Victoria Island</option>
                    <option value="VGC">VGC (Victoria Garden City)</option>
                    <option value="Oniru">Oniru</option>
                    <option value="Osapa London">Osapa London</option>
                  </select>
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#F8F8F8] border border-[#ECECEC] focus:border-[#622219] text-sm px-4 py-3 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-semibold text-gray-400 mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#F8F8F8] border border-[#ECECEC] focus:border-[#622219] text-sm px-4 py-3 focus:outline-none transition-colors"
                  >
                    <option value="">Select a time</option>
                    <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
                    <option value="Afternoon (12:00 - 15:00)">Afternoon (12:00 - 15:00)</option>
                    <option value="Evening (15:00 - 18:00)">Evening (15:00 - 18:00)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-[#D11D1F] hover:bg-[#622219] text-white text-xs font-semibold uppercase tracking-widest py-4 transition-colors duration-300 cursor-pointer"
              >
                Request Chauffeured Private Viewing
              </button>
              <p className="text-center text-gray-400 text-[10px] mt-3">
                By submitting this request, you agree to our elite secure client privacy protocol.
              </p>
            </div>
          </form>
        ) : (
          <div className="p-8 lg:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-gray-900 tracking-tight uppercase">
                Private Viewing Requested
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                Thank you for choosing London Homes. An elite concierge consultant will contact you via phone within the next 2 hours to finalize your chauffeured inspection coordinates.
              </p>
            </div>
            <div className="bg-[#F8F8F8] p-4 text-xs font-mono text-[#622219] border border-[#ECECEC] max-w-xs mx-auto">
              REF CODE: LH-VR-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={handleResetAndClose}
              className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-semibold uppercase tracking-widest px-8 py-3.5 transition-colors cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
