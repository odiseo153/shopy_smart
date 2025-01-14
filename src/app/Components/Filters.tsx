'use client';

import { useState } from "react";

interface FilterSection {
  title: string;
  options: string[];
}

interface FiltersProps {
  onPlatformChange: (value: string) => void;
  options: string[];
}

export function Filters({ onPlatformChange, options }: FiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Paginas"]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const filterSections: FilterSection[] = [{ title: "Paginas", options }];

  return (
    <div className="max-w-full md:w-64 bg-white p-6 border border-gray-200 shadow-md rounded-lg flex flex-col space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Filtros</h2>
      {filterSections.map(({ title, options }) => (
        <div key={title} className="w-full">
          <button
            onClick={() => toggleSection(title)}
            className="w-full flex justify-between items-center p-3 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 transition"
          >
            {title}
            <span className="text-lg">{expandedSections.includes(title) ? "-" : "+"}</span>
          </button>
          {expandedSections.includes(title) && (
            <div className="mt-3 space-y-3 pl-4">
              {["all", ...options].map((option, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={title}
                    value={option}
                    className="text-blue-600 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded"
                    onChange={() =>
                      title === "Categorias" ? null : onPlatformChange(option)
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
