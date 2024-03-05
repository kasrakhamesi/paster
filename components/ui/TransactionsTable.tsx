import React, { useEffect, useState } from "react";
import TransactionTableItem from "./TransactionTableItem";
import { EvmNftTransfer } from "@moralisweb3/common-evm-utils";
import axios from "axios";
import { LoaderIcon } from "react-hot-toast";

function TransactionTable() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [cursorStack, setCursorStack] = useState<string[]>([""]);
  const [transactions, setTransactions] = useState<EvmNftTransfer[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (cursor = "") => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/transactions?cursor=${cursor}`);
        const data = response.data.data;
        setTotal(data.total);

        setTransactions(data.result);
        if (data.cursor && page === cursorStack.length - 1) {
          // Only add a new cursor if we are navigating to a new page
          setCursorStack((prevStack) => [...prevStack, data.cursor]);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(cursorStack[page]);
  }, [page]);

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <div className="w-full h-full mx-auto overflow-x-auto">
        {
          <table className="table w-full h-full table-auto border-neutral table-pin-rows table-xs sm:table-sm md:table-md lg:table-lg table-zebra-zebra">
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
            <tbody className="h-full">
              {transactions?.map(
                (transaction: EvmNftTransfer, index: number) => {
                  return (
                    <TransactionTableItem
                      number={index}
                      key={index}
                      t={transaction}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        }
      </div>
      <div className="flex items-center justify-center w-full pb-4">
        <div className=" join">
          <button
            disabled={page === 0}
            onClick={() => handlePrevious()}
            className="text-2xl join-item btn"
          >
            «
          </button>
          <button className="cursor-default join-item btn">
            Page{" "}
            {loading ? (
              <span>
                <LoaderIcon />
              </span>
            ) : (
              page + 1
            )}
          </button>
          <button
            onClick={() => handleNext()}
            className="text-2xl join-item btn"
          >
            »
          </button>
        </div>
      </div>
    </>
  );
}

export default TransactionTable;
