/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function RoiCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(500000000); // ₦500M default
  const [monthlyRent, setMonthlyRent] = useState(4000000); // ₦4M default
  const [serviceCharge, setServiceCharge] = useState(3000000); // ₦3M annual service charge default
  const [appreciationRate, setAppreciationRate] = useState(15); // 15% annual appreciation default (very common in premium Lagos properties)
  const [holdingPeriod, setHoldingPeriod] = useState(5); // 5 years holding default

  // Formatter helpers
  const formatNaira = (value: number) => {
    if (value >= 1000000000) {
      return `₦${(value / 1000000000).toFixed(2)} Billion`;
    }
    if (value >= 1000000) {
      return `₦${(value / 1000000).toFixed(1)} Million`;
    }
    return `₦${value.toLocaleString()}`;
  };

  // Calculations
  const grossAnnualRental = monthlyRent * 12;
  const netAnnualRental = grossAnnualRental - serviceCharge;
  const grossRentalYield = (grossAnnualRental / purchasePrice) * 100;
  const netRentalYield = (netAnnualRental / purchasePrice) * 100;

  // Compound appreciation calculation
  let futureValue = purchasePrice;
  for (let i = 0; i < holdingPeriod; i++) {
    futureValue = futureValue * (1 + appreciationRate / 100);
  }
  const totalCapitalAppreciation = futureValue - purchasePrice;
  const totalRentalEarned = netAnnualRental * holdingPeriod;
  const totalInvestmentValue = futureValue + totalRentalEarned;
  const totalReturnOnInvestment = ((totalInvestmentValue - purchasePrice) / purchasePrice) * 100;

  return (
    <div
      id="roi-calculator"
      className="bg-white border border-[#ECECEC] p-6 lg:p-10 shadow-xl max-w-4xl mx-auto font-sans"
    >
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Controls Column */}
        <div className="flex-1 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight uppercase flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-[#622219]" />
              <span>Lagos Property Yield Calculator</span>
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              Calculate projected rental yield and 5-year capital appreciation compounding across Ikoyi, Banana Island, and Lekki.
            </p>
          </div>

          <div className="space-y-5">
            {/* Purchase Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="uppercase text-gray-400 tracking-wider">Purchase Price</span>
                <span className="font-mono text-[#111111]">{formatNaira(purchasePrice)}</span>
              </div>
              <input
                type="range"
                min={50000000}
                max={2500000000}
                step={50000000}
                value={purchasePrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPurchasePrice(val);
                  // Scale rent dynamically to keep initial rates realistic
                  setMonthlyRent(Math.round(val * 0.08 / 12));
                  setServiceCharge(Math.round(val * 0.005));
                }}
                className="w-full accent-[#622219] bg-[#ECECEC] h-1"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>₦50M</span>
                <span>₦1.25B</span>
                <span>₦2.5B</span>
              </div>
            </div>

            {/* Monthly Rental Income Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="uppercase text-gray-400 tracking-wider">Projected Monthly Rent</span>
                <span className="font-mono text-[#111111]">{formatNaira(monthlyRent)} / month</span>
              </div>
              <input
                type="range"
                min={300000}
                max={25000000}
                step={100000}
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full accent-[#622219] bg-[#ECECEC] h-1"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>₦300K</span>
                <span>₦12.5M</span>
                <span>₦25M</span>
              </div>
            </div>

            {/* Annual Service Charge / Outgoings */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="uppercase text-gray-400 tracking-wider">Annual Service & Upkeep Charge</span>
                <span className="font-mono text-[#111111]">{formatNaira(serviceCharge)} / year</span>
              </div>
              <input
                type="range"
                min={500000}
                max={30000000}
                step={500000}
                value={serviceCharge}
                onChange={(e) => setServiceCharge(Number(e.target.value))}
                className="w-full accent-[#622219] bg-[#ECECEC] h-1"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>₦500K</span>
                <span>₦15M</span>
                <span>₦30M</span>
              </div>
            </div>

            {/* Annual Capital Appreciation Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="uppercase text-gray-400 tracking-wider">Est. Annual Capital Appreciation</span>
                <span className="font-mono text-[#622219] font-bold">{appreciationRate}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={25}
                step={1}
                value={appreciationRate}
                onChange={(e) => setAppreciationRate(Number(e.target.value))}
                className="w-full accent-[#622219] bg-[#ECECEC] h-1"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>5% (Conservative)</span>
                <span>15% (Lagos Avg)</span>
                <span>25% (Extreme Enclaves)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:w-96 bg-[#F8F8F8] p-6 lg:p-8 border border-[#ECECEC] flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#99B7DE]">
              Projected Performance Indices
            </span>

            {/* Yield Results */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-semibold text-gray-400 block">Gross Yield</span>
                <span className="font-mono text-xl lg:text-2xl font-bold text-gray-900">
                  {grossRentalYield.toFixed(2)}%
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-semibold text-gray-400 block">Net Yield</span>
                <span className="font-mono text-xl lg:text-2xl font-bold text-[#622219]">
                  {netRentalYield.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="border-t border-[#ECECEC] pt-4 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Net Rental Income:</span>
                <span className="font-mono font-semibold text-gray-900">{formatNaira(netAnnualRental)} / yr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Projected 5-Yr Rental:</span>
                <span className="font-mono font-semibold text-gray-900">{formatNaira(totalRentalEarned)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Projected 5-Yr Appreciation:</span>
                <span className="font-mono font-semibold text-gray-900">{formatNaira(totalCapitalAppreciation)}</span>
              </div>
            </div>
          </div>

          {/* Master Total ROI Banner */}
          <div className="bg-white p-4 border border-[#ECECEC] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
              <span className="uppercase tracking-wider">Total Projected 5-Year Return</span>
              <TrendingUp className="w-4 h-4 text-emerald-600 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="font-mono text-2xl font-bold text-[#111111] leading-tight">
                {formatNaira(totalInvestmentValue - purchasePrice)}
              </div>
              <div className="text-[11px] font-semibold text-emerald-600 uppercase tracking-widest flex items-center space-x-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+{totalReturnOnInvestment.toFixed(1)}% Compounded Gain</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-[#ECECEC] text-[10px] text-gray-400 text-center leading-relaxed">
        Calculations are based on historical index gains in Ikoyi and Banana Island. Performance may vary. All transactions with London Homes utilize secure, verified legal escrows.
      </div>
    </div>
  );
}
