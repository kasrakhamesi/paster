import React, { useEffect, useState } from "react";
import TransactionTableItem from "./TransactionTableItem";
import { EvmAddressInput, EvmNftTransfer } from "@moralisweb3/common-evm-utils";
import axios from "axios";
import { LoaderIcon } from "react-hot-toast";
import { useEvmWalletNFTTransfers } from "@moralisweb3/next";
import { useAccount } from "wagmi";
import { globals } from "@/config/globals";
import MyTransactionTableItem from "./MyTransactionTableItem";

function TransactionTable() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<string>("");
  const [transactions, setTransactions] = useState<EvmNftTransfer[]>([]);
  const [MyAsterfitransactions, setMyAsterfiTransactions] = useState<
    EvmNftTransfer[]
  >([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const { data: asterfiTransfers } = useEvmWalletNFTTransfers({
    address: address as EvmAddressInput,
    limit: 100,
  });

  useEffect(() => {
    if (!asterfiTransfers) return;
    const arr = asterfiTransfers
      .map((transfer: EvmNftTransfer | undefined) => {
        if (
          transfer &&
          transfer.tokenAddress.equals(globals.contracts.collectionAddress)
        )
          return transfer;
      })
      .filter(Boolean) as EvmNftTransfer[];
    // console.log(arr)
    if (arr.length > 0) {
      setMyAsterfiTransactions(arr);
    }
  }, [asterfiTransfers]);

  const fetchData = async (cursor = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/transactions?cursor=${cursor}&count=10`
      );
      const data = response.data.data;
      setTotal(data.total);
      const joinedArray = [...transactions, ...data.result];
      setTransactions(joinedArray);
      setCursor(data.cursor);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTransactions([]);
    fetchData(cursor);
  }, []);

  return (
    <>
      <div className="w-full mx-auto overflow-x-auto">
        <table className="table w-full border-neutral table-xs sm:table-sm md:table-md lg:table-lg table-zebra-zebra">
          <thead className="">
            <tr className="font-bold text-accent bg-base-300 md:text-lg">
              <th className=""></th>
              <th className="hidden sm:table-cell">Type</th>
              <th className="">Id</th>
              <th className="">From</th>
              <th className="">To</th>
              <th className="hidden sm:table-cell">Time</th>
              <th className="">Txn</th>
            </tr>
          </thead>
          {/* <tbody className='h-full'>
                        {MyAsterfitransactions?.map((transaction: EvmNftTransfer, index: number) => {
                            return (
                                <MyTransactionTableItem key={index} transaction={transaction} />
                            )
                        })}
                    </tbody> */}
          <tbody className="h-full">
            {transactions?.map((transaction: EvmNftTransfer, index: number) => {
              return (
                <TransactionTableItem
                  number={index}
                  key={index}
                  t={transaction}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center w-full pb-4">
        <div className="pt-2 mt-4">
          <button
            disabled={loading}
            className="btn btn-accent"
            onClick={() => fetchData(cursor)}
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
}

export default TransactionTable;
