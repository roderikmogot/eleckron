import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import useUserStore from "../../store/user";
import { api } from "../utils/api";

const Home: NextPage = () => {
  const router = useRouter();
  const setEmail = useUserStore((state) => state.setEmail);
  const postUser = api.user.post.useMutation();

  const [emailInput, setEmailInput] = useState("");

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput((_) => e.target.value);
  };

  const handleUser = () => {
    if (emailInput.length === 0) return;
    postUser.mutate({ email: emailInput });
    setEmail(emailInput);
    router.push("/dashboard");
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
          onClick={handleUser}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Home;
