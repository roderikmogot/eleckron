import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const postUser = api.user.post.useMutation();

  const [email, setEmail] = useState("");

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((_) => e.target.value);
  };

  const handleCreateUser = () => {
    if (email.length === 0) return;
    postUser.mutate({ email });
  };

  return (
    <div className="m-auto flex h-screen w-full max-w-7xl items-center justify-center">
      <div className="flex flex-col">
        <input
          className="mb-2 w-full rounded-md border border-gray-300 p-2"
          placeholder="Email"
          onChange={handleSetEmail}
        />
        <button
          className="text-bold rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={handleCreateUser}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Home;
