import TransactionsTable from "./TransactionsTable";
import React from "react";

function LatestTransactions() {
  return (
    <div
      id="transactions-table"
      className="flex flex-col items-start justify-start w-full h-full py-8 my-10 space-y-8"
    >
      <div className="flex items-start justify-start space-x-10 select-none ">
        <h3
          className={` flex items-center justify-center cursor-pointer text-3xl lg:text-4xl font-GilroyBlack`}
        >
          Latest Transactions
        </h3>
      </div>
      <TransactionsTable />
    </div>
  );
}

export default LatestTransactions;
