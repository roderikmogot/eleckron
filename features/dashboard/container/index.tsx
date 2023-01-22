import React, { useState } from "react";

import UIInput from "../../ui/input/input.ui";
import UITabs from "../../ui/tabs/tabs.ui";
import useQueryParamsStore from "../../../store/use-query-params.store";
import DeleteIcon from "../../ui/svgs/delete-icon.ui";

const REQUEST_METHODS = ["GET", "POST", "PUT", "DELETE"];
const CONTAINER_TABS = ["Query", "Auth", "Body"];

const Container = () => {
  const [authIdx, setAuthIdx] = useState(0);
  const [methodIdx, setMethodIdx] = useState(0);
  const queryParams = useQueryParamsStore((state) => state.queryParams);
  const setQueryParams = useQueryParamsStore((state) => state.setQueryParams);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const { name, value } = e.target;
    const list = [...queryParams];
    if (name === "parameter") {
      list[idx]!.parameter = value;
    }
    if (name === "value") {
      list[idx]!.value = value;
    }
    setQueryParams(list);
  };

  const handleAddQueryParams = () => {
    setQueryParams([...queryParams, { parameter: "", value: "" }]);
  };

  const handleDeleteQueryParam = (idx: number) => {
    const newQueryParams = [...queryParams];
    newQueryParams.splice(idx, 1);
    setQueryParams(newQueryParams);
  };

  const handleMethodIdx = (idx: number) => {
    setMethodIdx((_) => idx);
  };

  console.log(queryParams);

  return (
    <div className="w-[45%] rounded-lg">
      <div className="flex flex-row">
        <select className="text-bold rounded-tl-md rounded-bl-md bg-black px-4 py-2 font-bold text-white">
          {REQUEST_METHODS.map((method, idx) => (
            <option key={idx}>{method}</option>
          ))}
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
        <UITabs
          tabs={CONTAINER_TABS}
          methodIdx={methodIdx}
          handleMethodIdx={handleMethodIdx}
        />
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
                <UIInput
                  idx={idx}
                  name="parameter"
                  value={queryParams[idx]!.parameter}
                  placeholder="Parameter"
                  handleOnChange={handleInputChange}
                />
                <UIInput
                  idx={idx}
                  name="value"
                  value={queryParams[idx]!.value}
                  placeholder="Value"
                  handleOnChange={handleInputChange}
                />
                <button
                  className="text-bold rounded-md bg-red-500 p-2 text-white disabled:bg-gray-300 disabled:text-gray-500"
                  disabled={queryParams.length === 1}
                  onClick={() => handleDeleteQueryParam(idx)}
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddQueryParams}
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
  );
};

export default Container;
