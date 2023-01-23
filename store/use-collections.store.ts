import { create } from "zustand";

import { Requests } from "@prisma/client";

interface IStoreCollections {
  uniqueId: string;
  userEmail: string;
  name: string;
  method: string;
  url: string;
  queryParams: {
    parameter: string;
    value: string;
  }[];
  authBasic: {
    username: string;
    password: string;
  };
  authBearer: {
    token: string;
  };
  body: {
    json: string;
  };
  createdAt: string;
  responses: {
    status: string;
    output: string;
    time: string;
  };
}

interface IUseCollections {
  storeCollections: IStoreCollections[];
  setStoreCollections: (storeCollections: IStoreCollections[]) => void;
}

const useCollectionsStore = create<IUseCollections>((set) => ({
  storeCollections: [],
  setStoreCollections: (storeCollections) => set({ storeCollections }),
}));

export default useCollectionsStore;
