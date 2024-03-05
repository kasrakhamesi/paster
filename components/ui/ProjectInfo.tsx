import { informationData } from "@/constants/projectInfo";
import { Calculator } from "iconsax-react";
import React, { useState } from "react";
import { globals } from "@/config/globals";
import { useContractRead } from "wagmi";
import { formatUnits } from "viem";
import axios from "axios";
import { LoaderIcon } from "react-hot-toast";

function ProjectInfo() {
  const [tokenId, setTokenId] = useState<string | undefined>(undefined);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [loadingMetaData, setLoadingMetaData] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [price, setPrice] = useState<number>(1);
  const [symbol, setSymbol] = useState<string>("");

  const { isLoading: loadingBackupToken, refetch } = useContractRead({
    address: globals.contracts.collectionAddress,
    abi: [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "nftInfos",
        "outputs": [
          {
            "internalType": "bool",
            "name": "revealed",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "tokenDecimal",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "backupLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "backupAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "tokenBackup",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: 'nftInfos',
    args: [tokenId?.toString()],
    enabled: false,
    onSuccess(data) {
      setIsRevealed((data as any)?.[0])
      if ((data as any)?.[0]) {
        setLoadingMetaData(true)
        fetchTokenPrice((data as any)?.[4]);
        setAmount(Number(formatUnits((data as any)?.[3] as bigint || 0n, (data as any)?.[1] as number || 0)))
      }
    },
  })


  async function fetchTokenPrice(address: string) {
    try {
      const response = await axios.get(`/api/token-price?address=${address}`)
      setPrice(response.data.data.usdPrice)
      setSymbol(response.data.data.tokenSymbol)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingMetaData(false)
    }
  }


  return (
    <div className='w-full h-full pt-0 my-20' id='benefits'>
      <h1 className='my-2 text-2xl lg:text-4xl font-GilroyBlack'>
        Exert complete authority and mastery over your Asterfi and its current and future state.
      </h1>
      <div className='grid w-full gap-5 my-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {informationData.map((item, index) => {
          return (
            <div
              key={index}
              className="relative z-10 w-full overflow-hidden h-44 rounded-2xl"
            >
              <div className="w-full h-full rounded-2xl z-[1] p-6   absolute top-0 left-0">
                <div className="flex items-center justify-center w-10 h-10 mb-2 bg-accent rounded-2xl text-accent-content">
                  {item.icon}
                </div>
                <h3 className="text-xl">
                  <b>{item.title}</b>
                </h3>
                <p className="text-[14px]">{item.content}</p>
              </div>
              <div
                className={`w-[50%] h-[100%]  bg-accent/60 backdrop-blur-md blur-2xl z-0 absolute ${item.position}-4 top-10`}
              ></div>
            </div>
          );
        })}
        <div className="relative z-10 w-full overflow-hidden h-44 rounded-2xl">
          <div className="w-full h-full rounded-2xl z-[1] p-6   absolute top-0 left-0">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 mb-2 bg-accent rounded-2xl text-accent-content">
                <Calculator size={25} />
              </div>
              {!tokenId && (
                <h3 className="pb-2 text-sm font-bold">Token Investment</h3>
              )}
              {tokenId && !isRevealed && (
                <h3 className="pb-2 text-sm font-bold">Not Revealed Yet</h3>
              )}
              {isRevealed && tokenId && (
                <div
                  className="tooltip tooltip-accent"
                  data-tip={
                    price && amount
                      ? `(${(price * amount).toFixed(2)}$)`
                      : "0.00$"
                  }
                >
                  <div className="flex items-center">
                    <h2 className="flex text-xl text-accent font-GilroyBlack ">
                      {amount > 0 ? `${amount.toFixed(4)}` : amount}
                    </h2>
                    <span className="font-sans text-xs font-normal text-accent-focus">
                      {symbol}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col ">
              <input
                type="number"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                maxLength={4}
                min={1}
                max={2000}
                minLength={1}
                placeholder="NFT ID"
                className="w-full max-w-xs text-lg border-none outline-none active:border-none active:outline-none input input-bordered input-md"
              />
              <button
                disabled={loadingBackupToken || loadingMetaData}
                onClick={() => {
                  setSymbol("");
                  setAmount(0);
                  refetch();
                }}
                className="mt-1 border-none hover:bg-base-100 hover:text-base-content/20 btn-sm btn bg-base-100"
              >
                {loadingBackupToken || (loadingMetaData && <LoaderIcon />)}{" "}
                Check
              </button>
            </div>
          </div>
          <div
            className={`w-[50%] h-[100%]  bg-accent/60 backdrop-blur-md blur-2xl z-0 absolute top-10`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProjectInfo;
