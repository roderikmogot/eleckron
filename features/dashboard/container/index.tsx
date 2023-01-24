import axios from "axios";
import React, { useState } from "react";

import { api } from "../../../src/utils/api";
import DeleteIcon from "../../ui/svgs/delete-icon.ui";
import UIInput from "../../ui/input/input.ui";
import UITabs from "../../ui/tabs/tabs.ui";
import useCollectionsStore from "../../../store/use-collections.store";
import useCollectionsIdx from "../../../store/use-collections-idx.store";
import { timeDiffHelper } from "../../../src/utils/axios";
import { countBytesHelper } from "../../../src/utils/helper";

const REQUEST_METHODS = ["GET", "POST", "PUT", "DELETE"];
const CONTAINER_TABS = ["Query", "Auth", "Body"];

const Container = () => {
  const [authIdx, setAuthIdx] = useState(0);
  const [methodIdx, setMethodIdx] = useState(0);

  const { uniqueId } = useCollectionsIdx((state) => state);
  const { storeCollections, setStoreCollections } = useCollectionsStore(
    (state) => state
  );

  const putCollection = api.collections.put.useMutation();
  const currCollection = storeCollections.find((c) => c.uniqueId === uniqueId);

  const handleUpdateGlobalCollection = () => {
    const newStoreCollections = storeCollections.map((c) => {
      if (c.uniqueId === uniqueId) {
        return currCollection;
      }
      return c;
    });

    //@ts-ignore
    setStoreCollections(newStoreCollections);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const { name, value } = e.target;

    const newQueryParams = [...currCollection!.queryParams];

    if (name === "parameter") {
      newQueryParams[idx]!.parameter = value;
    }
    if (name === "value") {
      newQueryParams[idx]!.value = value;
    }

    currCollection!.queryParams = newQueryParams;

    handleUpdateGlobalCollection();
  };

  const handleAddQueryParams = () => {
    const newQueryParams = [...currCollection!.queryParams];

    newQueryParams.push({
      parameter: "",
      value: "",
    });

    currCollection!.queryParams = newQueryParams;

    handleUpdateGlobalCollection();
  };

  const handleDeleteQueryParam = (idx: number) => {
    const newQueryParams = [...currCollection!.queryParams];

    newQueryParams.splice(idx, 1);

    currCollection!.queryParams = newQueryParams;

    handleUpdateGlobalCollection();
  };

  const handleMethodIdx = (idx: number) => {
    setMethodIdx(idx);
  };

  const handleRequestMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    currCollection!.method = value;

    handleUpdateGlobalCollection();
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    currCollection!.url = value;

    handleUpdateGlobalCollection();
  };

  const handleAuthBasicUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "username" | "password"
  ) => {
    const { value } = e.target;
    if (target === "username") {
      currCollection!.authBasic.username = value;
    }
    if (target === "password") {
      currCollection!.authBasic.password = value;
    }

    handleUpdateGlobalCollection();
  };

  const handleAuthBearerChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    currCollection!.authBearer!.token = value;

    handleUpdateGlobalCollection();
  };

  const handleSendRequest = async () => {
    const queryParamsObj = currCollection!.queryParams.reduce(
      (acc, curr) => ({ ...acc, [curr.parameter]: curr.value }),
      {}
    );

    const startTime = Date.now();

    const baseConfig = {
      url: currCollection!.url,
      method: currCollection!.method,
      params: queryParamsObj,
    }

    let config = {}

    if(authIdx === 0){
      config = {
        ...baseConfig,
        auth: {
          username: currCollection!.authBasic.username,
          password: currCollection!.authBasic.password,
        },
      }
    }

    if(authIdx === 1) {
      config = {
        ...baseConfig,
        headers: {
          Authorization: `Bearer ${currCollection!.authBearer?.token}`,
        },
      }
    }

    await axios(config)
      .then((res) => {
        currCollection!.responses.time = timeDiffHelper(startTime);
        currCollection!.responses.output = res.data;
        currCollection!.responses.status = res.status.toString();
        currCollection!.responses.size = countBytesHelper(res.data);
      })
      .catch((err) => console.log(err));

    handleUpdateGlobalCollection();

    putCollection.mutate({
      uniqueId: currCollection!.uniqueId,
      name: currCollection!.name,
      url: currCollection!.url,
      method: currCollection!.method,
      queryParams: currCollection!.queryParams,
      authBasic: currCollection!.authBasic,
      authBearer: currCollection!.authBearer,
      body: currCollection!.body,
    });
  };

  return (
    <div className="w-[45%] rounded-lg">
      <div className="flex flex-row">
        <select
          className="text-bold rounded-tl-md rounded-bl-md bg-black px-4 py-2 font-bold text-white"
          onChange={handleRequestMethod}
        >
          {REQUEST_METHODS.map((method, idx) => (
            <option key={idx} value={method}>
              {method}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={currCollection!.url}
          className="rounded-tb-md w-full rounded-tr-md rounded-br-md border border-gray-300 p-2"
          onChange={handleURLChange}
        />
      </div>
      <button
        className="mt-2 w-full bg-blue-700 px-4 py-2 font-bold text-white"
        onClick={handleSendRequest}
      >
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
            {currCollection!.queryParams.map((params, idx) => (
              <div
                className={`${idx !== 0 ? "mt-2" : ""} flex flex-row gap-2`}
                key={idx}
              >
                <UIInput
                  idx={idx}
                  name="parameter"
                  value={params.parameter}
                  placeholder="Parameter"
                  handleOnChange={handleInputChange}
                />
                <UIInput
                  idx={idx}
                  name="value"
                  value={params.value}
                  placeholder="Value"
                  handleOnChange={handleInputChange}
                />
                <button
                  className="text-bold rounded-md bg-red-500 p-2 text-white disabled:bg-gray-300 disabled:text-gray-500"
                  disabled={currCollection!.queryParams.length === 1}
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
            <UITabs
              tabs={["Basic", "Bearer"]}
              methodIdx={authIdx}
              handleMethodIdx={setAuthIdx}
            />
          </div>
          <div className="mt-4">
            <div className={authIdx === 0 ? "block" : "hidden"}>
              <div className="text-xl font-bold">Basic</div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Username"
                  value={currCollection!.authBasic.username}
                  onChange={(e) => handleAuthBasicUsernameChange(e, "username")}
                />
                <input
                  type="password"
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Password"
                  value={currCollection!.authBasic.password}
                  onChange={(e) => handleAuthBasicUsernameChange(e, "password")}
                />
              </div>
            </div>
            <div className={authIdx === 1 ? "block" : "hidden"}>
              <div className="text-xl font-bold">Bearer Token</div>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="Token"
                value={currCollection!.authBearer.token}
                onChange={handleAuthBearerChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
