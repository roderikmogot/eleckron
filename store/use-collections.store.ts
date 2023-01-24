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
    jsonContent: string;
  };
  createdAt: string;
  responses: {
    status: string;
    output: string;
    time: string;
    size: string;
  };
}

interface IUseCollections {
  storeCollections: IStoreCollections[];
  setStoreCollections: (newCollections: IStoreCollections[]) => void;
}

const useCollectionsStore = create<IUseCollections>((set) => ({
  storeCollections: [
    {
      uniqueId: "",
      userEmail: "",
      name: "",
      method: "",
      url: "",
      queryParams: [
        {
          parameter: "",
          value: "",
        },
      ],
      authBasic: {
        username: "",
        password: "",
      },
      authBearer: {
        token: "",
      },
      body: {
        jsonContent: "",
      },
      responses: {
        status: "",
        output: "",
        time: "",
      },
      createdAt: "",
    },
  ],
  setStoreCollections: (newCollections: IStoreCollections[]) => {
    set({ storeCollections: newCollections });
  },
}));

export default useCollectionsStore;
