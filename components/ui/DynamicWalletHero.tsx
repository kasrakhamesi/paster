import { useModal, useSIWE } from "connectkit";
import { ArrowRight } from "iconsax-react";
import Link from "next/link";
import { useAccount } from "wagmi";

const WallectConnectHeroButton = () => {
  const { address, isConnected } = useAccount();
  const { isSignedIn } = useSIWE();
  const { openProfile, openSIWE } = useModal();

  return (
    <>
      {!isConnected ? (
        <button
          onClick={openProfile}
          className="py-3 space-x-2 duration-300 shadow-xl btn bg-CustomGreen text-CustomBlack font-GilroyBold shadow-CustomGreen/20 hover:bg-CustomGreen/90 hover:shadow-lg"
        >
          <p>Connect</p>
          <ArrowRight />
        </button>
      ) : !isSignedIn ? (
        <button
          onClick={() => openSIWE()}
          className="py-3 space-x-2 duration-300 shadow-xl btn bg-CustomGreen text-CustomBlack font-GilroyBold shadow-CustomGreen/20 hover:bg-CustomGreen/90 hover:shadow-lg"
        >
          <p>Sign In</p>
          <ArrowRight />
        </button>
      ) : (
        <Link
          className="py-3 space-x-2 duration-300 shadow-xl btn bg-CustomGreen text-CustomBlack font-GilroyBold shadow-CustomGreen/20 hover:bg-CustomGreen/90 hover:shadow-lg"
          href="/dashboard"
        >
          <p>Dashboard</p>
          <ArrowRight />
        </Link>
      )}
    </>
  );
};

export default WallectConnectHeroButton;
