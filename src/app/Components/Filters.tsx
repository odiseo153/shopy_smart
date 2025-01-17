'use client';

import { useState } from "react";

interface FilterSection {
  title: string;
  options: string[];
}

interface FiltersProps {
  onPlatformChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  options: string[];
  prices: string[];
}

export function Filters({ onPlatformChange, onPriceChange, options, prices }: FiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Paginas", "Precios"]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const filterSections: FilterSection[] = [
    { title: "Paginas", options },
 //   { title: "Precios", options: prices },
  ];

  return (
    <div className="max-w-full md:w-64 bg-white p-6 border border-gray-300 shadow-lg rounded-lg flex flex-col space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Filtros</h2>
      {filterSections.map(({ title, options }) => (
        <div key={title} className="w-full border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection(title)}
            className="w-full flex justify-between items-center py-2 px-3 bg-gray-50 text-gray-800 font-medium rounded-md hover:bg-gray-100 transition"
          >
            <span className="text-base">{title}</span>
            <span className="text-lg font-bold">{expandedSections.includes(title) ? "−" : "+"}</span>
          </button>
          {expandedSections.includes(title) && (
            <div className="mt-3 space-y-3 pl-4">
              {["all", ...options].map((option, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={title}
                    value={option}
                    className="text-blue-600 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded"
                    onChange={() =>
                      title === "Precios" ? onPriceChange(option) : onPlatformChange(option)
                    }
                  />
                  <span className="text-sm capitalize">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
