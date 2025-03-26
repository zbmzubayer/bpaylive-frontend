import { Channel } from "@/types/channel";
import { Sport } from "@/types/sport";

export type Match = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: any;
  startTime: Date;
  trending: boolean;
  tags: string[];
  hasFakeViews: boolean;
  viewInterval: number;
  minViews: number;
  maxViews: number;
  sportId: string;
  defaultChannelId: string;
  channelMatches: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type MatchWithSport = Match & {
  sport: Sport;
};

export type MatchWithSportAndChannel = Omit<Match, "channelMatches"> & {
  sport: Sport;
  defaultChannel: Channel;
  channelMatches: Array<{ channel: Channel }>;
};
