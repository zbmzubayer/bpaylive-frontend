"use client";

import { InputPassword } from "@/components/ui/input-password";
import { USER_KEY } from "@/constants/query-key";
import { getQueryClient } from "@/lib";
import { userZodSchema, CreateUserDto as FormValues } from "@/schema/user-schema";
import { createUser } from "@/services";
import { Alert, Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

export default function CreateUserForm({ onClose }: { onClose: () => void }) {
  const queryClient = getQueryClient();

  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(userZodSchema.create),
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      onClose();
    },
  });

  const onSubmit = async (data: FormValues) => {
    await mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="username"
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
        name="password"
        render={({ field, fieldState: { error, invalid } }) => (
          <InputPassword
            {...field}
            label="Password"
            placeholder="Enter the password"
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
        name="role"
        render={({ field, fieldState: { error, invalid } }) => (
          <Select
            {...field}
            label="Role"
            placeholder="Select the role of user"
            labelPlacement="outside"
            selectedKeys={[field.value]}
            variant="bordered"
            isInvalid={invalid}
            errorMessage={error?.message}
          >
            <SelectItem key="Admin">Admin</SelectItem>
            <SelectItem key="SubAdmin">Sub Admin</SelectItem>
          </Select>
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
