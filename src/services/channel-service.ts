import { axiosInstance } from "@/lib";
import { Channel, ChannelWithSports } from "@/types";

const CHANNEL_ENDPOINT = "/channel";

export const createChannel = async (data: FormData) => {
  return axiosInstance.post(CHANNEL_ENDPOINT, data);
};

export const getAllChannel = async () => {
  return axiosInstance.get<ChannelWithSports[]>(CHANNEL_ENDPOINT);
};

export const getChannelById = async (id: string) => {
  return axiosInstance.get(`${CHANNEL_ENDPOINT}/${id}`);
};

export const updateChannel = async ({ id, data }: { id: string; data: FormData }) => {
  return axiosInstance.patch(`${CHANNEL_ENDPOINT}/${id}`, data);
};

export const deleteChannel = async (id: string) => {
  return axiosInstance.delete(`${CHANNEL_ENDPOINT}/${id}`);
};
