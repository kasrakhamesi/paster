import { useEvmTokenPrice } from "@moralisweb3/next";
import { useContractRead } from "wagmi";
import { LoaderIcon } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { mainnet } from "wagmi/chains";
import { globals } from "@/config/globals";
import CollectionABI from "@/contracts/collectionABI.json";

const StakingBanner = () => {
  const [floorPrice, setFloorPrice] = useState(0.2509);
  const [marketcap, setMarketcap] = useState<any>(null);
  const { data: supply, isLoading } = useContractRead({
    address: globals.contracts.collectionAddress,
    abi: CollectionABI,
    functionName: "totalSupply",
  });

  const { data: tvl, isLoading: loadingTVL } = useContractRead({
    address: globals.contracts.collectionAddress,
    abi: CollectionABI,
    functionName: "balanceOf",
    args: [globals.contracts.stakingAddress],
  });

  async function loadStats() {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${globals.env.openseaURI}stats?format=json`,
        headers: {
          "X-API-KEY": globals.env.openseaAPIKey,
        },
      };

      const response = await axios.request(config);
      setFloorPrice(response.data.stats.floor_price);
    } catch (error) {
      setFloorPrice(0.2509);
      console.log(error);
    }
  }
  useEffect(() => {
    loadStats();
  }, []);

  const { data, isFetching } = useEvmTokenPrice({
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    chain: mainnet.id,
  });

  useEffect(() => {
    setMarketcap((data?.usdPrice || 0) * (Number(supply) || 0) * floorPrice);
  }, [isFetching]);

  // console.log("ether:", data?.usdPrice, "supply:", Number(supply), "floor:", floorPrice, "marketcap", marketcap)
  return (
    <div className="flex items-center w-full px-2 divide-x-2 justify-evenly lg:px-8 h-28 divide-base-100 bg-base-300 rounded-3xl">
      <div className="flex flex-col items-center justify-center w-1/3 px-2 py-4 space-y-2">
        <h3 className="flex md:hidden">Supply</h3>
        <h3 className="hidden md:flex">Total Supply</h3>
        {supply ? (
          <h4 className="text-xl font-bold text-asterfiDarkGreen">
            {Number(supply)}
          </h4>
        ) : (
          <LoaderIcon />
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-1/3 px-2 py-4 space-y-2">
        <h3 className="hidden lg:flex">Total Locked Supply (TLS)</h3>
        <h3 className="flex lg:hidden">TLS</h3>
        {loadingTVL ? (
          <LoaderIcon />
        ) : (
          <h4 className="text-xl font-bold text-asterfiBlue">{Number(tvl)}</h4>
        )}
      </div>
      <div className="flex flex-col items-center justify-center w-1/3 px-2 py-4 space-y-2">
        <h3 className="">Market Cap</h3>
        {marketcap ? (
          <h4 className="flex items-center justify-center text-xl font-bold text-[#D386B3]">
            <span className="mr-1 text-lg font-normal text-[#f1a9d3]">$</span>
            <span className="flex md:hidden">
              {
                (marketcap / 1000)
                  .toFixed(0)
                  .toLocaleString()
                  .toString()
                  .split(".")[0]
              }
              k
            </span>
            <span className="hidden md:flex">
              {marketcap.toLocaleString().toString().split(".")[0]}
            </span>
            <span className="hidden text-sm font-normal text-[#a75f89] md:flex">
              .{marketcap.toFixed(2).toString().split(".")[1]}
            </span>
          </h4>
        ) : (
          <LoaderIcon />
        )}
      </div>
    </div>
  );
};

export default StakingBanner;
