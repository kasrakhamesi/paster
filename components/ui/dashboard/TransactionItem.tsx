import { globals } from "@/config/globals";
import { minifyAddress } from "@/utils/helpers";
import { EvmNftTransfer } from "@moralisweb3/common-evm-utils";
import { useEvmNFTMetadata } from "@moralisweb3/next";
import Moment from "react-moment";
import { zeroAddress } from "viem";

const TransactionItem = ({
  transaction,
  imageUrl,
}: {
  transaction: EvmNftTransfer;
  imageUrl: any | string;
}) => {
  const {
    data: metadata,
    isFetching,
    error,
  } = useEvmNFTMetadata({
    address: globals.contracts.collectionAddress,
    tokenId: transaction?.tokenId,
    normalizeMetadata: true,
    mediaItems: true,
  });

  const nftImage =
    imageUrl ||
    metadata?.media?.mediaCollection?.low.url ||
    "images/unrevealed.webp";
  // metadata?.media?.mediaCollection?.low.url || "images/unrevealed.webp";

  /*
  metadata?.media?.status === "success"
    ? metadata?.media?.mediaCollection?.low.url
    : "/images/unrevealed.webp";
*/

  // console.log(metadata)
  const toAddress = transaction?.toAddress?.checksum;
  const fromAddress = transaction?.fromAddress?.checksum;

  enum TransactionType {
    Burn = "Burn",
    Mint = "Mint",
    Stake = "Stake",
    Unstake = "Unstake",
    Transfer = "Transfer",
  }

  const transactionType =
    toAddress === zeroAddress
      ? TransactionType.Burn
      : fromAddress === zeroAddress
      ? TransactionType.Mint
      : toAddress?.toLocaleLowerCase() === globals.contracts.stakingAddress
      ? TransactionType.Stake
      : fromAddress?.toLowerCase() === globals.contracts.stakingAddress
      ? TransactionType.Unstake
      : TransactionType.Transfer;

  const image =
    transactionType === TransactionType.Burn
      ? "/images/burn.png"
      : transactionType === TransactionType.Mint
      ? "/images/mint.png"
      : transactionType === TransactionType.Stake
      ? "/images/lock.png"
      : transactionType === TransactionType.Unstake
      ? "/images/unlock.png"
      : "/images/transfer.png";
  return (
    <tr className="hover font-Gilroy">
      <td>
        <div className="relative flex items-center space-x-3">
          <div className=" avatar">
            <div className="w-12 h-12 mask mask-squircle">
              <img
                src={nftImage || "/images/unrevealed.webp"}
                className="relative object-contain sm:block mask mask-squircle"
                alt=""
              />
            </div>
          </div>
          {nftImage && (
            <img
              src={image}
              className="absolute w-5 h-5 -bottom-3 -left-3"
              alt={transactionType}
            />
          )}
        </div>
      </td>

      {/* Transaction type */}
      <td className="hidden text-accent xl:table-cell">{transactionType}</td>
      <td className="lg: text-accent">{transaction.tokenId}</td>

      {/* From Address */}
      <td className="lg:">
        <a
          target="_blank"
          href={
            fromAddress === zeroAddress
              ? "#"
              : globals.env.etherscanAddressBaseURL + fromAddress
          }
          rel="noreferrer"
        >
          {fromAddress && minifyAddress(fromAddress!)}
        </a>
      </td>
      <td className="lg:">
        <a
          target="_blank"
          href={globals.env.etherscanAddressBaseURL + toAddress}
          rel="noreferrer"
        >
          {toAddress && minifyAddress(toAddress)}
        </a>
      </td>
      <td className="hidden text-asterfiBlue xl:table-cell">
        <Moment fromNow>{transaction?.blockTimestamp}</Moment>
      </td>
      <td className="lg:">
        <a
          href={globals.env.etherscanTrxBaseURL + transaction?.transactionHash}
          target="_blank"
          rel="noreferrer"
        >
          {transaction?.transactionHash &&
            minifyAddress(transaction?.transactionHash)}
        </a>
      </td>
    </tr>
  );
};

export default TransactionItem;
