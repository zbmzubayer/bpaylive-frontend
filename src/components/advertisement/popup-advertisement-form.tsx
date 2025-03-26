"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  advertisementZodSchema,
  SavePopupBannerDto as FormValues,
} from "@/schema/advertisement-schema";
import { InputFilePreview } from "@/components/ui/input-file-preview";
import { Alert, Button } from "@heroui/react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getAdvertisement, savePopupBanner } from "@/services/advertisement-service";
import { ADVERTISEMENT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { ENV_CLIENT } from "@/config";

export function PopupAdvertisementForm() {
  const queryClient = getQueryClient();
  const { data } = useSuspenseQuery({ queryKey: [ADVERTISEMENT_KEY], queryFn: getAdvertisement });
  const advertisement = data.data;

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(advertisementZodSchema.savePopupBanner),
    values: {
      popupBanner: advertisement?.popupBanner ?? undefined,
    },
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: savePopupBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADVERTISEMENT_KEY] });
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    if (data.popupBanner instanceof File || typeof data.popupBanner === "string") {
      formData.append("popupBanner", data.popupBanner);
    }
    await mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="popupBanner"
        render={({ field, fieldState: { error } }) => (
          <InputFilePreview
            type="file"
            label="Popup Banner"
            url={field.value ? `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${field.value}` : undefined}
            fileValue={field.value}
            onFileChange={field.onChange}
            accept="image/*"
            description="Upload an image file (JPEG, PNG, Webp, SVG), Recommended: Rectangle size & SVG"
            error={error?.message}
            classNames={{ imgWrapper: "w-32" }}
          />
        )}
      />
      <Alert
        color="danger"
        title="Something went wrong"
        description={error?.message}
        isVisible={!!error}
        classNames={{ base: "mt-3" }}
      />
      <div className="mt-5">
        <Button
          type="submit"
          isLoading={isPending}
          isDisabled={!formState.isValid || !formState.isDirty || isPending}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
