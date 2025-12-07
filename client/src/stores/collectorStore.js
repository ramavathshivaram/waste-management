import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCollectorStore = create(
  persist(
    (set) => ({
      collector: null,
      setCollector: (collector) => set({ collector }),
      clearCollector: () => set({ collector: null }),
    }),
    {
      name: "user-store",
    }
  )
);

export default useCollectorStore;
