import { create } from "zustand";

interface IUseFirstRenderStore {
  firstRender: boolean;
  setFirstRender: (toggle: boolean) => void;
}

const useFirstRender = create<IUseFirstRenderStore>((set) => ({
  firstRender: true,
  setFirstRender: (toggle) => set({ firstRender: toggle }),
}));

export default useFirstRender;
