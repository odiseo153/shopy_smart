'use client'


import {useState,useEffect} from 'react';


export const Carousel = () => {
    const images = [
      "https://media.istockphoto.com/id/1412353022/photo/empty-aisle-at-a-supermarket.jpg?s=612x612&w=0&k=20&c=lua6Ayl1iyoOndHTXEWoolyh1xV9HTROcl6we_o-HRc=",
      "https://t4.ftcdn.net/jpg/06/03/64/17/360_F_603641752_KZXQVK9LI6XD4KORIEZvwAUm0F2w8Ydj.jpg", 
      "https://png.pngtree.com/thumb_back/fh260/background/20240409/pngtree-empty-shopping-basket-on-wood-table-over-grocery-store-supermarket-blur-image_15653639.jpg",
      "https://i.pinimg.com/736x/ce/eb/3d/ceeb3d02ced53a1a052302e37784b8a1.jpg  "
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
      <div className="relative w-full h-[400px] overflow-hidden">
        {/* Images */}
        <div 
          className="absolute w-full h-full transition-transform duration-500 ease-in-out"
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
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
        >
          &#10094;
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
        >
          &#10095;
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full ${
                currentImage === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };
