"use client";

import Image from "next/image";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Alert, Button, Input, Select, SelectItem, Switch } from "@heroui/react";
import { CHANNEL_KEY, SPORT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { ChannelDto as FormValues, channelZodSchema } from "@/schema/channel-schema";
import { createChannel, getAllSport } from "@/services";
import { InputFilePreview } from "@/components/ui/input-file-preview";
import { ENV_CLIENT } from "@/config";

export function CreateChannelForm({ onClose }: { onClose: () => void }) {
  const queryClient = getQueryClient();

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(channelZodSchema),
    defaultValues: {
      streamUrls: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "streamUrls",
  });

  const { data } = useSuspenseQuery({
    queryKey: [SPORT_KEY],
    queryFn: getAllSport,
  });
  const sports = data.data;

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CHANNEL_KEY] });
      onClose();
    },
  });

  const onSubmit = async (data: FormValues) => {
    // convert streamUrls to array
    const streamUrls = data.streamUrls.map((url) => url.value);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("icon", data.icon);
    formData.append("recommended", JSON.stringify(data.recommended));
    formData.append("streamUrls", JSON.stringify(streamUrls));
    formData.append("sportChannels", JSON.stringify(data.sportChannels));
    console.log(data);

    await mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
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
        name="recommended"
        render={({ field }) => (
          <Switch
            isSelected={field.value}
            onValueChange={field.onChange}
            classNames={{
              base: "flex flex-row-reverse justify-between max-w-full",
              label: "ms-0",
            }}
          >
            Is this channel recommended?
          </Switch>
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
            label="Sports"
            placeholder="Select the sports"
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
                  <Image
                    src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${item.icon}`}
                    alt={item.name}
                    width={24}
                    height={24}
                    crossOrigin="anonymous"
                    className="h-6 w-6 rounded-full"
                  />
                }
              >
                {item.name}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <label htmlFor="streamUrls" className="mt-2 inline-block text-sm">
        Stream URLs
      </label>
      {fields.map((field, index) => (
        <div className="my-0.5" key={field.id}>
          <div className="flex items-center gap-2">
            <Controller
              name={`streamUrls.${index}.value` as const}
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <Input
                  id="streamUrls"
                  {...field}
                  size="sm"
                  label={`URL #${index + 1}`}
                  placeholder="https://example.com"
                  variant="bordered"
                  className="flex-1"
                  isInvalid={invalid}
                  errorMessage={error?.message}
                />
              )}
            />
            {fields.length > 1 && (
              <Button
                isIconOnly
                type="button"
                color="danger"
                variant="light"
                onPress={() => remove(index)}
                aria-label="Remove URL"
                className="self mb-2"
              >
                <FaTrash />
              </Button>
            )}
          </div>
        </div>
      ))}

      <Button
        variant="flat"
        type="button"
        size="sm"
        onPress={() => append({ value: "" })}
        className="mt-1 w-fit"
      >
        <FaPlus className="4" />
        Add Another URL
      </Button>

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
