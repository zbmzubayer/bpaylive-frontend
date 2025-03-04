"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Input } from "@heroui/react";
import { SPORT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { sportZodSchema, UpdateSportDto as FormValues } from "@/schema/sport-schema";
import { updateSport } from "@/services";
import { Sport } from "@/types";

type Props = { sport: Sport; onClose: () => void };

export function EditSportForm({ sport, onClose }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(sport.icon as string);
  const [defaultIconFile, setDefaultIconFile] = useState<File | undefined>(undefined);
  const queryClient = getQueryClient();

  useEffect(() => {
    const loadImageAsFile = async () => {
      try {
        const response = await fetch(sport.icon as string);
        const blob = await response.blob();
        const filename =
          typeof sport.icon === "string"
            ? sport.icon?.substring(sport.icon.lastIndexOf("/") + 1)
            : "image.jpg";
        const file = new File([blob], filename, { type: blob.type });
        setDefaultIconFile(file);
      } catch (error) {
        console.error("Error loading image:", error);
        setDefaultIconFile(undefined);
      }
    };

    loadImageAsFile();
  }, [sport.icon]);

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(sportZodSchema.update),
    defaultValues: {
      name: sport.name,
      icon: defaultIconFile,
    },
    values: {
      name: sport.name,
      icon: defaultIconFile!,
    },
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateSport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SPORT_KEY] });
      onClose();
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("icon", data.icon);

    await mutateAsync({ id: sport.id, data: formData });
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error, invalid } }) => (
          <Input
            {...field}
            label="Username"
            placeholder="Enter the username"
            labelPlacement="outside"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={error?.message}
            className="h-16"
          />
        )}
      />

      <Controller
        control={control}
        name="icon"
        render={({ field, fieldState: { error, invalid } }) => (
          <Input
            type="file"
            label="Icon"
            labelPlacement="outside"
            variant="faded"
            description="Upload an image file (JPEG, PNG, SVG), Recommended: Square(1:1) size & SVG"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              field.onChange(file);
              if (file) {
                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
            isInvalid={invalid}
            errorMessage={error?.message}
            className="h-16"
          />
        )}
      />
      {/* <Controller
        control={control}
        name="icon"
        render={({ field, fieldState: { error, invalid } }) => (
          <InputFilePreview
            type="file"
            label="Icon"
            accept="image/*"
            fileValue={field.value}
            onFileChange={field.onChange}
            className="h-16"
          />
        )}
      /> */}

      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Preview"
          height={100}
          width={100}
          className="size-10 rounded-md"
          crossOrigin="anonymous"
        />
      )}

      <Alert
        color="danger"
        title="Error"
        description={error?.message}
        isVisible={!!error}
        classNames={{ base: "mt-1" }}
      />
      <div className="!mt-6 flex justify-end gap-2">
        <Button variant="light" onPress={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          isLoading={isPending}
          isDisabled={!formState.isValid || isPending}
        >
          Edit
        </Button>
      </div>
    </form>
  );
}
