"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Input } from "@heroui/react";

import { InputPassword } from "@/components/ui/input-password";

const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(1, "Username is required"),
  password: z.string({ required_error: "Password is required" }).min(1, "Password is required"),
});

type FormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const params = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const callbackUrl = params.get("callbackUrl") || "/admin/dashboard";
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error);
    }
    if (res?.ok) {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState: { error, invalid } }) => (
            <Input
              {...field}
              label="Username"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              labelPlacement="outside"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={error?.message}
              className="h-16"
            />
          )}
        />
      </div>
      <Alert
        color="danger"
        title="Login failed"
        description={error}
        isVisible={!!error}
        classNames={{ base: "mt-1" }}
      />
      <Button type="submit" color="primary" className="mt-3 w-full text-base font-medium">
        Login
      </Button>
    </form>
  );
}
