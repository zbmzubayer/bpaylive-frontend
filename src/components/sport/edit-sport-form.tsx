"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Input } from "@heroui/react";
import { SPORT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { sportZodSchema, SportDto as FormValues } from "@/schema/sport-schema";
import { updateSport } from "@/services";
import { Sport } from "@/types";
import { InputFilePreview } from "@/components/ui/input-file-preview";
import { ENV_CLIENT } from "@/config";

type Props = { sport: Sport; onClose: () => void };

export function EditSportForm({ sport, onClose }: Props) {
  const queryClient = getQueryClient();

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(sportZodSchema),
    values: {
      name: sport.name,
      icon: sport.icon!,
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
        render={({ field, fieldState: { error } }) => (
          <InputFilePreview
            type="file"
            label="Icon"
            accept="image/*"
            url={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${field.value}`}
            fileValue={field.value}
            onFileChange={field.onChange}
            className="h-16"
            description="Upload an image file (JPEG, PNG, SVG), Recommended: Square(1:1) size & SVG"
            error={error?.message}
          />
        )}
      />

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
          isDisabled={!formState.isValid || !formState.isDirty || isPending}
        >
          Edit
        </Button>
      </div>
    </form>
  );
}
