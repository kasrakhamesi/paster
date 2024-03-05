import { useAccount, useContractReads } from "wagmi";
import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";
import TextGradient from "@/components/ui/TextGradient";
import { useEvmTokenMetadata, useEvmWalletNFTs } from "@moralisweb3/next";
import { globals } from "@/config/globals";
import { EvmAddressInput } from "@moralisweb3/common-evm-utils";
import Chart from "@/components/ui/dashboard/Chart";
import BackupTokens from "@/components/ui/dashboard/BackupTokens";
import InfoBox from "@/components/ui/dashboard/InfoBox";
import WalletBalance from "@/components/ui/dashboard/WalletBalance";
import axios from "axios";
import { useEffect } from "react";

function DashboardPage() {
  const { address } = useAccount();

  const {
    data: ownedNFTsQ,
    isFetching: loadingOwnedNFTs,
    error: errorOwnedNFTs,
    total: totalOwnedNFTs,
    refetch,
  } = useEvmWalletNFTs({
    address: address as `0x${string}`,
    tokenAddresses: [globals.contracts.collectionAddress],
    mediaItems: true,
    normalizeMetadata: true,
    limit: 100,
  });

  const revealedNftIds = ownedNFTsQ
    ?.filter(
      (nft) =>
        (nft.metadata as unknown as any).attributes[0].trait_type !==
        "Unrevealed"
    )
    .map((nft) => nft.tokenId);
  const ownedNFTs = ownedNFTsQ?.filter(
    (nft) =>
      (nft.metadata as unknown as any).attributes[0].trait_type !== "Unrevealed"
  );

  const unRevealedNftIds = ownedNFTsQ
    ?.filter(
      (nft) =>
        (nft.metadata as unknown as any).attributes[0].trait_type ===
        "Unrevealed"
    )
    .map((nft) => nft.tokenId);

  useEffect(() => {
    unRevealedNftIds?.map((tokenId) => {
      refreshMoralisMetadata(tokenId);
    });
  }, [unRevealedNftIds]);

  async function refreshMoralisMetadata(tokenId: string | number) {
    try {
      const response = await axios.get(`/api/resync?tokenId=${tokenId}`);
      const moralisData = response.data;
      if (moralisData.error) {
        console.log(moralisData.error);
      } else {
        setTimeout(() => {
          refetch?.() || refetch || console.log("loading");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //TODO NEEd
  const { data: backupTokens, isLoading: loadingBackupToken } =
    useContractReads({
      contracts:
        revealedNftIds?.map((id) => ({
          address: globals.contracts.collectionAddress,
          abi: [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "nftInfos",
              outputs: [
                {
                  internalType: "bool",
                  name: "revealed",
                  type: "bool",
                },
                {
                  internalType: "uint8",
                  name: "tokenDecimal",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "backupLimit",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "backupAmount",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "tokenBackup",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
          functionName: "nftInfos",
          args: [BigInt(id)],
        })) || [],
      enabled: !!revealedNftIds?.length,
    });

  const addresses = backupTokens?.map((token) => token.result?.[4]);

  const { data: tokenMetadata, isFetching: loadingTokenMeta } =
    useEvmTokenMetadata({
      addresses: addresses as unknown as EvmAddressInput[],
    });

  return (
    <DashboardLayout>
      {/* Top Part */}
      <div className="grid gap-5 px-4 py-10 mb-6 lg:grid-cols-2 md:px-10">
        <div className="flex flex-col-reverse w-full space-y-6 md:space-y-0">
          <div className="select-none lg:col-span-1">{/* <Chart /> */}</div>
          <div className="order-2 h-full px-4 py-6 overflow-x-hidden overflow-y-auto select-none lg:col-span-2 lg:order-1 md:px-10 rounded-3xl bg-base-300">
            <TextGradient text={`Tokens Invested`} />
            <BackupTokens
              tokenMetadata={tokenMetadata}
              backupTokens={backupTokens}
              loadingOwnedNFTs={loadingOwnedNFTs}
              ownedNFTs={ownedNFTs}
            />
          </div>
        </div>
        <div className="flex flex-col order-1 space-y-6 lg:order-2 ">
          <WalletBalance address={address} />
          <div className="relative flex-1 w-full h-auto px-6 py-6 overflow-hidden bg-base-300 rounded-3xl">
            <InfoBox />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
