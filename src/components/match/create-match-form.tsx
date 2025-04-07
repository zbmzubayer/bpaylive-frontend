"use client";

import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQueries } from "@tanstack/react-query";
import {
  Alert,
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@heroui/react";
import { CHANNEL_KEY, MATCH_KEY, SPORT_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { CreateMatchDto as FormValues, matchZodSchema } from "@/schema/match-schema";
import { createMatch, getAllChannel, getAllSport } from "@/services";
import { InputFilePreview } from "@/components/ui/input-file-preview";
import { ENV_CLIENT } from "@/config";
import { parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";

export function CreateMatchForm({ onClose }: { onClose: () => void }) {
  const queryClient = getQueryClient();

  const { control, handleSubmit, formState, setValue } = useForm<FormValues>({
    resolver: zodResolver(matchZodSchema.create),
    defaultValues: {
      trending: false,
    },
  });

  const [{ data: sportData }, { data: channelData }] = useSuspenseQueries({
    queries: [
      { queryKey: [SPORT_KEY], queryFn: getAllSport },
      { queryKey: [CHANNEL_KEY], queryFn: getAllChannel },
    ],
  });
  const sports = sportData.data;
  const channels = channelData.data;

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MATCH_KEY] });
      onClose();
    },
  });

  const getCalendarDate = (date: Date | undefined) => {
    if (!date) return undefined;
    return parseAbsoluteToLocal(date.toISOString());
  };

  const handleDateChange = (calendarDate: ZonedDateTime | null, onChange: (date: Date) => void) => {
    if (!calendarDate) return;
    onChange(calendarDate.toDate());
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description!);
    formData.append("url", data.url);
    formData.append("thumbnail", data.thumbnail);
    formData.append("trending", data.trending ? "true" : "false");
    formData.append("startTime", data.startTime.toISOString());
    // formData.append("tags", JSON.stringify(data.tags));
    // formData.append("hasFakeViews", data.hasFakeViews ? "true" : "false");
    formData.append("sportId", data.sportId);
    formData.append("defaultChannelId", data.defaultChannelId);
    if (data.channelMatches) {
      formData.append("channelMatches", JSON.stringify(data.channelMatches));
    }
    await mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex md:gap-10">
        <div className="flex flex-col gap-3 md:w-1/2">
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState: { error, invalid } }) => (
              <Input
                value={field.value}
                onChange={(e) => {
                  const value = e.target.value;
                  const url = value.replace(/\s+/g, "-").toLowerCase();
                  field.onChange(value);
                  setValue("url", url);
                }}
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
            name="description"
            render={({ field, fieldState: { error, invalid } }) => (
              <Textarea
                {...field}
                label="Description"
                placeholder="Enter the description"
                labelPlacement="outside"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="url"
            render={({ field, fieldState: { error, invalid } }) => (
              <Input
                {...field}
                label="URL"
                placeholder="e.g. bangladesh-vs-pakistan-t20-final-2024"
                description="Rules: Only lowercase letters, numbers, underscore (_) and hyphens (-) are allowed. No spaces or special characters."
                labelPlacement="outside"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="thumbnail"
            render={({ field, fieldState: { error } }) => (
              <InputFilePreview
                type="file"
                label="Thumbnail"
                fileValue={field.value}
                onFileChange={field.onChange}
                accept="image/*"
                description="Upload an image file (JPEG, PNG, Webp, SVG), Recommended: Rectangle size & SVG"
                error={error?.message}
                classNames={{ imgWrapper: "w-32" }}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 md:w-1/2">
          {/* <Controller
            control={control}
            name="tags"
            render={({ field, fieldState: { error, invalid } }) => (
              <Input
                value={(field.value || []).join(",")}
                onChange={(e) => {
                  const tags = e.target.value.split(",").map((tag) => tag.trim());
                  field.onChange(tags);
                }}
                label="Tags"
                placeholder="Enter the tags"
                labelPlacement="outside"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          /> */}
          <Controller
            control={control}
            name="startTime"
            render={({ field, fieldState: { error, invalid } }) => (
              <DatePicker
                value={getCalendarDate(field.value)}
                onChange={(value) => handleDateChange(value, field.onChange)}
                granularity="second"
                hideTimeZone
                hourCycle={24}
                showMonthAndYearPickers
                label="Match Start Time"
                labelPlacement="outside"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="trending"
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onValueChange={field.onChange}
                classNames={{
                  base: "flex flex-row-reverse justify-between max-w-full",
                  label: "ms-0",
                }}
              >
                Is this match trending?
              </Switch>
            )}
          />
          {/* <Controller
            control={control}
            name="hasFakeViews"
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onValueChange={field.onChange}
                classNames={{
                  base: "flex flex-row-reverse justify-between max-w-full",
                  label: "ms-0",
                }}
              >
                Does this match have fake views?
              </Switch>
            )}
          /> */}
          {/* {watch("hasFakeViews") && (
            <>
              <Controller
                control={control}
                name="viewInterval"
                render={({ field }) => (
                  <Input
                    type="number"
                    value={(field.value || "").toString()}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        field.onChange(value);
                      } else {
                        field.onChange(undefined);
                      }
                    }}
                    label="View Interval"
                    placeholder="Enter the time interval of fake views"
                    labelPlacement="outside"
                    variant="bordered"
                  />
                )}
              />
            </>
          )} */}
          <Controller
            control={control}
            name="sportId"
            render={({ field, fieldState: { error, invalid } }) => (
              <Select
                {...field}
                label="Sport"
                placeholder="Select the sport"
                labelPlacement="outside"
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
                        className="size-6 rounded-full"
                      />
                    }
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="defaultChannelId"
            render={({ field, fieldState: { error, invalid } }) => (
              <Select
                {...field}
                label="Default Channel"
                placeholder="Select the streaming channel"
                labelPlacement="outside"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={error?.message}
              >
                {channels?.map((item) => (
                  <SelectItem
                    key={item.id}
                    startContent={
                      <Image
                        src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${item.icon}`}
                        alt={item.title}
                        width={24}
                        height={24}
                        crossOrigin="anonymous"
                        className="size-6 rounded-full"
                      />
                    }
                  >
                    {item.title}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="channelMatches"
            render={({ field, fieldState: { error, invalid } }) => (
              <Select
                value={field.value}
                onChange={(e) => {
                  if (!e.target.value) {
                    field.onChange(undefined);
                    return;
                  }
                  const selectedValues = e.target.value.split(",");
                  field.onChange(selectedValues);
                }}
                label="Other Channels"
                placeholder="Select other streaming channels"
                labelPlacement="outside"
                variant="bordered"
                selectionMode="multiple"
                isInvalid={invalid}
                errorMessage={error?.message}
              >
                {channels?.map((item) => (
                  <SelectItem
                    key={item.id}
                    startContent={
                      <Image
                        src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${item.icon}`}
                        alt={item.title}
                        width={24}
                        height={24}
                        crossOrigin="anonymous"
                        className="size-6 rounded-full"
                      />
                    }
                  >
                    {item.title}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
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
          isDisabled={!formState.isValid || isPending}
        >
          Create
        </Button>
      </div>
    </form>
  );
}
