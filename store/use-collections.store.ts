import { create } from "zustand";

import { Requests } from "@prisma/client";

interface IStoreCollections extends Requests {}

interface IUseCollections {
  storeCollections: IStoreCollections[];
  setStoreCollections: (storeCollections: IStoreCollections[]) => void;
}

const useCollectionsStore = create<IUseCollections>((set) => ({
  storeCollections: [],
  setStoreCollections: (storeCollections) => set({ storeCollections }),
}));

export default useCollectionsStore;
