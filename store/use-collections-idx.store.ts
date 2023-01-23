import { create } from "zustand";

interface IUseCollectionsIdxStore {
  uniqueId: string;
  setUniqueId: (id: string) => void;
}

const useCollectionsIdx = create<IUseCollectionsIdxStore>((set) => ({
  uniqueId: "",
  setUniqueId: (id: string) => set({ uniqueId: id }),
}));

export default useCollectionsIdx;
