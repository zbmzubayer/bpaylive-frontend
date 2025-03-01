"use client";

import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import { Input, type InputProps } from "@heroui/input";

export function InputPassword(props: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      {...props}
      type={isVisible ? "text" : "password"}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
        >
          {isVisible ? (
            <HiEyeSlash className="pointer-events-none size-5 text-default-400" />
          ) : (
            <HiEye className="pointer-events-none size-5 text-default-400" />
          )}
        </button>
      }
    />
  );
}
