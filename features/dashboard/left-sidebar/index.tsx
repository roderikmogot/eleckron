import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { api } from "../../../src/utils/api";
import DeleteIcon from "../../ui/svgs/delete-icon.ui";
import useUserStore from "../../../store/use-user.store";
import useCollectionsStore from "../../../store/use-collections.store";
import useCollectionsIdx from "../../../store/use-collections-idx.store";
import useFirstRender from "../../../store/use-first-render.store";

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
  const { firstRender, setFirstRender } = useFirstRender((state) => state);
  const email = useUserStore((state) => state.email);
  const setUniqueId = useCollectionsIdx((state) => state.setUniqueId);
  const { storeCollections, setStoreCollections } = useCollectionsStore(
    (state) => state
  );

  const postCollections = api.collections.post.useMutation();
  const deleteCollection = api.collections.delete.useMutation();
  const collections = api.collections.get.useQuery(
    {
      email,
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const [collectionsIdx, setCollectionsIdx] = useState(0);

  useEffect(() => {
    if (collections.data) {
      setStoreCollections(collections.data);
      if (firstRender) {
        setFirstRender(false);

        //@ts-ignore
        setUniqueId(collections.data[0]!.uniqueId);
      }
    }
  }, [collections.data]);

  const handleCollectionTab = (id: number) => {
    setUniqueId(storeCollections[id]!.uniqueId);
    setCollectionsIdx((_) => id);
  };

  const handleAddCollection = () => {
    postCollections.mutate({ email });
    setTimeout(() => {
      collections
        .refetch()
        .catch((_) => toast.error("Unable to add collection"));
    }, 500);
  };

  const handleDeleteCollection = (uniqueId: string) => {
    //@ts-ignore
    setUniqueId(collections.data[0]!.uniqueId);
    deleteCollection.mutate({ uniqueId });
    setTimeout(() => {
      collections
        .refetch()
        .catch((_) => toast.error("Unable to delete collection"));
    }, 500);
    setCollectionsIdx((_) => 0);
  };

  if (collections.isLoading) {
    return <div>Loading...</div>;
  }

  if (collections.isError) {
    return <div>Error</div>;
  }

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
                    collectionsIdx === idx ? "bg-black" : ""
                  } flex flex-row`}
                  key={idx}
                >
                  <a
                    href="#"
                    onClick={() => handleCollectionTab(idx)}
                    className={`flex w-full border-2 border-b-black border-l-transparent border-t-transparent border-r-transparent px-4 py-2 font-bold ${
                      collectionsIdx === idx ? "text-white" : "text-black"
                    }`}
                  >
                    {collection.name}
                  </a>
                  <button
                    className={`px-4 py-2 ${
                      collectionsIdx === idx ? "text-red-500" : "hidden"
                    } ${collections.data.length === 1 ? "hidden" : ""} `}
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
