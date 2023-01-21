import { create } from "zustand";

interface IUserStore {
  email: string;
  setEmail: (email: string) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
}));

export default useUserStore;
