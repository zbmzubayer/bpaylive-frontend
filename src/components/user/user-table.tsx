"use client";

import dayjs from "dayjs";
import { FaCalendarDays } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { User } from "@/types";
import { EditUserModal } from "@/components/user/edit-user-modal";
import { DeleteUserModal } from "@/components/user/delete-user-modal";
import { USER_KEY } from "@/constants/query-key";
import { getAllUser } from "@/services";
import { useSession } from "next-auth/react";

export function UserTable() {
  const { data: authUserData } = useSession();
  const authUser = authUserData?.user;

  const { data, isFetching } = useQuery({
    queryKey: [USER_KEY],
    queryFn: getAllUser,
  });
  const userData = data?.data as User[];

  const users = userData?.filter((user) => user.id !== authUser?.id);

  return (
    <Table isStriped aria-label="User table" classNames={{ th: "text-sm" }}>
      <TableHeader>
        <TableColumn>Username</TableColumn>
        <TableColumn>Role</TableColumn>
        <TableColumn>
          <div className="flex items-center gap-1">
            <FaCalendarDays className="size-4" />
            <span>Create Date</span>
          </div>
        </TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody isLoading={isFetching} loadingContent={<Spinner />} emptyContent="No data found">
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{dayjs(user.createdAt).toString()}</TableCell>
            <TableCell className="flex items-center gap-2">
              <EditUserModal user={user} />
              <DeleteUserModal id={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
