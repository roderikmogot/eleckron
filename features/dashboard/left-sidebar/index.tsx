import React, { useEffect, useState } from "react";

import { api } from "../../../src/utils/api";
import useUserStore from "../../../store/use-user.store";
import useCollectionsStore from "../../../store/use-collections.store";
import DeleteIcon from "../../ui/svgs/delete-icon.ui";
import useCollectionsIdx from "../../../store/use-collections-idx.store";

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
  responses: string;
}

const Sidebar = () => {
  const email = useUserStore((state) => state.email);
  const setUniqueId = useCollectionsIdx((state) => state.setUniqueId);
  const { storeCollections, setStoreCollections } = useCollectionsStore(
    (state) => state
  );

  const postCollections = api.collections.post.useMutation();
  const deleteCollection = api.collections.delete.useMutation();
  const collections = api.collections.get.useQuery({
    email,
  });

  const [collectionsIdx, setCollectionsIdx] = useState(0);

  useEffect(() => {
    if (collections.data) {
      setStoreCollections(collections.data);
      //@ts-ignore
      setUniqueId(collections.data[0]!.uniqueId);
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

  const handleDeleteCollection = (uniqueId: string) => {
    deleteCollection.mutate({ uniqueId });
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
                  className={`${
                    collectionsIdx === idx ? "bg-gray-600" : ""
                  } flex flex-row`}
                  key={idx}
                >
                  <a
                    href="#"
                    onClick={() => handleCollectionTab(idx)}
                    className="flex w-full border-2 border-b-black border-l-transparent border-t-transparent border-r-transparent px-4 py-2 font-bold text-gray-300"
                  >
                    {collection.name}
                  </a>
                  <button
                    className="px-4 py-2"
                    onClick={() => handleDeleteCollection(collection.uniqueId)}
                  >
                    <DeleteIcon />
                  </button>
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
