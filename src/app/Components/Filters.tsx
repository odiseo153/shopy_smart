'use client';

import { TimerResetIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import Image from 'next/image';

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
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const filterSections: FilterSection[] = [
    { title: "Paginas", options },
    { title: "Precios", options: prices },
  ];

  const resetFilters = () => {
    setExpandedSections(["Paginas", "Precios"]);
    setSelectedPlatform("all");
    setSelectedPrice("all");
    onPlatformChange("all");
    onPriceChange("all");
  };

  return (
    <div className="max-w-full md:w-64 bg-white p-6 border border-gray-300 shadow-lg rounded-lg flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Filtros</h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          <TimerResetIcon className="mr-2 h-4 w-4" />
          Resetear
        </Button>
      </div>
      {filterSections.map(({ title, options }) => (
        <div key={title} className="w-full border-b border-gray-200 pb-4">
          <Button
            variant="ghost"
            className="w-full justify-between px-3 rounded-md hover:bg-gray-100 transition"
            onClick={() => toggleSection(title)}
          >
            <span className="text-base">{title}</span>
            <span className="text-lg font-bold">{expandedSections.includes(title) ? "−" : "+"}</span>
          </Button>
          {expandedSections.includes(title) && (
            <RadioGroup
              defaultValue={title === "Precios" ? selectedPrice : selectedPlatform}
              className="mt-3 space-y-2"
              onValueChange={(value) => {
                if (title === "Precios") {
                  setSelectedPrice(value);
                  onPriceChange(value);
                } else {
                  setSelectedPlatform(value);
                  onPlatformChange(value);
                }
              }}
            >
              {["all", ...options].map((option, i) => (
                <div key={i} className="pl-4">
                  <RadioGroupItem value={option} id={`${title}-${option}`} className="peer sr-only" />
                  <label
                    htmlFor={`${title}-${option}`}
                    className={cn(
                      "peer-checked:text-blue-600 peer-checked:font-semibold flex items-center space-x-2 text-gray-800 hover:text-blue-600 cursor-pointer rounded-md p-2",
                      )}
                  >
                    
                    <span className="text-sm capitalize">{option}</span>
                  </label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
      ))}
    </div>
  );
}
