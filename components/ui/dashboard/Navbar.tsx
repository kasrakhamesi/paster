import React from "react";
import Logo from "../Logo";

type Props = {
  switchSidebar: (t: boolean) => void,
  condition: boolean
}

function Navbar({ switchSidebar, condition }: Props) {
  return (
    <div className="flex items-center justify-between w-full px-8 py-3 border-b-2 lg:hidden bg-base-300/40 border-base-100">
      <Logo />
      <div
        onClick={() => switchSidebar(!condition)}
        className={` p-4 hamburger hamburger--collapse  ${condition ? "is-active" : ""
          }`}
      >
        <div className="hamburger-box">
          <div className="hamburger-inner bg-accent before:bg-accent after:bg-accent"></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
