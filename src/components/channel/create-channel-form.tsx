"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { CHANNEL_KEY, SPORT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { CreateChannelDto as FormValues, channelZodSchema } from "@/schema/channel-schema";
import { createChannel, getAllSport } from "@/services";
import { InputFilePreview } from "@/components/ui/input-file-preview";
import { Sport } from "@/types";
import { ENV_CLIENT } from "@/config";

export function CreateChannelForm({ onClose }: { onClose: () => void }) {
  const queryClient = getQueryClient();

  const { control, handleSubmit, formState, watch } = useForm<FormValues>({
    resolver: zodResolver(channelZodSchema.create),
    defaultValues: {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `streamUrls`,
  });

  console.log("hi", watch("streamUrls"));

  const { data, isFetching } = useQuery({
    queryKey: [SPORT_KEY],
    queryFn: getAllSport,
  });
  const sports = data?.data as Sport[];

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CHANNEL_KEY] });
      onClose();
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("icon", data.icon);
    formData.append("streamUrls", JSON.stringify(data.streamUrls));
    formData.append("sportChannels", JSON.stringify(data.sportChannels));
    console.log(data);

    // await mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState: { error, invalid } }) => (
          <Input
            {...field}
            label="Title"
            placeholder="Enter the title"
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
            fileValue={field.value}
            onFileChange={field.onChange}
            accept="image/*"
            className="h-16"
            description="Upload an image file (JPEG, PNG, SVG), Recommended: Square(1:1) size & SVG"
            error={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="sportChannels"
        render={({ field, fieldState: { error, invalid } }) => (
          <Select
            {...field}
            onChange={(e) => {
              console.log("E", e.target.value);
              if (!e.target.value) {
                field.onChange(undefined);
                return;
              }
              const selectedValues = e.target.value.split(",");
              field.onChange(selectedValues);
            }}
            selectedKeys={field.value}
            label="Sport Channels"
            placeholder="Select the sport channels"
            labelPlacement="outside"
            selectionMode="multiple"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={error?.message}
          >
            {sports?.map((item) => (
              <SelectItem
                key={item.id}
                startContent={
                  <img
                    src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${item.icon}`}
                    alt={item.name}
                    className="h-6 w-6 rounded-full"
                    crossOrigin="anonymous"
                  />
                }
              >
                {item.name}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <div>
        <label className="label">Stream URLs</label>
        {fields.length === 0 ? (
          <Controller
            control={control}
            name={`streamUrls.0`}
            render={({ field, fieldState: { error, invalid } }) => (
              <Input
                {...field}
                placeholder="Enter stream URL"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
        ) : (
          fields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <Controller
                control={control}
                name={`streamUrls.${index}`}
                render={({ field, fieldState: { error, invalid } }) => (
                  <Input
                    {...field}
                    placeholder="Enter stream URL"
                    variant="bordered"
                    isInvalid={invalid}
                    errorMessage={error?.message}
                  />
                )}
              />
              {fields.length > 1 && (
                <Button variant="light" onPress={() => remove(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))
        )}
        <Button
          onPress={() => {
            if (fields.length === 0) {
              const firstStreamUrl = watch(`streamUrls.0`);
              if (firstStreamUrl) {
                append("");
              }
            } else {
              const lastIndex = fields.length - 1;
              const lastStreamUrl = watch(`streamUrls.${lastIndex}`);
              if (lastStreamUrl) {
                append(""); // Add a new URL only if the last one has a value
              }
            }
          }}
          // onPress={() => append("")}
        >
          Add URL
        </Button>
      </div>

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
          // isDisabled={!formState.isValid || isPending}
        >
          Create
        </Button>
      </div>
    </form>
  );
}
