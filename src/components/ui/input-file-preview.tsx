"use client";

import { cn } from "@heroui/react";
import { useState, useEffect, useCallback } from "react";
import { FaUpload } from "react-icons/fa6";

type InputFilePreviewProps = React.HTMLProps<HTMLInputElement> & {
  url?: string;
  fileValue: File | string | undefined;
  onFileChange: (file: File | undefined) => void;
  description?: React.ReactNode;
  error?: string;
};

export function InputFilePreview({
  fileValue,
  url,
  onFileChange,
  description,
  error,
  className,
  ...props
}: InputFilePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(url || undefined);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onFileChange(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
    },
    [onFileChange]
  );

  // Update preview when value changes
  useEffect(() => {
    if (typeof fileValue === "string") {
      // If value is a URL, use it as the preview
      setPreviewUrl(fileValue);
    } else if (fileValue instanceof File && !url) {
      // If value is a File, create a URL for preview
      setPreviewUrl(URL.createObjectURL(fileValue));
    } else if (!url) {
      setPreviewUrl(undefined);
    }
  }, [fileValue]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div>
      <input
        id="file"
        type="file"
        onChange={handleFileChange}
        className={cn("hidden")}
        {...props}
      />

      <label htmlFor="file" className="flex flex-col">
        <span className="">Icon</span>
        {description && <span className="mb-1 text-xs text-foreground-400">{description}</span>}
        <div className="inline-flex size-20 cursor-pointer items-center justify-center rounded-md border-2 border-default-200 p-1 text-xs font-medium hover:border-default-400">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              crossOrigin="anonymous"
              className="size-full rounded-sm"
            />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <FaUpload className="size-4 text-foreground-500" />
              <span>Upload</span>
            </div>
          )}
        </div>
      </label>
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
}
