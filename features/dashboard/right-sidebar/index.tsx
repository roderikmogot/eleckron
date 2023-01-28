import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import useCollectionsStore from "../../../store/use-collections.store";
import useCollectionsIdx from "../../../store/use-collections-idx.store";

const RightSidebar = () => {
  const [resultIdx, setResultIdx] = useState(0);

  const { uniqueId } = useCollectionsIdx((state) => state);
  const { storeCollections } = useCollectionsStore((state) => state);

  const currCollection = storeCollections.find((c) => c.uniqueId === uniqueId);
  const currStatus = +currCollection!.responses.status.split("-")[0]!;

  return (
    <div className="w-[40%]">
      <div className="flex flex-row space-x-4">
        <div className="flex flex-row items-center gap-1 text-xl font-bold">
          <div className="text-[1rem]">
            Status:
            <span
              className={`ml-1 inline-block ${
                currStatus >= 400 ? "text-red-600" : "text-green-600"
              }`}
            >
              {currCollection!.responses.status}
            </span>
          </div>
        </div>
        <div className="text-xl font-bold">
          <div className="text-[1rem]">
            Size:
            <span className="ml-1 inline-block font-thin">
              {currCollection!.responses.size}
            </span>
          </div>
        </div>
        <div className="text-xl font-bold">
          <div className="text-[1rem]">
            Time:
            <span className="ml-1 inline-block font-thin">
              {currCollection!.responses.time}
            </span>
          </div>
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
      <div className="mt-4 h-full w-full">
        <div className={resultIdx === 0 ? "block" : "hidden"}>
          <pre className="w-full whitespace-pre-wrap text-sm">
            <Editor
              className="min-h-[80vh] w-full whitespace-pre-wrap"
              theme="vs-dark"
              language="json"
              value={JSON.stringify(currCollection!.responses.output, null, 2)}
              wrapperProps={{
                className: "w-full",
              }}
              options={{
                readOnly: true,
                minimap: {
                  enabled: false,
                },
              }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
