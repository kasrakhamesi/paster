import React, { ReactNode, useEffect, useRef } from "react";

type Props = {
  Switch: () => void,
  condition: boolean
}

function BackDrop(props: Props) {


  return (
    <div
      onClick={(e) => {
        props.Switch
        e.preventDefault()
        e.stopPropagation()

      }}
      className={`pointer-events-none ${props.condition
        ? "w-full min-h-screen lg:hidden bg-base-300/80 fixed top-0 left-0 z-[10] "
        : "hidden"
        }`}
    ></div>
  );
}

export default BackDrop;
