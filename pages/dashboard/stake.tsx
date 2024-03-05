import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";
import {
  EvmAddressInput,
  EvmNft,
  EvmNftMetadata,
} from "@moralisweb3/common-evm-utils";
import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import PageHeader from "../../components/ui/dashboard/PageHeader";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import { globals } from "@/config/globals";
import Toggle from "@/components/ui/dashboard/Toggle";
import NoNFT from "@/components/ui/dashboard/NoNFT";
import StakingBanner from "@/components/ui/dashboard/StakingBanner";
import NFTItem from "@/components/ui/dashboard/NFTItem";
import StakingABI from "@/contracts/stakingABI.json";
import StakedNFTItem from "@/components/ui/dashboard/StakedNFTItem";

const stake = () => {
  const [viewStaked, setViewStaked] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<
    { nft: EvmNft; metadata: EvmNftMetadata } | undefined
  >();
  const [stakedNFTs, setStakedNFTs] = useState<BigInt[]>();
  const { address } = useAccount();

  const {
    data: ownedNFTs,
    isFetching: loadingOwnedNFTs,
    fetch: refetchOwnedNFTs,
  } = useEvmWalletNFTs({
    address: address as unknown as EvmAddressInput,
    tokenAddresses: [globals.contracts.collectionAddress],
    mediaItems: true,
    normalizeMetadata: true,
  });

  useEffect(() => {
    if (address) refetchOwnedNFTs();
  }, [address]);

  const { isLoading: loadingStakedNFTs, refetch: refetchStaked } =
    useContractRead({
      address: globals.contracts.stakingAddress,
      abi: StakingABI,
      cacheTime: 0,
      staleTime: 0,
      functionName: "getStakedNFTs",
      args: [address],
      enabled: !!address,
      onSuccess(data) {
        console.log(data);
        setStakedNFTs(data as unknown as BigInt[]);
      },
      onError(err) {
        console.log(err);
      },
    });

  const title = "Staking";
  const sub =
    "Prepare to stake your asterfi and brace yourself for an astonishing surprise!";

  const refetchBoth = (view: boolean = true) => {
    refetchOwnedNFTs();
    setViewStaked(view);
  };

  useEffect(() => {
    if (!stakedNFTs || !ownedNFTs) return;

    if (ownedNFTs.length === 0 && stakedNFTs.length > 0) setViewStaked(true);
  }, [stakedNFTs, ownedNFTs]);

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full h-full p-2 py-8 space-y-4 lg:p-4">
        <PageHeader title={title} sub={sub} />
        <StakingBanner />
        <Toggle
          value={viewStaked}
          setValue={setViewStaked}
          title1="All"
          title2="Staked"
          value1={ownedNFTs?.length?.toString()}
          value2={(stakedNFTs as BigInt[])?.length?.toString()}
        />
        {loadingOwnedNFTs || loadingStakedNFTs ? (
          <div className="flex items-center justify-center">
            <p className="">Loading...</p>
          </div>
        ) : ownedNFTs?.length === 0 && stakedNFTs?.length === 0 ? (
          <NoNFT />
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
            {!viewStaked
              ? ownedNFTs?.map((nft) => {
                  return (
                    <NFTItem
                      refetch={refetchBoth}
                      key={nft?.tokenId}
                      isStaked={false}
                      nft={nft}
                      setSelectedNFT={setSelectedNFT}
                      selectedNFT={selectedNFT}
                    />
                  );
                })
              : (stakedNFTs as BigInt[]).map((nftId) => {
                  return (
                    <StakedNFTItem
                      refetch={refetchBoth}
                      key={Number(nftId)}
                      id={Number(nftId)}
                      setSelectedNFT={setSelectedNFT}
                      selectedNFT={selectedNFT}
                    />
                  );
                })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default stake;
