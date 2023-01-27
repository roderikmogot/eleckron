import React, { useEffect, useState } from "react";

import useCollectionsStore from "../../../store/use-collections.store";
import useCollectionsIdx from "../../../store/use-collections-idx.store";

const RightSidebar = () => {
  const [resultIdx, setResultIdx] = useState(0);

  const { uniqueId } = useCollectionsIdx((state) => state);
  const { storeCollections } = useCollectionsStore((state) => state);

  const currCollection = storeCollections.find((c) => c.uniqueId === uniqueId);

  return (
    <div className="w-[40%]">
      <div className="flex flex-row space-x-4">
        <div className="text-xl font-bold">
          <div>Status: {currCollection!.responses.status}</div>
          <div></div>
        </div>
        <div className="text-xl font-bold">
          <div>Size: {currCollection!.responses.size}</div>
          <div></div>
        </div>
        <div className="text-xl font-bold">
          <div>Time: {currCollection!.responses.time}</div>
          <div></div>
        </div>
      </div>
      <div className="mt-4 w-full">
        <ul className="flex gap-2">
          <li>
            <a
              href="#"
              onClick={() => setResultIdx(0)}
              className={`px-4 py-2 font-bold ${
                resultIdx === 0
                  ? "border-2 border-b-black border-t-transparent border-l-transparent border-r-transparent"
                  : "text-gray-300"
              }`}
            >
              Response
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-4 w-full">
        <div className={resultIdx === 0 ? "block" : "hidden"}>
          <pre className="w-full whitespace-pre-wrap text-sm">
            {JSON.stringify(currCollection!.responses.output, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
