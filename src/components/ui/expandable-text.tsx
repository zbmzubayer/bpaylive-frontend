"use client";

import { cn } from "@heroui/react";
import { useState, useRef, useEffect } from "react";

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  moreText?: string;
  lessText?: string;
}

export function ExpandableText({
  text,
  maxLength = 200,
  className = "",
  moreText = "more",
  lessText = "Show less",
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const fullTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the text actually needs truncation
    if (text.length > maxLength) {
      setShouldShowButton(true);
    }
  }, [text, maxLength]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = isExpanded
    ? text
    : text.slice(0, maxLength) + (shouldShowButton ? "..." : "");

  return (
    <div className={cn("relative", className)}>
      <div ref={fullTextRef} className="whitespace-pre-wrap break-words text-xs sm:text-sm">
        {truncatedText}
        {shouldShowButton && (
          <button
            onClick={toggleExpand}
            className="ml-1 font-medium text-primary hover:underline focus:outline-none"
            aria-expanded={isExpanded}
          >
            {isExpanded ? lessText : moreText}
          </button>
        )}
      </div>
    </div>
  );
}
