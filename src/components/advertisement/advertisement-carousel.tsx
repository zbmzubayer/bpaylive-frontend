"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { cn } from "@heroui/react";
import { ENV_CLIENT } from "@/config";

interface AdvertisementCarouselProps {
  bannersWithUrl: Array<{ banner: string; url?: string }>;
}

export function AdvertisementCarousel({ bannersWithUrl }: AdvertisementCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideCount = bannersWithUrl?.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  }, [slideCount]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="relative h-[10rem] w-full overflow-hidden rounded-2xl shadow-xl sm:h-[25rem] lg:h-[30rem]">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannersWithUrl.map((slide, index) => (
          <div key={index} className={`relative h-full w-full flex-shrink-0`}>
            {/* Background effects */}
            <a href={slide.url}>
              <Image
                src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${slide.banner}`}
                alt={`Banner ${index + 1}`}
                fill
                priority
                crossOrigin="anonymous"
                className="w-full object-cover"
              />
            </a>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-primary transition-colors hover:bg-black/50"
        aria-label="Previous slide"
      >
        <LuChevronLeft className="size-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-primary transition-colors hover:bg-black/50"
        aria-label="Next slide"
      >
        <LuChevronRight className="size-6" />
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 transform space-x-2">
        {bannersWithUrl.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "size-2.5 rounded-full transition-all duration-300",
              currentSlide === index ? "w-6 bg-primary" : "bg-primary/50 hover:bg-primary/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
