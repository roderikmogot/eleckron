import React, { useEffect, useState } from "react";

import { api } from "../../../src/utils/api";
import useUserStore from "../../../store/use-user.store";
import useCollectionsStore from "../../../store/use-collections.store";

interface ICollection {
  uniqueId: string;
  userEmail: string;
  name: string;
  method: string;
  url: string;
  queryParams: string;
  authBasic: string;
  authBearer: string;
  body: string;
  createdAt: string;
}

const Sidebar = () => {
  const email = useUserStore((state) => state.email);
  const { storeCollections, setStoreCollections } = useCollectionsStore(
    (state) => state
  );

  const postCollections = api.collections.post.useMutation();
  const collections = api.collections.get.useQuery({
    email,
  });

  const [collectionsIdx, setCollectionsIdx] = useState(0);

  useEffect(() => {
    if (collections.data) {
      setStoreCollections(collections.data);
    }
  }, [collections.data]);

  const handleCollectionTab = (id: number) => {
    setCollectionsIdx((_) => id);
  };

  const handleAddCollection = () => {
    postCollections.mutate({ email });
    setTimeout(() => {
      collections.refetch().catch((err) => console.log(err));
    }, 500);
  };

  if (collections.isLoading) {
    return <div>Loading...</div>;
  }

  if (collections.isError) {
    return <div>Error</div>;
  }

  console.log(storeCollections);

  return (
    <div className="h-[90vh] w-[15%] overflow-auto">
      <div className="flex w-full flex-col">
        <button
          className="bg-gray-600 px-4 py-2 font-bold text-white"
          onClick={handleAddCollection}
        >
          New
        </button>
        <div className="mt-4">
          <div className="text-2xl font-bold">Collections</div>
          <div className="mt-2">
            <ul className="flex w-full flex-col gap-2">
              {collections.data.map((collection: ICollection, idx: number) => (
                <li
                  className={`${collectionsIdx === idx ? "bg-gray-600" : ""}`}
                  key={idx}
                >
                  <a
                    href="#"
                    onClick={() => handleCollectionTab(idx)}
                    className="flex w-full border-2 border-b-black border-l-transparent border-t-transparent border-r-transparent px-4 py-2 font-bold text-gray-300"
                  >
                    {collection.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
