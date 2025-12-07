import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCentreStore = create(
  persist(
    (set) => ({
      centre: null,
      setCentre: (centre) => set({ centre }),
      clearCentre: () => set({ centre: null }),
    }),
    {
      name: "user-store",
    }
  )
);

export default useCentreStore;
