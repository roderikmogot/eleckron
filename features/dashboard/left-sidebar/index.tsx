import React, { useState } from "react";

import useUserStore from "../../../store/use-user.store";

const Sidebar = () => {
  const email = useUserStore((state) => state.email);

  const [collectionsIdx, setCollectionsIdx] = useState(0);
  const [collections, setCollections] = useState([
    { name: "Test1", id: 0 },
    { name: "Test2", id: 1 },
    { name: "Test3", id: 2 },
  ]);

  const handleCollectionTab = (id: number) => {
    setCollectionsIdx((_) => id);
  };

  return (
    <div className="h-[90vh] w-[15%] overflow-auto">
      <div className="flex w-full flex-col">
        <button className="bg-gray-600 px-4 py-2 font-bold text-white">
          New
        </button>
        <div className="mt-4">
          <div className="text-2xl font-bold">Collections</div>
          <div className="mt-2">
            <ul className="flex w-full flex-col gap-2">
              {collections.map((collection, idx) => (
                <li
                  className={`${
                    collectionsIdx === collection.id ? "bg-gray-600" : ""
                  }`}
                  key={idx}
                >
                  <a
                    href="#"
                    onClick={() => handleCollectionTab(collection.id)}
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
