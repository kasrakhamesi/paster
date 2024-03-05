import { LoaderIcon } from "react-hot-toast";
import TextGradient from "../TextGradient";
import { minifyAddress } from "@/utils/helpers";
import { useAccount } from "wagmi";
import moment from "moment";

type Props = {
  nftName: string | null;
  nftMetadata: any;
  openseaError: boolean;
  openseaLoading: boolean;
  asset: any;
  revealed: boolean | undefined;
};

const NFTDetails = ({
  nftName,
  nftMetadata,
  openseaError,
  openseaLoading,
  asset,
  revealed,
}: Props) => {
  const { address } = useAccount();
  return (
    <div className="flex items-start justify-start">
      <div className="flex flex-col space-y-1">
        {!nftName || !nftMetadata ? (
          <LoaderIcon />
        ) : (
          <TextGradient
            text={nftName || nftMetadata?.name + " #" + nftMetadata?.tokenId}
          />
        )}
        {nftMetadata && (
          <h2 className="text-sm font-bold md:text-base text-accent">
            Owner:{" "}
            {nftMetadata?.ownerOf?.equals(address!)
              ? "You"
              : minifyAddress(nftMetadata!.ownerOf!.checksum)}
          </h2>
        )}
        {!openseaError && !openseaLoading && (
          <h2 className="text-sm md:text-base">
            Minted {moment(asset?.asset_contract.created_date!).fromNow()}
          </h2>
        )}
        {
          <h2 className="text-sm md:text-base">
            Status:{" "}
            {revealed === undefined ? (
              <LoaderIcon />
            ) : revealed ? (
              "Revealed"
            ) : (
              "Unrevealed"
            )}
          </h2>
        }
      </div>
    </div>
  );
};

export default NFTDetails;
