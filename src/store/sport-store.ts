import { Sport } from "@/types";
import { create } from "zustand";

export type SportStore = {
  sports?: Sport[];
  setSports: (sports: Sport[]) => void;
};

export const useSportStore = create<SportStore>((set) => ({
  sports: undefined,
  setSports: (sports) => set({ sports }),
}));
