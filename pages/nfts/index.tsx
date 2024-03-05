import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";
import NFTCard from "@/components/ui/dashboard/NFTCard";
import NoNFT from "@/components/ui/dashboard/NoNFT";
import { globals } from "@/config/globals";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import { useAccount } from "wagmi";

const NFTs = () => {
  const { address } = useAccount();
  // const address = "0x001e4cc1bE418D3C858F3393be7ac85Ae27a58dC";
  //const address = globals.contracts.stakingAddress
  const {
    data: ownedNFTs,
    isFetching: loadingOwnedNFTs,
    error: errorOwnedNFTs,
    total: totalOwnedNFTs,
  } = useEvmWalletNFTs({
    address: address as `0x${string}`,
    tokenAddresses: [globals.contracts.collectionAddress],
    mediaItems: true,
    normalizeMetadata: true,
    limit: 100,
  });

  return (
    <DashboardLayout>
      <>
        {errorOwnedNFTs ? (
          <div>Error: {errorOwnedNFTs.message}</div>
        ) : loadingOwnedNFTs ? (
          <div>Loading...</div>
        ) : !ownedNFTs?.length ? (
          <NoNFT />
        ) : (
          !!ownedNFTs?.length && (
            <div className="flex flex-col w-full h-full p-4 space-y-4">
              <div className="w-full h-24 bg-CustomGray rounded-xl"></div>
              <div className="container flex flex-wrap gap-4 mx-auto">
                {ownedNFTs.map((nft, i) => {
                  return <NFTCard key={i} nft={nft} />;
                })}
              </div>
            </div>
          )
        )}
      </>
    </DashboardLayout>
  );
};
export default NFTs;
