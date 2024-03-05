import { useRef, useState } from "react";
import Navbar from "./Navbar";

const Header = () => {
  const toggle = useRef<any>();
  const [isOpen, setOpen] = useState(toggle.current?.checked || false);

  return (
    <>
      <header className="fixed top-0 left-0 z-30 w-full ">
        <Navbar isOpen={isOpen} setOpen={setOpen} />
      </header>
      <input
        ref={toggle}
        id="my-drawer"
        checked={isOpen}
        onChange={(e) => {
          // setOpen(e.target.value === 'on' ? false : true)
        }}
        type="checkbox"
        className="drawer-toggle"
      />
    </>
  );
};

export default Header;
