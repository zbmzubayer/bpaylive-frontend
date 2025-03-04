"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Input } from "@heroui/react";
import { SPORT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { CreateSportDto as FormValues, sportZodSchema } from "@/schema/sport-schema";
import { createSport } from "@/services";
import { InputFilePreview } from "@/components/ui/input-file-preview";

export function CreateSportForm({ onClose }: { onClose: () => void }) {
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
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("icon", data.icon);
    await mutateAsync(formData);
  };

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
          <InputFilePreview
            type="file"
            label="Icon"
            fileValue={field.value}
            onFileChange={field.onChange}
            accept="image/*"
            className="h-16"
            description="Upload an image file (JPEG, PNG, SVG), Recommended: Square(1:1) size & SVG"
            error={error?.message}
          />
        )}
      />

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
