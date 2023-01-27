import { create } from "zustand";

interface IUseErrorResponseStore {
  errorResponse: string;
  setErrorResponse: (error: string) => void;
}

const useCollectionsIdx = create<IUseErrorResponseStore>((set) => ({
  errorResponse: "",
  setErrorResponse: (msg: string) => set({ errorResponse: msg }),
}));

export default useCollectionsIdx;
