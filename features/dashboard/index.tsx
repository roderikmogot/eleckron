import { type NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import LeftSidebar from "./left-sidebar";
import Container from "./container";
import RightSidebar from "./right-sidebar";
import useUserStore from "../../store/use-user.store";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const email = useUserStore((state) => state.email);

  useEffect(() => {
    if (!email) {
      router.push("/");
      return;
    }
  }, []);

  return (
    <div className="m-auto w-full p-4">
      <div className="flex flex-row gap-4">
        <LeftSidebar />
        <Container />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Dashboard;
