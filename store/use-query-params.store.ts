import { create } from "zustand";

type TQueryParams = {
  parameter: string;
  value: string;
};

interface IQueryParams {
  queryParams: TQueryParams[];
  setQueryParams: (queryParams: TQueryParams[]) => void;
}

const useQueryParamsStore = create<IQueryParams>((set) => ({
  queryParams: [
    {
      parameter: "",
      value: "",
    },
  ],
  setQueryParams: (queryParams) => set({ queryParams }),
}));

export default useQueryParamsStore;
