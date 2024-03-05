import Link from "next/link";
import Logo from "./Logo";
import ThemeChange from "./ThemeChange";
import DarkmodeToggle from "./dashboard/DarkmodeToggle";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full mt-8">
      <div className="w-full max-w-[1240px] px-10 grid pb-8 border-b border-y-white/[0.3] grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 place-items-start mx-auto">
        <div className="text-5xl font-GilroyBold">
          <Logo />
        </div>
        <ul>
          <li>
            <h2 className="mb-5 text-lg font-bold ">SOCIAL</h2>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://twitter.com/asterfinft"
              className="font-light underline "
            >
              Twitter
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <h2 className="mb-5 text-lg font-bold uppercase ">Useful Links</h2>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://asterfi.com/"
              className="font-light underline "
            >
              Main Website
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <h2 className="mb-5 text-lg font-bold ">RESOURCES</h2>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://docs.asterfi.com/"
              className="font-light underline "
            >
              Documentation
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <h2 className="mb-5 text-lg font-bold uppercase ">CONTACT US</h2>
          </li>
          <li>
            <a
              href="mailto:collaboration@asterfi.com"
              className="font-light underline "
            >
              Email
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full pb-5 space-x-5 justify-center flex items-center  max-w-[1240px] px-10 mt-5">
        <span className="">
          <DarkmodeToggle size={20} />
        </span>
        <p className="text-lg text-center font-GilroyRegular">
          © 2023 AsterFi, All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
