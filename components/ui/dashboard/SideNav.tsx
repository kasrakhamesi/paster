import {
  Coin1,
  Cup,
  Gallery,
  Home2,
  Lock1,
  ReceiptMinus,
  Strongbox,
} from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/router";

const SideNav = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const currentPage = pathname.split("/")[2];

  return (
    <div className="flex flex-col w-full px-6 my-2">
      <Link href={"/dashboard "}>
        <button
          className={`SidebarBtn ${
            currentPage === undefined ? "activeSidebar" : ""
          }`}
        >
          <Home2 size={22} />
          <p>Dashboard</p>
        </button>
      </Link>
      <Link href={"/dashboard/my-nfts"}>
        <button
          className={`SidebarBtn  ${
            currentPage === "my-nfts" ? "activeSidebar" : ""
          }`}
        >
          <Gallery size={22} />
          <p>My NFTs</p>
        </button>
      </Link>

      <Link href={"/dashboard/transactions"}>
        <button
          className={`SidebarBtn ${
            currentPage === "transactions" ? "activeSidebar" : ""
          }`}
        >
          <ReceiptMinus size={22} />
          <p>Transaction</p>
        </button>
      </Link>
      <Link href={"/dashboard/dao"}>
        <button
          className={`SidebarBtn  ${
            currentPage === "dao" ? "activeSidebar" : ""
          }`}
        >
          <Strongbox size={22} />
          <p>DAO</p>
        </button>
      </Link>
      <Link href={"/dashboard/stake"}>
        <button
          className={`SidebarBtn  ${
            currentPage === "stake" ? "activeSidebar" : ""
          }`}
        >
          <Lock1 size={22} />
          <p>Staking</p>
        </button>
      </Link>
      <Link href={"/dashboard/rewards"}>
        <button
          className={`SidebarBtn  ${
            currentPage === "rewards" ? "activeSidebar" : ""
          }`}
        >
          <Cup size={22} />
          <p>Rewards</p>
        </button>
      </Link>
      <Link href={"/dashboard/swap"}>
        <button
          className={`SidebarBtn  ${
            currentPage === "swap" ? "activeSidebar" : ""
          }`}
        >
          <Coin1 size={22} />
          <p>Swap</p>
        </button>
      </Link>
      <Link href={"/dashboard/withdrawals"}>
        <button
          className={`SidebarBtn  ${
            currentPage === "withdrawals" ? "activeSidebar" : ""
          }`}
        >
          <Coin1 size={22} />
          <p>Withdrawals</p>
        </button>
      </Link>
      <Link href={"/dashboard/uniswap"}>
        <button
          className={`SidebarBtn  ${
            currentPage === "uniswap" ? "activeSidebar" : ""
          }`}
        >
          <Coin1 size={22} />
          <p>Uniswap</p>
        </button>
      </Link>
    </div>
  );
};

export default SideNav;
