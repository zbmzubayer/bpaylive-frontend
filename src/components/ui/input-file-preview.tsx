"use client";

import Image from "next/image";
import { useId, useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa6";
import { LuX } from "react-icons/lu";
import { cn } from "@heroui/react";

type InputFilePreviewProps = React.ComponentProps<"input"> & {
  label: string;
  url?: string;
  fileValue: File | string | undefined;
  onFileChange: (file: File | undefined) => void;
  description?: React.ReactNode;
  error?: string;
  classNames?: Partial<Record<"imgWrapper" | "img", string>>;
};

export function InputFilePreview({
  label,
  url,
  fileValue,
  onFileChange,
  description,
  error,
  classNames,
  className,
  ...props
}: InputFilePreviewProps) {
  const id = useId();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(url || undefined);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileRemove = () => {
    if (fileValue || url) {
      onFileChange(undefined);
      setPreviewUrl(undefined);
    }
  };

  // Update preview when value changes
  useEffect(() => {
    if (!url && typeof fileValue === "string") {
      // If value is a URL, use it as the preview
      setPreviewUrl(fileValue);
    } else if (fileValue instanceof File && !url) {
      // If value is a File, create a URL for preview
      setPreviewUrl(URL.createObjectURL(fileValue));
    }
  }, [url, fileValue]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="inline-flex w-fit gap-1">
      <input
        id={id}
        type="file"
        multiple
        onChange={handleFileChange}
        className={cn("hidden", className)}
        {...props}
      />
      <div className="inline-flex max-w-[50%] flex-col gap-1">
        <label htmlFor={id}>{label}</label>
        {description && (
          <span className="mb-1 text-balance text-xs text-foreground-400">{description}</span>
        )}
      </div>
      <div className="relative">
        <label htmlFor={id} className="inline-flex cursor-pointer flex-col">
          <div
            className={cn(
              "inline-flex size-20 cursor-pointer items-center justify-center rounded-md border-2 border-default-200 p-1 text-xs font-medium hover:border-default-400",
              classNames?.imgWrapper
            )}
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                width={80}
                height={80}
                crossOrigin="anonymous"
                className={cn("size-full rounded-sm object-cover", classNames?.img)}
              />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <FaUpload className="size-4 text-foreground-500" />
                <span>Upload</span>
              </div>
            )}
          </div>
        </label>
        {previewUrl && (
          <button
            type="button"
            onClick={handleFileRemove}
            className="absolute -right-2 -top-2 inline-flex items-center justify-center rounded-full bg-default p-1 text-danger"
          >
            <LuX className="size-3" />
          </button>
        )}
      </div>
      {error && <span className="self-end text-xs text-danger">{error}</span>}
    </div>
  );
}
