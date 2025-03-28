export type User = {
  id: string;
  username: string;
  role: "Admin" | "SubAdmin";
  createdAt: string;
  updatedAt: string;
};

export const USER_ROLE = {
  ADMIN: "Admin",
  SUB_ADMIN: "SubAdmin",
} as const;
