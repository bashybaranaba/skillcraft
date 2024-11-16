"use client";

import React from "react";
import {
  Monitor,
  Car,
  Utensils,
  Home,
  Scissors,
  Hammer,
  Zap,
  Book,
} from "lucide-react";

const industries = [
  { name: "IT Specialist", icon: Monitor, color: "text-blue-500" },
  { name: "Car Repairs", icon: Car, color: "text-red-500" },
  { name: "Food Service", icon: Utensils, color: "text-green-500" },
  { name: "Interior Design", icon: Home, color: "text-indigo-500" },
  { name: "Beauty and Hair Dressing", icon: Scissors, color: "text-pink-500" },
  {
    name: "Construction and Finishing Works",
    icon: Hammer,
    color: "text-gray-500",
  },
  { name: "Electricals", icon: Zap, color: "text-amber-400" },
  { name: "Vocational Teaching", icon: Book, color: "text-purple-500" },
];

interface IndustrySelectorProps {
  onSelect: (industry: string) => void;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ onSelect }) => {
  return (
    <div className="p-1">
      <h2 className="text-xl font-semibold mb-4">Select Your Industry</h2>
      <ul className="space-y-2">
        {industries.map(({ name, icon: Icon, color }) => (
          <li
            key={name}
            className="border p-0.5 border-blue-300 rounded-xl flex items-center"
          >
            <button
              className="w-full text-left px-4 py-2 border rounded-lg hover:bg-gray-100 flex items-center space-x-2"
              onClick={() => onSelect(name)}
            >
              <Icon className={`${color} w-5 h-5`} />
              <span>{name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndustrySelector;
