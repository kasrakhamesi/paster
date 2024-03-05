import { EvmNft } from "@moralisweb3/common-evm-utils";
import BackupTokenItem from "./BackupTokenItem";

type Props = {
  loadingOwnedNFTs: boolean;
  ownedNFTs: EvmNft[] | undefined;
  tokenMetadata: any;
  backupTokens: any;
  count?: number;
};

const BackupTokens = ({
  loadingOwnedNFTs,
  ownedNFTs,
  tokenMetadata,
  backupTokens,
  count = 100,
}: Props) => {
  return (
    <div className="flex flex-col py-4 space-y-6">
      {loadingOwnedNFTs
        ? "Loading..."
        : !ownedNFTs?.length
        ? "No Invested Tokens Found"
        : ownedNFTs.slice(0, count)?.map((nft, idx) => {
            const tm = tokenMetadata?.[idx];
            return (
              <BackupTokenItem
                key={idx}
                nft={nft}
                tm={tm}
                idx={idx}
                backupTokens={backupTokens}
                tokenMetadata={tokenMetadata}
              />
            );
          })}
    </div>
  );
};

export default BackupTokens;
