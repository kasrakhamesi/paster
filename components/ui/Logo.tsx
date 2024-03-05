import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="flex items-center text-2xl leading-6 tracking-wide font-Tactic ">
        ASTER{<span className="text-accent">FI</span>}
      </h1>
    </Link>
  );
};

export default Logo;
