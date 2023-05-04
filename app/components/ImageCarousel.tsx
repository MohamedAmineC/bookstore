"use client"

import Image from 'next/image';
import { useState } from 'react';
import {FcPrevious,FcNext} from "react-icons/fc"

interface ImageCarouselProps{
    images: string[],
    controls?: boolean
}

const ImageCarousel:React.FC<ImageCarouselProps> = ({ images,controls }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((activeIndex + images.length - 1) % images.length);
  };

  return (
    <div className="relative object-cover w-full h-full group-hover:scale-110 transition">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          fill
          alt={`Image ${index + 1}`}
        />
      ))}

      { controls && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === activeIndex ? 'bg-gray-800' : 'bg-gray-400'
            }
            ${index === activeIndex ? 'hover:bg-black' : 'bg-gray-700'}
            focus:outline-none`}
          />
        ))}
      </div>
      )}

      <button
        onClick={(e) => {e.stopPropagation();handlePrev()}}
        className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full opacity-75 hover:opacity-100 focus:outline-none"
      >
        <FcPrevious size={24} className='fill-white'/>
      </button>
      <button
        onClick={(e) => {e.stopPropagation();handleNext()}}
        className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full opacity-75 hover:opacity-100 focus:outline-none"
      >
        <FcNext size={24} className='fill-white' />
      </button>
    </div>
  );
};

export default ImageCarousel
