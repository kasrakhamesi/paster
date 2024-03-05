import { globals } from "@/config/globals";
import { EvmNftTransfer } from "@moralisweb3/common-evm-utils";
import { useEvmNFTTransfers } from "@moralisweb3/next";
import { useEffect } from "react";
import TransactionItem from "./TransactionItem";

type Props = {
  tokenId: string | string[] | undefined;
  imageUrl: string | any;
};

const NFTTransfers = ({ tokenId, imageUrl }: Props) => {
  const {
    data: transactions,
    isFetching: loadingTransactions,
    fetch,
  } = useEvmNFTTransfers({
    address: globals.contracts.collectionAddress,
    tokenId: tokenId?.toString() || "",
  });

  useEffect(() => {
    if (!tokenId) return;
    fetch();
  }, [tokenId]);

  return (
    <>
      <div className="h-full mx-auto overflow-x-auto">
        {
          <table className="table w-full h-full table-auto border-neutral table-xs sm:table-sm md:table-md lg:table-lg table-zebra-zebra">
            <thead className="">
              <tr className="text-base font-bold bg-base-300">
                <th className=""></th>
                <th className="hidden xl:table-cell">Type</th>
                <th className="">Id</th>
                <th className="">From</th>
                <th className="">To</th>
                <th className="hidden xl:table-cell">Time</th>
                <th className="">Txn</th>
              </tr>
            </thead>
            <tbody className="h-full">
              {transactions?.map(
                (transaction: EvmNftTransfer, index: number) => {
                  return (
                    <TransactionItem
                      key={index}
                      imageUrl={imageUrl}
                      transaction={transaction}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        }
      </div>
    </>
  );
};

export default NFTTransfers;
