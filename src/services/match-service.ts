import { axiosInstance } from "@/lib";
import { cache } from "react";
import { MatchWithSportAndChannel } from "@/types/match";

const MATCH_ENDPOINT = "/match";

export const createMatch = async (data: FormData) => {
  return axiosInstance.post(MATCH_ENDPOINT, data);
};

export const getAllMatches = async () => {
  return axiosInstance.get<MatchWithSportAndChannel[]>(MATCH_ENDPOINT);
};

export const getMatchById = async (id: string) => {
  return axiosInstance.get(`${MATCH_ENDPOINT}/${id}`);
};

export const updateMatch = async ({ id, data }: { id: string; data: FormData }) => {
  return axiosInstance.patch(`${MATCH_ENDPOINT}/${id}`, data);
};

export const deleteMatch = async (id: string) => {
  return axiosInstance.delete(`${MATCH_ENDPOINT}/${id}`);
};

export const getMatchByURL = cache(async (url: string) => {
  return axiosInstance.get<MatchWithSportAndChannel>(`${MATCH_ENDPOINT}/url/${url}`);
});
