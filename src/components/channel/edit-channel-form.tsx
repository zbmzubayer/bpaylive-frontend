"use client";

import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { CHANNEL_KEY, SPORT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { channelZodSchema, UpdateChannelDto as FormValues } from "@/schema/channel-schema";
import { getAllSport, updateChannel } from "@/services";
import { ChannelWithSports } from "@/types";
import { InputFilePreview } from "@/components/ui/input-file-preview";
import { ENV_CLIENT } from "@/config";

type Props = { channel: ChannelWithSports; onClose: () => void };

export function EditChannelForm({ channel, onClose }: Props) {
  const { sportChannels, streamUrls } = channel;
  const [defaultIconFile, setDefaultIconFile] = useState<File | undefined>(undefined);
  const queryClient = getQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: [SPORT_KEY],
    queryFn: getAllSport,
  });
  const sports = data.data;

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(channelZodSchema.update),
    defaultValues: {
      title: channel.title,
      icon: defaultIconFile,
      streamUrls: streamUrls?.map((url) => ({ value: url })),
      sportChannels: sportChannels?.map((item) => item.sport.id),
    },
    values: {
      title: channel.title,
      icon: defaultIconFile!,
      streamUrls: streamUrls?.map((url) => ({ value: url })),
      sportChannels: sportChannels?.map((item) => item.sport.id),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "streamUrls",
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CHANNEL_KEY] });
      onClose();
    },
  });

  const onSubmit = async (data: FormValues) => {
    const streamUrls = data.streamUrls?.map((url) => url.value);
    const formData = new FormData();
    formData.append("title", data.title!);
    formData.append("icon", data.icon!);
    formData.append("streamUrls", JSON.stringify(streamUrls));
    formData.append("sportChannels", JSON.stringify(data.sportChannels));

    await mutateAsync({ id: channel.id, data: formData });
  };

  useEffect(() => {
    const loadImageAsFile = async () => {
      try {
        const response = await fetch(channel.icon as string);
        const blob = await response.blob();
        const filename =
          typeof channel.icon === "string"
            ? channel.icon?.substring(channel.icon.lastIndexOf("/") + 1)
            : "image.jpg";
        const file = new File([blob], filename, { type: blob.type });
        setDefaultIconFile(file);
      } catch (error) {
        console.error("Error loading image:", error);
        setDefaultIconFile(undefined);
      }
    };

    loadImageAsFile();
  }, [channel.icon]);

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
            accept="image/*"
            fileValue={field.value}
            url={channel.icon as string}
            onFileChange={field.onChange}
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
              if (!e.target.value) {
                field.onChange(undefined);
                return;
              }
              const selectedValues = e.target.value.split(",");
              field.onChange(selectedValues);
            }}
            defaultSelectedKeys={field.value}
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
        className="mt-1"
      >
        <FaPlus className="4" />
        Add Another URL
      </Button>

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
