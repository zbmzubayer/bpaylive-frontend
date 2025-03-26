"use client";

import { ENV_CLIENT } from "@/config";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";

export default function AdvertisementPopup({ popupBanner }: { popupBanner: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure the animation works properly
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={closePopup}
      />

      {/* Popup content */}
      <div className="relative z-10 mx-auto w-11/12 max-w-md scale-100 transform rounded-lg bg-white opacity-100 shadow-xl transition-all duration-300 dark:bg-gray-800">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-md bg-default p-1 text-default-foreground transition-colors hover:bg-default/70"
          aria-label="Close popup"
        >
          <LuX className="size-4" />
        </button>

        {/* Content */}
        <div className="relative h-[350px]">
          <Image
            src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${popupBanner}`}
            alt="Advertisement"
            fill
            className="mb-4 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
