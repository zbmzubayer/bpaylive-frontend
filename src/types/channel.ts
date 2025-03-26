import { Sport } from "@/types/sport";

export type Channel = {
  id: string;
  title: string;
  icon: string | File;
  recommended: boolean;
  streamUrls: string[];
  createdAt: string;
  updatedAt: string;
  sportChannels: string[];
};

export type ChannelWithSports = Omit<Channel, "sportChannels"> & {
  sportChannels: Array<{ sport: Sport }>;
};
