"use client"

import type React from "react"

import { useState } from "react"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"


interface FiltersProps {
  onPlatformChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  options: string[];
  prices: string[];
}


export default function FilterComponent({ onPlatformChange, onPriceChange, options, prices }: FiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value)
    setMinPrice(value[0])
    setMaxPrice(value[1])
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
    setMinPrice(value)
    if (value <= maxPrice) {
      setPriceRange([value, maxPrice])
    }
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
    setMaxPrice(value)
    if (value >= minPrice) {
      setPriceRange([minPrice, value])
    }
  }

  const handlePlatformChange = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]
    )
    onPlatformChange(platformId);
  }

  const handlePriceChange = (price: string) => {
    setSelectedPrice((prev) =>
      prev.includes(price) ? prev.filter((id) => id !== price) : [...prev, price]
    )
    onPriceChange(price);
  }

  const applyFilters = () => {
    console.log("Applied filters:", { priceRange, selectedPlatforms })
    setIsFilterOpen(false)
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setMinPrice(0)
    setMaxPrice(1000)
    setSelectedPlatforms([])
    onPlatformChange("all");
    onPriceChange("all");
  }

  return (
    <div className="relative max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className={cn(
          "w-full md:w-64 bg-card rounded-lg shadow-sm border p-4 transition-all duration-300 ease-in-out",
          isFilterOpen ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:relative md:backdrop-blur-none" : "hidden md:block"
        )}>
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 md:hidden" onClick={() => setIsFilterOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Accordion type="single" collapsible defaultValue="price">
              <AccordionItem value="price" className="border-b">
                <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={1000}
                      step={10}
                      onValueChange={handleSliderChange}
                      className="my-6"
                    />
                    <div className="flex items-center gap-2">
                      <div className="grid gap-1.5 flex-1">
                        <Label htmlFor="min-price">Min</Label>
                        <Input id="min-price" type="number" value={minPrice} onChange={handleMinPriceChange} min={0} max={maxPrice} />
                      </div>
                      <div className="pt-6">-</div>
                      <div className="grid gap-1.5 flex-1">
                        <Label htmlFor="max-price">Max</Label>
                        <Input id="max-price" type="number" value={maxPrice} onChange={handleMaxPriceChange} min={minPrice} max={1000} />
                      </div>
                    </div>

                    {["all", ...prices].map((price) => (
                      <div key={price} className="flex items-center space-x-2">
                        <Checkbox id={price} checked={selectedPrice.includes(price)} onCheckedChange={() => handlePriceChange(price)} />
                        <Label htmlFor={price} className="cursor-pointer">{price}</Label>
                      </div>
                    ))}

                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible defaultValue="platform">
              <AccordionItem value="platform" className="border-b">
                <AccordionTrigger className="text-base font-medium">Platform</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {["all", ...options].map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox id={platform} checked={selectedPlatforms.includes(platform)} onCheckedChange={() => handlePlatformChange(platform)} />
                        <Label htmlFor={platform} className="cursor-pointer">{platform}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col gap-2 pt-2">
              <Button onClick={applyFilters}>Apply Filters</Button>
              <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
            </div>
          </div>
        </aside>
      </div>
      <Button onClick={() => setIsFilterOpen(true)} className="fixed bottom-6 right-6 rounded-full shadow-lg z-40 md:hidden" size="icon">
        <Filter className="h-5 w-5" />
        <span className="sr-only">Toggle Filters</span>
      </Button>
    </div>
  )
}