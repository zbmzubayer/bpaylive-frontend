"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { FaCalendarDays } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { ENV_CLIENT } from "@/config";
import { MATCH_KEY } from "@/constants/query-key";
import { getAllMatches } from "@/services";
import { MatchWithSportAndChannel } from "@/types";
import { EditMatchModal } from "@/components/match/edit-match-modal";
import { DeleteMatchModal } from "@/components/match/delete-match-modal";

export function MatchTable() {
  const { data, isFetching } = useQuery({
    queryKey: [MATCH_KEY],
    queryFn: getAllMatches,
  });
  const matchesData = data?.data as MatchWithSportAndChannel[];
  const matches = matchesData?.map((item) => ({
    ...item,
    // thumbnail: `${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${item.thumbnail}`,
  }));

  return (
    <Table isStriped aria-label="Match table" classNames={{ th: "text-sm" }}>
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>URL</TableColumn>
        <TableColumn>Thumbnail</TableColumn>
        <TableColumn>Default Channel</TableColumn>
        <TableColumn>Trending</TableColumn>
        <TableColumn>
          <div className="flex items-center gap-1">
            <FaCalendarDays className="size-4" />
            <span>Start date and time</span>
          </div>
        </TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody isLoading={isFetching} loadingContent={<Spinner />} emptyContent="No data found">
        {matches?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <span className="line-clamp-1" title={item.url}>
                {item.url}
              </span>
            </TableCell>
            <TableCell>
              <Image
                src={`${ENV_CLIENT.NEXT_PUBLIC_STORAGE_URL}/${item.thumbnail}`}
                // src={item.thumbnail}
                alt={item.title}
                width={60}
                height={40}
                crossOrigin="anonymous"
                className="aspect-[4/3] rounded-md object-cover"
              />
            </TableCell>
            <TableCell>{item.defaultChannel.title}</TableCell>
            <TableCell>{item.trending ? "Yes" : "No"}</TableCell>
            <TableCell>{dayjs(item.startTime).format("DD MMM, YYYY - HH:mm:ss")}</TableCell>
            <TableCell className="flex items-center gap-2">
              <EditMatchModal match={item} />
              <DeleteMatchModal id={item.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
