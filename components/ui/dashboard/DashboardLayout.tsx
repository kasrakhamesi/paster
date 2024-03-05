import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import BackDrop from "./BackDrop";
import Sidebar from "./Sidebar";
import { useAccount } from "wagmi";
import DarkmodeToggle from "./DarkmodeToggle";
import { useSIWE } from "connectkit";

function DashboardLayout({ children }: { children: ReactNode }) {
  const [toggler, setToggler] = useState<boolean>(false);
  const { address } = useAccount();
  const { isSignedIn } = useSIWE();
  const router = useRouter();
  useEffect(() => {
    if (toggler) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggler]);

  const switchSidebar = () => {
    setToggler(!toggler);
  };

  useEffect(() => {
    if (!address || !isSignedIn) {
      router.push("/");
    }
  }, [address]);

  return (
    <div className="flex flex-col w-full h-full min-h-screen lg:flex-row bg-base-100 font-Gilroy ">
      <header className="sticky top-0 left-0 z-20 shadow-2xl">
        <Navbar switchSidebar={setToggler} condition={toggler} />
      </header>
      <BackDrop condition={toggler} Switch={switchSidebar} />
      <Sidebar condition={toggler} />
      {address && (
        <main
          className={`w-full p-2 lg:p-8 min-h-screen h-full flex   ${
            toggler ? "overflow-y-hidden" : ""
          }`}
        >
          {children}
        </main>
      )}
      <div className="fixed p-1 rounded-full shadow-md border-base-content bottom-8 bg-base-100 right-8">
        <DarkmodeToggle />
      </div>
    </div>
  );
}

export default DashboardLayout;
