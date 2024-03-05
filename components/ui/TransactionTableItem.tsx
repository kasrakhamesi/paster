import { globals } from "@/config/globals";
import { minifyAddress } from "@/utils/helpers";
import { zeroAddress } from "viem";
import Moment from "react-moment";
import { useEvmNFTMetadata } from "@moralisweb3/next";
import Link from "next/link";

const TransactionTableItem = ({ t, number }: { t: any; number: number }) => {
  const transaction = t;
  const {
    data: metadata,
    isFetching,
    error,
  } = useEvmNFTMetadata({
    address: globals.contracts.collectionAddress,
    tokenId: transaction.token_id,
    normalizeMetadata: true,
    mediaItems: true,
  });

  const nftImage =
    transaction?.image_url ||
    metadata?.media?.mediaCollection?.low?.url ||
    metadata?.media?.originalMediaUrl;

  enum TransactionType {
    Burn = "Burn",
    Mint = "Mint",
    Stake = "Stake",
    Unstake = "Unstake",
    Transfer = "Transfer",
  }

  const fromAddress = transaction?.from_address;
  const toAddress = transaction?.to_address;

  const transactionType =
    toAddress === zeroAddress
      ? TransactionType.Burn
      : fromAddress === zeroAddress
      ? TransactionType.Mint
      : toAddress === globals.contracts.stakingAddress
      ? TransactionType.Stake
      : fromAddress === globals.contracts.stakingAddress
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
    <tr className="hover">
      <td>
        <div className="relative flex items-center space-x-3">
          <span className="text-neutral"></span>
          <div className=" avatar">
            <div className="w-12 h-12 mask mask-squircle">
              <img
                src={nftImage || image}
                className="relative object-contain sm:block mask mask-squircle"
                alt=""
              />
            </div>
          </div>
          {nftImage && (
            <img
              src={image}
              className="absolute left-0 w-5 h-5 -bottom-2"
              alt={transactionType}
            />
          )}
        </div>
      </td>

      {/* Transaction type */}
      <td className="items-center hidden h-full font-bold text-asterfiBlue sm:table-cell">
        {transactionType}
      </td>
      <td className="font-bold text-asterfiBlue">
        <Link href={`/nfts/${transaction.token_id}`}>
          {transaction.token_id}
        </Link>
      </td>
      {/* From Address */}
      <td className="">
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
      <td className="">
        <a
          target="_blank"
          href={globals.env.etherscanAddressBaseURL + toAddress}
          rel="noreferrer"
        >
          {toAddress && minifyAddress(toAddress)}
        </a>
      </td>
      <td className="hidden text-asterfiBlue sm:table-cell">
        <Moment fromNow>{transaction?.block_timestamp}</Moment>
      </td>
      <td className="">
        <a
          href={globals.env.etherscanTrxBaseURL + transaction?.transaction_hash}
          target="_blank"
          rel="noreferrer"
        >
          {transaction?.transaction_hash &&
            minifyAddress(transaction?.transaction_hash)}
        </a>
      </td>
    </tr>
  );
};

export default TransactionTableItem;
