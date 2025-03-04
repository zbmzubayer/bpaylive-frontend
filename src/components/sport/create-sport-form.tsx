"use client";

import { SPORT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { CreateSportDto as FormValues, sportZodSchema } from "@/schema/sport-schema";
import { createSport } from "@/services";
import { Alert, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export function CreateSportForm({ onClose }: { onClose: () => void }) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const queryClient = getQueryClient();

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(sportZodSchema.create),
    defaultValues: undefined,
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createSport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SPORT_KEY] });
      onClose();
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("icon", data.icon);
    // await mutateAsync(formData);
  };

  console.log(error);

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
            label="Name"
            placeholder="Enter the name of the sport"
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              field.onChange(file);
              if (file) {
                setPreviewUrl(URL.createObjectURL(file));
              }
            }}
            accept="image/*"
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
            fileValue={field.value}
            onFileChange={field.onChange}
            accept="image/*"
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
        />
      )}

      <Alert
        color="danger"
        title=""
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
          Create
        </Button>
      </div>
    </form>
  );
}
