"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { FaCalendarDays } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { ENV_CLIENT } from "@/config";
import { CHANNEL_KEY } from "@/constants/query-key";
import { getAllChannel } from "@/services";
import { ChannelWithSports } from "@/types";
import { EditChannelModal } from "@/components/channel/edit-channel-modal";
import { DeleteChannelModal } from "@/components/channel/delete-channel-modal";

export function ChannelTable() {
  const { data, isFetching } = useQuery({
    queryKey: [CHANNEL_KEY],
    queryFn: getAllChannel,
  });
  const channels = data?.data as ChannelWithSports[];

  return (
    <Table isStriped aria-label="Channel table" classNames={{ th: "text-sm" }}>
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Icon</TableColumn>
        <TableColumn>Sports</TableColumn>
        <TableColumn>
          <div className="flex items-center gap-1">
            <FaCalendarDays className="size-4" />
            <span>Create Date</span>
          </div>
        </TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody isLoading={isFetching} loadingContent={<Spinner />} emptyContent="No data found">
        {channels?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <Image
                src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${item.icon}`}
                alt={item.title}
                width={40}
                height={40}
                crossOrigin="anonymous"
                className="size-8 rounded-md"
              />
            </TableCell>
            <TableCell>
              <span className="line-clamp-1">
                {item.sportChannels.map((sport) => sport.sport.name).join(", ")}
              </span>
            </TableCell>
            <TableCell>{dayjs(item.createdAt).toString()}</TableCell>
            <TableCell className="flex items-center gap-2">
              <EditChannelModal channel={item} />
              <DeleteChannelModal id={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
