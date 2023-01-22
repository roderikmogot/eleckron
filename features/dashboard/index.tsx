import { type NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import useUserStore from "../../store/user";
import rndJson from "../../src/utils/random.json";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const email = useUserStore((state) => state.email);

  const [collections, setCollections] = useState([
    { name: "Test1", id: 0 },
    { name: "Test2", id: 1 },
    { name: "Test3", id: 2 },
  ]);
  const [collectionsIdx, setCollectionsIdx] = useState(0);
  const [methodIdx, setMethodIdx] = useState(0);
  const [authIdx, setAuthIdx] = useState(0);
  const [resultIdx, setResultIdx] = useState(0);
  const [queryParams, setQueryParams] = useState([
    { paramater: "", value: "" },
  ]);

  const handleCollectionTab = (id: number) => {
    setCollectionsIdx((_) => id);
  };

  // useEffect(() => {
  //   if (!email) {
  //     router.push("/");
  //     return;
  //   }
  // }, []);

  return (
    <div className="m-auto w-full p-4">
      <div className="flex flex-row gap-4">
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
        <div className="w-[45%] rounded-lg">
          <div className="flex flex-row">
            <select className="text-bold rounded-tl-md rounded-bl-md bg-black px-4 py-2 font-bold text-white">
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
            <input
              type="text"
              className="rounded-tb-md w-full rounded-tr-md rounded-br-md border border-gray-300 p-2"
            />
          </div>
          <button className="mt-2 w-full bg-blue-700 px-4 py-2 font-bold text-white">
            Send
          </button>
          <div className="mt-4 w-full">
            <ul className="flex gap-2">
              <li>
                <a
                  href="#"
                  onClick={() => setMethodIdx(0)}
                  className={`px-4 py-2 font-bold ${
                    methodIdx === 0
                      ? "border-2 border-b-black border-t-transparent border-l-transparent border-r-transparent"
                      : "text-gray-300"
                  }`}
                >
                  Query
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setMethodIdx(1)}
                  className={`px-4 py-2 font-bold ${
                    methodIdx === 1
                      ? "border-2 border-b-black border-t-transparent border-l-transparent border-r-transparent"
                      : "text-gray-300"
                  }`}
                >
                  Auth
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-4 w-full">
            <div className={methodIdx === 0 ? "block" : "hidden"}>
              <div className="text-2xl font-bold">Query Parameters</div>
              <div className="mt-1">
                {queryParams.map((_, idx) => (
                  <div
                    className={`${idx !== 0 ? "mt-2" : ""} flex flex-row gap-2`}
                    key={idx}
                  >
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="Parameter"
                    />
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="Value"
                    />
                    <button
                      className="text-bold rounded-md bg-red-500 p-2 text-white disabled:bg-gray-300 disabled:text-gray-500"
                      disabled={queryParams.length === 1}
                      onClick={() => {
                        const newParams = [...queryParams];
                        newParams.splice(idx, 1);
                        setQueryParams(newParams);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setQueryParams((prevQueryParams) => [
                      ...prevQueryParams,
                      { paramater: "", value: "" },
                    ])
                  }
                  className="mt-2 w-full bg-green-700 px-4 py-2 font-bold text-white"
                >
                  Add
                </button>
              </div>
            </div>
            <div className={methodIdx === 1 ? "block" : "hidden"}>
              <div className="text-2xl font-bold">Auth</div>
              <div className="mt-4 w-full">
                <ul className="flex gap-2">
                  <li>
                    <a
                      href="#"
                      onClick={() => setAuthIdx(0)}
                      className={`px-4 py-2 font-bold ${
                        authIdx === 0
                          ? "border-2 border-b-black border-t-transparent border-l-transparent border-r-transparent"
                          : "text-gray-300"
                      }`}
                    >
                      Basic
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => setAuthIdx(1)}
                      className={`px-4 py-2 font-bold ${
                        authIdx === 1
                          ? "border-2 border-b-black border-t-transparent border-l-transparent border-r-transparent"
                          : "text-gray-300"
                      }`}
                    >
                      Bearer
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-4">
                <div className={authIdx === 0 ? "block" : "hidden"}>
                  <div className="text-xl font-bold">Basic</div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="Username"
                    />
                    <input
                      type="password"
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className={authIdx === 1 ? "block" : "hidden"}>
                  <div className="text-xl font-bold">Bearer Token</div>
                  <textarea
                    className="w-full rounded-md border border-gray-300 p-2"
                    placeholder="Token"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%]">
          <div className="flex flex-row space-x-4">
            <div className="text-xl font-bold">
              <div>Status: </div>
              <div></div>
            </div>
            <div className="text-xl font-bold">
              <div>Size: </div>
              <div></div>
            </div>
            <div className="text-xl font-bold">
              <div>Time: </div>
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
                    methodIdx === 0
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
              <pre>{JSON.stringify(rndJson, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
