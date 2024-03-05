import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import LiveStats from "@/components/ui/LiveStats";
import ProjectInfo from "@/components/ui/ProjectInfo";
import { globals } from "@/config/globals";
import { useEvmNFTContractTransfers } from "@moralisweb3/next";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Control from "@/components/ui/Control";
import SupportToken from "@/components/ui/SupportToken";
import NFTList from "@/components/ui/NFTList";
import Footer from "@/components/ui/Footer";
import LatestTransactions from "@/components/ui/LatestTransactions";
import SideDrawer from "@/components/ui/SideDrawer";

export default function Home() {
  const [stats, setStats] = useState<any>({});
  const [errorStats, setErrorStats] = useState<boolean>(false);
  const [loadingstats, setLoadingStats] = useState(true);

  const {
    isFetching: loadingTransactions,
    error,
    total,
  } = useEvmNFTContractTransfers({
    address: globals.contracts.collectionAddress,
    limit: 1,
  });

  async function loadStats() {
    try {
      const response = await axios.get("/api/stats");
      setStats(response.data.data.stats);
    } catch (error) {
      console.log(error);
      setErrorStats(true);
    } finally {
      setLoadingStats(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, [loadingTransactions]);

  return (
    <div className="w-screen overflow-x-hidden drawer">
      <Header />
      <div className="w-screen px-4 mx-auto overflow-hidden lg:px-8 drawer-content">
        <main className="max-w-[1240px] mx-auto scroll-smooth">
          <Hero />
          <ProjectInfo />
          <LiveStats
            totalTransactions={stats.total_transactions}
            loadingTransactions={loadingstats || error}
            loadingMintedNFTs={loadingstats || error}
            totalMintedNFTs={stats.total_supply}
          />
          <LatestTransactions />
          <Control />
          <SupportToken />
          <NFTList />
        </main>
        <Footer />
      </div>
      <SideDrawer />
    </div>
  );
}
