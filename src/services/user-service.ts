import { axiosInstance } from "@/lib";
import { CreateUserDto, UpdateUserDto } from "@/schema/user-schema";
import { User } from "@/types";

const USER_ENDPOINT = "/user";

export const createUser = async (data: CreateUserDto) => {
  return axiosInstance.post(USER_ENDPOINT, data);
};

export const getAllUser = async () => {
  return axiosInstance.get<User[]>(USER_ENDPOINT);
};

export const getUserById = async (id: string) => {
  return axiosInstance.get(`${USER_ENDPOINT}/${id}`);
};

export const updateUser = async ({ id, data }: { id: string; data: UpdateUserDto }) => {
  return axiosInstance.patch(`${USER_ENDPOINT}/${id}`, data);
};

export const deleteUser = async (id: string) => {
  return axiosInstance.delete(`${USER_ENDPOINT}/${id}`);
};
