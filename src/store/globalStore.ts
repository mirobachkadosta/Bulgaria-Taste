import { create } from "zustand";

type GlobalState = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

export const globalStore = create<GlobalState>((set) => ({
  theme: "light",
  setTheme: (theme: "light" | "dark") => set({ theme }),
}));
