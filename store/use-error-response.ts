import { create } from "zustand";

interface IUseErrorResponseStore {
  errorResponse: string;
  setErrorResponse: (error: string) => void;
}

const useErrorResponse = create<IUseErrorResponseStore>((set) => ({
  errorResponse: "",
  setErrorResponse: (msg: string) => set({ errorResponse: msg }),
}));

export default useErrorResponse;
