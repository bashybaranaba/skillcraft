// components/IndustrySelector.tsx
"use client";

import React from "react";

const industries = [
  "Car Repairs",
  "IT Specialist",
  "Food Service",
  "Interior Design",
  "Beauty and Hair Dressing",
  "Construction and Finishing Works",
  "Electricals",
  "Vocational Teaching",
];

interface IndustrySelectorProps {
  onSelect: (industry: string) => void;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ onSelect }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Select Your Industry</h2>
      <ul className="space-y-2">
        {industries.map((industry) => (
          <li key={industry}>
            <button
              className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
              onClick={() => onSelect(industry)}
            >
              {industry}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndustrySelector;
