'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button" // Assuming Button is located here, adjust path if needed

export const Carousel = () => {
  const images = [
    "imagen1.jpeg",
    "imagen2.jpeg",
    "imagen3.jpeg",
    "imagen4.jpeg",
    "imagen5.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-lg shadow-lg">
      {/* Images */}
      <div
        className="absolute w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentImage * 100}%)` }}
      >
        <div className="flex h-full">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              width={50}
              height={50}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={previousImage}
        variant="outline"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-4 rounded-full hover:bg-black/90 transition-transform transform hover:scale-110"
        aria-label="Previous Slide"
      >
        &#10094;
      </Button>
      <Button
        onClick={nextImage}
        variant="outline"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-4 rounded-full hover:bg-black/90 transition-transform transform hover:scale-110"
        aria-label="Next Slide"
      >
        &#10095;
      </Button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentImage(index)}
            variant="outline"
            className={`w-4 h-4 rounded-full border-2 transition-transform transform ${
              currentImage === index
                ? 'bg-white scale-110 border-white'
                : 'bg-gray-500 border-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
