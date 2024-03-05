import { Fragment } from "react";

interface WithdrawalTableProps {
  withdrawals: Withdrawal[];
}

export default function WithdrawalTable({ withdrawals }: WithdrawalTableProps) {
  const tdClassNames =
    "flex flex-row gap-1 lg:table-cell text-end lg:text-center text-xs lg:text-sm";
  const mobileLabel = (label: string) => (
    <div className="flex-1 flex flex-row text-start whitespace-nowrap text-xs lg:hidden">
      {label}
    </div>
  );

  return (
    <table className="flex flex-col lg:table">
      <thead className="hidden lg:table-header-group text-center">
        <tr>
          <th>Amount</th>
          <th>Transaction ID</th>
          <th>Status</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody className="flex flex-col lg:table-row-group max-lg:divide-y max-lg:divide-base-200 text-center">
        {withdrawals.map((withdrawal) => (
          <tr key={withdrawal.id} className="flex flex-col lg:table-row py-1.5">
            <td className={tdClassNames}>
              {mobileLabel("Amount:")}
              {withdrawal.amount}
            </td>
            <td className={`lg:w-2/5 break-all ${tdClassNames}`}>
              {mobileLabel("Transaction ID:")}
              {withdrawal.transactionId !== null ? (
                <a
                  href={"https://etherscan.io/tx/" + withdrawal.transactionId}
                  target="blank"
                  className={`text-blue-500 dark:text-blue-300 underline`}
                >
                  {withdrawal.transactionId}
                </a>
              ) : withdrawal.status === "pending" ? (
                <span className="bg-yellow-500 text-black font-semibold px-2 py-1 rounded-md">
                  wait for admin confirmation
                </span>
              ) : (
                "---"
              )}
            </td>
            <td className={tdClassNames}>
              {mobileLabel("Status:")}
              {withdrawal.status === "pending" ? (
                <span className="bg-yellow-500 text-black font-semibold px-2 py-1 rounded-md">
                  Pending
                </span>
              ) : withdrawal.status === "approved" ? (
                <span className="bg-green-500 text-black font-semibold px-2 py-1 rounded-md">
                  Confirmed
                </span>
              ) : (
                <span className="bg-red-500 text-black font-semibold px-2 py-1 rounded-md">
                  Rejected
                </span>
              )}
            </td>
            <td className={tdClassNames}>
              {mobileLabel("Message:")}
              {withdrawal.message !== null ? (
                withdrawal.message.split("\n").map((line, index) => (
                  <Fragment key={index}>
                    {index !== 0 && <br />}
                    {line}
                  </Fragment>
                ))
              ) : withdrawal.status === "pending" ? (
                <span className="bg-yellow-500 text-black font-semibold px-2 py-1 rounded-md">
                  wait for admin confirmation
                </span>
              ) : (
                "---"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
