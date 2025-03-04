export type User = {
  id: string;
  username: string;
  role: "Admin" | "SubAdmin";
  createdAt: string;
  updatedAt: string;
};
