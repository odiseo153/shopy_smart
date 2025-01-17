'use client';

import { useState, useEffect } from 'react';

export const Carousel = () => {
  const images = [
    "https://fal.media/files/panda/ufZvyywJxR93m9kX-pZ-Y.png",
    "https://fal.media/files/panda/kHalwAFqqrWta85dZCsk1.png",
    "https://fal.media/files/koala/07CbIaggmjhTP99SiIYkV.png",
    "https://fal.media/files/lion/reCauHfTknkQPKSozxgCT.png",
    "https://fal.media/files/penguin/sHuGMAG4jDiN8AZa-HJma.png",
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
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={previousImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-4 rounded-full hover:bg-black/90 transition-transform transform hover:scale-110"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white p-4 rounded-full hover:bg-black/90 transition-transform transform hover:scale-110"
        aria-label="Next Slide"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
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
