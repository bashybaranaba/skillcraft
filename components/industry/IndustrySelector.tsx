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
  ClipboardList,
} from "lucide-react";

const industries = [
  { name: "General ", icon: ClipboardList, color: "text-teal-500" }, // Added General Tasks
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
      <h2 className="text-xl font-semibold mb-1">
        Select Your Vocational Study Specialization
      </h2>
      <p className="text-sm text-gray-500 mb-3">
        The Bot will then give you an example scenario which you can respond to.
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries.map(({ name, icon: Icon, color }) => (
          <li
            key={name}
            className="flex items-center justify-center h-32 w-full border border-blue-300 rounded-xl p-1"
          >
            <button
              className="w-full h-full text-center px-4 py-2 flex flex-col items-center justify-center space-y-2 rounded-lg border hover:bg-gray-100"
              onClick={() => onSelect(name)}
            >
              <Icon className={`${color} w-8 h-8`} />
              <span className="text-sm font-medium">{name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndustrySelector;
