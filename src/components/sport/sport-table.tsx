"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { FaCalendarDays } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { ENV_CLIENT } from "@/config";
import { SPORT_KEY } from "@/constants/query-key";
import { getAllSport } from "@/services";
import { Sport } from "@/types";
import { EditSportModal } from "@/components/sport/edit-sport-modal";
import { DeleteSportModal } from "@/components/sport/delete-sport-modal";

export function SportTable() {
  const { data, isFetching } = useQuery({
    queryKey: [SPORT_KEY],
    queryFn: getAllSport,
  });
  const sports = data?.data as Sport[];

  return (
    <Table isStriped aria-label="Sport table" classNames={{ th: "text-sm" }}>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Icon</TableColumn>
        <TableColumn>
          <div className="flex items-center gap-1">
            <FaCalendarDays className="size-4" />
            <span>Create Date</span>
          </div>
        </TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody isLoading={isFetching} loadingContent={<Spinner />} emptyContent="No data found">
        {sports?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Image
                src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${item.icon}`}
                alt={item.name}
                width={40}
                height={40}
                crossOrigin="anonymous"
                className="size-8 rounded-md"
              />
            </TableCell>
            <TableCell>{dayjs(item.createdAt).toString()}</TableCell>
            <TableCell className="flex items-center gap-2">
              <EditSportModal sport={item} />
              <DeleteSportModal id={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
