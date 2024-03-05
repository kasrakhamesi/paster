import { globals } from "@/config/globals";
import { EvmNft } from "@moralisweb3/common-evm-utils";
import { Clock, Lock1 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import StakingModal from "./StakingModal";
import { useState, useEffect } from "react";
import axios from "axios";
type Props = {
  nft: EvmNft;
  setSelectedNFT: any;
  selectedNFT: any;
  isStaked: boolean | undefined;
  refetch: any;
};

const NFTItem = ({
  nft,
  setSelectedNFT,
  selectedNFT,
  isStaked,
  refetch,
}: Props) => {
  const [nftImage, setNftImage] = useState<any | null>(null);
  async function getNftImage() {
    try {
      const { data } = await axios.get(
        `${globals.env.asterfiApiUrl}tokens/${nft.tokenId.toString()}`
      );
      const image = !String(nft?.media?.originalMediaUrl).includes(".png")
        ? "/images/unrevealed.webp"
        : data?.data[0]?.imageUrl ||
          nft?.media?.originalMediaUrl ||
          nft?.media?.mediaCollection?.low;

      setNftImage(image);
    } catch (err) {
      if (nftImage === null) {
        const image = !String(nft?.media?.originalMediaUrl).includes(".png")
          ? "/images/unrevealed.webp"
          : nft?.media?.originalMediaUrl || nft.media?.mediaCollection?.low.url;

        setNftImage(image);
      }
    }
  }

  useEffect(() => {
    if (nftImage === null) getNftImage();
  }, [nftImage]);

  return (
    <div className="flex flex-col items-center px-6 py-4 space-x-0 space-y-4 overflow-hidden md:flex-row md:space-x-4 md:space-y-0 text-base-content bg-base-300 rounded-xl min-w-fit flex-nowrap">
      <Link
        href={`/nfts/${nft.tokenId}`}
        className="flex items-center justify-center w-40 h-full"
      >
        <img
          src={nftImage || "/images/unrevealed.webp"}
          className="object-cover mask mask-squircle"
        />
      </Link>
      <div className="flex flex-col flex-1 w-full space-y-2">
        {/* Title */}
        <div className="flex items-center justify-start font-bold md:justify-between">
          <p>{nft.name}</p>
          <p>#{nft.tokenId}</p>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center pl-[3px] space-x-2 flex-nowrap">
            <Clock size={20} color="#54597C" />
            <p className="whitespace-nowrap">12 Months</p>
          </div>
          <div className="flex items-center space-x-2 flex-nowrap">
            <div className="flex justify-center w-6">
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.83398 8.58331V15.25C1.83398 15.692 2.00958 16.1159 2.32214 16.4285C2.6347 16.7411 3.05862 16.9166 3.50065 16.9166H13.5007C13.9427 16.9166 14.3666 16.7411 14.6792 16.4285C14.9917 16.1159 15.1673 15.692 15.1673 15.25V8.58331"
                  stroke="#54597C"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 3.99998C8.5 3.22643 8.19271 2.48457 7.64573 1.93758C7.09875 1.3906 6.35688 1.08331 5.58333 1.08331C5.0308 1.08331 4.50089 1.30281 4.11019 1.69351C3.71949 2.08421 3.5 2.61411 3.5 3.16665C3.5 3.71918 3.71949 4.24908 4.11019 4.63979C4.50089 5.03049 5.0308 5.24998 5.58333 5.24998H8.5M8.5 3.99998V5.24998M8.5 3.99998C8.5 3.22643 8.80729 2.48457 9.35427 1.93758C9.90125 1.3906 10.6431 1.08331 11.4167 1.08331C11.9692 1.08331 12.4991 1.30281 12.8898 1.69351C13.2805 2.08421 13.5 2.61411 13.5 3.16665C13.5 3.44023 13.4461 3.71114 13.3414 3.9639C13.2367 4.21666 13.0833 4.44633 12.8898 4.63979C12.6964 4.83324 12.4667 4.9867 12.2139 5.0914C11.9612 5.19609 11.6903 5.24998 11.4167 5.24998H8.5"
                  stroke="#54597C"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 8.58333V16.9167M1 5.25H16V8.58333H1V5.25Z"
                  stroke="#54597C"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p>Surprize</p>
          </div>
          <Link
            target="_blank"
            href={`https://opensea.io/assets/ethereum/${globals.contracts.collectionAddress}/${nft.tokenId}`}
            className="flex space-x-2 flex-nowrap"
          >
            <Image
              src="/images/dashboard/opensea.png"
              alt="Opensea"
              width={24}
              height={24}
            />
            <p>Opensea</p>
          </Link>
        </div>
        <label
          onClick={() => {
            setSelectedNFT({ nft });
          }}
          htmlFor={"my-modal-" + nft.tokenId.toString()}
          className="flex space-x-2 whitespace-nowrap flex-nowrap text-base-200 btn bg-accent hover:bg-accent-focus"
        >
          <Lock1 size={16} />
          <span>{isStaked ? "UNSTAKE" : "STAKE"}</span>
        </label>
        <input
          type="checkbox"
          id={"my-modal-" + nft.tokenId.toString()}
          className="modal-toggle"
        />
        <StakingModal
          refetch={refetch}
          id={nft.tokenId.toString()}
          isStaked={isStaked}
          data={selectedNFT}
          image={nftImage}
        />
      </div>
    </div>
  );
};

export default NFTItem;
