import { Card, CardHeader, CardBody } from "@heroui/card";

import LoginForm from "@/components/auth/login-form";

export function LoginCard() {
  return (
    <Card className="w-[400px] divide-y-2">
      <CardHeader className="flex justify-center text-xl font-medium">
        Login to Admin Panel
      </CardHeader>
      <CardBody>
        <LoginForm />
      </CardBody>
    </Card>
  );
}
