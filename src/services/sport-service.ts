import { axiosInstance } from "@/lib";
import { CreateSportDto, UpdateSportDto } from "@/schema/sport-schema";
import { Sport } from "@/types";

const SPORT_ENDPOINT = "/sport";

export const createSport = async (data: FormData) => {
  return axiosInstance.post(SPORT_ENDPOINT, data);
};

export const getAllSport = async () => {
  return axiosInstance.get<Sport[]>(SPORT_ENDPOINT);
};

export const getSportById = async (id: string) => {
  return axiosInstance.get(`${SPORT_ENDPOINT}/${id}`);
};

export const updateSport = async ({ id, data }: { id: string; data: FormData }) => {
  return axiosInstance.patch(`${SPORT_ENDPOINT}/${id}`, data);
};

export const deleteSport = async (id: string) => {
  return axiosInstance.delete(`${SPORT_ENDPOINT}/${id}`);
};
