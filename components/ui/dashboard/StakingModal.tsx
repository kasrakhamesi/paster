import { EvmNft, EvmNftMetadata } from "@moralisweb3/common-evm-utils";
import {
  ArrowDown,
  ArrowRight,
  FingerScan,
  Lock1,
  Unlock,
} from "iconsax-react";
import { useState } from "react";
import StakingABI from "@/contracts/stakingABI.json";
import CollectionABI from "@/contracts/collectionABI.json";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useQueryClient,
  useWaitForTransaction,
} from "wagmi";
import { LoaderIcon, toast } from "react-hot-toast";
import { globals } from "@/config/globals";
import Image from "next/image";
import { claimReward } from "@/api/rewards";
import { useRouter } from "next/router";

type Props = {
  data:
    | {
        nft: EvmNft;
        metadata: EvmNftMetadata;
      }
    | undefined;
  isStaked: boolean | undefined;
  id: string;
  refetch: any;
  image: string | null;
};

const StakingModal = ({ data, isStaked, id, refetch, image }: Props) => {
  const router = useRouter();
  const metadata: any = data?.nft.metadata;
  const nftImage =
    image || data?.nft.media?.mediaCollection?.low.url || metadata?.image;
  const [approveSuccess, setApproveSuccess] = useState(false);
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { data: isApproved, isLoading: isLoadingApprovalCheck } =
    useContractRead({
      address: globals.contracts.collectionAddress,
      abi: CollectionABI,
      functionName: "isApprovedForAll",
      args: [address, globals.contracts.stakingAddress],
      onSuccess(data) {
        console.log(data);
        setApproveSuccess(!!data);
      },
      onError(err) {
        toast.error("Error checking the approval");
        console.log(err);
      },
    });

  const {
    write: approve,
    isLoading: loadingApproval,
    data: approvalData,
  } = useContractWrite({
    address: globals.contracts.collectionAddress,
    abi: CollectionABI,
    functionName: "setApprovalForAll",
    args: [globals.contracts.stakingAddress, true],
    onSuccess: (data) => {
      console.log("Approved", data);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error.message.split(".")[0]);
    },
  });

  const {
    write: stakeNFT,
    isLoading: loadingStake,
    data: stakingData,
  } = useContractWrite({
    address: globals.contracts.stakingAddress,
    abi: StakingABI,
    functionName: "stake",
    args: [id],
    onSuccess: (data) => {
      console.log(data);
      toast.success("Waiting for transaction to be confirmed");
    },
    onError: (error) => {
      console.log("error", error);
      // toast.error(error.message)
      toast.error(error.message.split(".")[0]);
    },
    onMutate: () => {
      console.log("Mutate");
    },
  });

  const {
    write: unstakeNFT,
    isLoading: loadingUnstake,
    data: unstakeData,
  } = useContractWrite({
    address: globals.contracts.stakingAddress,
    abi: StakingABI,
    functionName: "unstake",
    args: [id],
    onSuccess: (data) => {
      console.log(data);
      toast.success("Waiting for transaction to be confirmed");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error.message);
    },
    onMutate: () => {
      console.log("Mutate");
    },
  });

  const waitForApprovalTransaction = useWaitForTransaction({
    hash: approvalData?.hash,
    onSuccess: () => {
      toast.success(`Successfully Approved Staking`);
      setApproveSuccess(true);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(`Error Approving`);
    },
  });

  const waitForStakeTransaction = useWaitForTransaction({
    hash: stakingData?.hash,
    onSuccess: () => {
      toast.success(`Successfully Staked Your NFT`);
      setPhase("success");
      queryClient.resetQueries(["NFTs", address]);
      refetch();
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(`Error Staking the NFT`);
    },
    onSettled: () => {
      console.log("onSettled", stakingData?.hash);
    },
  });

  const waitForUnstakeTransaction = useWaitForTransaction({
    hash: unstakeData?.hash,
    onSuccess: () => {
      toast.success(`Successfully Unstaked Your NFT`);
      toast.success(
        `Congratulations! You have successfully claimed your first initial reward of 2,500,000 credits across 4 claimable rewards. Remember to access the ‘Rewards’ section to claim all future claimable credits that become available.  check it out now`
      );
      setPhase("success");
      queryClient.resetQueries(["NFTs", address]);
      refetch(false);
      router.push("/dashboard/rewards");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(`Error Unstaking the NFT`);
    },
    onSettled: () => {
      console.log("onSettled", stakingData?.hash);
    },
  });

  const [phase, setPhase] = useState<"stake" | "unstake" | "success" | "fail">(
    "stake"
  );
  if (isStaked)
    return (
      <div className="modal bg-[#0E111C]/10 backdrop-blur-sm">
        <div className="flex flex-col  bg-[#0E111C] shadow-none py-4 lg:py-2 modal-box max-w-6xl w-9/12">
          <div className="flex justify-end w-full">
            <label
              onClick={() =>
                setTimeout(() => {
                  setPhase("unstake");
                }, 200)
              }
              htmlFor={"my-modal-" + id}
              className="text-right text-black bg-CustomGreen hover:bg-asterfiDarkGreen btn btn-sm btn-circle"
            >
              ✕
            </label>
          </div>
          <div className="flex flex-col items-center justify-center p-4 py-12 space-y-4 transition-all duration-300 ease-in shadow-lg h-fit rounded-3xl">
            <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-0 lg:flex-row">
              {/*  */}
              <div className="flex flex-col items-center w-40 space-y-4">
                <p className="bg-[#1D202D] px-5 py-2 rounded-xl text-sm w-full items-center justify-center text-white">
                  You Will Unstake
                </p>
                <div className="flex flex-col items-center">
                  <img
                    src={nftImage || "/images/unrevealed.webp"}
                    alt="asterfi"
                    className=" mask mask-squircle"
                  />
                  <p className="bg-[#54597C] relative -top-4 px-4 py-2 rounded-xl text-sm w-fit items-center justify-center text-white">
                    Your Asterfi
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="flex items-center justify-center w-20 px-2">
                <ArrowRight className="hidden lg:flex" />
                <ArrowDown className="flex lg:hidden" />
              </div>
              {/*  */}
              <div>
                <div className="flex flex-col items-center space-y-4 w-80">
                  <p className="bg-[#1D202D] text-center px-5 py-2 rounded-xl text-sm w-full items-center justify-center text-white">
                    You Will Get
                  </p>
                  <div className="flex items-end space-x-2">
                    <div className="flex flex-col items-center justify-end w-1/2 h-full bg-[url('/images/dashboard/hilight.png')] bg-center bg-no-repeat rounded-2xl">
                      <img
                        src="/images/dashboard/asterfi-logo.png"
                        alt="Surprize"
                        className=" mask mask-squircle"
                      />
                      <p className="bg-[#54597C] relative -top-4 px-4 py-2 rounded-xl text-sm w-fit items-center justify-center text-white">
                        Surprise
                      </p>
                    </div>
                    <div className="flex flex-col items-center w-1/2 h-full">
                      <img
                        src={nftImage || "/images/unrevealed.webp"}
                        alt="asterfi"
                        className=" mask mask-squircle"
                      />
                      <p className="bg-[#54597C] relative -top-4 px-4 py-2 rounded-xl text-sm w-fit items-center justify-center text-white">
                        Your Asterfi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg text-white flex-nowrap">
                Unstake your Asterfi after the lock-up period to claim your
                rewards.
              </p>
            </div>
            <div>
              <button
                disabled={loadingUnstake || waitForUnstakeTransaction.isLoading}
                onClick={() => {
                  claimReward({ tokenId: Number(id) })
                    .then(() => {
                      unstakeNFT?.();
                    })
                    .catch(({ message }) => {
                      if (message.includes("claim")) {
                        unstakeNFT?.();
                      } else toast.error(message);
                    });
                }}
                className="flex space-x-2 disabled:bg-gray-800 disabled:text-gray-400 btn btn-wide text-CustomBlack hover:bg-asterfiDarkGreen bg-CustomGreen"
              >
                {loadingUnstake || waitForUnstakeTransaction.isLoading ? (
                  <LoaderIcon />
                ) : (
                  <Unlock size={16} />
                )}
                <span>UNSTAKE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="modal backdrop-blur-sm">
        <div className="flex flex-col py-20 bg-transparent shadow-none modal-box">
          <div className="flex flex-col items-center justify-center p-4 py-12 space-y-4 transition-all duration-300 ease-in shadow-lg bg-base-100 h-fit rounded-3xl">
            <label
              onClick={() =>
                setTimeout(() => {
                  setPhase("stake");
                }, 200)
              }
              htmlFor={"my-modal-" + id}
              className="absolute pt-[1px] text-accent-content bg-accent hover:bg-accent-focus pl-[1px] btn btn-sm btn-circle right-10 top-24"
            >
              ✕
            </label>
            <div className="flex justify-center w-full">
              {/* <Image src="/images/helmet5.png" className="absolute z-30 top-6" alt="asterfi" width={120} height={120} /> */}
              <img
                src={
                  phase === "success"
                    ? "/images/dashboard/thumbs.png"
                    : nftImage || "/images/unrevealed.webp"
                }
                alt="asterfi"
                className="absolute z-20 w-24 h-24 border rounded-full top-6 border-3 border-base-300"
              />
            </div>
            {phase === "success" ? (
              <>
                <h1 className="text-3xl">Success</h1>
                <p>Your Asterfi has been successfully staked.</p>
              </>
            ) : (
              <>
                <h1 className="text-xl font-bold">
                  {data?.nft.name}{" "}
                  <span className="text-lg text-accent">#{id}</span>
                </h1>

                <div className="flex flex-col w-full px-4 space-y-5">
                  <div className="w-full h-4 bg-[url('/images/dashboard/divider.png')] bg-no-repeat" />
                  <div className="flex items-center justify-between w-full">
                    <p>Lock duration</p>
                    <p>12 Months</p>
                  </div>
                  <div className="w-full h-1 bg-[url('/images/dashboard/divider.png')] bg-no-repeat" />

                  <div className="flex items-center justify-between w-full ">
                    <p>Your reward</p>
                    <div className="flex items-center flex-nowrap">
                      <p>Surprize</p>
                    </div>
                  </div>
                </div>
                <button
                  disabled={
                    loadingStake ||
                    waitForStakeTransaction.isLoading ||
                    loadingApproval ||
                    waitForApprovalTransaction.isLoading
                  }
                  onClick={() => (isApproved ? stakeNFT?.() : approve?.())}
                  className="flex space-x-2 disabled:bg-gray-800 disabled:text-gray-400 btn btn-wide text-accent-content hover:bg-accent-focus bg-accent"
                >
                  {loadingStake ||
                  waitForStakeTransaction.isLoading ||
                  loadingApproval ||
                  waitForApprovalTransaction.isLoading ? (
                    <LoaderIcon />
                  ) : isApproved ? (
                    <Lock1 size={16} />
                  ) : (
                    <FingerScan size={16} />
                  )}
                  <span>
                    {isLoadingApprovalCheck
                      ? "Approval checking..."
                      : approveSuccess
                      ? "STAKE"
                      : "APPROVE"}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingModal;
