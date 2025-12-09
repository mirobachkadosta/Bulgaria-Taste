import type { User } from "@/utility/types";
import type { AlertStatusType } from "@/utility/types";
import { create } from "zustand";

import { supabase } from "@/supabase/supabase";

type GlobalState = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  alertStatus: AlertStatusType | null;
  setAlertStatus: (alert: AlertStatusType | null) => void;
  logout: () => Promise<void>;
};

export const globalStore = create<GlobalState>((set) => ({
  theme: "light",
  setTheme: (theme: "light" | "dark") => set({ theme }),
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  user: null,
  setUser: (user: User | null) => set({ user }),
  alertStatus: null,
  setAlertStatus: (alert: AlertStatusType | null) =>
    set({ alertStatus: alert }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
