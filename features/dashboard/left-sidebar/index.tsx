import React, { useState } from "react";
import { api } from "../../../src/utils/api";

import useUserStore from "../../../store/use-user.store";

const COLLECTION_DEFAULT = (email: string) => {
  const UUID = Math.random().toString(36).substr(2, 9);
  return {
    name: "Test1",
    method: "GET",
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
    uniqueId: UUID,
    userEmail: email,
  };
};

const Sidebar = () => {
  const email = useUserStore((state) => state.email);

  const postCollections = api.collections.post.useMutation();
  const getCollections = api.collections.get.useQuery({
    email,
  });

  const [collections, setCollections] = useState([COLLECTION_DEFAULT(email)]);
  const [collectionsIdx, setCollectionsIdx] = useState(0);

  const handleCollectionTab = (id: number) => {
    setCollectionsIdx((_) => id);
  };

  const handleAddCollection = () => {
    const newCollection = COLLECTION_DEFAULT(email);
    setCollections((prevCollections) => [...prevCollections, newCollection]);
    postCollections.mutate({
      name: newCollection.name,
      method: newCollection.method,
      url: newCollection.url,
      queryParams: JSON.stringify(newCollection.queryParams),
      authBasic: JSON.stringify(newCollection.authBasic),
      authBearer: JSON.stringify(newCollection.authBearer),
      body: JSON.stringify(newCollection.body),
      uniqueId: newCollection.uniqueId,
      userEmail: newCollection.userEmail,
      createdAt: new Date().toISOString(),
    });
  };

  console.log(collections);

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
              {collections.map((collection, idx) => (
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
