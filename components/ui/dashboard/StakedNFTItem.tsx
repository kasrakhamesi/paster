import { Clock, Unlock } from "iconsax-react";
import { useAccount, useContractRead } from "wagmi";
import moment from "moment";
import { useState, useEffect } from "react";
import { globals } from "@/config/globals";
import StakingABI from "@/contracts/stakingABI.json";
import { useEvmNFTMetadata } from "@moralisweb3/next";
import Countdown from "./Countdown";
import StakingModal from "./StakingModal";
import axios from "axios";

type Props = {
  id: number;
  setSelectedNFT: any;
  selectedNFT: any;
  refetch: any;
};

const StakedNFTItem = ({ id, setSelectedNFT, selectedNFT, refetch }: Props) => {
  const [enabled, setEnabled] = useState(false);
  const [nftImage, setNftImage] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  // Load staking data
  const { data: stakeData, isLoading } = useContractRead({
    address: globals.contracts.stakingAddress,
    abi: StakingABI,
    functionName: "getStakeInfo",
    args: [address, id],
  });

  const {
    data: metadata,
    isFetching,
    error,
  } = useEvmNFTMetadata({
    address: globals.contracts.collectionAddress,
    tokenId: id.toString(),
    normalizeMetadata: true,
    mediaItems: true,
  });

  async function getNftImage() {
    const meta: any = metadata?.metadata;

    try {
      const { data } = await axios.get(
        `${globals.env.asterfiApiUrl}tokens/${id.toString()}`
      );
      const image = !String(metadata?.media?.originalMediaUrl).includes(".png")
        ? "/images/unrevealed.webp"
        : data?.data[0]?.imageUrl ||
          metadata?.media?.originalMediaUrl ||
          meta?.image;

      setNftImage(image);
    } catch (err) {
      console.log(err);
      if (nftImage === null) {
        const image = !String(metadata?.media?.originalMediaUrl).includes(
          ".png"
        )
          ? "/images/unrevealed.webp"
          : metadata?.media?.originalMediaUrl ||
            metadata?.media?.mediaCollection?.low.url ||
            meta?.image;

        setNftImage(image);
      }
    }
  }

  interface IStakeData {
    stakedAt: BigInt;
    unstakeAvailableAt: BigInt;
  }

  const stakedInfo = stakeData as unknown as IStakeData;

  const unstakeAtUnix = Number(stakedInfo?.unstakeAvailableAt);
  const now = moment().unix();
  const diff = unstakeAtUnix - now;

  useEffect(() => {
    if (nftImage === null) getNftImage();
  }, [nftImage]);

  return (
    <div className="bg-[#1D202D] rounded-xl items-center min-w-md flex-nowrap overflow-hidden py-4 px-6 flex space-x-4">
      <div className="flex items-center justify-center w-32 h-full max-w-fit">
        <img
          src={nftImage || "/images/unrevealed.webp"}
          className="object-cover mask mask-squircle"
        />
      </div>
      <div className="flex flex-col flex-1 space-y-2">
        {/* Title */}
        <div className="flex items-center justify-between">
          <p>AsterFi</p>
          <p>#{id}</p>
        </div>
        <div className="flex items-center space-x-2 text-white flex-nowrap">
          <Clock color="#54597C" />
          <p>12 Months</p>
        </div>
        <div className="flex items-center space-x-2 text-white flex-nowrap">
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
        <label
          htmlFor={"my-modal-" + id.toString()}
          className={`space-x-2  ${
            enabled
              ? "btn text-black bg-CustomGreen hover:bg-asterfiDarkGreen"
              : "flex justify-center w- items-center py-2 text-CustomGreen border-1 border border-CustomGreen rounded-xl"
          }`}
        >
          {enabled ? (
            <>
              <Unlock size={16} />
              <span>UNSTAKE</span>
            </>
          ) : (
            <Countdown setEnabled={setEnabled} futureTime={unstakeAtUnix} />
          )}
        </label>
        <input
          type="checkbox"
          id={"my-modal-" + id.toString()}
          className="modal-toggle"
        />
        {enabled && (
          <StakingModal
            refetch={refetch}
            id={id.toString()}
            isStaked={true}
            data={selectedNFT}
            image={nftImage}
          />
        )}
      </div>
    </div>
  );
};

export default StakedNFTItem;
